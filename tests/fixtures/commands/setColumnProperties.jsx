/** @jsx h */

import { h } from 'testutils/hyperscript'

export const options = {
	saveColumns: true
}

export default editor => {
	editor.setColumnProperties({ example: true })
	editor.setColumnPropertiesAtIndex('table', 1, { second: true })
}

export const value = (
	<value>
		<document>
			<table key="table" columns={[{ witdh: null }, { witdh: null }]}>
				<tr>
					<td>
						<paragraph>
							Cell 1,1
							<cursor />
						</paragraph>
					</td>
					<td>
						<paragraph>Cell 1,2</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 2,1</paragraph>
					</td>
					<td>
						<paragraph>
							<text />
						</paragraph>
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
			<table columns={[{ witdh: null, example: true }, { witdh: null, second: true }]}>
				<tr>
					<td>
						<paragraph>
							Cell 1,1
							<cursor />
						</paragraph>
					</td>
					<td>
						<paragraph>Cell 1,2</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 2,1</paragraph>
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
