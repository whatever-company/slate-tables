/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	editor.run('onKeyDown', { preventDefault() {}, key: 'Tab', shiftKey: true })
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>
							<cursor />
							Cell 1,1
						</paragraph>
					</td>
					<td>
						<paragraph>Cell 1,2</paragraph>
					</td>
				</tr>
				<tr>
					<td colspan={2}>
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

export const output = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>
							<cursor />
						</paragraph>
					</td>
					<td>
						<paragraph>
							<text />
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>
							<text>Cell 1,1</text>
						</paragraph>
					</td>
					<td>
						<paragraph>Cell 1,2</paragraph>
					</td>
				</tr>
				<tr>
					<td colspan={2}>
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
