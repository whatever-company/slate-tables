import Immutable from 'immutable'

export default function setTablePropertiesAtKey({ blocks }, editor, key, properties) {
	const table = editor.value.document.getClosest(key, node => node.type === blocks.table)
	if (table) {
		// `properties` should not be deeply converted to immutable.js structures
		// Map.merge deeply converts plain objects, so we create a Map ourselves.
		editor.setNodeByKey(table.key, { data: table.data.merge(Immutable.Map(properties)) })
	}
}
