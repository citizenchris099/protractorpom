/**
 * Created by chrismanning on 2/28/17.
 */
var spectrum_mobile_assets = function () {
};
var basePage = require('./page.js').page;
var loginPage = require('./spectrum_login_page.js').spectrum_login_page;

var flow = protractor.promise.controlFlow();
function waitOne() {
    return protractor.promise.delayed(2000);
}

function sleep() {
    flow.execute(waitOne);
};

var wait = basePage.altWait();

/**
 * elements
 */
var assetsTabMain = function () {
    return element(by.xpath("//div[@class='assetslocations']"));
};

var assetsHeader = function () {
    return element(by.xpath("//span[@class='appheader-title'][.='assets']"));
};

/**
 * actions
 */
var checkForAssetsTabMain = function () {
    return basePage.checkForElement(assetsTabMain(),'assets tab main');
};

var checkAssetsHeader = function () {
    return basePage.checkForElement(assetsHeader(),'assets header')
};

/**
 * services
 */
spectrum_mobile_assets.prototype.checkAssetsTab = function () {
    return checkAssetsHeader().then(
        function () {
            checkForAssetsTabMain();
        });
};

exports.spectrum_mobile_assets = new spectrum_mobile_assets();