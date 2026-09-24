import { getCellRowspan } from '../utils.js'
import { removeRowKeepingSpans } from '../rows.js'

/**
 * Merge the cell below into the cell at `key`. When that cell was the only one of
 * its row, the row is left empty and removed, spans crossing it shrinking with it.
 */
export default function increaseRowspanAtKey({ blocks }, editor, key) {
	const table = editor.getTableAtKey(key)

	if (!editor.canIncreaseRowspanAtKey(key)) {
		return
	}

	const { cell } = table
	const cellBelow = table.getCellBelow()
	const rowBelow = editor.value.document.getParent(cellBelow.key)
	const rowBelowIndex = table.rows.indexOf(rowBelow)

	editor.withoutNormalizing(() => {
		editor.setNodeByKey(cell.key, {
			data: cell.data.set('rowspan', getCellRowspan(cell) + getCellRowspan(cellBelow))
		})
		cellBelow.nodes.forEach((node, i) => editor.moveNodeByKey(node.key, cell.key, cell.nodes.size + i))
		editor.removeNodeByKey(cellBelow.key)

		if (rowBelow.nodes.size === 1) {
			// The table is re-read so that its matrix no longer holds the removed cell
			removeRowKeepingSpans(editor, editor.getTableAtKey(cell.key), rowBelowIndex)
		}
	})

	editor.moveToEndOfNode(editor.value.document.getNode(cell.key)).focus()
}
