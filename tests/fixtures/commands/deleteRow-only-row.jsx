/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	editor.deleteRow()
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
							<text>
								Cell 1,2
								<cursor />
							</text>
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
			<paragraph>
				<text>
					<cursor />
				</text>
			</paragraph>
		</document>
	</value>
)
