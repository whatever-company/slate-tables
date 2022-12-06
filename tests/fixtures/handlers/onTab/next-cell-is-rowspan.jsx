/** @jsxRuntime classic @jsx h */
/** @jsx h */

import { h } from 'testutils/hyperscript'

export default (editor) => {
	editor.run('onKeyDown', { preventDefault() {}, key: 'Tab' })
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>
							<text>Cell 1,1</text>
						</paragraph>
					</td>
					<td rowspan={2}>
						<paragraph>Cell 1,2</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>
							<cursor />
							Cell 2,1
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
						<paragraph>
							<text>Cell 1,1</text>
						</paragraph>
					</td>
					<td rowspan={2}>
						<paragraph>
							Cell 1,2
							<cursor />
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 2,1</paragraph>
					</td>
				</tr>
			</table>
			<paragraph>
				<text />
			</paragraph>
		</document>
	</value>
)
