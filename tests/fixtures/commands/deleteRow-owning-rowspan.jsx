/** @jsx h */

import { h } from 'testutils/hyperscript'

/**
 * A1 belongs to the deleted row but spans below it, so it moves down to the next
 * row, one row shorter. Without that the next row would be left with B2 alone
 * and the normalizer would push it into the first column.
 *
 *   ┌────┬────┐          ┌────┬────┐
 *   │ A0 │ B0 │          │ A0 │ B0 │
 *   ├────┼────┤          ├────┼────┤
 *   │ A1 │ B1 │ deleted  │ A1 │ B2 │
 *   │    ├────┤    →     └────┴────┘
 *   │    │ B2 │
 *   └────┴────┘
 */
export default editor => {
	editor.deleteRow()
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>A0</paragraph>
					</td>
					<td>
						<paragraph>B0</paragraph>
					</td>
				</tr>
				<tr>
					<td rowspan={2}>
						<paragraph>A1</paragraph>
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
						<paragraph>A0</paragraph>
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
								A1
							</text>
						</paragraph>
					</td>
					<td>
						<paragraph>B2</paragraph>
					</td>
				</tr>
			</table>
		</document>
	</value>
)
