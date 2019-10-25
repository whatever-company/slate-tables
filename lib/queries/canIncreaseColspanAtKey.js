import { getCellRowspan } from '../utils'

export default function canIncreaseColspanAtKey({ blocks }, editor, key) {
	const table = editor.getTableAtKey(key)
	const { row, cell, nextCell } = table
	if (row.nodes.last() === cell) {
		return false
	}

	if (getCellRowspan(cell) !== getCellRowspan(nextCell)) {
		return false
	}

	return true
}
