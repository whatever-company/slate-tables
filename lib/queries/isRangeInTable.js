import { getClosestTable } from '../utils.js'

export default function isRangeInTable(options, editor, range) {
	const { document } = editor.value
	// The range is in a table only if it does not leave it: both of its ends
	// have to resolve to the same one.
	const startTable = getClosestTable(options, document, range?.start?.key)
	return Boolean(startTable) && startTable.key === getClosestTable(options, document, range?.end?.key)?.key
}
