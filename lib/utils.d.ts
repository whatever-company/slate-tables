export function createContentNode(options: { blocks: any }, getContent?: () => any[]): any
export function createCellNode(options: { blocks: any }): any
export function createRowNode(options: { blocks: any }, count?: number): any
export function createTableNode(options: { blocks?: any }, rowsCount?: number, columnsCount?: number): any
export function getCellColspan(cell: any): number
export function getCellRowspan(cell: any): number

export class Table {
	static create(options: any, containerNode: any, key: string): Table

	readonly table: any
	readonly row: any
	readonly cell: any
	readonly rows: any
	readonly prevCell: any
	readonly nextCell: any
	readonly matrix: any

	getCellAbove(): any
	getCellBelow(): any
	getCellCoordinates(cell: any): any
	isInCell(): boolean
	isInRow(): boolean
	isInTable(): boolean
	getWidth(row?: any): number
	getHeight(): number
	getRowIndex(): number
	getCellStartColumn(): number
	isFirstRow(): boolean
	isLastRow(): boolean
}
