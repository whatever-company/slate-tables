/** @jsx h */

import { h } from 'testutils/hyperscript'

/**
 * The new row goes below B1, inside the rows spanned by C. C must grow by one row
 * and the new row only gets a cell for the column C does not cover. Without that
 * C kept spanning two rows, the last row was left short, and the normalizer
 * appended an empty cell after B2 instead of under C.
 *
 *   ┌───┬────┐              ┌───┬────┐
 *   │ A │ B0 │              │ A │ B0 │
 *   ├───┼────┤              ├───┼────┤
 *   │ C │ B1 │ insert row   │ C │ B1 │
 *   │   ├────┤     →        │   ├────┤
 *   │   │ B2 │              │   │    │
 *   └───┴────┘              │   ├────┤
 *                           │   │ B2 │
 *                           └───┴────┘
 */
export default editor => {
	editor.insertRow()
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>A</paragraph>
					</td>
					<td>
						<paragraph>B0</paragraph>
					</td>
				</tr>
				<tr>
					<td rowspan={2}>
						<paragraph>C</paragraph>
					</td>
					<td>
						<paragraph>
							<text>
								<cursor />
								B1
							</text>
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>B2</paragraph>
					</td>
				</tr>
			</table>
		</document>
	</value>
)

export const output = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>A</paragraph>
					</td>
					<td>
						<paragraph>B0</paragraph>
					</td>
				</tr>
				<tr>
					<td rowspan={3}>
						<paragraph>C</paragraph>
					</td>
					<td>
						<paragraph>B1</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>
							<text>
								<cursor />
							</text>
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>B2</paragraph>
					</td>
				</tr>
			</table>
		</document>
	</value>
)
