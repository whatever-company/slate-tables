export default function setTableProperties({ blocks }, editor, properties) {
	editor.setTablePropertiesAtKey(editor.value.selection.start.key, properties)
}
