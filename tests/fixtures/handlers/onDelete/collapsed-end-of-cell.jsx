/** @jsx h */

/**
 * Pressing Delete at the end of a cell should be a no-op.
 *
 *   +-----+-----+          +-----+-----+
 *   | 0,0 | 0,1 |    =>    | 0,0 | 0,1 |
 *   |    ^|     |          |    ^|     |
 *   +-----+-----+          +-----+-----+
 *        cursor                  cursor (unchanged)
 */
import { h } from 'testutils/hyperscript'

export default editor => {
	editor.run('onKeyDown', { preventDefault() {}, key: 'Delete' })
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>
							<text>
								0,0
								<cursor />
							</text>
						</paragraph>
					</td>
					<td>
						<paragraph>0,1</paragraph>
					</td>
				</tr>
			</table>
			<paragraph>
				<text />
			</paragraph>
		</document>
	</value>
)

export const output = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>
							<text>
								0,0
								<cursor />
							</text>
						</paragraph>
					</td>
					<td>
						<paragraph>0,1</paragraph>
					</td>
				</tr>
			</table>
			<paragraph>
				<text />
			</paragraph>
		</document>
	</value>
)
