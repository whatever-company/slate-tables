/** @jsxRuntime classic @jsx h */
/** @jsx h */

import { h } from 'testutils/hyperscript'

export default (editor) => {
	editor.run('onKeyDown', { preventDefault() {}, key: 'ArrowUp' })
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
							<text />
						</paragraph>
					</td>
					<td>
						<paragraph>First paragraph</paragraph>
						<paragraph>
							<text>
								Second paragraph
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
					<td>
						<paragraph>First paragraph</paragraph>
						<paragraph>
							<text>
								Second paragraph
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
