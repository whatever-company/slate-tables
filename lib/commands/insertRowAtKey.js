import { createRowNode, getCellRowspan } from '../utils.js'

export default function insertRowAtKey({ blocks }, editor, key, atIndex = null) {
	const table = editor.getTableAtKey(key)
	atIndex = atIndex !== null ? atIndex : table.getRowIndex() + 1

	let exampleRow
	if (table.row === table.rows.last()) {
		exampleRow = table.row
	} else {
		exampleRow = table.table.getNextSibling(table.row.key)
	}
	const matrix = table.matrix
	const matrixRow = matrix.get(table.rows.indexOf(exampleRow))
	const cellsToAdd = matrixRow.reduce((acc, c) => (c.virtual && getCellRowspan(c.ref) > 1 ? acc : acc + 1), 0)
	const row = createRowNode({ blocks }, cellsToAdd)
	editor.withoutNormalizing(() => {
		editor.insertNodeByKey(table.table.key, atIndex, row)
	})
	editor.moveToStartOfNode(row).focus()
}
