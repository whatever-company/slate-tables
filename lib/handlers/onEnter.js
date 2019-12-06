export default function onEnter({ blocks }, event, editor, next) {
	const table = editor.getTableAtKey(editor.value.startBlock.key)
	event.preventDefault()
	editor.insertRowAtKey(table.row.key)
}
