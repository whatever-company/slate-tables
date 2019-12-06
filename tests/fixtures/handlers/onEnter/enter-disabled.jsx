/** @jsx h */

import { h } from 'testutils/hyperscript'

export const options = {
	enterCreatesRow: false
}

export default editor => {
	editor.run('onKeyDown', { preventDefault() {}, key: 'Enter' })
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>0,0</paragraph>
					</td>
					<td>
						<paragraph>
							0,1
							<cursor />
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
						<paragraph>0,0</paragraph>
					</td>
					<td>
						<paragraph>
							<text>0,1</text>
						</paragraph>
						<paragraph>
							<cursor />
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
