export default function setColumnProperties({ blocks }, editor, properties) {
	const table = editor.getTableAtKey(editor.value.selection.start.key)
	const index = table.getCellStartColumn()
	return editor.setColumnPropertiesAtIndex(table.table.key, index, properties)
}
