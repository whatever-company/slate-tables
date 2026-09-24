/** @jsx h */

import { h } from 'testutils/hyperscript'

/**
 * C is the only cell of its row, but comes after two slots taken by A and B.
 * Its own rowspan must land in the same column on the row below.
 *
 *   ┌───┬───┬───┐
 *   │ A │ B │ X │
 *   │   │   ├───┤
 *   │   │   │ C │
 *   ├───┼───┤   │
 *   │ D │ E │   │
 *   └───┴───┴───┘
 *
 * The matrix backs every command and key handler, so a misplaced C shifts D and E
 * one column right: deleting the column from D then removed B instead of A.
 */
export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td rowspan={2}>
						<paragraph>A</paragraph>
					</td>
					<td rowspan={2}>
						<paragraph>B</paragraph>
					</td>
					<td>
						<paragraph>X</paragraph>
					</td>
				</tr>
				<tr>
					<td rowspan={2}>
						<paragraph>C</paragraph>
					</td>
				</tr>
				<tr>
					<td>
						<paragraph>D</paragraph>
					</td>
					<td>
						<paragraph>E</paragraph>
					</td>
				</tr>
			</table>
		</document>
	</value>
)

export const expected = `
	A  | B  | X
	^A | ^B | C
	D  | E  | ^C
`
