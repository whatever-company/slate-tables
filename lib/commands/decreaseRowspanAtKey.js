import { getCellRowspan, getCellColspan, createCellNode } from '../utils.js'

export default function decreaseRowspanAtKey({ blocks }, editor, key) {
	if (!editor.canDecreaseRowspanAtKey(key)) return

	const table = editor.getTableAtKey(key)
	const { cell } = table
	editor.withoutNormalizing(() => {
		editor.setNodeByKey(cell.key, {
			data: cell.data.set('rowspan', getCellRowspan(cell) - 1)
		})
		const coords = table.getCellCoordinates(cell)
		const lastCoord = coords.maxBy(c => c.y)

		// The freed row is the last virtual row of the cell
		const freedRowIndex = lastCoord.y
		const freedRow = table.rows.get(freedRowIndex)
		const insertIndex = table.getCellInsertIndex(freedRowIndex, lastCoord.x)

		if (freedRow) {
			let c = getCellColspan(cell)
			// Insert one new cell for each column spanned by the original cell
			while (c > 0) {
				c--
				editor.insertNodeByKey(freedRow.key, insertIndex, createCellNode({ blocks }))
			}
		}
	})
}
