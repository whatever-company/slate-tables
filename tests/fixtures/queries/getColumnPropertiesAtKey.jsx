/** @jsxRuntime classic @jsx h */
/** @jsx h */

import { h } from 'testutils/hyperscript'

export default (editor) => {
	expect(editor.getColumnPropertiesAtKey('td1.1')).toEqual({ width: 30, firstColumn: true })
	expect(editor.getColumnPropertiesAtKey('td2.1')).toEqual({ width: 30, firstColumn: true })
	expect(editor.getColumnPropertiesAtKey('td5.1')).toEqual({ width: 30, firstColumn: true })
	expect(editor.getColumnPropertiesAtKey('td6.1')).toEqual({ width: 30, firstColumn: true })
	expect(editor.getColumnPropertiesAtKey('td3.2')).toEqual({ width: null, secondColumn: true })
}

export const value = (
	<value>
		<document>
			<table
				columns={[
					{ width: 30, firstColumn: true },
					{ width: null, secondColumn: true },
					{ width: 0, thirdColumn: true }
				]}
			>
				<tr>
					<td key="td1.1">
						<paragraph>
							<text>
								Cell 1,1
								<cursor />
							</text>
						</paragraph>
					</td>
					<td key="td1.2" rowspan={2}>
						<paragraph key="p2">Cell 1,2</paragraph>
					</td>
					<td>
						<paragraph>Cell 1,3</paragraph>
					</td>
				</tr>
				<tr>
					<td key="td2.1">
						<paragraph>Cell 2,1</paragraph>
					</td>
					<td>
						<paragraph>Cell 2,3</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 3,1</paragraph>
					</td>
					<td key="td3.2">
						<paragraph>Cell 3,2</paragraph>
					</td>
					<td>
						<paragraph>Cell 3,3</paragraph>
					</td>
				</tr>
				<tr>
					<td key="td4.1" colspan={2}>
						<paragraph>Cell 4,1</paragraph>
					</td>
					<td>
						<paragraph>Cell 4,3</paragraph>
					</td>
				</tr>
				<tr>
					<td key="td5.1" colspan={2}>
						<paragraph>Cell 5,1</paragraph>
					</td>
					<td>
						<paragraph>Cell 5,3</paragraph>
					</td>
				</tr>
				<tr>
					<td key="td6.1" colspan={3}>
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
