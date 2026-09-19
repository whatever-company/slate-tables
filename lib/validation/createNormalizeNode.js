import { createCellNode, getCellRowspan, Table } from '../utils.js'

export default function (options) {
	const { blocks } = options
	return function normalizeNode(node, editor, next) {
		if (node.type !== blocks.table) return next()

		const firstCell = node.findDescendant(n => n.type === blocks.cell)
		if (!firstCell) return next() // We need to pass from the schema rules first

		const { matrix } = Table.create({ blocks }, editor.value.document, firstCell.key)

		// If a rowspan overflows from a table e.g. rowspan 2 when there is only one row,
		// we reduce that rowspan to not overflow.
		for (let rowIndex = 0; rowIndex < node.nodes.size; rowIndex++) {
			for (const cell of node.nodes.get(rowIndex).nodes) {
				if (getCellRowspan(cell) > node.nodes.size - rowIndex) {
					return () => {
						editor.setNodeByKey(cell.key, {
							data: cell.data.merge({ rowspan: node.nodes.size - rowIndex })
						})
					}
				}
			}
		}

		const maxColumns = matrix.map(x => x.size).max()
		const rowsMissingColumns = matrix.filter(row => row.size !== maxColumns)
		if (rowsMissingColumns.size !== 0) {
			// Check if only one empty cell is causing a problem of columns
			const lastRowEntry = matrix.filter(row => row.size === maxColumns).map(row => row.last())
			const lastCell = lastRowEntry.last()
			if (lastRowEntry.size === 1 && lastCell && getCellRowspan(lastCell.ref) === 1 && !lastCell.ref.text) {
				return () => {
					editor.removeNodeByKey(lastCell.ref.key)
				}
			}
			return () => {
				editor.withoutNormalizing(() => {
					editor.withoutSaving(() => {
						// Matrix rows map one-to-one onto the table rows: a rowspan overflowing
						// the table has been reduced above, so no matrix row is without a node.
						matrix.forEach((matrixRow, rowIndex) => {
							if (matrixRow.size === maxColumns) return

							const row = node.nodes.get(rowIndex)
							if (matrixRow.size === 0) {
								editor.removeNodeByKey(row.key)
								return
							}

							// Append the missing cells. The row is located by its index rather than
							// by one of its cells, as a row entirely covered by rowspans owns none.
							const missingCells = Array.from({ length: maxColumns - matrixRow.size }, () => createCellNode({ blocks }))
							missingCells.forEach((cell, i) => editor.insertNodeByKey(row.key, row.nodes.size + i, cell))
						})
					})
				})
			}
		}

		if (options.saveColumns && (!node.data.has('columns') || node.data.get('columns').length !== maxColumns)) {
			// Generate columns data
			let columns = node.data.get('columns', [])
			columns = columns.slice(0, maxColumns)
			while (columns.length < maxColumns) {
				columns.push({ width: null })
			}
			if (!node.data.has('columns')) {
				// Try to get width from cells
			}
			return () => {
				editor.setNodeByKey(node.key, {
					data: node.data.set('columns', columns)
				})
			}
		}

		return next()
	}
}
