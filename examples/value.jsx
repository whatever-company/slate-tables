/** @jsx h */

import { h } from '../testutils/hyperscript'

export default (
	<value>
		<document>
			<table>
				<tr>
					<td colspan={2}>
						<paragraph>
							<text>Cell 1,1</text>
							<cursor />
						</paragraph>
					</td>
					<td>
						<paragraph>Cell 1,3</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>Cell 2,1</paragraph>
					</td>
					<td>
						<paragraph>Cell 2,2</paragraph>
					</td>
					<td>
						<paragraph>Cell 2,3</paragraph>
					</td>
				</tr>
			</table>
			<paragraph>
				<text />
			</paragraph>
		</document>
	</value>
)
