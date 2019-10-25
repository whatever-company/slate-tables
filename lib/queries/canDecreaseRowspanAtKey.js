import { getCellRowspan } from '../utils'

export default function canDrecreaseRowspanAtKey(options, editor, key) {
	const table = editor.getTableAtKey(key)

	return getCellRowspan(table.cell) > 1
}
