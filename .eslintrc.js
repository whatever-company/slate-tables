module.exports = {
	extends: [
		'standard',
		'standard-react',
		'plugin:react/recommended',
		'prettier',
		'prettier/react',
		'prettier/standard'
	],
	plugins: ['babel', 'prettier', 'standard', 'react', 'react-hooks'],
	parser: 'babel-eslint',
	env: {
		es6: true,
		browser: true
	},
	settings: {
		react: {
			version: '16.4'
		}
	},
	parserOptions: {
		ecmaFeatures: {
			legacyDecorators: true
		}
	},
	overrides: [
		{
			files: ['**/testutils/**', '**/tests/**/*.{js,jsx}', '**/*.test.{js,jsx}', '**/jest.setup.js'],
			env: {
				browser: false,
				jest: true
			},
			globals: {
				MouseEvent: false
			}
		}
	],
	rules: {
		'import/no-duplicates': 0,
		'no-duplicate-imports': 'error',
		'prettier/prettier': 'error',
		'react/prop-types': 'off',
		'react/display-name': 'off',
		'react/no-find-dom-node': 'off',
		'no-useless-return': 'off',
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'no-unused-vars': [
			'error',
			{
				args: 'none',
				vars: 'local',
				varsIgnorePattern: '^debug|^_+$'
			}
		],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error'
	}
}
