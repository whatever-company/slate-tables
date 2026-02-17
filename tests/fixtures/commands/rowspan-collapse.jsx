/** @jsx h */

import { h } from 'testutils/hyperscript'

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
					<td rowspan={1}>
						<paragraph>Cell 1,1</paragraph>
					</td>
					<td rowspan={1} key="cursor">
						<paragraph>
							<text>
								Cell 1,2
								<cursor />
							</text>
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
