import { createRowNode } from '../utils'

export default function onEnter({ blocks }, event, editor, next) {
	const table = editor.getTableAtKey(editor.value.startBlock.key)
	// const newRow = createRowNode({ blocks })
	editor.insertRowAtKey(table.row.key)
	// editor.insertNodeByKey(table.table.key, table.table.nodes.indexOf(table.row) + 1, newRow)
	// editor.moveToRangeOfNode(newRow)
}
