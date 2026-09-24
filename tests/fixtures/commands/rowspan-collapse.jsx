/** @jsx h */

import { h } from 'testutils/hyperscript'

/**
 * Cell 2,2 is the only cell of its row: merging it into Cell 1,2 removes the row,
 * keeps its content, and shrinks Cell 1,1 which spanned over it.
 */
export default editor => {
	editor.increaseRowspanAtKey('cursor')
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td rowspan={2}>
						<paragraph>Cell 1,1</paragraph>
					</td>
					<td key="cursor">
						<paragraph>Cell 1,2</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 2,2</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 3,1</paragraph>
					</td>
					<td>
						<paragraph>Cell 3,2</paragraph>
					</td>
				</tr>
			</table>
			<paragraph>
				<text />
			</paragraph>
		</document>
	</value>
)

export const output = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>Cell 1,1</paragraph>
					</td>
					<td key="cursor">
						<paragraph>Cell 1,2</paragraph>
						<paragraph>
							Cell 2,2
							<cursor />
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 3,1</paragraph>
					</td>
					<td>
						<paragraph>Cell 3,2</paragraph>
					</td>
				</tr>
			</table>
			<paragraph>
				<text />
			</paragraph>
		</document>
	</value>
)
