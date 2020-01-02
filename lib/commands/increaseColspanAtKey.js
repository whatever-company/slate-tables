import { getCellColspan } from '../utils'

export default function increaseColspanAtKey({ blocks }, editor, key) {
	const table = editor.getTableAtKey(key)

	if (!editor.canIncreaseColspanAtKey(key)) {
		return
	}

	const cell = table.cell
	const nextCell = table.nextCell

	editor.withoutNormalizing(() => {
		editor.removeNodeByKey(nextCell.key)
		const newCell = cell.regenerateKey().merge({
			data: cell.data.set('colspan', getCellColspan(cell) + getCellColspan(nextCell)),
			nodes: cell.nodes.concat(nextCell.nodes)
		})
		editor.replaceNodeByKey(cell.key, newCell)
		editor.moveToEndOfNode(newCell).focus()
	})
}
