/** @jsx h */

import { h } from 'testutils/hyperscript'

/**
 * B2 is the only cell of its row, so merging it into B1 makes that row disappear.
 * B2's content must move into B1, and A, which spans over the vanished row, must
 * shrink by one row: kept at three rows it would swallow C's slot.
 *
 *   ┌───┬────┐              ┌───┬────┐
 *   │ A │ B0 │              │ A │ B0 │
 *   │   ├────┤              │   ├────┤
 *   │   │ B1 │ + rowspan    │   │ B1 │
 *   │   ├────┤     →        │   │ B2 │
 *   │   │ B2 │              ├───┼────┤
 *   ├───┼────┤              │ C │ B3 │
 *   │ C │ B3 │              └───┴────┘
 *   └───┴────┘
 */
export default editor => {
	editor.increaseRowspanAtKey('merged')
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
					<td key="merged">
						<paragraph>B1</paragraph>
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
					<td key="merged">
						<paragraph>B1</paragraph>
						<paragraph>
							B2
							<cursor />
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
