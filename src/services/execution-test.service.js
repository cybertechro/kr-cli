const pathLib = require('path');
const {
    checkExistsFile,
    checkFormatedFile,
    checkKRformatedFile,
    checkDataFilesinHTML,
    log
} = require("../helpers/handle-file.helper");

const { openBrowser } = require("../helpers/run-browser.helpers");
const { socketExecution } = require("../helpers/socket-execution.helper")

const executionTestService = async function(browser, path, options) {
    let dirname = `${appRoot.split('src')[0]}${browser}/${path}`;

    try {
        if (checkExistsFile(dirname) && checkFormatedFile(dirname) && checkKRformatedFile(dirname)) {
            if (options.data) {
                let dataMap = options.data.split(',').map(el => {
                    return {
                        name: el,
                        dirname: `${appRoot.split('src')[0]}datafiles/${el}`
                    };
                });

                if (dataMap.every(el => checkExistsFile(el.dirname)) == true && checkDataFilesinHTML(dirname, dataMap) == true) {
                    if (options.report && checkExistsFile(pathLib.resolve(options.report))) {
                        return openBrowser(browser)
                            // .then(() => socketExecution(dirname, dataMap, options.report));
                    } else {
                        return openBrowser(browser)
                            // .then(() => socketExecution(dirname, dataMap));
                    }
                }
            } else {
                return openBrowser(browser)
                    // .then(() => socketExecution(dirname));
            }

        } else {
            log("The path is not valid. Please try again!", true)
        }
    } catch (error) {
        log(`Error: ${error}`, true);
        throw error;
    }
}

module.exports = {
    executionTestService
}