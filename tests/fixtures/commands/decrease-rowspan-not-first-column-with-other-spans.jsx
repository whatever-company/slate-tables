/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	editor.decreaseRowspanAtKey('cellKey')
}

/**
 * Input table structure (col3 already split, col4 still spanning):
 * ┌────────┬────────┬────────┬────────┐
 * │        │        │        │        │
 * ├────────┼────────┼────────┼────────┤
 * │        │        │   a    │        │
 * │        │        │   b    │        │
 * │        │        │   c    │        │
 * ├────────┼────────┼────────┤        │
 * │        │        │        │        │
 * ├────────┼────────┼────────┤        │
 * │   x    │   y    │   z    │        │
 * └────────┴────────┴────────┴────────┘
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
					<td rowspan={1}>
						<paragraph>a</paragraph>
						<paragraph>b</paragraph>
						<paragraph>c</paragraph>
					</td>
					<td rowspan={3} key="cellKey">
						<paragraph>
							<text>
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
						<paragraph>x</paragraph>
					</td>
					<td>
						<paragraph>y</paragraph>
					</td>
					<td>
						<paragraph>z</paragraph>
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
 * Output table structure after decreasing rowspan on col4:
 * ┌────────┬────────┬────────┬────────┐
 * │        │        │        │        │
 * ├────────┼────────┼────────┼────────┤
 * │        │        │   a    │        │
 * │        │        │   b    │        │
 * │        │        │   c    │        │
 * ├────────┼────────┼────────┤        │
 * │        │        │        │        │
 * ├────────┼────────┼────────┼────────┤
 * │   x    │   y    │   z    │        │
 * └────────┴────────┴────────┴────────┘
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
					<td rowspan={1}>
						<paragraph>a</paragraph>
						<paragraph>b</paragraph>
						<paragraph>c</paragraph>
					</td>
					<td rowspan={2} key="cellKey">
						<paragraph>
							<text>
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
						<paragraph>x</paragraph>
					</td>
					<td>
						<paragraph>y</paragraph>
					</td>
					<td>
						<paragraph>z</paragraph>
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
