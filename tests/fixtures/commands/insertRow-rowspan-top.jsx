/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	editor.insertRowAtKey(editor.value.selection.start.key)
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>Cell 1,1</paragraph>
					</td>
					<td>
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
							<text>
								<cursor />
								Cell 2,1
							</text>
						</paragraph>
					</td>
					<td rowspan={2}>
						<paragraph>Cell 2,2</paragraph>
					</td>
					<td>
						<paragraph>Cell 2,3</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 3,1</paragraph>
					</td>
					<td>
						<paragraph>Cell 3,3</paragraph>
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
						<paragraph>Cell 1,1</paragraph>
					</td>
					<td>
						<paragraph>Cell 1,2</paragraph>
					</td>
					<td>
						<paragraph>Cell 1,3</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 2,1</paragraph>
					</td>
					<td rowspan={2}>
						<paragraph>Cell 2,2</paragraph>
					</td>

					<td>
						<paragraph>Cell 2,3</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>
							<text>
								<cursor />
							</text>
						</paragraph>
					</td>
					<td>
						<paragraph>
							<text />
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 3,1</paragraph>
					</td>
					<td>
						<paragraph>Cell 3,3</paragraph>
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
