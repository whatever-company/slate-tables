export default function deleteTable({ blocks }, editor) {
	return editor.deleteTableAtKey(editor.value.selection.start.key)
}
