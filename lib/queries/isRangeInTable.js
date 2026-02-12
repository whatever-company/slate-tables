export default function isRangeInTable(options, editor, range) {
	try {
		return !!editor.value.document.getClosest(
			range.start.key,
			n => n.object !== 'text' && n.type === options.blocks.table
		)
	} catch {
		return false
	}
}
