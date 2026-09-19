import { getCellColspan, createCellNode } from '../utils.js'

export default function decreaseColspanAtKey({ blocks }, editor, key) {
	if (!editor.canDecreaseColspanAtKey(key)) return

	const table = editor.getTableAtKey(key)
	const { cell } = table
	editor.withoutNormalizing(() => {
		editor.setNodeByKey(cell.key, {
			data: cell.data.set('colspan', getCellColspan(cell) - 1)
		})

		// The rightmost column of the cell is freed, on each of the rows it spans
		const coords = table.getCellCoordinates(cell)
		const freedColumn = coords.map(coord => coord.x).max()

		for (const coord of coords.filter(coord => coord.x === freedColumn)) {
			const row = table.rows.get(coord.y)
			editor.insertNodeByKey(row.key, table.getCellInsertIndex(coord.y, freedColumn), createCellNode({ blocks }))
		}
	})
}
