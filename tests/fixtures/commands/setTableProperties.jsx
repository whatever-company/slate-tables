/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	editor.setTableProperties({ example: true })
}

export const value = (
	<value>
		<document>
			<table>
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
			<table example={true}>
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
