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
					<td colspan={2}>
						<text />
					</td>
					<td rowspan={2}>
						<text>rowspan</text>
					</td>
				</tr>
				<tr>
					<td>
						<text />
					</td>
					<td>
						<text />
					</td>
				</tr>
				<tr>
					<td>
						<text />
					</td>
					<td>
						<text />
					</td>
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
			<table columns={[{ width: null }, { width: null }, { width: null }]}>
				<tr>
					<td colspan={2}>
						<text />
					</td>
					<td rowspan={2}>
						<text>rowspan</text>
					</td>
				</tr>
				<tr>
					<td>
						<text />
					</td>
					<td>
						<text />
					</td>
				</tr>
				<tr>
					<td>
						<text />
					</td>
					<td>
						<text />
					</td>
					<td>
						<text />
					</td>
				</tr>
			</table>
		</document>
	</value>
)
