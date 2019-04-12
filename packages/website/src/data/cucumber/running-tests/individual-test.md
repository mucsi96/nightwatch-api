## Executing individual feature files or scenarios

Single feature file

```bash
npm run e2e-test -- features/google-search.feature
```

Multiple feature files

```bash
npm run e2e-test -- features/google-search.feature features/duckduckgo-search.feature
```

[Glob](https://github.com/isaacs/node-glob#glob-primer) pattern

```bash
npm run e2e-test -- features/**/*.feature
```

Feature directory

```bash
npm run e2e-test -- features/dir
```

Scenario by its line number

```bash
npm run e2e-test -- features/my_feature.feature:3
```

Scenario by its name matching a regular expression

```bash
npm run e2e-test -- --name "topic 1"
```
