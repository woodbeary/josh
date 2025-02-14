import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setImmediate: 'readonly',
        crypto: 'readonly',
        performance: 'readonly',
        MutationObserver: 'readonly',
        MessageChannel: 'readonly',
        RTCPeerConnection: 'readonly',
        queueMicrotask: 'readonly',
        reportError: 'readonly',
        MSApp: 'readonly',
        __REACT_DEVTOOLS_GLOBAL_HOOK__: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      'react/react-in-jsx-scope': 'off', // Since React 17, we don't need to import React for JSX
      'no-empty': 'warn',
      'no-prototype-builtins': 'warn',
      'no-constant-condition': 'warn',
      'no-useless-escape': 'warn',
      'no-control-regex': 'warn',
      'no-func-assign': 'warn',
      'getter-return': 'warn',
      'no-fallthrough': 'warn',
      'valid-typeof': 'warn',
      'no-misleading-character-class': 'warn',
      'no-cond-assign': 'warn'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]; 