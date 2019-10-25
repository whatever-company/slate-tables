export default function insertTable(options, editor) {
	return editor.insertTableAtRange(editor.value.selection)
}
