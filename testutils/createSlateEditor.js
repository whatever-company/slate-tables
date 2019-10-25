import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { Editor } from 'slate-react'

export default function createSlateEditor(props, value) {
	const renderer = new ShallowRenderer()
	renderer.render(React.createElement(Editor, { onChange: () => {}, value, ...props }, null))
	const editor = renderer.getRenderOutput().props.editor
	return editor
}
