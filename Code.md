# Cypress

- `cypress open`
- Tests in `smoke.js`
- Add testing library in `support/commands.js`

# Lint staged

- Configured here: `lint-staged.config.js`
- Run `npx lint-staged` after every `git add .` .



# TODO


Add this to `package.json`, after fixing linting issues
`
"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
`