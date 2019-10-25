export default function isRangeInTable(options, editor, range) {
	const { start, end } = range
	try {
		const startPosition = editor.getTableAtKey(start.key)
		const endPosition = editor.getTableAtKey(end.key)
		return startPosition.table === endPosition.table
	} catch {
		return false
	}
}
