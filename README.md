# slate-tables

A Slate plugin to handle table edition.

Demo: [https://whatever-company.github.io/slate-tables/](whatever-company.github.io/slate-tables)

![Build Status](https://github.com/whatever-company/slate-tables/workflows/CI/badge.svg)

## Install

```
npm install slate-tables
```

## Features

- Pressing <kbd>Up</kbd>/<kbd>Down</kbd> moves the cursor to the row above/below
- Pressing <kbd>Left</kbd>/<kbd>Right</kbd> moves the cursor to the cell before/after
- Pressing <kbd>Enter</kbd> inserts a new row (if enabled)
- Pressing <kbd>Tab</kbd> moves the cursor to the next cell and creats a new row
- Pressing <kbd>Shift+Tab</kdb> moves the cursor to the previous cell

### Nested tables

The plugin supports nested tables natively.

### colspan & rowspan

Colspan and Rowspan are supported. All operations create a matrix containing all cells' positions.

### Copy/Paste behavior

Nothing is done to support copy/paste in this plugin. You have to implement it in you codebase.

## Simple Usage

```js
import TablePlugin from 'slate-tables'

const tablePlugin = TablePlugin({
	saveColumns: false,
	enterCreatesRow: true,
	blocks: {
		table: 'table',
		row: 'table-row',
		cell: 'table-cell',
		content: 'paragraph'
	}
})

const plugins = [tablePlugin]
```

## Data structure

Here is what your Slate document containing tables should look like:

```jsx
<value>
	<document>
		<paragraph>Some text</paragraph>

		<table>
			<table-row>
				<table-cell colspan="2">
					<paragraph>Any block can goes into cells</paragraph>
				</table-cell>
			</table-row>

			<table-row>
				<table-cell>
					<paragraph>Second row</paragraph>
				</table-cell>

				<table-cell>
					<paragraph>Second row</paragraph>
				</table-cell>
			</table-row>
		</table>
	</document>
</value>
```

## `Options`

Option object you can pass to the plugin.

| prop              | type    | default    | desc                                                                                                                         |
| ----------------- | ------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| saveColumns       | boolean | false      | when enabled, it will save the columns in an array of object in the table node's data (useful to render a `<colgroup/>` tag) |
| enterCreatesRow   | boolean | false      | Add the support of the creation of a new row when user press `enter`                                                         |
| blocks -> table   | string  | table      | Node name for the `<table />`                                                                                                |
| blocks -> row     | string  | table-row  | Node name for the `<tr />`                                                                                                   |
| blocks -> cell    | string  | table-cell | Node name for the `<td />`                                                                                                   |
| blocks -> content | string  | paragraph  | Node name for the default child of a cell                                                                                    |

## `TablePlugin`

### `TablePlugin(options: Options) => Instance`

Constructs an instance of the table plugin, for the given options. You can then add this instance to the list of plugins passed to Slate.

## Commands

### `editor.insertTable()`

Creates a table at current selection.

### `editor.insertTableAtRange(range: Range)`

Creates a table at the given range.

### `editor.insertRow()`

Creates a row at the current start block.

### `editor.insertRowAtKey(key: string, atIndex: number)`

Creates a row after the focused one inside the table at `key`. If `atIndex` is given, it will insert the new row at this index.

### `editor.insertRowAtEnd()`

Creates a row at the end of the focused table (start of the selection must be in a table)

### `editor.insertColumn()`

Creates a column after the focused one. This will alter all row nodes to add a cell.

### `editor.insertColumnAtKey(key: string)`

Creates a column after the row found at `key`. This will alter all row nodes to add a cell.

### `editor.deleteColumn()`

Delete the focused column. This will alter all row nodes to remove a cell.

### `editor.deleteColumnAtKey(key: string)`

Delete the column at `key`. This will alter all row nodes to remove a cell.

### `editor.deleteTable()`

Deletes the focused table.

### `editor.deleteTableAtKey(key: string)`

Deletes the focused at `key`.

### `editor.deleteRow()`

Deletes focused row.

### `editor.deleteRowAtKey(key: string)`

Deletes the row at `key`.

### `editor.deleteCellsContentAtRange(range: Range)`

Deletes content in cells found in `range`. It's necessary to use this instead of `editor.deleteAtRange` to not delete row & cell nodes.

### `editor.setCellProperties`

Merges `properties` in focused cell's data.

### `editor.setCellPropertiesAtKey(key: string, properties: Object)`

Merges `properties` in cell's data.

### `editor.setColumnProperties(properties: Object)`

It will merges `properties` with the current column's data (stored in `table.data.columns`)

### `editor.setColumnPropertiesAtIndex(tableKey: string, index: number, properties: Object)`

Merges column's data with `properties` at given `index`.

### `editor.setTableProperties(properties: Object)`

Merges `properties` with table's data at current selection.

### `editor.setTablePropertiesAtKey(key: string, properties: Object)`

Merges `properties` with table's data at `key`.

### `editor.increaseRowspanAtKey`

Increases the rowspan of the cell at `key`.

### `editor.increaseColspanAtKey`

Increases the colspan of the cell at `key`.

### `editor.decreaseRowspanAtKey`

Decreases the rowspan of the cel at `key`.

### `editor.decreaseColspanAtKey`

Decreases the colspan of the cel at `key`.

## Queries

### `editor.isInTable()`

Returns true if `selection.start` or `selection.end` is in a table node.

### `editor.isRangeInTable(range: Range)`

Returns true if `range.start` or `range.end` is in a table node.

### `editor.getTableAtKey(key: string)`

Returns a `Table` object for the table at `key`. This object contains helpers to access sibling cells, rows, columns.

### `editor.getCellAtKey(key: string)`

Returns the cell at `key`.

### `editor.getRowAtKey(key: string)`

Returns the row at `key`.

### `editor.canIncreaseColspanAtKey(key: string)`

Returns true if the cell at `key` can have a colspan increased by one.

### `editor.canIncreaseRowspanAtKey(key: string)`

Returns true if the cell at `key` can have a rowspan increased by one.

### `editor.canDecreaseColspanAtKey(key: string)`

Returns true if the cell at `key` can have a colspan decreased by one.

### `editor.canDecreaseRowspanAtKey(key: string)`

Returns true if the cell at `key` can have a rowspan decreased by one.

### `editor.getColumnPropertiesAtKey(key: string)`

Returns properties of the table at `key`
