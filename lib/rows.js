import { getCellRowspan } from './utils.js'

function setRowspan(editor, cell, rowspan) {
	const data = rowspan === 1 ? cell.data.delete('rowspan') : cell.data.set('rowspan', rowspan)
	editor.setNodeByKey(cell.key, { data })
}

/**
 * Remove the row at `rowIndex` of `table`, keeping the cells that span across it
 * consistent: a cell spanning into it from above loses one row, a cell it owns that
 * spans below moves down to the next row, one row shorter.
 */
export function removeRowKeepingSpans(editor, table, rowIndex) {
	const row = table.rows.get(rowIndex)
	const nextRow = table.rows.get(rowIndex + 1)
	const handled = new Set()
	let movedCount = 0

	editor.withoutNormalizing(() => {
		table.matrix[rowIndex].forEach((slot, column) => {
			const cell = slot?.ref
			if (!cell || handled.has(cell)) return
			handled.add(cell)

			const rowspan = getCellRowspan(cell)
			if (rowspan === 1) return
			setRowspan(editor, cell, rowspan - 1)

			if (nextRow && row.nodes.includes(cell)) {
				// Cells already moved sit before this one in `nextRow`, shifting its index
				const index = table.getCellInsertIndex(rowIndex + 1, column) + movedCount
				editor.moveNodeByKey(cell.key, nextRow.key, index)
				movedCount++
			}
		})
		editor.removeNodeByKey(row.key)
	})
}
