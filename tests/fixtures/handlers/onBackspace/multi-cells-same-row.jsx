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
						<paragraph>
							First
							<anchor />
							Cell
						</paragraph>
					</td>
					<td>
						<paragraph>
							<text>Middle cell</text>
						</paragraph>
					</td>
					<td>
						<paragraph>
							<text>
								Before Cell 0,1
								<focus />
								After
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
						<paragraph>First</paragraph>
					</td>
					<td>
						<text />
					</td>
					<td>
						<paragraph>
							<text>
								After
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
