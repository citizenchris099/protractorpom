/**
 * Created by chrismanning on 2/27/17.
 */
var spectrum_mobile_top_sideBar = function() {
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
var sideMenuButton = function () {
    return element(by.xpath("//div[@class='appheader-left'][span[@class='appheader-menu']]"))
        .element(by.xpath(".//i[contains(@class,'touchable')]"));
};

var sideMenuMain = function () {
    return element(by.xpath("//div[@class='nav'][div[@class='navmenu']]"))
}

var sideMenuSectionLink = function (value) {
    return sideMenuMain().element(by.xpath("//a[@class='navmenu-body-link']" +
        "[span[@class='navmenu-body-link-text'][.='"+value+"']]"));
};

var signOutButton = function () {
    return sideMenuMain().element(by.xpath("//button[.='Sign Out']"));
};

/**
 * actions
 */
var expandSideMenu = function () {
    return basePage.waitThenClick(sideMenuButton(),'side menu button')
};

var selectSideNavSection = function (value) {
    return expandSideMenu().then(
        function () {
            basePage.waitThenClick(sideMenuSectionLink(value),'side menu link '+value);
        });
};

var signOut = function () {
    return expandSideMenu().then(
        function () {
            basePage.waitThenClick(signOutButton(),'sign out button').then(
                function () {
                    loginPage.isLoginPageLoaded();
                });
        });
}

/**
 * services
 */
spectrum_mobile_top_sideBar.prototype.navToWorkSection = function () {
    return selectSideNavSection("Work");
};

spectrum_mobile_top_sideBar.prototype.navToLocationsSection = function () {
    return selectSideNavSection("Locations");
};

spectrum_mobile_top_sideBar.prototype.navToAssetsSection = function () {
    return selectSideNavSection("Assets");
};

spectrum_mobile_top_sideBar.prototype.signOutOfMobile = function () {
    return signOut();
}


exports.spectrum_mobile_top_sideBar = new spectrum_mobile_top_sideBar();