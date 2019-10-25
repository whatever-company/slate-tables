/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	editor.increaseColspanAtKey('cursor')
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
					<td key="cursor" rowspan={2} colspan={2}>
						<paragraph>Cell 1,1</paragraph>
						<paragraph>
							Cell 1,2
							<cursor />
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
			</table>
			<paragraph>
				<text />
			</paragraph>
		</document>
	</value>
)
