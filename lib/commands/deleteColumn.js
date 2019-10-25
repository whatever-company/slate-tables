export default function deleteColumn({ blocks }, editor) {
	return editor.deleteColumnAtKey(editor.value.selection.start.key)
}
