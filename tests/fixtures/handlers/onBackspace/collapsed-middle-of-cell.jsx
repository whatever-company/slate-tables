/** @jsx h */

import { h } from 'testutils/hyperscript'

export default editor => {
	editor.run('onKeyDown', { preventDefault() {}, key: 'Backspace' })
}

export const value = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>0,0</paragraph>
					</td>
					<td>
						<paragraph>
							<text>
								Cell
								<cursor /> 0,1
							</text>
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

export const output = (
	<value>
		<document>
			<table>
				<tr>
					<td>
						<paragraph>0,0</paragraph>
					</td>
					<td>
						<paragraph>
							<text>
								Cel
								<cursor /> 0,1
							</text>
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
