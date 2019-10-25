/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	editor.run('onKeyDown', { preventDefault() {}, key: 'Backspace' })
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
								0,1
								<cursor />
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
							<text>
								0,
								<cursor />
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
