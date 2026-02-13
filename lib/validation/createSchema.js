import { createRowNode, createCellNode, createContentNode } from '../utils.js'

export default ({ blocks }) => {
	return {
		blocks: {
			[blocks.table]: {
				nodes: [{ match: { type: blocks.row }, min: 1 }],
				normalize: (editor, error) => {
					switch (error.code) {
						case 'child_type_invalid':
							editor.wrapBlockByKey(error.child.key, blocks.row)
							break
						case 'child_min_invalid':
							editor.insertBlockAtKey(error.node.key, createRowNode({ blocks }))
							break
					}
				}
			},
			[blocks.row]: {
				nodes: [{ match: { type: blocks.cell }, min: 0 }],
				normalize: (editor, error) => {
					switch (error.code) {
						case 'child_min_invalid':
							editor.insertBlockAtKey(error.node.key, createCellNode({ blocks }))
							break
						case 'child_type_invalid':
							editor.wrapBlockByKey(error.child.key, blocks.cell)
					}
				}
			},
			[blocks.cell]: {
				nodes: [{ min: 1 }],
				normalize: (editor, error) => {
					switch (error.code) {
						case 'child_min_invalid':
							editor.insertBlockAtKey(error.node.key, createContentNode({ blocks }))
							break
						case 'child_type_invalid':
							editor.wrapBlockByKey(error.child.key, blocks.content)
					}
				}
			}
		}
	}
}
