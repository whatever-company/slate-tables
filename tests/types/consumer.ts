/**
 * Type-level tests standing in for a consumer that holds the real `@types/slate`
 * definitions, checked by `pnpm typecheck`.
 *
 * Nothing the declarations hand back may be a type of our own: a consumer assigns
 * it to a Slate `Block`, and a structural stand-in satisfies neither the members
 * of a real `Block` nor its index signature. Keep the Slate aliases in
 * `lib/utils.d.ts` as `any`, and these stay green.
 */
import TablePlugin from '../../lib/index.js'
import { createCellNode, createTableNode, getCellColspan, getClosestTable } from '../../lib/utils.js'

/** A trimmed `@types/slate` Block: enough members to catch a stand-in type */
interface Block {
	object: 'block'
	key: string
	type: string
	text: string
	data: unknown
	toJSON(): unknown
	toJS(): unknown
	set(key: string, value: unknown): Block
}
interface Editor {
	value: { document: Block; selection: unknown }
}
interface Tool {
	createBlock?: (editor: Editor) => Block
}

const plugin = TablePlugin({ saveColumns: true })
declare const editor: Editor
declare const block: Block

// A created node is handed straight to Slate, so it has to pass as a Block
const _tool: Tool = {
	createBlock: () => createTableNode(plugin.options)
}
const _table: Block = createTableNode(plugin.options)
const _cell: Block = createCellNode(plugin.options)

// And a real Block has to be accepted back as an argument
const _colspan: number = getCellColspan(block)
const _closest: Block | null = getClosestTable(plugin.options, editor.value.document, block.key)
