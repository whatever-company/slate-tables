import createCommands from './create-commands'
import createQueries from './create-queries'
import { isKeyHotkey } from 'is-hotkey'
import { onTab, onEnter, onArrow, onBackspace } from './handlers'
import { createSchema, createNormalizeNode } from './validation'

export const defaultOptions = {
	blocks: {
		table: 'table',
		row: 'table-row',
		cell: 'table-cell',
		content: 'paragraph'
	},
	enterCreatesRow: false,
	saveColumns: false
}

function TablePlugin(options = {}) {
	options = {
		...defaultOptions,
		...options
	}
	return {
		options,
		commands: createCommands(options),
		queries: createQueries(options),
		schema: createSchema(options),
		normalizeNode: createNormalizeNode(options),
		onKeyDown: (event, editor, next) => {
			if (!editor.isInTable()) return next()

			if (isKeyHotkey('tab', event) || isKeyHotkey('shift+tab', event)) {
				return onTab(options, event, editor, next)
			} else if (options.enterCreatesRow && isKeyHotkey('enter', event)) {
				return onEnter(options, event, editor, next)
			} else if (
				isKeyHotkey('up', event) ||
				isKeyHotkey('down', event) ||
				isKeyHotkey('left', event) ||
				isKeyHotkey('right', event)
			) {
				return onArrow(options, event, editor, next)
			} else if (isKeyHotkey('backspace', event)) {
				return onBackspace(options, event, editor, next)
			}
			return next()
		}
	}
}

export default TablePlugin
