/** @jsx h */

import { h } from 'testutils/hyperscript'

export const options = {
	saveColumns: true
}

export default editor => {
	editor.insertColumn()
}

export const value = (
	<value>
		<document>
			<table columns={[{ width: 10 }, { width: 20 }, { width: 30 }]}>
				<tr>
					<td colspan={2}>
						<paragraph>
							<cursor />
							<text>Cell 1,1</text>
						</paragraph>
					</td>
					<td>
						<paragraph>Cell 1,3</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 2,1</paragraph>
					</td>
					<td>
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
						<paragraph>
							<text>Cell 3,2</text>
						</paragraph>
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
			<table columns={[{ width: 10 }, { width: 20 }, { width: null }, { width: 30 }]}>
				<tr>
					<td colspan={2}>
						<paragraph>Cell 1,1</paragraph>
					</td>
					<td>
						<paragraph>
							<text>
								<cursor />
							</text>
						</paragraph>
					</td>
					<td>
						<paragraph>Cell 1,3</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 2,1</paragraph>
					</td>
					<td>
						<paragraph>Cell 2,2</paragraph>
					</td>
					<td>
						<paragraph>
							<text />
						</paragraph>
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
						<paragraph>
							<text>Cell 3,2</text>
						</paragraph>
					</td>
					<td>
						<paragraph>
							<text />
						</paragraph>
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
