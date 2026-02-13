import { getCellRowspan } from '../utils.js'

export default function increaseRowspanAtKey({ blocks }, editor, key) {
	const table = editor.getTableAtKey(key)

	if (!editor.canIncreaseRowspanAtKey(key)) {
		return
	}

	const cell = table.cell
	const cellBelow = table.getCellBelow()
	const rowBelow = editor.value.document.getParent(cellBelow.key)

	editor.withoutNormalizing(() => {
		// Delete the whole row if it was the latest cell of the row
		if (rowBelow.nodes.size === 1) {
			editor.removeNodeByKey(rowBelow.key)
		} else {
			editor.removeNodeByKey(cellBelow.key)
		}
		const newCell = cell.regenerateKey().merge({
			nodes: cell.nodes.concat(cellBelow.nodes),
			data: cell.data.set('rowspan', getCellRowspan(cell) + getCellRowspan(cellBelow))
		})
		editor.replaceNodeByKey(cell.key, newCell)
		editor.moveToEndOfNode(newCell).focus()
	})
}
