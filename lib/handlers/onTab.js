import { isKeyHotkey } from 'is-hotkey'

export default function({ blocks }, event, editor, next) {
	if (!editor.value.selection.isCollapsed) return next()

	const table = editor.getTableAtKey(editor.value.startBlock.key)

	event.preventDefault()

	if (isKeyHotkey('shift+tab', event)) {
		const prevCell = table.prevCell
		if (!prevCell) return next()
		editor.moveToEndOfNode(prevCell)
	} else {
		const nextCell = table.nextCell
		if (!nextCell) return next()
		editor.moveToEndOfNode(nextCell)
	}
}
