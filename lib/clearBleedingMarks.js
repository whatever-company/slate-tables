/**
 * Clear any active marks that bled in from another cell via Slate's mark resolution.
 * Only clears when the cursor is in an empty unmarked text node, meaning the active
 * marks bled in from a different cell.
 */
export default function clearBleedingMarks(editor) {
	const { value } = editor
	if (value.selection.isCollapsed) {
		const startText = value.startText
		if (startText && startText.text === '' && startText.marks.size === 0) {
			value.activeMarks.forEach(mark => editor.removeMark(mark))
		}
	}
}
