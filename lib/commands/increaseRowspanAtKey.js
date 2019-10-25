import { getCellRowspan } from '../utils'

export default function increaseRowspanAtKey({ blocks }, editor, key) {
	const table = editor.getTableAtKey(key)

	if (!editor.canIncreaseRowspanAtKey(key)) {
		return
	}

	const cell = table.cell
	const cellBelow = table.getCellBelow()

	editor.withoutNormalizing(() => {
		editor.removeNodeByKey(cellBelow.key)
		const newCell = cell.regenerateKey().merge({
			nodes: cell.nodes.concat(cellBelow.nodes),
			data: cell.data.merge({ rowspan: getCellRowspan(cell) + getCellRowspan(cellBelow) })
		})
		editor.replaceNodeByKey(cell.key, newCell)
		editor.moveToEndOfNode(newCell).focus()
	})
}
