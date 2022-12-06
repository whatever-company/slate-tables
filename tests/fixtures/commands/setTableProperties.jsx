/** @jsxRuntime classic @jsx h */
/** @jsx h */

import { h } from 'testutils/hyperscript'

export default (editor) => {
	editor.setTableProperties({ example: true })
}

export const value = (
	<value>
		<document>
			<table before="already here">
				<tr>
					<td>
						<paragraph>
							Cell 1,1
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
			<paragraph key="not-table">
				<text />
			</paragraph>
		</document>
	</value>
)

export const output = (
	<value>
		<document>
			<table before="already here" example>
				<tr>
					<td>
						<paragraph>
							Cell 1,1
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
