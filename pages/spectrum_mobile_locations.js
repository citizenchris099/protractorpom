/**
 * Created by chrismanning on 2/28/17.
 */
var spectrum_mobile_locations = function () {
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
var locationsTabMain = function () {
    return element(by.xpath("//div[@class='assetslocations']"));
};

var locationHeader = function () {
    return element(by.xpath("//span[@class='appheader-title'][.='locations']"));
};

/**
 * actions
 */
var checkForLocationsTabMain = function () {
    return basePage.checkForElement(locationsTabMain(),'location tab main');
};

var checkLocationHeader = function () {
    return basePage.checkForElement(locationHeader(),'location header')
}

/**
 * services
 */
spectrum_mobile_locations.prototype.checkLocationTab = function () {
    return checkLocationHeader().then(
        function () {
            checkForLocationsTabMain();
        });
};

exports.spectrum_mobile_locations = new spectrum_mobile_locations();