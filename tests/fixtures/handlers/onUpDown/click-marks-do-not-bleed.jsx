/** @jsx h */

import { h } from 'testutils/hyperscript'
import clearBleedingMarks from 'lib/clearBleedingMarks'

export default editor => {
	// Simulate clicking directly on row 2 cell 1
	const table = editor.value.document.nodes.first()
	const row2Cell1 = table.nodes.get(1).nodes.first()
	editor.moveToStartOfNode(row2Cell1)
	// In the browser, onSelect fires on click and calls clearBleedingMarks.
	// Since onSelect requires a DOM, we call it directly here.
	clearBleedingMarks(editor)
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
