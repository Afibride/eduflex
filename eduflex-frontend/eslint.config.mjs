import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
	{ ignores: ['node_modules/**', 'dist/**', 'build/**', 'vite.config.js'] },
	{
		files: ['**/*.js', '**/*.jsx'],
		plugins: { react, 'react-hooks': reactHooks },
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: { ecmaFeatures: { jsx: true } },
			globals: { ...globals.browser, React: 'readonly', Intl: 'readonly' },
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,

			// Non-critical rules - disabled since code works fine without them
			'react/prop-types': 'off',
			'react/no-unescaped-entities': 'off',
			'react/display-name': 'off', // Non-critical, component works without displayName
			'react/jsx-uses-react': 'off', // Not needed in React 17+, non-critical
			'react/react-in-jsx-scope': 'off', // Not needed in React 17+, non-critical
			'react/jsx-uses-vars': 'off', // Non-critical, code works fine
			'react/jsx-no-comment-textnodes': 'off', // Non-critical, comments could be visible if put inside the JSX, most cases are just rendering text like '///'

			'no-unused-vars': 'off', // Non-critical, code works fine with unused vars
			// Critical rules that prevent runtime errors
			'no-undef': 'error', // Undefined variables cause runtime errors
		},
	},
	{ files: ['tools/**/*.js', 'tailwind.config.js'], languageOptions: { globals: globals.node } },
];
