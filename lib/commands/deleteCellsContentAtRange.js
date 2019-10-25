export default function deleteCellsContentAtRange({ blocks }, editor, range) {
	if (range.isCollapsed) return

	editor.select(range)
	const { startBlock, endBlock } = editor.value

	// Special cases for the start and end
	const selectedBlocks = editor.value.blocks.filter(b => b !== startBlock && b !== endBlock)
	for (const block of selectedBlocks) {
		editor.removeNodeByKey(block.key)
	}

	editor.deleteAtRange(range.moveToRangeOfNode(startBlock).moveStartTo(range.start.offset))
	editor.deleteAtRange(range.moveToRangeOfNode(endBlock).moveEndTo(range.end.offset))
	editor.normalize()
	editor.moveToEndOfNode(endBlock)
}
