/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	editor.decreaseColspanAtKey('cursor')
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>Cell 1,0</paragraph>
					</td>
					<td>
						<paragraph>Cell 1,1</paragraph>
					</td>
					<td>
						<paragraph>Cell 1,2</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 2,0</paragraph>
					</td>
					<td colspan={2} rowspan={2} key="cursor">
						<paragraph>
							<text>
								<cursor />
								Cell 2,1
							</text>
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 3,0</paragraph>
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
						<paragraph>Cell 1,0</paragraph>
					</td>
					<td>
						<paragraph>Cell 1,1</paragraph>
					</td>
					<td>
						<paragraph>Cell 1,2</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 2,0</paragraph>
					</td>
					<td colspan={1} rowspan={2} key="cursor">
						<paragraph>
							<text>
								<cursor />
								Cell 2,1
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
						<paragraph>Cell 3,0</paragraph>
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
