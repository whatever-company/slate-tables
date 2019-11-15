/** @jsx h */

import { h } from 'testutils/hyperscript'

export const options = {
	saveColumns: true
}

export default () => {}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<text />
					</td>
				</tr>
			</table>
		</document>
	</value>
)

export const output = (
	<value>
		<document>
			<table columns={[{ width: null }]}>
				<tr>
					<td>
						<text />
					</td>
				</tr>
			</table>
		</document>
	</value>
)
