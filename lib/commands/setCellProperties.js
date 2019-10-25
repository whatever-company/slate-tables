export default function setCellProperties({ blocks }, editor, properties) {
	return editor.setCellPropertiesAtKey(editor.value.selection.start.key, properties)
}
