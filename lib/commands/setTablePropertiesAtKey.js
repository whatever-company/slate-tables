export default function setTablePropertiesAtKey({ blocks }, editor, key, properties) {
	const table = editor.value.document.getClosest(key, node => node.type === blocks.table)
	if (table) {
		editor.setNodeByKey(table.key, { data: Object.assign(table.data.toJS(), properties) })
	}
}
