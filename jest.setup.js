import isEqual from 'lodash.isequal'
import diff from 'jest-diff'

expect.extend({
	toMatchSlateValue(received, expected) {
		const receivedDocument = received.toJSON({ preserveSelection: true })
		const expectedDocument = expected.toJSON({ preserveSelection: true })
		const pass = isEqual(receivedDocument, expectedDocument)
		const message = () => `Difference ${pass}:\n${diff(expectedDocument, receivedDocument)}`
		return { actual: received, message, pass }
	}
})
