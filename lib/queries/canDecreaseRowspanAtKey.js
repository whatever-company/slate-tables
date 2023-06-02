import { getCellRowspan } from '../utils'

export default function canDrecreaseRowspanAtKey(options, editor, key) {
	try {
		const table = editor.getTableAtKey(key)

		return getCellRowspan(table.cell) > 1
	} catch (err) {
		console.error(err)
		return false
	}
}
