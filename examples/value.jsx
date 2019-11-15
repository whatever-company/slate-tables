/** @jsx h */

import { h } from '../testutils/hyperscript'

export default (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>
							<cursor />
							<text>Cell 1,1</text>
						</paragraph>
					</td>
					<td colspan={2}>
						<paragraph>Cell 1,2</paragraph>
						<paragraph>Cell 1,3</paragraph>
					</td>
				</tr>
				<tr>
					<td rowspan={2}>
						<paragraph>Cell 2,1</paragraph>
						<paragraph>Cell 2,2</paragraph>
					</td>
					<td>
						<paragraph>Cell 2,2</paragraph>
					</td>
					<td rowspan={2}>
						<paragraph>Cell 2,3</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>
							<text>Cell 3,2</text>
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
