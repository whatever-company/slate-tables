export default function insertRow({ blocks }, editor) {
	return editor.insertRowAtKey(editor.value.selection.start.key)
}
