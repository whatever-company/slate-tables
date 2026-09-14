export default function deleteRowAtKey({ blocks }, editor, key) {
	const table = editor.getTableAtKey(key)
	if (table.rows.size === 1) {
		return editor.removeNodeByKey(table.table.key)
	}

	const deletedRowIndex = table.rows.indexOf(table.row)
	editor.removeNodeByKey(table.row.key)
	editor.normalize()

	// `table` is stale once the row is gone, so re-read the rows from the document
	const remainingRows = editor.value.document.getDescendant(table.table.key).nodes
	const rowTakingItsPlace = remainingRows.get(Math.min(deletedRowIndex, remainingRows.size - 1))
	editor.moveToStartOfNode(rowTakingItsPlace).focus()
}
