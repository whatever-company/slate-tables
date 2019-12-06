import { isKeyHotkey } from 'is-hotkey'

export default function({ blocks }, event, editor, next) {
	if (!editor.value.selection.isCollapsed) return next()
	const cellKey = editor.value.startBlock.key
	const table = editor.getTableAtKey(cellKey)
	event.preventDefault()

	if (isKeyHotkey('shift+tab', event)) {
		if (table.prevCell) {
			editor.moveToEndOfNode(table.prevCell)
		} else {
			editor.insertRowAtKey(table.cell.key, 0)
		}
	} else if (table.nextCell) {
		editor.moveToEndOfNode(table.nextCell)
	} else {
		editor.insertRow()
	}
}
