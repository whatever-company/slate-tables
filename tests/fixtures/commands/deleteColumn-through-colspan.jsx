/** @jsx h */

import { h } from 'testutils/hyperscript'

/**
 * The deleted column runs through W, which spans two columns. W only shrinks by
 * one column: it used to be emptied as well, as if it had been deleted.
 *
 *   ┌───────┬───┐  delete column  ┌───┬───┐
 *   │   W   │ C │     from B      │ W │ C │
 *   ├───┬───┼───┤       →         ├───┼───┤
 *   │ A │ B │ D │                 │ A │ D │
 *   └───┴───┴───┘                 └───┴───┘
 */
export default editor => {
	editor.deleteColumn()
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td colspan={2}>
						<paragraph>W</paragraph>
					</td>
					<td>
						<paragraph>C</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>A</paragraph>
					</td>
					<td>
						<paragraph>
							<text>
								<cursor />B
							</text>
						</paragraph>
					</td>
					<td>
						<paragraph>D</paragraph>
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
					<td>
						<paragraph>W</paragraph>
					</td>
					<td>
						<paragraph>C</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>A</paragraph>
					</td>
					<td>
						<paragraph>
							<text>
								<cursor />D
							</text>
						</paragraph>
					</td>
				</tr>
			</table>
		</document>
	</value>
)
