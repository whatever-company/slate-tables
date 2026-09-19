/** @jsx h */

import { h } from 'testutils/hyperscript'

export default () => {}

// The second row owns no cell of its own: every column it has is covered by a
// rowspan from the row above, except the last one which is simply missing.
export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td rowspan={2}>
						<paragraph>
							<text>Cell 1,1</text>
						</paragraph>
					</td>
					<td rowspan={2}>
						<paragraph>
							<text>Cell 1,2</text>
						</paragraph>
					</td>
					<td>
						<paragraph>
							<text>Cell 1,3</text>
						</paragraph>
					</td>
				</tr>
				<tr />
			</table>
		</document>
	</value>
)

export const output = (
	<value>
		<document>
			<table>
				<tr>
					<td rowspan={2}>
						<paragraph>
							<text>Cell 1,1</text>
						</paragraph>
					</td>
					<td rowspan={2}>
						<paragraph>
							<text>Cell 1,2</text>
						</paragraph>
					</td>
					<td>
						<paragraph>
							<text>Cell 1,3</text>
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>
							<text />
						</paragraph>
					</td>
				</tr>
			</table>
		</document>
	</value>
)
