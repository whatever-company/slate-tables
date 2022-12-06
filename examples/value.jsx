/** @jsxRuntime classic @jsx h */
/** @jsx h */

import { h } from '../testutils/hyperscript'

export default (
	<value>
		<document>
			<table>
				<tr>
					<td colspan={2}>
						<ul>
							<li>List item 1</li>
							<li>
								List item 2<cursor />
							</li>
						</ul>
					</td>
					<td>
						<paragraph>Cell 1,3 TOP</paragraph>
						<paragraph>Cell 1,3 BELOW</paragraph>
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
