/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	expect(editor.canDecreaseColspanAtKey('td1.1')).toBe(false)
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td key="td1.1">
						<paragraph>
							<text>
								Cell 1,1
								<cursor />
							</text>
						</paragraph>
					</td>
					<td key="td1.2">
						<paragraph>Cell 1,2</paragraph>
					</td>
					<td>
						<paragraph>Cell 1,3</paragraph>
					</td>
					<td>
						<paragraph key="p4">Cell 1,4</paragraph>
					</td>
				</tr>
			</table>
			<paragraph>
				<text />
			</paragraph>
		</document>
	</value>
)
