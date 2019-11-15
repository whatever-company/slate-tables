import { Block, Text } from 'slate'
import { Record, List } from 'immutable'

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

export const getCellColspan = cell => (cell && cell.data && cell.data.get('colspan')) || 1
export const getCellRowspan = cell => (cell && cell.data && cell.data.get('rowspan')) || 1

const Cell = new Record({ virtual: false, ref: null })

function createMatrix(table) {
	let matrix = new List()
	const rows = table.nodes
	let rowIdx = 0
	for (const row of rows) {
		let colIdx = 0
		if (!matrix.get(rowIdx)) {
			matrix = matrix.set(rowIdx, new List())
		}
		for (const cell of row.nodes) {
			let colSpanIdx
			for (let spanIdx = rowIdx; spanIdx < rowIdx + getCellRowspan(cell); spanIdx++) {
				if (!matrix.get(spanIdx)) {
					matrix = matrix.set(spanIdx, new List())
				}
				for (colSpanIdx = 0; colSpanIdx < getCellColspan(cell); colSpanIdx++) {
					// Insert cell at first empty position
					let i = 0

					while (matrix.get(spanIdx).get(colIdx + colSpanIdx + i)) {
						i++
					}
					const fakeCell = colSpanIdx > 0 || spanIdx !== rowIdx
					matrix = matrix.setIn([spanIdx, colIdx + colSpanIdx + i], new Cell({ ref: cell, virtual: fakeCell }))
				}
			}
			colIdx += colSpanIdx
		}
		rowIdx += 1
	}

	return matrix
}
const Coordinates = new Record({
	x: null,
	y: null
})

export class Table extends Record({
	tableBlock: null,
	rowBlock: null,
	cellBlock: null,
	contentBlock: null,
	matrix: null
}) {
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
		const current = this.cell
		if (current !== this.row.nodes.first()) {
			return this.table.getPreviousSibling(current.key)
		} else if (!this.isFirstRow()) {
			const prevRow = this.table.getPreviousSibling(this.row.key)
			return prevRow.nodes.last()
		}
	}

	get nextCell() {
		const { matrix, cell: current } = this
		const coord = this.getCellCoordinates(current).first()
		let x = coord.x
		let y = coord.y
		while (matrix.has(y) && matrix.get(y).has(x)) {
			if (matrix.get(y).get(x).ref !== current) {
				return matrix.get(y).get(x).ref
			}

			// If we reached the end of the row, start again at the next one
			if (++x === matrix.get(y).size) {
				x = 0
				y++
			}
		}
	}

	getCellAbove() {
		if (this.isFirstRow()) return null
		const { matrix, cell } = this
		const pos = this.getCellCoordinates(cell).first()
		let y = pos.y
		while (y-- > 0) {
			if (!matrix.has(y)) return
			if (matrix.get(y).get(pos.x).ref !== cell) {
				return matrix.get(y).get(pos.x).ref
			}
		}
	}

	getCellBelow() {
		if (this.isLastRow()) return null
		const { matrix, cell } = this
		const pos = this.getCellCoordinates(cell).first()
		let y = pos.y
		while (y++ < matrix.size) {
			if (!matrix.has(y)) return
			if (matrix.get(y).get(pos.x).ref !== cell) {
				return matrix.get(y).get(pos.x).ref
			}
		}
	}

	getCellCoordinates(cell) {
		const { matrix } = this

		const coords = []
		matrix.forEach((row, rowIdx) =>
			row.forEach(({ ref, virtual }, colIdx) => {
				if (ref === cell) {
					coords.push(new Coordinates({ x: colIdx, y: rowIdx }))
				}
			})
		)
		return new List(coords)
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

		return rows.findIndex(x => x === row)
	}

	/**
	 * Get index of current column in the row.
	 */
	getColumnIndex() {
		const { row, cell } = this
		const cells = row.nodes

		return cells.findIndex(x => x === cell)
	}

	getCellStartColumn() {
		const { cell } = this
		return this.row.nodes.takeUntil(c => c === cell).reduce((acc, c) => acc + getCellColspan(c), 0)
	}

	/**
	 * True if on first cell of the table
	 */
	isFirstCell() {
		return this.isFirstRow() && this.isFirstColumn()
	}

	/**
	 * True if on last cell of the table
	 */
	isLastCell() {
		return this.isLastRow() && this.isLastColumn()
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

	/**
	 * True if on first column
	 */
	isFirstColumn() {
		return this.getColumnIndex() === 0
	}

	/**
	 * True if on last column
	 */
	isLastColumn() {
		return this.getColumnIndex() === this.getWidth() - 1
	}
}
