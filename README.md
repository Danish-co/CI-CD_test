# CI/CD Learning

A tiny Node.js calculator used to practice Continuous Integration and Continuous Deployment (CI/CD).

There is no web server and almost no dependencies. The goal is to learn pipeline basics with a project that is easy to understand.

## What this project does

The app is a small calculator module with four functions:

- `add(a, b)`
- `subtract(a, b)`
- `multiply(a, b)`
- `divide(a, b)`

Source code lives in `src/`. Automated tests live in `test/`. A simple build step copies the source into `dist/`.

## How to install dependencies

This project uses Node.js’s built-in test runner, so there are no extra packages to install for testing. You can still run:

```bash
npm install
```

That prepares the project the same way most Node.js apps do (and the way a CI pipeline usually starts).

## How to run tests

```bash
npm test
```

This runs Node’s built-in test runner (`node --test`) against the files in `test/`.

## How to run the build

```bash
npm run build
```

This runs `scripts/build.js`, which creates a `dist/` folder and copies everything from `src/` into it.

## What the directories mean

| Directory | Purpose |
|-----------|---------|
| `src/` | Application source code (the calculator module) |
| `test/` | Automated tests that check the calculator works |
| `dist/` | Build output — created by `npm run build`, ready to treat as “what you would deploy” |

`dist/` is generated, so it is listed in `.gitignore` and should not be committed.
