/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	editor.decreaseColspanAtKey('cursor')
}

// Two cells follow the freed column, so the new cell cannot simply be appended
export const value = (
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
					<td>
						<paragraph>Cell 1,4</paragraph>
					</td>
				</tr>
				<tr>
					<td colspan={2} key="cursor">
						<paragraph>
							<text>
								<cursor />
								Cell 2,1
							</text>
						</paragraph>
					</td>
					<td>
						<paragraph>Cell 2,3</paragraph>
					</td>
					<td>
						<paragraph>Cell 2,4</paragraph>
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
					<td>
						<paragraph>Cell 1,4</paragraph>
					</td>
				</tr>
				<tr>
					<td colspan={1}>
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
					<td>
						<paragraph>Cell 2,3</paragraph>
					</td>
					<td>
						<paragraph>Cell 2,4</paragraph>
					</td>
				</tr>
			</table>
			<paragraph>
				<text />
			</paragraph>
		</document>
	</value>
)
