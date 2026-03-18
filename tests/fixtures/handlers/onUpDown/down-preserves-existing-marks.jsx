/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	editor.run('onKeyDown', { preventDefault() {}, key: 'ArrowDown' })
	editor.insertText(' world')
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>
							<cursor />
							plain
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>
							<color color="#ff0000">hello</color>
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
						<paragraph>plain</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>
							<color color="#ff0000">
								hello world
								<cursor />
							</color>
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
