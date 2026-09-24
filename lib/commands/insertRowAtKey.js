import { insertRowKeepingSpans } from '../rows.js'

export default function insertRowAtKey({ blocks }, editor, key, atIndex = null) {
	const table = editor.getTableAtKey(key)
	const rowIndex = atIndex ?? table.getRowIndex() + 1
	const row = insertRowKeepingSpans(editor, { blocks }, table, rowIndex)
	// The row has no cell of its own when spans cover every column
	if (row.nodes.size > 0) {
		editor.moveToStartOfNode(row).focus()
	}
}
