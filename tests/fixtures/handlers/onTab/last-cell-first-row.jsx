/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	editor.run('onKeyDown', { preventDefault() {}, key: 'Tab' })
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>
							<text />
						</paragraph>
					</td>
					<td>
						<paragraph>
							<text>
								<cursor />
							</text>
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
							<text />
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
