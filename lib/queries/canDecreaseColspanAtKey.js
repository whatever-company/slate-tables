import { getCellColspan } from '../utils.js'

export default function canDrecreaseColspanAtKey(options, editor, key) {
	try {
		const table = editor.getTableAtKey(key)

		return getCellColspan(table.cell) > 1
	} catch (err) {
		console.error(err)
		return false
	}
}
