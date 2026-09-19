/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	expect(editor.isInTableAtKey('p1.1')).toBe(true)
	expect(editor.isInTableAtKey('td1.1')).toBe(true)

	expect(editor.isInTableAtKey('before')).toBe(false)
	expect(editor.isInTableAtKey('after')).toBe(false)
	// An unresolvable key is simply not in a table
	expect(editor.isInTableAtKey('no-such-node')).toBe(false)
}

export const value = (
	<value>
		<document>
			<paragraph key="before">Before</paragraph>
			<table>
				<tr>
					<td key="td1.1">
						<paragraph key="p1.1">
							<text>
								Cell 1,1
								<cursor />
							</text>
						</paragraph>
					</td>
				</tr>
			</table>
			<paragraph key="after">After</paragraph>
		</document>
	</value>
)
