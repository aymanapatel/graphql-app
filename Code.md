# Cypress

- `cypress open`
- Tests in `smoke.js`
- Add testing library in `support/commands.js`



# Jest

https://www.gatsbyjs.org/docs/unit-testing/
https://jestjs.io/

# Lint staged

- Configured here: `lint-staged.config.js`
- Run `npx lint-staged` after every `git add .` .


# TODO

Fix lint issue for Jest and add this to `package.json`


```
"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
```

