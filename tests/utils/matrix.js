import fixtures from 'testutils/fixtures'
import createSlateEditor from 'testutils/createSlateEditor'
import Plugin from 'lib/index'

const formatMatrix = matrix => {
	return matrix.map(row => row.map(cell => [cell.virtual, cell.ref.key]))
}

/** One line per row, cells shown by their text, `^` marking the slots a cell spans into */
const renderMatrix = matrix =>
	matrix.map(row => row.map(({ ref, virtual }) => (virtual ? `^${ref.text}` : ref.text)).join(' | ')).join('\n')

const normalizeGrid = grid =>
	grid
		.trim()
		.split('\n')
		.map(line =>
			line
				.split('|')
				.map(cell => cell.trim())
				.join(' | ')
		)
		.join('\n')

fixtures(import.meta.dirname, './fixtures', ({ module }) => {
	const { props, value, expected } = module
	if (!value) {
		throw new Error('No value defined')
	}
	const editor = createSlateEditor({ plugins: [Plugin()], ...props }, value)
	const table = editor.getTableAtKey(editor.value.document.nodes.first().key)
	if (expected) {
		expect(normalizeGrid(renderMatrix(table.matrix))).toBe(normalizeGrid(expected))
	} else {
		expect(formatMatrix(table.matrix)).toMatchSnapshot()
	}
})
