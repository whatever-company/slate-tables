import { getCellColspan } from '../utils'

export default function canIncreaseRowspanAtKey({ blocks }, editor, key) {
	const table = editor.getTableAtKey(key)
	const { cell } = table
	const cellBelow = table.getCellBelow()
	if (!cellBelow) return false

	if (getCellColspan(cell) !== getCellColspan(cellBelow)) {
		return false
	}

	return true
}
