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
 * │        │   a    │        │
 * │        │   b    │        │
 * │        │   c    │        │
 * ├────────┤        ├────────┤
 * │   x    │        │   y    │
 * ├────────┼────────┼────────┤
 * │        │        │        │
 * └────────┴────────┴────────┘
 *
 * The rowspan=2 cell is in the middle column (col 1).
 * Row 2 has real cells at col 0 ("x") and col 2 ("y"), with col 1 virtual.
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
					<td rowspan={2} key="cellKey">
						<paragraph>a</paragraph>
						<paragraph>b</paragraph>
						<paragraph>
							<text>
								c
								<cursor />
							</text>
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
 * │        │   a    │        │
 * │        │   b    │        │
 * │        │   c    │        │
 * ├────────┼────────┼────────┤
 * │   x    │ (new)  │   y    │
 * ├────────┼────────┼────────┤
 * │        │        │        │
 * └────────┴────────┴────────┘
 *
 * The new empty cell is inserted at position 1 (between "x" and "y"),
 * not appended at the end.
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
					<td rowspan={1} key="cellKey">
						<paragraph>a</paragraph>
						<paragraph>b</paragraph>
						<paragraph>
							<text>
								c
								<cursor />
							</text>
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
						<paragraph>
							<text />
						</paragraph>
					</td>
					<td>
						<paragraph>y</paragraph>
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
