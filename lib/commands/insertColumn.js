export default function insertColumn(options, editor) {
	return editor.insertColumnAtKey(editor.value.selection.start.key)
}
