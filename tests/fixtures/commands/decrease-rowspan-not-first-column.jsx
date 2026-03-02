/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	editor.decreaseRowspanAtKey('cellKey')
}

/**
 * Input table structure:
 * ┌────────┬────────┬────────┐
 * │        │        │        │
 * ├────────┼────────┼────────┤
 * │        │   a    │   d    │
 * │        │   b    │   e    │
 * │        │   c    │   f    │
 * ├────────┼────────┤        │
 * │        │        │        │
 * ├────────┼────────┼────────┤
 * │        │        │        │
 * └────────┴────────┴────────┘
 */
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
				<tr>
					<td>
						<paragraph>
							<text />
						</paragraph>
					</td>
					<td>
						<paragraph>a</paragraph>
						<paragraph>b</paragraph>
						<paragraph>c</paragraph>
					</td>
					<td rowspan={2} key="cellKey">
						<paragraph>d</paragraph>
						<paragraph>e</paragraph>
						<paragraph>
							<text>
								f
								<cursor />
							</text>
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
					<td>
						<paragraph>
							<text />
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

/**
 * Output table structure after decreasing rowspan:
 * ┌────────┬────────┬────────┐
 * │        │        │        │
 * ├────────┼────────┼────────┤
 * │        │   a    │   d    │
 * │        │   b    │   e    │
 * │        │   c    │   f    │
 * ├────────┼────────┼────────┤
 * │        │        │        │
 * ├────────┼────────┼────────┤
 * │        │        │        │
 * └────────┴────────┴────────┘
 */
export const output = (
	<value>
		<document>
			<table>
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
						<paragraph>a</paragraph>
						<paragraph>b</paragraph>
						<paragraph>c</paragraph>
					</td>
					<td rowspan={1} key="cellKey">
						<paragraph>d</paragraph>
						<paragraph>e</paragraph>
						<paragraph>
							<text>
								f
								<cursor />
							</text>
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
					<td>
						<paragraph>
							<text />
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
