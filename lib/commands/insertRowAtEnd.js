export default function insertRowAtEnd({ blocks }, editor) {
	const table = editor.getTableAtKey(editor.value.selection.start.key)
	editor.insertRowAtKey(editor.value.selection.start.key, table.table.nodes.size)
}
