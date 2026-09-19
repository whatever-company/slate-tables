/**
 * Type-level tests for the hand-written declarations in `lib/*.d.ts`.
 *
 * They are checked by `pnpm typecheck`, never run. Their job is to fail when the
 * declarations drift from the implementation: the parity checks below compare the
 * declared command and query names against the ones the plugin really installs,
 * and every `@ts-expect-error` fails the build if the type stops rejecting its line.
 */
import type createCommands from '../../lib/create-commands.js'
import type createQueries from '../../lib/create-queries.js'
import TablePlugin, { defaultOptions } from '../../lib/index.js'
import type { ColumnProperties, TableCommands, TableEditor, TableQueries } from '../../lib/index.js'
import { createTableNode } from '../../lib/utils.js'

type Expect<T extends true> = T
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false

// Every command and query installed at runtime is declared, and vice versa
type _CommandNamesMatch = Expect<Equal<keyof ReturnType<typeof createCommands>, keyof TableCommands>>
type _QueryNamesMatch = Expect<Equal<keyof ReturnType<typeof createQueries>, keyof TableQueries>>

const plugin = TablePlugin({ enterCreatesRow: true, saveColumns: true })
const _cellType: string = plugin.options.blocks.cell
const _saveColumns: boolean = defaultOptions.saveColumns
const _instance = TablePlugin()
// Consumers name their plugin instance
plugin.name = 'tables'
// The resolved options carry every block type, so they feed the node factories
const _table = createTableNode(plugin.options)

declare const editor: TableEditor

// Commands are called on the editor, without passing it
editor.insertTable()
editor.insertColumnAtKey('cell-key')
editor.insertRowAtKey('cell-key')
editor.insertRowAtKey('cell-key', 2)
editor.setCellPropertiesAtKey('cell-key', { colspan: 2, rowspan: 1 })
editor.setColumnPropertiesAtIndex('table-key', 1, { width: 40 })
// Properties stay open-ended: callers store their own attributes
editor.setColumnProperties({ width: null, sticky: true })

const _canMerge: boolean = editor.canIncreaseColspanAtKey('cell-key')
const _columns: ColumnProperties | null | undefined = editor.getColumnPropertiesAtKey('cell-key')

const table = editor.getTableAtKey('cell-key')
const _width: number = table.getWidth()
const _insertIndex: number = table.getCellInsertIndex(0, 2)
const _colspan = table.cell.data.get('colspan')
if (table.nextCell) {
	const _key: string = table.nextCell.key
}

// Slate injects the editor into the plugin's own command and query objects
declare const slateEditor: TableEditor & { value: never }
plugin.commands.insertColumnAtKey(slateEditor, 'cell-key')
const _inTable: boolean = plugin.queries.isInTable(slateEditor)

// @ts-expect-error the table key is required, it used to be missing from the declaration
editor.setColumnPropertiesAtIndex(1, { width: 40 })
// @ts-expect-error the editor is not passed to an editor-facing command
editor.insertColumnAtKey(editor, 'cell-key')
// @ts-expect-error a colspan is a number
editor.setCellPropertiesAtKey('cell-key', { colspan: 'two' })
// @ts-expect-error a query result is not a node key
const _notAKey: string = editor.isInTable()
// @ts-expect-error the column may be missing, it has to be checked first
const _unchecked: number | null | undefined = editor.getColumnPropertiesAtKey('cell-key').width
// Overriding one block type is allowed, and the resolved options still hold all of them
const _partial: string = TablePlugin({ blocks: { table: 'my-table' } }).options.blocks.row
