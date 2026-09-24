import { createRowNode, getCellRowspan } from './utils.js'

function setRowspan(editor, cell, rowspan) {
	const data = rowspan === 1 ? cell.data.delete('rowspan') : cell.data.set('rowspan', rowspan)
	editor.setNodeByKey(cell.key, { data })
}

/** Cells spanning from the row above `rowIndex` into the row at `rowIndex` */
function getCellsSpanningAcross(table, rowIndex) {
	const above = table.matrix[rowIndex - 1] ?? []
	const below = table.matrix[rowIndex] ?? []
	return new Set(below.filter((slot, column) => slot && above[column]?.ref === slot.ref).map(slot => slot.ref))
}

/**
 * Insert a row at `rowIndex` of `table` and return it. The cells spanning across
 * that position grow by one row; the new row gets a cell for every other column.
 */
export function insertRowKeepingSpans(editor, { blocks }, table, rowIndex) {
	const spanning = getCellsSpanningAcross(table, rowIndex)
	const width = Math.max(...table.matrix.map(row => row.length))
	const coveredColumns = (table.matrix[rowIndex] ?? []).filter(slot => slot && spanning.has(slot.ref)).length
	const row = createRowNode({ blocks }, width - coveredColumns)

	editor.withoutNormalizing(() => {
		editor.insertNodeByKey(table.table.key, rowIndex, row)
		for (const cell of spanning) {
			setRowspan(editor, cell, getCellRowspan(cell) + 1)
		}
	})
	return row
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
