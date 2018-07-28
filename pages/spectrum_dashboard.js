var spectrum_dashboard = function() {
};
var basePage = require('./page.js').page;
var spectrum_top_sideBar = require('./spectrum_top_sideBar.js').spectrum_top_sideBar;
var datePicker = require('./datePicker.js').datePicker;

var flow = protractor.promise.controlFlow();
function waitOne() {
    return protractor.promise.delayed(10000);
}

function sleep() {
    flow.execute(waitOne);
};

var wait = basePage.globalWait();


/**
 * elements
 */
var dashboardPageMain = function () {
    return element(by.xpath("/descendant::div[@class='dashboard page'][1]"))
};

var dashboardMain = function (value) {
    return dashboardPageMain().element(by.xpath(".//a[contains(@class,'page-nav-list-item-link')]" +
        "[contains(@class,'is-active')][.='"+value+"']"));
};

var dashboardMainNavLink = function (value) {
    return dashboardPageMain().element(by.xpath(".//a[contains(@class,'page-nav-list-item-link')]" +
        "[.='"+value+"']"));
};

var siteSelector = function (value) {
    return dashboardPageMain().element(by.xpath("/descendant::div[contains(@class,'Select')]" +
        "[contains(@class,'mod-reactselect')][.//div[.='"+value+"']][1]"));
};

var utilitybarMain = function () {
    return dashboardPageMain().element(by.xpath("/descendant::div[contains(@class," +
        "'page-body-utilitybar')][1]"));
};

var utilityOption = function (value) {
    return utilitybarMain().element(by.xpath("/descendant::div[@class='filtermenucol']["+value+"]"));
};


var keyMetricsMain = function () {
    return dashboardPageMain().element(by.xpath(".//div[contains(@class," +
        "'dashboardpeoplemetrics')][contains(@class,'card')][.//span[.='Key Metrics']]"))
};

var taskCountMain = function (value) {
    return keyMetricsMain().element(by.xpath(".//div[@class='dashboardpeoplemetrics-circle-content']" +
        "[div[@class='dashboardpeoplemetrics-circle-content-smalltext'][.='"+value+"']]"));
};

var taskCountValue = function (value,count) {
    return taskCountMain(value).element(by.xpath(".//div[@class='dashboardpeoplemetrics-circle-" +
        "content-bigtext'][span[.='"+count+"']]"));
};

var filterSelection = function (value) {
    return element(By.xpath("//div[@class='filtermenu-option'][.//span[.='"+value+"']]"))
        .element(by.xpath(".//i[contains(@class,'checkbox-icon-inactive')]"));
};

var performanceBreakdownMain = function () {
    return dashboardPageMain().element(by.xpath(".//div[contains(@class," +
        "'dashboardperformancebreakdown')][h4[.='Performance Breakdown']]"))
}

var siteTeamRowMain = function (value,name) {
    return performanceBreakdownMain().element(by.xpath(".//tr[@class='"+value+"-row']" +
        "[.//div[@class='u-spaceleftsm'][.='"+name+"']]"))
};

var siteTeamTasks = function (value,name,openComplete,num) {
    return siteTeamRowMain(value,name).element(by.xpath("/descendant::td[@class='u-textright'][.='"+num+"']" +
        "["+openComplete+"]"))
}


/**
 * actions
 */
var navToDashboardSection = function (value) {
    return basePage.waitThenClick(dashboardMainNavLink(value),'people dashboard link').then(
        function () {
            basePage.checkForElement(dashboardMain(value),'people dashboard active tab')
        });
};

var chooseInitialSite = function (site) {
    return basePage.waitThenClick(siteSelector("All Sites"),'All Sites site selector').then(
        function () {
            basePage.waitThenClick(basePage.dynamicMenuContent(site),'site named '+site).then(
                function () {
                    basePage.checkForElement(siteSelector(site),'site selector with value '+site);
                });
        });
};

var checkTaskCount = function (value,count) {
    return basePage.checkForElement(taskCountValue(value,count),value +
        ' count with value = '+count);
};

var selectDatRange = function (value) {
    return basePage.waitThenClick(utilityOption("1"),'dashboard date range field').then(
        function () {
            basePage.waitThenClick(basePage.dynamicMenuContent(value),'date range option '+value)
        });
};

var useFilter = function (value,option) {
    return basePage.waitThenClick(utilityOption(value),'dashboard team filter field').then(
        function () {
            basePage.waitThenClick(filterSelection(option),'option '+option).then(
                function () {
                    basePage.waitThenClick(dashboardPageMain(),'main dashboard page bar');
                });
        });

};

var checkForRow = function (value,name) {
    return basePage.checkForElement(siteTeamRowMain(value,name),'a '+value+' by the name of '+name)
};

var checkForRowCount = function (value,name,openComplete,num) {
    var openCompleteValue
    if(openCompleteValue==="1"){
        openCompleteValue = "open"
    }else{
        openCompleteValue = "completed"
    }
    return basePage.checkForElement(siteTeamTasks(value,name,openComplete,num),
        'a '+value+' by the name of '+name+' with an'+openCompleteValue+' task count = '+num);
};


/**
 * services
 */
spectrum_dashboard.prototype.navigateToPeopleDashboard = function () {
    return navToDashboardSection("People");
};

spectrum_dashboard.prototype.navigateToMaintenanceDashboard = function () {
    return navToDashboardSection("Maintenance");
};

spectrum_dashboard.prototype.navigateToEnergyDashboard = function () {
    return navToDashboardSection("Energy");
};

spectrum_dashboard.prototype.chooseFirstSite = function (site) {
    return chooseInitialSite(site);
};

spectrum_dashboard.prototype.checkOpenTaskCount = function (count) {
    sleep();
    return checkTaskCount("Opened Tasks",count);
};

spectrum_dashboard.prototype.checkCompletedTaskCount = function (count) {
    sleep();
    return checkTaskCount("Completed Tasks",count);
};

spectrum_dashboard.prototype.chooseThisWeek = function () {
    return selectDatRange("This Week")
};

spectrum_dashboard.prototype.chooseLastWeek = function () {
    return selectDatRange("Last Week")
};

spectrum_dashboard.prototype.chooseThisMonth = function () {
    return selectDatRange("This Month")
};

spectrum_dashboard.prototype.chooseLastMonth = function () {
    return selectDatRange("Last Month")
};

spectrum_dashboard.prototype.chooseThisYear = function () {
    return selectDatRange("This Year")
};

spectrum_dashboard.prototype.useTeamFilter = function (option) {
    return useFilter("2",option);
};

spectrum_dashboard.prototype.useLabelFilter = function (option) {
    return useFilter("3",option);
};

spectrum_dashboard.prototype.siteRowOpenTaskCount = function (siteName,count) {
    return checkForRowCount("site",siteName,"1",count);
};

spectrum_dashboard.prototype.siteRowCompleteTaskCount = function (siteName,count) {
    return checkForRowCount("site",siteName,"2",count);
};

spectrum_dashboard.prototype.teamRowOpenTaskCount = function (teamName,count) {
    return checkForRowCount("team",teamName,"1",count);
};

spectrum_dashboard.prototype.teamRowCompleteTaskCount = function (teamName,count) {
    return checkForRowCount("team",teamName,"2",count);
};


exports.spectrum_dashboard = new spectrum_dashboard();