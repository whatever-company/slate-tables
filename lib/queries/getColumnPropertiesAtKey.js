export default function getColumnPropertiesAtKey({ blocks, saveColumns }, editor, key) {
	const table = editor.getTableAtKey(key)

	const index = table.getCellStartColumn()
	const columns = table.table.data.get('columns')
	return columns ? columns[index] : null
}
