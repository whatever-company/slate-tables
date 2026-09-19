/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	editor.decreaseColspanAtKey('cursor')
}

// The column following the freed one is held by a cell spanning from the row
// above: the new cell still belongs to the row of the cell being shrunk.
export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>Cell 1,1</paragraph>
					</td>
					<td>
						<paragraph>Cell 1,2</paragraph>
					</td>
					<td rowspan={2}>
						<paragraph>Cell 1,3</paragraph>
					</td>
				</tr>
				<tr>
					<td colspan={2} key="cursor">
						<paragraph>
							<text>
								<cursor />
								Cell 2,1
							</text>
						</paragraph>
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
					<td>
						<paragraph>Cell 1,2</paragraph>
					</td>
					<td rowspan={2}>
						<paragraph>Cell 1,3</paragraph>
					</td>
				</tr>
				<tr>
					<td colspan={1}>
						<paragraph>
							<text>
								<cursor />
								Cell 2,1
							</text>
						</paragraph>
					</td>
					<td>
						<paragraph>
							<text />
						</paragraph>
					</td>
				</tr>
			</table>
			<paragraph>
				<text />
			</paragraph>
		</document>
	</value>
)
