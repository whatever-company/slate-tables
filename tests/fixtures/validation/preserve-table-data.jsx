/** @jsx h */

import { h } from 'testutils/hyperscript'

export default () => {}

export const value = (
	<value>
		<document>
			<table before="already here" also="here">
				<tr>
					<td>
						<paragraph>
							<text />
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
			<table before="already here" also="here">
				<tr>
					<td>
						<paragraph>
							<text />
						</paragraph>
					</td>
				</tr>
				<tr>
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
