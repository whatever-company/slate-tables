import { getClosestTable } from '../utils.js'

export default function isInTableAtKey(options, editor, key) {
	return Boolean(getClosestTable(options, editor.value.document, key))
}
