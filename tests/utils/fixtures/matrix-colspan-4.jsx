/** @jsxRuntime classic @jsx h */
/** @jsx h */

import { h } from 'testutils/hyperscript'

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>
							<text />
						</paragraph>
					</td>
					<td colspan={3}>
						<paragraph>
							<text></text>
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
					<td>
						<paragraph>
							<text />
						</paragraph>
					</td>
					<td>
						<paragraph>Text</paragraph>
					</td>
				</tr>
			</table>
		</document>
	</value>
)
