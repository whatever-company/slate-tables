/** @jsxRuntime classic @jsx h */
/** @jsx h */

import { h } from 'testutils/hyperscript'

export default (editor) => {
	expect(editor.canDecreaseColspanAtKey('td1.1')).toBe(true)
	expect(editor.canDecreaseColspanAtKey('td2.2')).toBe(true)
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td key="td1.1" colspan={2}>
						<paragraph>
							<text>Cell 1,1</text>
						</paragraph>
					</td>
					<td>
						<paragraph key="p4">Cell 1,4</paragraph>
					</td>
				</tr>

				<tr>
					<td>
						<paragraph>
							<text>Cell 2,1</text>
						</paragraph>
					</td>
					<td key="td2.2" colspan={2}>
						<paragraph>Cell 2,2</paragraph>
					</td>
				</tr>
			</table>
			<paragraph>
				<text />
			</paragraph>
		</document>
	</value>
)
