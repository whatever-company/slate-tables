import { createHyperscript } from 'slate-hyperscript'

export const h = createHyperscript({
	blocks: {
		table: 'table',
		tr: 'table-row',
		td: 'table-cell',
		paragraph: 'paragraph',
		li: 'li',
		ul: 'ul'
	}
})

export default h
