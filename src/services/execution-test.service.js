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
    let dirname = pathLib.resolve(`./${path}`);

    try {
        if (checkExistsFile(dirname) && checkFormatedFile(dirname) && checkKRformatedFile(dirname)) {
            if (options.data) {
                if (options.report && checkExistsFile(pathLib.resolve(`./${options.report}`))) {
                    let dataMap = options.data.split(',').map(el => {
                        return {
                            name: el.split('/').pop(),
                            dirname: pathLib.resolve(`./${el}`)
                        };
                    });

                    if (dataMap.every(el => checkExistsFile(el.dirname)) == true && checkDataFilesinHTML(dirname, dataMap) == true) {
                        return openBrowser(browser)
                            .then((driver) => socketExecution(driver, dirname, dataMap, options.report));
                    } else {
                        return openBrowser(browser)
                            .then((driver) => socketExecution(driver, dirname, undefined, options.report));
                    }
                }
            } else {
                log("The path of ReportLog is not valid. Please try again!", true);
            }
        } else {
            log("The path is not valid. Please try again!", true);
        }
    } catch (error) {
        log(`Error: ${error}`, true);
        throw error;
    }
}

module.exports = {
    executionTestService
}