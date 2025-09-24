import { isKeyHotkey } from 'is-hotkey'

export default function ({ blocks }, event, editor, next) {
	const table = editor.getTableAtKey(editor.value.startBlock.key)
	const currentCell = table.cell
	const { selection } = editor.value
	let cell
	if (isKeyHotkey('up', event) && currentCell.getFirstText() === editor.value.startBlock.getFirstText()) {
		cell = table.getCellAbove()
	} else if (isKeyHotkey('down', event) && currentCell.getLastText() === editor.value.startBlock.getLastText()) {
		cell = table.getCellBelow()
	} else if (isKeyHotkey('left', event) && selection.isCollapsed && selection.start.isAtStartOfNode(currentCell)) {
		cell = table.prevCell
	} else if (isKeyHotkey('right', event) && selection.isCollapsed && selection.end.isAtEndOfNode(currentCell)) {
		cell = table.nextCell
	}

	if (cell) {
		event.preventDefault()
		editor.moveToEndOfNode(cell)
	} else {
		return next()
	}
}
