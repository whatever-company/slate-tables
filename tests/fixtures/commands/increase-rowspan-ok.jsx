/** @jsxRuntime classic @jsx h */
/** @jsx h */

import { h } from 'testutils/hyperscript'

export default (editor) => {
	editor.increaseRowspanAtKey('cursor')
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td key="cursor" rowspan={2}>
						<paragraph>Cell 1,1</paragraph>
					</td>
					<td rowspan={2}>
						<paragraph>
							<text>Cell 1,2</text>
						</paragraph>
					</td>
					<td>
						<paragraph>
							<text>Cell 1,3</text>
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 2,3</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 3,1</paragraph>
					</td>
					<td>
						<paragraph>Cell 3,2</paragraph>
					</td>
					<td>
						<paragraph>Cell 3,3</paragraph>
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
					<td key="cursor" rowspan={3}>
						<paragraph>Cell 1,1</paragraph>
						<paragraph>
							Cell 3,1
							<cursor />
						</paragraph>
					</td>
					<td rowspan={2}>
						<paragraph>
							<text>Cell 1,2</text>
						</paragraph>
					</td>
					<td>
						<paragraph>
							<text>Cell 1,3</text>
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 2,3</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 3,2</paragraph>
					</td>
					<td>
						<paragraph>Cell 3,3</paragraph>
					</td>
				</tr>
			</table>
			<paragraph>
				<text />
			</paragraph>
		</document>
	</value>
)
