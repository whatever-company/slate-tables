import type { KeyboardEvent, SyntheticEvent } from 'react'
import type { NodeKey, SlateEditor, SlateNode, SlateRange, SlateSchema, Table, TableBlocks } from './utils.js'

export type {
	Coordinates,
	MatrixCell,
	NodeKey,
	SlateEditor,
	SlateNode,
	SlateRange,
	SlateSchema,
	SlateValue,
	Table,
	TableBlocks
} from './utils.js'

/** Attributes stored on a cell node. */
export interface CellProperties {
	colspan?: number
	rowspan?: number
	[property: string]: unknown
}

/** Attributes of a single column, stored on the table node under `columns`. */
export interface ColumnProperties {
	width?: number | null
	[property: string]: unknown
}

/** Attributes stored on a table node. */
export interface TableProperties {
	columns?: ColumnProperties[]
	[property: string]: unknown
}

export interface TablePluginOptions {
	/** Node types the plugin reads and writes. Those left out keep their default. */
	blocks?: Partial<TableBlocks>
	/** Whether <kbd>Enter</kbd> inserts a row instead of a paragraph in the cell */
	enterCreatesRow?: boolean
	/** Whether column widths are kept on the table node, under `columns` */
	saveColumns?: boolean
}

/** Options once the defaults have been filled in. */
export interface ResolvedTablePluginOptions {
	blocks: TableBlocks
	enterCreatesRow: boolean
	saveColumns: boolean
}

/** Commands the plugin installs on the editor. */
export interface TableCommands {
	insertTable(): void
	insertTableAtRange(range: SlateRange): void
	insertColumn(): void
	insertColumnAtKey(key: NodeKey): void
	deleteColumn(): void
	deleteColumnAtKey(key: NodeKey): void
	insertRow(): void
	insertRowAtEnd(): void
	insertRowAtKey(key: NodeKey, atIndex?: number): void
	deleteRow(): void
	deleteRowAtKey(key: NodeKey): void
	deleteTable(): void
	deleteTableAtKey(key: NodeKey): void
	deleteCellsContentAtRange(range: SlateRange): void
	increaseColspanAtKey(key: NodeKey): void
	increaseRowspanAtKey(key: NodeKey): void
	decreaseColspanAtKey(key: NodeKey): void
	decreaseRowspanAtKey(key: NodeKey): void
	setCellProperties(properties: CellProperties): void
	setCellPropertiesAtKey(key: NodeKey, properties: CellProperties): void
	setColumnProperties(properties: ColumnProperties): void
	setColumnPropertiesAtIndex(tableKey: NodeKey, index: number, properties: ColumnProperties): void
	setTableProperties(properties: TableProperties): void
	setTablePropertiesAtKey(key: NodeKey, properties: TableProperties): void
}

/** Queries the plugin installs on the editor. */
export interface TableQueries {
	/** Whether the current selection is held by a single table */
	isInTable(): boolean
	isInTableAtKey(key: NodeKey): boolean
	/** Whether both ends of the range are held by the same table */
	isRangeInTable(range: SlateRange): boolean
	/** Throws when `key` is outside of a table */
	getTableAtKey(key: NodeKey): Table
	getCellAtKey(key: NodeKey): SlateNode | null
	getRowAtKey(key: NodeKey): SlateNode | null
	canIncreaseColspanAtKey(key: NodeKey): boolean
	canIncreaseRowspanAtKey(key: NodeKey): boolean
	canDecreaseColspanAtKey(key: NodeKey): boolean
	canDecreaseRowspanAtKey(key: NodeKey): boolean
	/** `null` when the table has no `columns` data, `undefined` past the last column */
	getColumnPropertiesAtKey(key: NodeKey): ColumnProperties | null | undefined
}

/**
 * The plugin's additions to the editor. Intersect it with your own editor type:
 * `type MyEditor = Editor & TableEditor`
 */
export interface TableEditor extends TableCommands, TableQueries {}

/** Slate passes the editor as the first argument of every command and query. */
type WithEditor<T> = {
	[K in keyof T]: T[K] extends (...args: infer A) => infer R ? (editor: SlateEditor, ...args: A) => R : never
}

export type TablePluginCommands = WithEditor<TableCommands>
export type TablePluginQueries = WithEditor<TableQueries>

export interface TablePluginInstance {
	/** Not set by the factory; Slate reads it when the consumer names the plugin */
	name?: string
	options: ResolvedTablePluginOptions
	commands: TablePluginCommands
	queries: TablePluginQueries
	schema: SlateSchema
	/** Returns the normalizer to run, or nothing when the node is already valid */
	normalizeNode(node: SlateNode, editor: SlateEditor, next: () => unknown): (() => void) | unknown
	onSelect(event: SyntheticEvent, editor: SlateEditor, next: () => unknown): unknown
	onKeyDown(event: KeyboardEvent, editor: SlateEditor, next: () => unknown): unknown
}

export declare const defaultOptions: ResolvedTablePluginOptions

export default function TablePlugin(options?: TablePluginOptions): TablePluginInstance
