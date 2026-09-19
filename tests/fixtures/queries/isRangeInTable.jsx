/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	const { document, selection } = editor.value
	const between = (from, to) =>
		selection.moveToRangeOfNode(document.getDescendant(from), document.getDescendant(to)).normalize(document)

	// The cursor sits in the first cell
	expect(editor.isInTable()).toBe(true)

	expect(editor.isRangeInTable(between('p1.1', 'p1.1'))).toBe(true)
	expect(editor.isRangeInTable(between('p1.1', 'p1.2'))).toBe(true)

	// A range is not in a table as soon as one of its ends is out of it
	expect(editor.isRangeInTable(between('p1.1', 'after'))).toBe(false)
	expect(editor.isRangeInTable(between('before', 'p1.1'))).toBe(false)
	expect(editor.isRangeInTable(between('before', 'after'))).toBe(false)

	// Each table holds one end, neither holds the range
	expect(editor.isRangeInTable(between('p1.1', 'p2.1'))).toBe(false)
}

export const value = (
	<value>
		<document>
			<paragraph key="before">Before</paragraph>
			<table>
				<tr>
					<td>
						<paragraph key="p1.1">
							<text>
								Cell 1,1
								<cursor />
							</text>
						</paragraph>
					</td>
					<td>
						<paragraph key="p1.2">Cell 1,2</paragraph>
					</td>
				</tr>
			</table>
			<table>
				<tr>
					<td>
						<paragraph key="p2.1">Cell 2,1</paragraph>
					</td>
				</tr>
			</table>
			<paragraph key="after">After</paragraph>
		</document>
	</value>
)
