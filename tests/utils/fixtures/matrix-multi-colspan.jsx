/** @jsx h */

import { h } from 'testutils/hyperscript'

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td colspan={4}>
						<paragraph>
							<text>a</text>
						</paragraph>
					</td>
					<td colspan={2}>
						<paragraph>
							<text>b</text>
						</paragraph>
					</td>
				</tr>
				<tr />
			</table>
		</document>
	</value>
)
