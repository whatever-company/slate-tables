import fixtures from 'testutils/fixtures'
import createSlateEditor from 'testutils/createSlateEditor'
import Plugin from 'lib/index'

const formatMatrix = matrix => {
	return matrix.map(row => row.map(cell => [cell.virtual, cell.ref.key]))
}

fixtures(__dirname, './fixtures', ({ module }) => {
	const { props, value } = module
	if (!value) {
		throw new Error('No value defined')
	}
	const editor = createSlateEditor({ plugins: [Plugin()], ...props }, value)
	const table = editor.getTableAtKey(editor.value.document.nodes.first().key)
	expect(formatMatrix(table.matrix)).toMatchSnapshot()
})
