import { createCellNode } from '../utils.js'

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
		for (let y = 0; y < table.rows.size; y++) {
			const { ref: cell, virtual } = matrix.get(y).get(insertCellAtColumn)
			if (virtual) {
				const rowToChange = matrix.get(y)
				const idx = rowToChange.takeWhile(c => c.ref.key !== cell.key).filter(c => !c.virtual).size
				editor.insertNodeByKey(
					table.rows.get(y),
					idx === 0 ? Math.min(1, rowToChange.size) : idx,
					createCellNode({ blocks })
				)
			} else {
				const row = editor.value.document.getParent(cell.key)
				editor.insertNodeByKey(row.key, row.nodes.indexOf(cell) + 1, createCellNode({ blocks }))
			}
		}
	})
	editor.normalize()
	editor.moveToStartOfNode(editor.getTableAtKey(key).nextCell).focus()
}
