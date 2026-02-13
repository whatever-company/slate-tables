import { getCellColspan } from '../utils.js'

export default function deleteColumnAtKey({ blocks, saveColumns }, editor, key) {
	const table = editor.getTableAtKey(key)

	const matrix = table.matrix
	const coords = table.getCellCoordinates(table.cell)

	const deleteCellAtColumn = coords.find(coord => coord.y === coords.first().y).x

	if (table.getWidth() === 1) {
		return editor.deleteTableAtRange(table.table.key)
	}

	let lastCell
	editor.withoutNormalizing(() => {
		if (saveColumns) {
			const columns = table.table.data.get('columns', [])
			columns.splice(deleteCellAtColumn, 1)
			editor.setNodeByKey(table.table.key, { data: table.table.data.set('columns', columns) })
		}
		for (let y = 0; y < table.rows.size; y++) {
			const currentCell = matrix.get(y).get(deleteCellAtColumn).ref
			if (lastCell === currentCell) {
				// The cell above has a rowspan > 1
				continue
			}
			lastCell = currentCell
			if (getCellColspan(lastCell) > 1) {
				// Subtract by one and delete content
				editor.setNodeByKey(lastCell.key, {
					data: lastCell.data.set('colspan', getCellColspan(lastCell) - 1)
				})
				editor.deleteAtRange(editor.value.selection.moveToRangeOfNode(lastCell).normalize(editor.value.document))
			} else {
				if (lastCell === table.cell) {
					try {
						editor.moveToStartOfNode(
							editor.value.document.getNextSibling(lastCell.key) ||
								editor.value.document.getPreviousSibling(lastCell.key)
						)
					} catch {}
				}
				editor.removeNodeByKey(lastCell.key)
			}
		}
	})
	editor.focus()
}
