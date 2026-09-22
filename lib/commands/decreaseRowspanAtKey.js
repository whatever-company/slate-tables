import { getCellRowspan, getCellColspan, createCellNode } from '../utils.js'

export default function decreaseRowspanAtKey({ blocks }, editor, key) {
	if (!editor.canDecreaseRowspanAtKey(key)) return

	const table = editor.getTableAtKey(key)
	const { cell } = table
	editor.withoutNormalizing(() => {
		editor.setNodeByKey(cell.key, {
			data: cell.data.set('rowspan', getCellRowspan(cell) - 1)
		})
		// The freed row is the last one spanned by the cell; coordinates come in row order
		const coords = table.getCellCoordinates(cell)
		const freedRowIndex = coords.at(-1).y
		const freedRow = table.rows.get(freedRowIndex)
		if (!freedRow) return

		const { x: startColumn } = coords.find(coord => coord.y === freedRowIndex)
		const insertIndex = table.getCellInsertIndex(freedRowIndex, startColumn)
		// Insert one new cell for each column spanned by the original cell
		for (let c = 0; c < getCellColspan(cell); c++) {
			editor.insertNodeByKey(freedRow.key, insertIndex, createCellNode({ blocks }))
		}
	})
}
