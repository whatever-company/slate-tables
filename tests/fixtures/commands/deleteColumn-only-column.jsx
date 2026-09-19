/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	editor.deleteColumn()
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>
							<text>
								Cell 1,1
								<cursor />
							</text>
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 2,1</paragraph>
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
