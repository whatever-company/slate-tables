export default function setCellPropertiesAtKey({ blocks }, editor, key, properties) {
	const cell = editor.value.document.getClosest(key, node => node.type === blocks.cell)
	if (cell) {
		editor.setNodeByKey(cell.key, {
			data: cell.data.merge(properties)
		})
	}
}
