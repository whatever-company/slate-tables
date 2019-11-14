export default function setCellPropertiesAtKey({ blocks }, editor, key, properties) {
	const node = editor.value.document.getNode(key)
	const cell =
		node.type === blocks.cell ? node : editor.value.document.getClosest(key, node => node.type === blocks.cell)
	if (cell) {
		editor.setNodeByKey(cell.key, {
			data: cell.data.merge(properties)
		})
	}
}
