/** @jsx h */

import { h } from 'testutils/hyperscript'

// Only the table type is overridden: the row, cell and content types keep their defaults
export const options = {
	blocks: { table: 'custom-table' }
}

export default editor => {
	editor.insertTable()

	const table = editor.value.document.findDescendant(n => n.type === 'custom-table')
	expect(table).toBeTruthy()

	const row = table.nodes.first()
	const cell = row.nodes.first()
	expect(row.type).toBe('table-row')
	expect(cell.type).toBe('table-cell')
	expect(cell.nodes.first().type).toBe('paragraph')
}

export const value = (
	<value>
		<document>
			<paragraph>
				<text>
					<cursor />
				</text>
			</paragraph>
		</document>
	</value>
)
