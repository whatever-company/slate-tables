import { Block, Text } from 'slate'

export function createContentNode({ blocks }, getContent = () => [Text.create('')]) {
	return Block.create({ type: blocks.content, nodes: getContent() })
}

export function createCellNode({ blocks }) {
	return Block.create({ type: blocks.cell, nodes: [createContentNode({ blocks })] })
}

export function createRowNode({ blocks }, count = 1) {
	return Block.create({ type: blocks.row, nodes: Array.from(Array(count)).map(() => createCellNode({ blocks })) })
}

export function createTableNode({ blocks }, rowsCount = 2, columnsCount = 2) {
	const rows = Array.from(Array(rowsCount)).map(() => createRowNode({ blocks }, columnsCount))
	return Block.create({ type: blocks.table, nodes: rows })
}

/**
 * Closest table ancestor of `key`, or null when there is none — including when
 * the key cannot be resolved in the document.
 */
export function getClosestTable({ blocks }, document, key) {
	try {
		return document.getClosest(key, n => n.object !== 'text' && n.type === blocks.table) || null
	} catch {
		return null
	}
}

export function getCellColspan(cell) {
	return cell?.data?.get('colspan') || 1
}
export function getCellRowspan(cell) {
	return cell?.data?.get('rowspan') || 1
}

/**
 * Merge `properties` into a node's `data` map one key at a time: `Map.merge`
 * would deeply convert plain object values into immutable structures.
 */
export function mergeNodeData(data, properties) {
	return Object.entries(properties).reduce((merged, [key, value]) => merged.set(key, value), data)
}

/**
 * Grid of the cells of `table`, indexed by row then column. A cell spanning
 * several slots is referenced from each of them, `virtual` on all but the first.
 *
 * Rows are laid out top to bottom with a column cursor: a cell takes the first
 * free slots at or after the cursor, so it moves past the slots already taken by
 * cells spanning down from the rows above.
 */
function createMatrix(table) {
	const matrix = []
	table.nodes.forEach((row, y) => {
		const slots = (matrix[y] ??= [])
		let x = 0
		for (const cell of row.nodes) {
			while (slots[x]) x++
			const colspan = getCellColspan(cell)
			for (let dy = 0; dy < getCellRowspan(cell); dy++) {
				const spannedRow = (matrix[y + dy] ??= [])
				for (let dx = 0; dx < colspan; dx++) {
					spannedRow[x + dx] = { ref: cell, virtual: dx > 0 || dy > 0 }
				}
			}
			x += colspan
		}
	})

	return matrix
}

export class Table {
	constructor({ tableBlock, rowBlock, cellBlock, contentBlock, matrix }) {
		this.tableBlock = tableBlock
		this.rowBlock = rowBlock
		this.cellBlock = cellBlock
		this.contentBlock = contentBlock
		this.matrix = matrix
	}

	static create(options, containerNode, key) {
		const node = containerNode.getDescendant(key)
		const ancestors = containerNode.getAncestors(key).push(node)
		const tableBlock = ancestors.findLast(p => p.type === options.blocks.table)
		const rowBlock = ancestors.findLast(p => p.type === options.blocks.row)
		const cellBlock = ancestors.findLast(p => p.type === options.blocks.cell)
		const contentBlock = ancestors
			.skipUntil(ancestor => ancestor === cellBlock)
			.skip(1)
			.first()

		if (!tableBlock) {
			throw new Error('Not in a table')
		}
		const matrix = createMatrix(tableBlock)

		return new Table({ tableBlock, rowBlock, cellBlock, contentBlock, matrix })
	}

	get table() {
		if (!this.tableBlock) {
			throw new Error('Not in a table')
		}
		return this.tableBlock
	}

	get row() {
		if (!this.rowBlock) {
			throw new Error('Not in a row')
		}
		return this.rowBlock
	}

	get cell() {
		if (!this.cellBlock) {
			throw new Error('Not in a cell')
		}
		return this.cellBlock
	}

	get rows() {
		if (!this.tableBlock) {
			throw new Error('Not in a table')
		}
		return this.tableBlock.nodes
	}

	get prevCell() {
		if (this._prevCell) return this._prevCell

		const current = this.cell
		if (current !== this.row.nodes.first()) {
			this._prevCell = this.table.getPreviousSibling(current.key)
		} else if (!this.isFirstRow()) {
			const prevRow = this.table.getPreviousSibling(this.row.key)
			this._prevCell = prevRow.nodes.last()
		}
		return this._prevCell
	}

	get nextCell() {
		if (this._nextCell) return this._nextCell

		const { matrix, cell: current } = this
		const [coord] = this.getCellCoordinates(current)
		if (!coord) return null
		let { x, y } = coord
		while (y < matrix.length && x < matrix[y].length) {
			if (matrix[y][x].ref !== current) {
				this._nextCell = matrix[y][x].ref
				break
			}

			// If we reached the end of the row, start again at the next one
			if (++x === matrix[y].length) {
				x = 0
				y++
			}
		}
		return this._nextCell
	}

	getCellAbove() {
		if (this._cellAbove) return this._cellAbove
		if (this.isFirstRow()) return null
		const { matrix, cell } = this
		const [pos] = this.getCellCoordinates(cell)
		if (!pos) return null
		let y = pos.y
		while (y-- > 0) {
			if (!matrix[y]) return
			if (matrix[y][pos.x].ref !== cell) {
				this._cellAbove = matrix[y][pos.x].ref
				break
			}
		}
		return this._cellAbove
	}

	getCellBelow() {
		if (this._cellBelow) return this._cellBelow
		if (this.isLastRow()) return null
		const { matrix, cell } = this
		const [pos] = this.getCellCoordinates(cell)
		if (!pos) return null
		let y = pos.y
		while (y++ < matrix.length) {
			if (!matrix[y]) return
			if (matrix[y][pos.x].ref !== cell) {
				this._cellBelow = matrix[y][pos.x].ref
				break
			}
		}
		return this._cellBelow
	}

	/** Every slot of the matrix occupied by `cell`, in row order */
	getCellCoordinates(cell) {
		const coords = []
		this.matrix.forEach((row, y) =>
			row.forEach(({ ref }, x) => {
				if (ref === cell) {
					coords.push({ x, y })
				}
			})
		)
		return coords
	}

	/**
	 * Index at which a cell must be inserted in the row at `rowIndex` for it to land
	 * on `column`. Only the cells owned by that row count: a cell spanning from
	 * another row occupies a column without being one of the row's children.
	 */
	getCellInsertIndex(rowIndex, column) {
		return this.matrix[rowIndex].slice(0, column).filter(c => c && !c.virtual).length
	}

	/**
	 * Check to see if this position is within a cell
	 */
	isInCell() {
		return Boolean(this.cellBlock)
	}

	/**
	 * Check to see if this position is within a row
	 */
	isInRow() {
		return Boolean(this.rowBlock)
	}

	/**
	 * Check to see if this position is within a table
	 */
	isInTable() {
		return Boolean(this.tableBlock)
	}

	/**
	 * Get count of columns
	 */
	getWidth(row = null) {
		const { table } = this
		let cells
		if (row) {
			cells = row.nodes
		} else {
			const rows = table.nodes
			cells = rows.first().nodes
		}

		return cells.reduce((acc, c) => acc + getCellColspan(c), 0)
	}

	/**
	 * Get count of rows
	 */
	getHeight() {
		const { table } = this
		const rows = table.nodes

		return rows.reduce((acc, r) => acc + r.data.get('rowspan', 1), 0)
	}

	/**
	 * Get index of current row in the table.
	 */
	getRowIndex() {
		const { table, row } = this
		const rows = table.nodes

		return rows.indexOf(row)
	}

	getCellStartColumn() {
		const { cell } = this
		return this.row.nodes.takeUntil(c => c === cell).reduce((acc, c) => acc + getCellColspan(c), 0)
	}

	/**
	 * True if on first row
	 */
	isFirstRow() {
		return this.getRowIndex() === 0
	}

	/**
	 * True if on last row
	 */
	isLastRow() {
		return this.getRowIndex() === this.getHeight() - 1
	}
}
