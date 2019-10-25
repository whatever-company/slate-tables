import { isKeyHotkey } from 'is-hotkey'

export default function({ blocks }, event, editor, next) {
	const table = editor.getTableAtKey(editor.value.startBlock.key)
	event.preventDefault()
	const currentCell = table.cell
	const { selection } = editor.value
	let cell

	if (isKeyHotkey('up', event)) {
		cell = table.getCellAbove()
	} else if (isKeyHotkey('down', event)) {
		cell = table.getCellBelow()
	} else if (isKeyHotkey('left', event) && selection.isCollapsed && selection.start.isAtStartOfNode(currentCell)) {
		cell = table.prevCell
	} else if (isKeyHotkey('right', event) && selection.isCollapsed && selection.end.isAtEndOfNode(currentCell)) {
		cell = table.nextCell
	}

	if (cell) {
		editor.moveToEndOfNode(cell)
	} else {
		return next()
	}
}
