const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

function encode(file) {
    const dirname = appRoot.split('src')[0];
    const stream = require('fs').readFileSync(dirname + file);
    return Buffer.from(stream).toString('base64');
}

const openBrowser = async(browser) => {
    require('chromedriver');
    require('geckodriver');
    const driver = new webdriver.Builder()
        .forBrowser(browser);
    switch (browser) {
        case 'chrome':
            {
                const options = new chrome.Options();
                options.addArguments("disable-infobars");
                options.addArguments("start-maximized");
                options.addExtensions(encode("katalon-recorder/ljdobmomdgdljniojadhoplhkpialdid_main.crx"));

                driver.withCapabilities(webdriver.Capabilities.chrome())
                .setChromeOptions(options)
                .build();

                break;
            }
        case 'firefox':
            {
                const dirname = appRoot.split('src')[0] + "katalon-recorder/Archive.zip";
                const options = new firefox.Options();
                options.addExtensions(dirname);

                driver.setFirefoxOptions(options)
                .build();

                break;
            }
        default:
            break;
    }
    return driver;
};

module.exports = {
    openBrowser
}