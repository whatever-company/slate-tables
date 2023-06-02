export default function isRangeInTable(options, editor, range) {
	try {
		return editor.value.document.getFurthestBlock(range.start.key)?.type === options.blocks.table
	} catch {
		return false
	}
}
