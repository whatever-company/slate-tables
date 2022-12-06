/** @jsxRuntime classic @jsx h */
/** @jsx h */

import { h } from 'testutils/hyperscript'

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td rowspan={2}>
						<paragraph>
							<text>
								<cursor />
							</text>
						</paragraph>
					</td>
					<td>
						<paragraph />
					</td>
				</tr>
				<tr>
					<td key="already_there">
						<paragraph />
					</td>
				</tr>
			</table>
		</document>
	</value>
)
