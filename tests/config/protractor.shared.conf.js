'use strict';
const argv = require('yargs').argv;
const fs = require('fs-extra');
const path = require('path');

exports.config = {
    /**
     * Protractor specific
     */
    allScriptsTimeout: 110000,
    disableChecks: true,
    SELENIUM_PROMISE_MANAGER: false,

    beforeLaunch: () => {
        console.log(`\n==========================================================================`);
        console.log(`\nThe directory './tmp', which holds reports / screenshots is being removed.\n`);
        console.log(`==========================================================================\n`);
        fs.removeSync('./.tmp');
    },

    /**
     * CucumberJS specific
     */
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        compiler: "ts:ts-node/register",
        require: [
            path.resolve(process.cwd(), './tests/**/after.scenario.ts'),
            path.resolve(process.cwd(), './tests/**/cucumber.config.ts'),
            path.resolve(process.cwd(), './tests/**/*.steps.ts')
        ],
        format: 'json:.tmp/results.json',
        tags: argv.tags || ''
    },
    specs: getFeatureFiles(),

    /**
     * From `protractor-cucumber-framework`, allows cucumber to handle the 199
     * exception and record it appropriately
     */
    ignoreUncaughtExceptions: true,

    /**
     * The new reporting plugin
     */
    plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
            automaticallyGenerateReport: true,
            metadataKey: 'deviceProperties',
            removeExistingJsonReportFile: true,
            removeOriginalJsonReportFile: true
        }
    }],
    onPrepare: function () {
        /**
         * If you are testing against a non-angular site - set ignoreSynchronization setting to true
         *
         * If true, Protractor will not attempt to synchronize with the page before
         * performing actions. This can be harmful because Protractor will not wait
         * until $timeouts and $http calls have been processed, which can cause
         * tests to become flaky. This should be used only when necessary, such as
         * when a page continuously polls an API using $timeout.
         *
         * @type {boolean}
         */
        browser.ignoreSynchronization = true;
      },
};

/**
 * Get the featurefiles that need to be run based on an command line flag that is passed, if nothing is passed all the
 * featurefiles are run
 *
 * @example:
 *
 * <pre>
 *     // For 1 feature
 *     npm run e2e -- --feature=playground
 *
 *     // For multiple features
 *     npm run e2e -- --feature=playground,dashboard,...
 *
 *     // Else
 *     npm run e2e
 * </pre>
 */
function getFeatureFiles() {
    if (argv.feature) {
        return argv.feature.split(',').map(feature => `${process.cwd()}/tests/**/${feature}.feature`);
    }

    return [`${process.cwd()}/tests/**/*.feature`];
}
