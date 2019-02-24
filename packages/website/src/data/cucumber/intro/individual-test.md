## Executing individual feature files or scenarios

Single feature file

```bash
npm run test -- features/google-search.feature
```

Multiple feature files

```bash
npm run test -- features/google-search.feature features/duckduckgo-search.feature
```

Single feature file and one folder

```bash
npm run test -- features/google/google-search.feature features/duckduckgo
```

Single scenario by its line number

```bash
npm run test -- features/duckduckgo-search.feature:9
```
