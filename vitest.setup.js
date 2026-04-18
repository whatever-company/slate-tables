import { expect } from 'vitest'

expect.extend({
	toMatchSlateValue(received, expected) {
		const receivedDocument = received?.toJSON({ preserveSelection: true })
		const expectedDocument = expected?.toJSON({ preserveSelection: true })
		const pass = this.equals(receivedDocument, expectedDocument)
		const message = () =>
			`Expected Slate values to ${pass ? 'not ' : ''}match:\n${this.utils.diff(expectedDocument, receivedDocument)}`
		return { actual: received, message, pass }
	}
})
