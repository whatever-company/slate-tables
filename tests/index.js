import fixtures from 'testutils/fixtures'
import Plugin from 'lib/index'
import createSlateEditor from 'testutils/createSlateEditor'

fixtures(__dirname, './fixtures', ({ module }) => {
	const { props, default: fn, value, output } = module
	if (!value) {
		throw new Error('No value defined')
	}
	const editor = createSlateEditor({ plugins: [Plugin()], ...props }, value)
	fn(editor)
	if (output) {
		expect(editor.value).toMatchSlateValue(output)
	}
})
