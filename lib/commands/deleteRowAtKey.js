export default function deleteRowAtKey({ blocks }, editor, key) {
	const table = editor.getTableAtKey(key)
	if (table.rows.size === 1) {
		return editor.removeNodeByKey(table.table.key)
	}
	editor.removeNodeByKey(table.row.key)
	editor.normalize()
	editor.moveToStartOfNode(table.table.nodes.indexOf(table.row))
}
