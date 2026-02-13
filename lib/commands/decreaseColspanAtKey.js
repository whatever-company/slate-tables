import { getCellColspan, createCellNode } from '../utils.js'

export default function decreaseColspanAtKey({ blocks }, editor, key) {
	if (!editor.canDecreaseColspanAtKey(key)) return

	const table = editor.getTableAtKey(key)
	const { cell } = table
	editor.withoutNormalizing(() => {
		editor.setNodeByKey(cell.key, {
			data: cell.data.set('colspan', getCellColspan(cell) - 1)
		})

		let coords = table.getCellCoordinates(cell)
		const firstCoord = coords.first()
		coords = coords.rest()

		const lastCellsOnEveryRow = coords
			.filter(coord => coord.x !== firstCoord.x)
			.groupBy(coord => coord.y)
			.valueSeq()
			.map(rowPositions => rowPositions.last())

		const { matrix } = table
		for (const lastCoord of lastCellsOnEveryRow) {
			if (matrix.get(lastCoord.y).has(lastCoord.x + 1)) {
				const nextCell = matrix.get(lastCoord.y).get(lastCoord.x + 1)
				const parent = editor.value.document.getParent(nextCell.ref.key)
				editor.insertNodeByKey(parent.key, parent.nodes.indexOf(nextCell), createCellNode({ blocks }))
			} else {
				const parent = table.rows.get(lastCoord.y)
				editor.insertNodeByKey(parent.key, parent.nodes.size, createCellNode({ blocks }))
			}
		}
	})
}
