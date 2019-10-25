export default function deleteRow({ blocks }, editor) {
	return editor.deleteRowAtKey(editor.value.selection.start.key)
}
