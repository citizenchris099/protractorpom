var spectrum_login_page = function() {
};
var basePage = require('./page.js').page;

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

var interstitial = function () {
    return  basePage.interstitial()
};

var userNameField = function() {
	return element(by.xpath("//div[contains(@class,'formcontrol')]" +
        "[contains(@class,'login-form-username-input')]"));
};

var passwordField = function() {
	return element(by.xpath("//div[contains(@class,'formcontrol')]"+
        "[contains(@class,'login-form-password-input')]"));
};

var submitButton = function() {
	return element(by.xpath("//button[contains(@class,'login-form-submit')]"));
};

var errorMsg = function(value) {
	return element(by.xpath("//p[@class='text-danger'][contains(text(), '" + value + "')]"));
};

var desktopAppMain = function(){
    return element(by.xpath("//div[contains(@class,'desktop-app-root')]"))
};

var mobileAppMain = function () {
    return element(by.xpath("//div[contains(@class,'mobile-app-wrap')]"));
};

var adminBand = function () {
    return element(by.xpath("//div[@class='adminband']"))
}

/**
 * actions
 */
var login = function(uName,pWord,mobile){
    return basePage.clickThenSendKeys(userNameField(),uName, protractor.Key.TAB,"log in page" +
        " username field").then(
        function () {
            basePage.clickThenSendKeys(passwordField(),pWord, protractor.Key.TAB,"log in page" +
                " password field").then(
                function () {
                    basePage.waitThenClick(submitButton(),"login page submit button").then(
                        function () {
                            basePage.interstitialWait(interstitial()).then(
                                function () {
                                    var mainElement;
                                    if(typeof mobile!='undefined'){
                                        mainElement = mobileAppMain();
                                    }else {
                                        mainElement = desktopAppMain();
                                    }
                                    browser.wait(protractor.ExpectedConditions.presenceOf(
                                        mainElement), wait).then(
                                            function () {
                                            },function (err) {
                                            throw new Error("log in timed out: "+err.stack+"\n" +
                                                " -----------");
                                        }
                                    )
                                })
                        })
                })
        })
}

var logInFailMsg = function(value) {
	expect(errorMsg(value).isPresent()).toBe(true);
};

var loginPageCheck = function () {
    return browser.wait(protractor.ExpectedConditions.presenceOf(userNameField()),wait);
}

/**
 * services
 */
spectrum_login_page.prototype.taskingLogin = function(uName, pWord,mobile) {
	return login(uName, pWord,mobile);
};

spectrum_login_page.prototype.taskingLoginFail = function(uName, pWord, msg) {
	logIn(uName, pWord);
	logInFailMsg(msg);
};

spectrum_login_page.prototype.isLoginPageLoaded = function() {
    return loginPageCheck();
};

exports.spectrum_login_page = new spectrum_login_page();
