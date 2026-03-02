import { getCellRowspan, getCellColspan, createCellNode } from '../utils.js'

export default function decreaseRowspanAtKey({ blocks }, editor, key) {
	if (!editor.canDecreaseRowspanAtKey(key)) return

	const table = editor.getTableAtKey(key)
	const { cell } = table
	editor.withoutNormalizing(() => {
		editor.setNodeByKey(cell.key, {
			data: cell.data.set('rowspan', getCellRowspan(cell) - 1)
		})
		const coords = table.getCellCoordinates(cell)
		const lastCoord = coords.maxBy(c => c.y)

		// The freed row is the last virtual row of the cell
		const freedRowIndex = lastCoord.y
		const freedRow = table.rows.get(freedRowIndex)

		// Calculate insertion index by counting non-virtual cells before our column
		let insertIndex = 0
		const matrixRow = table.matrix.get(freedRowIndex)
		if (matrixRow) {
			for (let x = 0; x < lastCoord.x; x++) {
				const mc = matrixRow.get(x)
				if (mc && !mc.virtual) {
					insertIndex++
				}
			}
		}

		if (freedRow) {
			let c = getCellColspan(cell)
			while (c-- >= 1) {
				editor.insertNodeByKey(freedRow.key, insertIndex, createCellNode({ blocks }))
			}
		}
	})
}
