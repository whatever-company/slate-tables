import type { KeyboardEvent } from 'react'

export interface TablePluginOptions {
	blocks?: {
		table?: string
		row?: string
		cell?: string
		content?: string
	}
	enterCreatesRow?: boolean
	saveColumns?: boolean
}

export interface TablePluginCommands {
	insertTable(editor: any): void
	insertTableAtRange(editor: any, range: any): void
	insertColumn(editor: any): void
	insertColumnAtKey(editor: any, key: string): void
	deleteColumn(editor: any): void
	deleteColumnAtKey(editor: any, key: string): void
	insertRow(editor: any): void
	insertRowAtEnd(editor: any): void
	insertRowAtKey(editor: any, key: string, atIndex?: number): void
	deleteRowAtKey(editor: any, key: string): void
	deleteRow(editor: any): void
	deleteTable(editor: any): void
	deleteTableAtKey(editor: any, key: string): void
	deleteCellsContentAtRange(editor: any, range: any): void
	increaseColspanAtKey(editor: any, key: string): void
	increaseRowspanAtKey(editor: any, key: string): void
	decreaseColspanAtKey(editor: any, key: string): void
	decreaseRowspanAtKey(editor: any, key: string): void
	setCellProperties(editor: any, properties: any): void
	setCellPropertiesAtKey(editor: any, key: string, properties: any): void
	setColumnProperties(editor: any, properties: any): void
	setColumnPropertiesAtIndex(editor: any, index: number, properties: any): void
	setTableProperties(editor: any, properties: any): void
	setTablePropertiesAtKey(editor: any, key: string, properties: any): void
}

export interface TablePluginQueries {
	isInTable(editor: any): boolean
	isRangeInTable(editor: any, range: any): boolean
	getTableAtKey(editor: any, key: string): any
	getCellAtKey(editor: any, key: string): any
	getRowAtKey(editor: any, key: string): any
	canIncreaseColspanAtKey(editor: any, key: string): boolean
	canIncreaseRowspanAtKey(editor: any, key: string): boolean
	canDecreaseColspanAtKey(editor: any, key: string): boolean
	canDecreaseRowspanAtKey(editor: any, key: string): boolean
	getColumnPropertiesAtKey(editor: any, key: string): any
}

export interface TablePluginInstance {
	options: Required<TablePluginOptions>
	commands: TablePluginCommands
	queries: TablePluginQueries
	schema: any
	normalizeNode: any
	onKeyDown(event: KeyboardEvent, editor: any, next: () => any): any
	name?: string
}

export declare const defaultOptions: Required<TablePluginOptions>

export default function TablePlugin(options?: TablePluginOptions): TablePluginInstance
