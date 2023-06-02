import { getCellRowspan, getCellColspan, createCellNode } from '../utils'

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
		const cellBelow = table.matrix.has(lastCoord + 1) ? table.matrix.get(lastCoord + 1).get(lastCoord.x) : null
		let colspan = getCellColspan(cell)

		if (cellBelow) {
			const parent = editor.value.document.getParent(cellBelow)
			while (colspan-- >= 1) {
				editor.insertNodeByKey(parent.key, parent.nodes.indexOf(cellBelow), createCellNode({ blocks }))
			}
		} else {
			const parent = table.rows.last()
			while (colspan-- >= 1) {
				editor.insertNodeByKey(parent.key, 0, createCellNode({ blocks }))
			}
		}
	})
}
