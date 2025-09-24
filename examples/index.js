import React from 'react'
import { render } from 'react-dom'
import { Editor } from 'slate-react'
import value from './value'
import TablePlugin from '../lib'

const Button = ({ onClick, children }) => {
	const handleClick = event => {
		event.preventDefault()
		event.stopPropagation()
		onClick(event)
	}
	const onFocus = event => {
		event.preventDefault()
		event.stopPropagation()
	}
	return (
		<button onClick={handleClick} onFocus={onFocus}>
			{children}
		</button>
	)
}
class TableEditor extends React.Component {
	constructor(props) {
		super(props)
		this.plugins = [TablePlugin({ enterCreatesRow: false })]
		this.state = {
			value
		}
	}

	handleChange = ({ value }) => {
		this.setState({ value })
	}

	renderBlock = (props, editor, next) => {
		switch (props.node.type) {
			case 'table':
				return (
					<table {...props.attributes}>
						<colgroup contentEditable={false}>
							{props.node.data.get('columns', []).map((col, index) => (
								<col key={index} width={col.width} />
							))}
						</colgroup>
						<tbody>{props.children}</tbody>
					</table>
				)
			case 'table-row':
				return <tr {...props.attributes}>{props.children}</tr>
			case 'table-cell':
				return (
					<td
						{...props.attributes}
						colSpan={props.node.data.get('colspan', 1)}
						rowSpan={props.node.data.get('rowspan', 1)}
					>
						{props.children}
					</td>
				)
			case 'paragraph':
				return <p {...props.attributes}>{props.children}</p>
			case 'ul':
				return <ul {...props.attributes}>{props.children}</ul>
			case 'li':
				return <li {...props.attrivutes}>{props.children}</li>
		}
		return next()
	}

	render() {
		console.log('VALUE', this.state.value.toJS())
		return (
			<React.Fragment>
				<h1>Examples</h1>
				{this.editor?.isInTable() && (
					<div>
						<Button onClick={() => this.editor.insertColumn()}>Insert column</Button>
						<Button onClick={() => this.editor.insertRow()}>Insert row</Button>
						<Button onClick={() => this.editor.insertRowAtEnd()}>Insert row at end</Button>
						<Button onClick={() => this.editor.deleteRow()}>Delete row</Button>
						<Button onClick={() => this.editor.deleteColumn()}>Delete column</Button>
						<Button onClick={() => this.editor.increaseColspanAtKey(this.editor.value.selection.start.key)}>
							+ colspan
						</Button>
						<Button onClick={() => this.editor.increaseRowspanAtKey(this.editor.value.selection.start.key)}>
							+ rowspan
						</Button>
						<Button
							disabled={!this.editor || !this.editor.canDecreaseRowspanAtKey(this.editor.value.selection.start.key)}
							onClick={() => this.editor.decreaseRowspanAtKey(this.editor.value.selection.start.key)}
						>
							- rowspan
						</Button>
						<Button onClick={() => this.editor.decreaseColspanAtKey(this.editor.value.selection.start.key)}>
							- colspan
						</Button>
						<Button onClick={() => this.editor.deleteTable()}>Delete table</Button>
					</div>
				)}
				<Editor
					ref={ref => (this.editor = ref)}
					plugins={this.plugins}
					value={this.state.value}
					onChange={this.handleChange}
					renderBlock={this.renderBlock}
				/>
				<div>
					<pre>
						<code className="language-json">
							{JSON.stringify(this.state.value.toJSON({ preserveKeys: true }), null, 2)}
						</code>
					</pre>
				</div>
			</React.Fragment>
		)
	}
}

render(<TableEditor />, document.getElementById('root'))
