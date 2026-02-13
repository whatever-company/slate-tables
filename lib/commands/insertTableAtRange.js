import { createTableNode } from '../utils.js'

export default function insertTableAtRange({ blocks }, editor, range) {
	const table = createTableNode({ blocks })
	editor.insertBlockAtRange(range, table)
}
