/** @jsx h */

import { h } from 'testutils/hyperscript'

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td colspan={4}>
						<paragraph>
							<text>text</text>
						</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>
							<text />
						</paragraph>
					</td>
					<td>
						<paragraph />
					</td>
					<td>
						<paragraph />
					</td>
				</tr>
			</table>
		</document>
	</value>
)
