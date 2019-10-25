export default function getCellAtKey({ blocks }, editor, key) {
	return editor.value.document.getClosest(key, n => n.type === blocks.cell)
}
