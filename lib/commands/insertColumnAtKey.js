import { createCellNode } from '../utils'

export default function insertColumnAtRange({ blocks }, editor, key) {
	const table = editor.getTableAtKey(key)

	const matrix = table.matrix
	const coords = table.getCellCoordinates(table.cell)
	const insertCellAtColumn = coords.findLast(coord => coord.y === coords.first().y).x
	editor.withoutNormalizing(() => {
		for (let y = 0; y < table.rows.size; y++) {
			const cell = matrix.get(y).get(insertCellAtColumn).ref
			const row = editor.value.document.getParent(cell.key)
			editor.insertNodeByKey(row.key, row.nodes.indexOf(cell) + 1, createCellNode({ blocks }))
		}
	})
	editor.normalize()
	editor.moveToStartOfNode(editor.getTableAtKey(key).nextCell).focus()
}
