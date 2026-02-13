import Immutable from 'immutable'

export default function setCellPropertiesAtKey({ blocks }, editor, key, properties) {
	const node = editor.value.document.getNode(key)
	const cell =
		node.type === blocks.cell ? node : editor.value.document.getClosest(key, node => node.type === blocks.cell)
	if (cell) {
		// `properties` should not be deeply converted to immutable.js structures
		// Map.merge deeply converts plain objects, so we create a Map ourselves.
		editor.setNodeByKey(cell.key, {
			data: cell.data.merge(Immutable.Map(properties))
		})
	}
}
