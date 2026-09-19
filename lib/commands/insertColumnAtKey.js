import { createCellNode } from '../utils.js'

export default function insertColumnAtKey({ blocks, saveColumns }, editor, key) {
	const table = editor.getTableAtKey(key)

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
		// The new column goes right after `insertCellAtColumn`
		table.rows.forEach((row, y) => {
			editor.insertNodeByKey(row.key, table.getCellInsertIndex(y, insertCellAtColumn + 1), createCellNode({ blocks }))
		})
	})
	editor.normalize()

	const insertedCell = editor.value.document.getNextSibling(table.cell.key)
	editor.moveToStartOfNode(insertedCell).focus()
}
