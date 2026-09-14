import { createCellNode } from '../utils.js'

// Index in `row` at which the cell of the new column (right after `column`) must be inserted
function getInsertIndex(row, matrixRow, column) {
	const { ref: cell } = matrixRow.get(column)
	if (row.nodes.includes(cell)) {
		return row.nodes.indexOf(cell) + 1
	}
	// `cell` spans from a row above: skip this row's own cells that precede the column
	return matrixRow.takeWhile(c => c.ref !== cell).filter(c => !c.virtual).size
}

export default function insertColumnAtKey({ blocks, saveColumns }, editor, key) {
	const table = editor.getTableAtKey(key)

	const matrix = table.matrix
	const coords = table.getCellCoordinates(table.cell)
	const insertCellAtColumn = coords.findLast(coord => coord.y === coords.first().y).x
	editor.withoutNormalizing(() => {
		if (saveColumns) {
			const columns = table.table.data.get('columns')
			columns.splice(insertCellAtColumn + 1, 0, { width: null })
			editor.setNodeByKey(table.table.key, {
				data: table.table.data.set('columns', columns)
			})
		}
		table.rows.forEach((row, y) => {
			const index = getInsertIndex(row, matrix.get(y), insertCellAtColumn)
			editor.insertNodeByKey(row.key, index, createCellNode({ blocks }))
		})
	})
	editor.normalize()

	const insertedCell = editor.value.document.getNextSibling(table.cell.key)
	editor.moveToStartOfNode(insertedCell).focus()
}
