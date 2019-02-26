## Custom Reporters

 To generate an HTML view of your test reports, you can use
[cucumber-html-reporter](https://github.com/gkushang/cucumber-html-reporter).

 ### Step 1 - Installing dependencies

 ```terminal
npm install --save-dev cucumber-html-reporter npm-run-all
```

 ### Step 2 - Create a reports config file

 This script is executed _after_ your test suites have completed, and sets various options on the reporter.

 ```js
// reports.conf.js
 const reporter = require('cucumber-html-reporter');
 const options = {
    theme: 'simple',
    jsonFile: 'report.json',
    output: 'report.html',
    reportSuiteAsScenarios: true,
    launchReport: true,
};
 reporter.generate(options);
```

 For details on available options, see the
[Cucumber HTML Reporter documentation](https://github.com/gkushang/cucumber-html-reporter#usage).

 ### Step 3 - Update your npm scripts

 You may have noticed in the first step we installed `npm-run-all`. This lets us run a sequence of npm scripts, while
avoiding cross platform issues operators such as `&&` introduce. Another handy feature is the ability to continue the
sequence when a previous script fails. This is important because we want to generate a test report even when our tests
fail, and cause Nightwatch to throw an error.

 ```js
// package.json
{
    ...
    "scripts": {
        "e2e-test": "npm-run-all ---continue-on-error e2e-test-run e2e-test-report",
        "e2e-test-run": "cucumber-js --require cucumber-setup.js --require step-definitions --format json:report.json",
        "e2e-test-report": "node report.conf.js",
        ...
    }
    ...
}
```

 Notice we have replaced the `cucumber-pretty` formatter with the built in `json` formatter. This generates a JSON
report which is used by `cucumber-html-reporter` to generate the HTML report.

 If you no longer require `cucumber-pretty` you can remove it with the following command.

 ```terminal
npm uninstall cucumber-pretty
```

 ### Step 4 - Run the tests

 ```terminal
npm run e2e-test
```

 When the test run completes, the HTML report is displayed in a new browser tab.

 Example reports are available in the
[Cucumber HTML Reporter documentation](https://github.com/gkushang/cucumber-html-reporter#preview-of-html-reports).
