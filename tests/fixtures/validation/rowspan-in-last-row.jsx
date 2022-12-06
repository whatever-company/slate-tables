/** @jsxRuntime classic @jsx h */
/** @jsx h */

import { h } from 'testutils/hyperscript'

export default () => {}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td rowspan={2}>
						<paragraph>
							<text>lorem ipsum</text>
						</paragraph>
					</td>
					<td>
						<paragraph>
							<text />
						</paragraph>
					</td>
				</tr>
			</table>
		</document>
	</value>
)

export const output = (
	<value>
		<document>
			<table>
				<tr>
					<td rowspan={1}>
						<paragraph>
							<text>lorem ipsum</text>
						</paragraph>
					</td>
					<td>
						<paragraph>
							<text />
						</paragraph>
					</td>
				</tr>
			</table>
		</document>
	</value>
)
