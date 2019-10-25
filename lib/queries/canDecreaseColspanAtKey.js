import { getCellColspan } from '../utils'

export default function canDrecreaseColspanAtKey(options, editor, key) {
	const table = editor.getTableAtKey(key)

	return getCellColspan(table.cell) > 1
}
