/**
 * Slate 0.47 ships no type definitions of its own, so the values that come from
 * it are named here rather than described. They stay `any` on purpose: consumers
 * who install `@types/slate` hold the real `Block`, `Editor` and `Range`, and a
 * structural stand-in would not be assignable to those — an interface satisfies
 * neither their members nor their index signatures. Naming them keeps the intent
 * readable and leaves one place to point at the real types.
 */
export type NodeKey = string

/** A Slate node — `Block`, `Inline`, `Text` or `Document` */
export type SlateNode = any
/** A Slate `Range` or `Selection` */
export type SlateRange = any
export type SlateValue = any
/** A Slate editor with the plugin's commands and queries installed */
export type SlateEditor = any
export type SlateSchema = any

/** Node types the plugin reads and writes. See `defaultOptions`. */
export interface TableBlocks {
	table: string
	row: string
	cell: string
	content: string
}

export interface BlockOptions {
	blocks: TableBlocks
}

export function createContentNode(options: BlockOptions, getContent?: () => SlateNode[]): SlateNode
export function createCellNode(options: BlockOptions): SlateNode
export function createRowNode(options: BlockOptions, count?: number): SlateNode
export function createTableNode(options: BlockOptions, rowsCount?: number, columnsCount?: number): SlateNode
export function getClosestTable(options: BlockOptions, document: SlateNode, key: NodeKey): SlateNode | null
export function getCellColspan(cell: SlateNode): number
export function getCellRowspan(cell: SlateNode): number

/** Position of a cell in the table matrix. */
export interface Coordinates {
	x: number
	y: number
}

/**
 * One slot of the table matrix. `virtual` marks a slot a cell occupies through
 * its colspan or rowspan rather than by starting there.
 */
export interface MatrixCell {
	virtual: boolean
	ref: SlateNode
}

/**
 * A table resolved around a given node, with the grid of its cells.
 * The `table`, `row` and `cell` getters throw when the node is outside of one.
 */
export class Table {
	static create(options: BlockOptions, containerNode: SlateNode, key: NodeKey): Table

	readonly table: SlateNode
	readonly row: SlateNode
	readonly cell: SlateNode
	/** `Immutable.List` of the table rows */
	readonly rows: any
	/** Falsy on the first cell of the table */
	readonly prevCell: SlateNode | null | undefined
	/** Falsy on the last cell of the table */
	readonly nextCell: SlateNode | null | undefined
	/** `Immutable.List<Immutable.List<MatrixCell>>`, indexed by row then column */
	readonly matrix: any

	getCellAbove(): SlateNode | null | undefined
	getCellBelow(): SlateNode | null | undefined
	/** `Immutable.List<Coordinates>` of every slot the cell occupies */
	getCellCoordinates(cell: SlateNode): any
	getCellInsertIndex(rowIndex: number, column: number): number
	isInCell(): boolean
	isInRow(): boolean
	isInTable(): boolean
	/** Number of columns, of `row` when given, of the first row otherwise */
	getWidth(row?: SlateNode): number
	getHeight(): number
	getRowIndex(): number
	getCellStartColumn(): number
	isFirstRow(): boolean
	isLastRow(): boolean
}
