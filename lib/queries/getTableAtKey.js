import { Table } from '../utils.js'

export default function getTableAtKey(options, editor, key) {
	return Table.create(options, editor.value.document, key)
}
