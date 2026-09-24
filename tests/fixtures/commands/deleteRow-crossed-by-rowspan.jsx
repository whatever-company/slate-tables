/** @jsx h */

import { h } from 'testutils/hyperscript'

/**
 * A spans over the deleted row, so it must shrink by one row. Without that it
 * would swallow C's slot and an empty cell would be appended to the first row.
 *
 *   ┌───┬────┐          ┌───┬────┐
 *   │ A │ B0 │          │ A │ B0 │
 *   │   ├────┤          │   ├────┤
 *   │   │ B1 │ deleted  │   │ B2 │
 *   │   ├────┤    →     ├───┼────┤
 *   │   │ B2 │          │ C │ B3 │
 *   ├───┼────┤          └───┴────┘
 *   │ C │ B3 │
 *   └───┴────┘
 */
export default editor => {
	editor.deleteRow()
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td rowspan={3}>
						<paragraph>A</paragraph>
					</td>
					<td>
						<paragraph>B0</paragraph>
					</td>
				</tr>
				<tr>
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
				<tr>
					<td>
						<paragraph>C</paragraph>
					</td>
					<td>
						<paragraph>B3</paragraph>
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
					<td rowspan={2}>
						<paragraph>A</paragraph>
					</td>
					<td>
						<paragraph>B0</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>
							<text>
								<cursor />
								B2
							</text>
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>C</paragraph>
					</td>
					<td>
						<paragraph>B3</paragraph>
					</td>
				</tr>
			</table>
		</document>
	</value>
)
