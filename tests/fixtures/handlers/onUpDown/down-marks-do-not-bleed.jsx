/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	editor.run('onKeyDown', { preventDefault() {}, key: 'ArrowDown' })
	editor.insertText('test')
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>
							<color color="#ffffff">
								<cursor />
								hello
							</color>
						</paragraph>
					</td>
					<td>
						<paragraph>
							<color color="#ffffff">world</color>
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>
							<text />
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

export const output = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>
							<color color="#ffffff">hello</color>
						</paragraph>
					</td>
					<td>
						<paragraph>
							<color color="#ffffff">world</color>
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>
							test
							<cursor />
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
