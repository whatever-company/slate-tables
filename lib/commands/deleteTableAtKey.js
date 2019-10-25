export default function defaultTableAtKey({ blocks }, editor, key) {
	const table = editor.getTableAtKey(key)
	return editor.removeNodeByKey(table.table.key)
}
