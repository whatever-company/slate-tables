/** @jsx h */

import { h } from 'testutils/hyperscript'

/**
 * The `columns` array lives inside the table's data. Inserting a column used to
 * splice it in place, which also changed the value kept in the history: after
 * undo the table was back to two cells but still listed three columns.
 *
 *   ┌────┬────┐  insert column   ┌────┬───┬────┐   undo   ┌────┬────┐
 *   │ A  │ B  │       →          │ A  │   │ B  │    →     │ A  │ B  │
 *   └────┴────┘                  └────┴───┴────┘          └────┴────┘
 *   [10, 20]                     [10, null, 20]           [10, 20]
 */
export const options = {
	saveColumns: true
}

export default editor => {
	editor.insertColumn()
	editor.undo()
}

export const value = (
	<value>
		<document>
			<table columns={[{ width: 10 }, { width: 20 }]}>
				<tr>
					<td>
						<paragraph>
							<text>
								A<cursor />
							</text>
						</paragraph>
					</td>
					<td>
						<paragraph>B</paragraph>
					</td>
				</tr>
			</table>
		</document>
	</value>
)

export const output = (
	<value>
		<document>
			<table columns={[{ width: 10 }, { width: 20 }]}>
				<tr>
					<td>
						<paragraph>
							<text>
								A<cursor />
							</text>
						</paragraph>
					</td>
					<td>
						<paragraph>B</paragraph>
					</td>
				</tr>
			</table>
		</document>
	</value>
)
