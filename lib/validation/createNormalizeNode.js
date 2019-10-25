import { createCellNode, getCellRowspan, Table } from '../utils'

export default function({ blocks }) {
	return function normalizeNode(node, editor, next) {
		if (node.type !== blocks.table) return next()

		const firstCell = node.findDescendant(n => n.type === blocks.cell)
		if (!firstCell) return next() // We need to pass from the schema rules first

		const table = Table.create({ blocks }, editor.value.document, firstCell.key)
		const matrix = table.matrix
		let maxColumns = matrix.map(x => x.size).max()
		const rowsMissingColumns = matrix.filter(row => row.size !== maxColumns)
		if (rowsMissingColumns.size === 0) return next()

		// Check if only one empty cell is causing a problem of columns
		const lastRowEntry = matrix.filter(row => row.size === maxColumns).map(row => row.last())
		const lastCell = lastRowEntry.last()
		if (lastRowEntry.size === 1 && lastCell && getCellRowspan(lastCell.ref) === 1 && !lastCell.ref.text) {
			return () => {
				editor.removeNodeByKey(lastCell.ref.key)
			}
		} else {
			return () => {
				editor.withoutNormalizing(() => {
					editor.withoutSaving(() => {
						for (const row of matrix) {
							if (row.size === maxColumns) {
								continue
							} else if (row.size === 0) {
								const idx = matrix.indexOf(row)
								editor.removeNodeByKey(table.table.nodes.get(idx).key)
							} else if (row.size !== maxColumns) {
								const numberOfCellsToAdd = maxColumns - row.size
								const cells = Array.from({ length: numberOfCellsToAdd }).map(() => createCellNode({ blocks }))
								const insertRow = node.getParent(row.last().ref.key)
								cells.forEach(cell => editor.insertNodeByKey(insertRow.key, insertRow.nodes.size, cell))
							}
						}
					})
				})
			}
		}
	}
}
