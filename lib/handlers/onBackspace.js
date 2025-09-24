export default function ({ blocks }, event, editor, next) {
	const table = editor.getTableAtKey(editor.value.startBlock.key)
	const { selection, startBlock, endBlock } = editor.value
	const cell = table.cell

	// Do nothing when the user is at the start of a cell
	if (selection.isCollapsed && selection.start.isAtStartOfNode(cell)) {
		return
	}

	// Fallback to default behaviour when deleting inside a cell
	if (startBlock === endBlock) {
		return next()
	}

	event.preventDefault()
	editor.deleteCellsContentAtRange(selection)
}
