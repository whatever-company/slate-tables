import { mergeNodeData } from '../utils.js'

export default function setTablePropertiesAtKey({ blocks }, editor, key, properties) {
	const table = editor.value.document.getClosest(key, node => node.type === blocks.table)
	if (table) {
		editor.setNodeByKey(table.key, { data: mergeNodeData(table.data, properties) })
	}
}
