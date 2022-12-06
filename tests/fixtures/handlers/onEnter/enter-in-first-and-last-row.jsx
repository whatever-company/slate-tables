/** @jsxRuntime classic @jsx h */
/** @jsx h */

import { h } from 'testutils/hyperscript'

export const options = {
	enterCreatesRow: true
}

export default (editor) => {
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
							<text>
								<cursor />
								0,1
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
						<paragraph>0,0</paragraph>
					</td>
					<td>
						<paragraph>
							<text>0,1</text>
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>
							<text>
								<cursor />
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
