export default function setColumnPropertiesAtIndex({ blocks, saveColumns }, editor, tableKey, index, properties) {
	if (!saveColumns) {
		console.warn('`saveColumns` is not enabled')
		return
	}
	const table = editor.value.document.getNode(tableKey)
	if (table.type !== blocks.table) {
		console.warn(`${tableKey} is not a table.`)
		return
	}

	const columns = table.data.get('columns')
	if (columns.length <= index) {
		console.warn('Index is outside of columns boundaries')
		return
	}
	columns[index] = { ...columns[index], ...properties }
	editor.setNodeByKey(tableKey, {
		data: table.data.set('columns', columns)
	})
}
