var spectrum_sites_page = function () {
};
var spectrum_tasks_page = require('./spectrum_tasks_page.js').spectrum_tasks_page;
var datePicker = require('./datePicker.js').datePicker;
var phraseGen = require('./phraseGen.js').phraseGen;
var basePage = require('./page.js').page;

var newSiteName = phraseGen.randomPhrase();

var locatorMap = new Map();
/**
 * locators: top
 */

/**
 * locators: new site modal
 */
locatorMap.set("newSiteModal", by.xpath("//div[@class='modal-content'][div[div[contains(text(), 'New Site')]]]"));
locatorMap.set("newSiteModalName", by.xpath(".//input[@type='text']"));
locatorMap.set("newSiteModalCancel", by.xpath(".//button[contains(text(), 'Cancel')]"));
locatorMap.set("newSiteModalCreateSite", by.xpath(".//button[contains(text(), 'Create Site')]"));
locatorMap.set("dupeAsset", by.xpath(".//a[contains(@class,'mod-copy')][i[contains(@class,'content-copy')]]"))
locatorMap.set("closeModal", by.xpath(".//a[contains(@class, 'scimodal-content-closebtn')][i[contains(@class, 'close')]]"))


var flow = protractor.promise.controlFlow();
function waitOne() {
    return protractor.promise.delayed(2000);
}

function sleep() {
    flow.execute(waitOne);
};

var wait = basePage.globalWait();

/**
 * elements
 */
var interstitial = function () {
    return  basePage.interstitial()
};

/**
 * elements: top
 */
var newSite = function () {
    return element(by.xpath("//button[.='New Site']"));
};

/**
 * elements: new site modal
 */
var newSiteModal = function () {
    return element(by.xpath("//div[@class='scimodal-content'][.//*[.='New Site']]"));
};

var newSiteModalNameField = function () {
    return newSiteModal().element(by.xpath(".//input[@label='Site Name']"));
};

var newSiteModalCancelButton = function () {
    return newSiteModal().element(locatorMap.get("newSiteModalCancel"));
};

var newSiteModalCreateButton = function () {
    return newSiteModal().element(by.xpath(".//button[.='Create Site']"));
};

var closeToastMsg = function () {
    return element(by.xpath("//div[@class='sysmsg-content-close']"))
};

/**
 * elements: site list
 */
var siteListMain = function () {
    return element(by.xpath("//div[contains(@class,'page')][contains(@class,'sitesselectview')]"));
};

var siteMain = function () {
    return element(by.xpath("./descendant::div[contains(@class,'page')][contains(@class,'sitestab')][1]"));
};

var siteInList = function (value) {
    return siteListMain().element(by.xpath("//*[@class='sitebox'][div[div[*[.='"+value+"']]]]"));
};

var siteHeader = function (value) {
    return siteMain().element(by.xpath("//div[@class='sitestab-page-header-site']" +
        "[*[.='" + value + "']]"))
};

/**
 * elements: site section tab
 */
var siteSectionTab = function (value) {
    return siteMain().element(by.xpath("./descendant::ul[contains(@class,'page-nav-list')][1]"))
                     .element(by.xpath(".//a[.='" + value + "']"));
};

/**
 * elements: sites maintenance strategies
 */
var siteMaintenanceMain = function(){
    return siteMain().element(by.xpath(".//div[contains(@class,'page-body-content')]" +
        "[contains(@class,'sitemaintenance')]"));
};

var siteRoundsMain = function(){
    return siteMain().element(by.xpath(".//div[contains(@class,'page-body-content')]" +
        "[contains(@class,'siterounds')]"))
};

var sitesMainStratLeftNav = function(){
    return siteMaintenanceMain().element(by.xpath(".//nav[contains(@class,'tabs-nav')]" +
        "[contains(@class,'mod-left')]"))
};

var aTypeLink = function(){
    return sitesMainStratLeftNav().element(by.xpath("./descendant::li" +
        "[contains(@class,'tabs-nav-list-item')][1]"));
};

var lTypeLink = function(){
    return sitesMainStratLeftNav().element(by.xpath("./descendant::li" +
        "[contains(@class,'tabs-nav-list-item')][2]"));
};

/**
 * elements: rounds procedure modal
 */
var newRoundButton = function(){
    return siteRoundsMain().element(by.xpath(".//button[.='New Round']"));
};

var newProcedureModalMain = function(value){
    return element(by.xpath("./descendant::div[contains(@class,'flymodal-content')]" +
        "[div[contains(@class,'flymodal-content-header')][span[contains(text(),'"+value+"')]]][1]"));
};

var procModalSection = function (element,value) {
    return element.element(by.xpath(".//nav[contains(@class,'tabs-nav')]"))
        .element(by.xpath("./descendant::li[contains(@class,'tabs-nav-list-item')]["+value+"]"))
};

var procRoundModalName = function(element){
    return element.element(by.xpath(".//input[@type='text'][@name='name']"));
};

var procRoundModalDuration = function(element){
    return element.element(by.xpath(".//input[@type='number'][contains(@name,'duration')]"));
};

var procRoundModalLifeSafetyMain = function(element){
    return element.element(by.xpath(".//div[label[@class='formlabel']" +
        "[.='Contains Life & Safety Steps?']]"));
};

var lifeSafetyYes = function(element){
    return procRoundModalLifeSafetyMain(element).element(by.xpath(".//span[.='Yes']"))
};

var lifeSafetyNo = function(element){
    return procRoundModalLifeSafetyMain(element).element(by.xpath(".//span[.='No']"))
};

var lifeSafetyToggle = function (element) {
    return element.element(by.xpath(".//label[contains(@label,'Life & Safety')]"))
        .element(by.xpath(".//i[contains(@class,'checkbox-icon-inactive')]"))
};

var procRoundModalSchedulerMain = function(element){
    return element.element(by.xpath(".//div[@class='sheduleeditor']"))
};

var procRoundSelect = function(element, index){
    return procRoundModalSchedulerMain(element).all(by.xpath(".//div[@class='Select-control']"))
        .get(index)
};

var procRoundUnits = function (element,value) {
    return procRoundModalSchedulerMain(element).element(by.xpath(
        ".//div[p[contains(text(),'"+value+"')]]"
    ))
};

var procRoundSchedulerEvery = function(element, day){
    return procRoundModalSchedulerMain(element).element(by.xpath(".//span[span[.='every']]"))
        .element(by.xpath(".//span[.='"+day+"']"))
};

var procRoundSchedulerEveryInput = function(element){
    return procRoundModalSchedulerMain(element).element(by.xpath(".//span[span[.='every']]"))
                                               .element(by.xpath(".//input[@type='number']"))
};

var roundStartingOn = function(element){
    return element.element(by.xpath("./descendant::*[contains(@class,'datepicker__input')][1]"));
};

var roundDueWithin = function(element){
    return element.element(by.xpath(".//input[@type='number'][contains(@class,'mod-hasvalue')]" +
        "[@width='50']"));
};

var timePickerMain = function(element,index){
	index = index || "1";
    return element.element(by.xpath("./descendant::div[contains(@class,'timepickerwrap')]["+index+"]"))
};

var timePickerMenuMain = function(element){
    return element.element(by.xpath("./descendant::*[contains(@class,'timepicker-menu')][1]"))
}

var timePickerSection = function(element,index,value){
    return timePickerMenuMain(element).all(by.xpath(
        ".//div[contains(@class,'timepicker-menu-section')]")).get(index)
        .element(by.xpath("./descendant::div[contains(@class,'timepicker-menu-item" +
            " ')][contains(text(),'"+value+"')][1]"))
};

var addAStep = function(element){
    return element.element(by.xpath("./descendant::*[.='Add a Step'][1]"))
};

var stepRowMain = function (element,index) {
    return element.element(by.xpath(".//div[contains(@class,'scitable-row')]" +
        "[.//span[@class='scitable-row-number'][.='"+index+"']]"));
};

var stepTabRowMain = function (element,index) {
    return element.element(by.xpath(".//div[@class='newroundmodal-step']" +
        "[*[.='"+index+"'][contains(@class,'newroundmodal-step-index')]]"))
}

var procStepRowMain = function (element,index) {
    return element.element(by.xpath(".//*[contains(@class,'scitable-body')]" +
        "[.//span[@class='scitable-row-number'][.='"+index+"']]"));
};

var stepDescription = function (element,index) {
    return stepRowMain(element,index).element(by.xpath(".//textarea[contains(@class," +
        "'formcontrol-textarea-input')]"));
};

var stepTabDescription = function (element,index) {
    return stepTabRowMain(element,index).element(by.xpath(".//textarea[contains(@class," +
        "'formcontrol-textarea-input')]"));
};

var stepLAndSCheckBox = function(element,index){
    return stepTabRowMain(element,index).element(by.xpath(".//label[contains(@label,'Life &" +
        " Safety')]"))
        .element(by.xpath("./descendant::i[contains(@class,'checkbox')][1]"));
}

var stepLocAsset = function (element,index,index2) {
    return stepTabRowMain(element,index).element(by.xpath("./descendant::div[@class='" +
        "Select-placeholder']["+index2+"]"));
};

var stepReading = function (element,index) {
    return stepTabRowMain(element,index).element(by.xpath(".//div[@class='Select-placeholder']" +
        "[contains(text(),'Readings')]"))
};

var procModalDistributeTasks = function (element) {
    return element.element(by.xpath(".//button[.//span[contains(text()," +
        "'Distribute Tasks Evenly')]]"));
};

var procModalDistributeTasksDisabled = function (element) {
	return element.element(by.xpath(".//button[@disabled][.//span[contains(text()," +
	                                "'Distribute Tasks Evenly')]]"));
};

var distributeTasksToolTip = function (element) {
    return element.element(by.xpath(".//div[@class='panel'][.//*[contains(text(),'When you choose" +
        " to distribute a task evenly, Flywheel will stagger task creation.')]]"));
};

var procModalLocAssetRow = function (element,value) {
    return element.element(by.xpath("./descendant::div[contains(@class," +
        "'newroundmodal-tabpane-assets-table-row')][.//span[.='"+value+"']][1]"))
        .element(by.xpath(".//i[contains(@class,'checkbox-icon-inactive')]"))
};

var procModalSelectAllLocAsset = function (element) {
    return element.element(by.xpath(".//span[@class='checkbox-text'][.='Select All']"));
};

var completeProcRound = function(element, value){
    return element.element(by.xpath(".//*[contains(text(),'"+value+"')][contains(@class,'btn')]"))
};

var roundRowName = function(rName,index){
    var indexToUse
    if(typeof index==='undefined'){
        indexToUse = 0
    }else{
        indexToUse = index
    }
    return element.all(by.xpath("//div[contains(@class,'expandingtable-row')]" +
        "[.//span[@class='scitable-celltext'][contains(text(),'"+rName+"')]]")).get(indexToUse);
};

var roundDetailsMain = function(rName,index){
    return roundRowName(rName,index).element(by.xpath("./descendant::div[@class='expandingtable-content-body'][1]"))
};

var roundDetRowOneTow = function(rName,main,detail,index){
    return roundDetailsMain(rName,index).element(by.xpath("./descendant::*[.//*[contains(text(),'"+main+"')]][1]"))
        .element(by.xpath("./descendant::*[contains(text(),'"+detail+"')][1]"));
};

var roundDetSteps = function (index1, index2,value,index) {
    return stepRowMain(roundDetailsMain(index1,index),index2)
        .element(by.xpath(".//*[contains(text(),'"+value+"')]"))
};

var procDetSteps = function (index1, index2,value,index) {
    return procStepRowMain(roundDetailsMain(index1,index),index2)
        .element(by.xpath(".//*[contains(text(),'"+value+"')]"))
};

var modARound = function (rName, value,index) {
    return roundRowName(rName,index).element(by.xpath("./descendant::*[contains(text(),'"+value+"')][1]"))
}

/**
 * elements: strategies
 */
var typesWOProc = function () {
    return element(by.xpath("//*[@label='Hide types without procedures']" +
        "[contains(@class,'is-checked')]"))
};

var typesWOProcUnchecked = function () {
    return element(by.xpath("//*[@label='Hide types without procedures']"))
}


var preventativeATypeList = function(){
    return siteMaintenanceMain().element(by.xpath(".//div[@class='sitemaintenancebyasset']"))
};

var preventativeLTypeList = function(){
    return siteMaintenanceMain().element(by.xpath("./descendant::div[contains(@class,'sitemaintenanceby')]" +
        "[.//*[contains(text(),'Location Type')]][1]"))
};

var prevATypeInList = function(value){
    return preventativeATypeList().element(by.xpath(".//a[contains(@class,'mod-default')]" +
        "[contains(text(),'"+value+"')]"))
};

var prevATypeDetailsMain = function(){
    return siteMaintenanceMain().element(by.xpath(".//div[contains(@class,'tabs-content')]" +
        "[.//div[contains(text(),'Asset Type')]]"))
};


var locAssetTypeDetailsTab = function(element, value){
    return element.element(by.xpath(".//li[@data-id='"+value+"']" +
        "[contains(@class,'mod-greenbar')]"));
};

var newProcedureButton = function(){
    return element(by.xpath("//button[.='Add Procedure']"))
};

var newReadingButton = function(){
    return element(by.xpath("//button[contains(text(),'Add Reading')]"))
};

var newReadingModalMain = function () {
    return element(by.xpath("//div[contains(@class,'scimodal-contentwrap')]" +
        "[.//div[contains(text(),'Add New Reading')]]"))
};

var newReadingName = function () {
    return newReadingModalMain().element(by.xpath(".//input[@label='Name']"))
};

var newReadingType = function(){
    return newReadingModalMain().element(by.xpath("./descendant::div[@class='Select-control'][1]"))
};

var newReadingUOM = function(){
    return newReadingModalMain().element(by.xpath("./descendant::div[@class='Select-control'][2]"))
};

var newReadingCreate = function () {
    return newReadingModalMain().element(by.xpath(".//button[.='OK']"))
};

var readingRow = function(value){
    return element(by.xpath("//tr[.//a[.='"+value+"']]"))
};

var readingRowName = function (value) {
    return readingRow(value).element(by.xpath(".//a[.='"+value+"']"))
};

var readingRowType = function (readingNAme,readingType) {
    return readingRow(readingNAme).element(by.xpath(".//td[contains(text(),'"+readingType+"')]"))
};

var readingRowUOM = function (readingNAme,UOM) {
    return readingRow(readingNAme).element(by.xpath(".//td[contains(text(),'"+UOM+"')]"))
};

var prevAssetsOfTypeList = function(){
    return prevATypeDetailsMain().element(by.xpath("./descendant::div[contains(@class,'scitable" +
        " ')][1]"));
};

var prevAssetOfType = function(aName){
    return prevAssetsOfTypeList().element(by.xpath(".//a[contains(text(),'"+aName+"')]"));
};

var prevLTypeInList = function(value){
    return preventativeLTypeList().element(by.xpath(".//a[contains(@class,'mod-default')]" +
        "[contains(text(),'"+value+"')]"))
};

var prevLTypeDetailsMain = function(){
    return siteMaintenanceMain().element(by.xpath(".//div[contains(@class,'tabs-content')]" +
        "[.//div[contains(text(),'Location Type')]]"))
};

var prevLocOfType = function(loc){
    return prevLTypeDetailsMain().element(by.xpath(".//a[.='"+loc+"']"));
};



/**
 * elements: sites locations
 */
var siteLocationsMain = function(){
    return siteMain().element(by.xpath(".//div[contains(@class,'page-body-content')]" +
        "[contains(@class,'sitelocations')]"));
};

var addLocationsButton = function(){
    return siteLocationsMain().element(by.xpath(".//button[span[.='Add Locations']]"));
};

var addLocationsButtonModal = function(){
    return siteLocationsMain().element(by.xpath("./descendant::div[contains(@class,'scimodal-contentwrap')]" +
        "[div[div[.='Add Locations']]][1]"));
};

/**
 * elements: sites locations add location button modal
 */
var addLocButtonModalName = function(){
    return addLocationsButtonModal().element(by.xpath(".//input[@type='text']"));
};

var addLocButtonModalLType = function(){
    return addLocationsButtonModal().element(by.xpath(".//div[@class='Select-placeholder'][.='Location Type']"));
};

var addLocButtonModalPLoc = function(){
    return addLocationsButtonModal().element(by.xpath(".//div[@class='Select-placeholder'][.='Parent Location']"));
};

var addLocButtonModalQuan = function(){
    return addLocationsButtonModal().element(by.xpath(".//input[@type='number']"));
};

var addLocButtonModalAddAssetToLoc = function(){
    return addLocationsButtonModal().element(by.xpath(".//span[.='Add assets to this location']"));
};

var addLocButtonModalAddAnother = function(){
    return addLocationsButtonModal().element(by.xpath(".//span[.='Add another location']"));
};

var closeAddLocButtonModal = function(){
    return addLocationsButtonModal().element(locatorMap.get("closeModal"))
};

var submitAddLocButtonModal = function(value){
    return addLocationsButtonModal().element(by.xpath(".//button[@type='button']" +
        "[contains(text(), '" + value + "')]"))
}

/**
 * elements: sites locations add location button modal add asset to location sub modal
 */
var addAssetToLocSubModal = function(value){
    return addLocationsButtonModal().element(by.xpath("./descendant::div[@class='expandingtable-content'][div[label[strong[span[.='Assets']]]]]["+value+"]"));
};

var locSubModalAType = function(){
    return addAssetToLocSubModal(value).element(by.xpath(".//div[@class='Select-placeholder'][.='Asset Type']"));
};

var locSubModalName = function(){
    return addAssetToLocSubModal(value).element(by.xpath(".//input[@type='text']"));
};

var locSubModalQuan = function(){
    return addAssetToLocSubModal(value).element(by.xpath(".//input[@type='number']"));
};

/**
 * elements sites locations add location button modal add another location row
 */
var addAnotherLocationRow = function(value){
    return addLocationsButtonModal().element(by.xpath("./descendant::div[contains(@class,'expandingtable-row')]["+value+"]"))
};

var addAnotherLocationRowName = function(value){
    return addAnotherLocationRow(value).element(by.xpath(".//input[@type='text']"));
};

var addAnotherLocationRowLType = function(){
    return addAnotherLocationRow(value).element(by.xpath(".//div[@class='Select-placeholder'][.='Location Type']"));
};

var addAnotherLocationRowPLoc = function(value){
    return addAnotherLocationRow(value).element(by.xpath(".//div[@class='Select-placeholder'][.='Parent Location']"));
};

var addAnotherLocationRowQuan = function(value){
    return addAnotherLocationRow(value).element(by.xpath(".//input[@type='number']"));
};

/**
 * elements: sites location tree
 */
var siteLocationsTreeMain = function(){
    return siteLocationsMain().element(by.xpath(".//div[@class='sitelocations-locationtree']"));
};

var siteLocation = function(value){
    return siteLocationsTreeMain().element(by.xpath(".//li[contains(@class,'locationtree-list-item')]" +
        "[.//span[.='"+value+"']]"))
};

var parentLocOpen = function(value){
    return siteLocationsTreeMain().element(by.xpath(".//li[contains(@class,'locationtree-list-item')]" +
        "[contains(@class,'is-open')][.//span[.='"+value+"']]"))
}

var locTreeListAction = function(aName, action){
    return siteLocation(aName).element(by.xpath(".//a[@class='locationtree-list-item-actions-link']" +
        "[.//i[contains(@class,'"+action+"')]]"));
};

var expandParentLoc = function(aName){
    return siteLocation(aName).element(by.xpath(".//i[contains(@class,'menuicon')]"))
};

var childLocation = function(aName){
    return siteLocationsTreeMain()
        .element(by.xpath("./descendant::div[.//li[contains(@class,'locationtree-list-item')]" +
        "[.//span[contains(text(),'"+aName+"')]]][2]"))
}

var addLocationFromTree = function(){
    return siteLocationsTreeMain().element(by.xpath(".//a[contains(@class,'link')]" +
        "[span[contains(text(),'Add Location')]]"));
};

/**
 * elements: sites location details
 */
var siteLocationDetails = function(){
    return element(by.xpath(".//div[@class='sitelocations-mainrightcol']"));
};

var addAssetModalMain = function(){
    return element(by.xpath("//div[contains(@class,'scimodal-contentwrap')]" +
        "[div[div[contains(text(),'Add Assets')]]]"));
};

/**
 * elements sites location details assets tab
 */
var addAssetToLocation = function(){
    return siteLocationDetails().element(by.xpath(".//span[.='Add Assets to Location']"));
};

var locationAssetFilter = function(){
    return siteLocationDetails().element(by.xpath(".//div[contains(@class," +
        "'formcontrol-inpputwrap-cell-input')][*[.='Filter assets']]"))
};

var locationAssetAddHeader = function(value){
    return addAssetModalMain().element(by.xpath(".//div[contains(@class," +
        "'scimodal-content-header')][contains(text(),'"+value+"')]"))
}

var assetModalName = function(index){
    return element.all(by.xpath("//input[@type='text']")).get(index)
};

var assetModalAType = function(index){
    return element.all(by.xpath("//span[contains(@class,'scitable-row-cell-1')]")).get(index)
        .element(by.xpath(".//div[contains(@class,'Select-input')]"));
};

var assetModalLoc = function(index){
    return element.all(by.xpath("//div[*[.='Location/Asset']]")).get(index);
}

var locationAssetQ = function(index){
    return element.all(by.xpath("//input[@type='number']")).get(index)
};

var locationAssetDupAsset = function(index){
    return element.all(by.xpath("//a[@class='btnicon'][.//i[contains(@class,'content-copy')]]"))
                              .get(index);;
};

var locationAssetSubmit = function(){
    return addAssetModalMain().element(by.xpath(".//button[.='Add Assets']"));
};

var addAnotherAsset = function(index){
    return element.all(by.xpath("//a[.//span[.='Add another asset']]")).get(index);
};

var locAssetModalClose = function(){
    return addAssetModalMain().element(locatorMap.get("closeModal"));
};

var locAssetInRow = function(aType){
    return siteLocationDetails().element(by.xpath(".//a[contains(text(),'"+aType+"')]"));
};

/**
 * elements: location detail tab
 */
var locDetTabLType = function(value){
    return siteLocationDetails().element(by.xpath("./descendant::div[.//label[.='Location Type']]" +
        "[.//*[.='"+value+"']][1]"))
};

/**
 * elements: sites location tree add location modal
 */
var addLocationTreeModalMain = function(){
    return siteLocationsMain().element(by.xpath(".//div[contains(@class,'scimodal-content')]" +
        "[contains(@class,'mod-small')][div[.='Add Location']]"));
};

var addLocationTreeModalName = function(){
    return addLocationTreeModalMain().element(by.xpath(".//input[@type='text']"));
};

var addLocationTreeModalType = function(){
    return addLocationTreeModalMain().element(by.xpath(".//div[@class='Select-value']"));
};

var cancelLocationTreeModal = function(){
    return addLocationTreeModalMain().element(by.xpath(".//button[.='Cancel']"))
};

var createLocationTreeModal = function(){
    return addLocationTreeModalMain().element(by.xpath(".//button[.='Create Location']"))
};

/**
 * elements: sites assets
 */
var siteAssetsMain = function(){
    return siteMain().element(by.xpath(".//div[contains(@class,'page-body-content')]" +
        "[contains(@class,'siteassets')]"));
};

var siteAssetUtilityBar = function(){
    return siteMain().element(by.xpath(".//div[@class='page-body-utilitybar']"))
};

var assetSearchField = function(){
    return siteAssetUtilityBar().element(by.xpath(".//input[@type='search']"))
};

var filterByType = function(){
    return siteAssetUtilityBar().element(by.xpath(".//div[@class='Select-placeholder']" +
        "[contains(text(),' Type')]"))
};

var clearAssetFilters = function(){
    return siteAssetUtilityBar().element(by.xpath(".//span[.='Clear All']"))
};

var addAssetButton = function(){
    return siteAssetUtilityBar().element(by.xpath(".//button[span[.='Add Assets']]"))
};

var siteAssetLeftCol = function(){
    return siteAssetsMain().element(by.xpath(".//div[@class='assetlist']"))
};

var siteAssetViewMenu = function(value){
    return siteAssetLeftCol().element(by.xpath("./descendant::div[contains(@class,'mod-reactselect')]" +
        "[.//*[.='"+value+"']][1]"))
};

var siteAssetInList = function(aName){
    return siteAssetLeftCol().element(by.xpath(".//span[contains(text(),'"+aName+"')]"))
};

var siteAssetInListCount = function(aName){
    return element.all(by.xpath(".//span[contains(text(),'"+aName+"')]"))
};

var retiredOfflineAssetInList = function(choice, aName){
    return siteAssetLeftCol().element(by.xpath(".//li[contains(@class,'"+choice+"')]" +
        "[contains(@class,'assetlist-list-item')]" +
        "[.//span[contains(text(),'"+aName+"')]]"))
        .element(by.xpath(".//span[contains(text(),'"+aName+"')]"))
}

var siteAssetListByType = function(aType,aName){
    return siteAssetLeftCol().element(by.xpath(".//li[@class='peoplelist-list-section']" +
        "[.//*[.='"+aType+"']]")).element(by.xpath(".//span[contains(text(),'"+aName+"')]"))
};

var siteAssetsDetailsMain = function(){
    return siteAssetsMain().element(by.xpath(".//div[@class='sitemaintenance-mainrightcol']"))
};

var locAssetDetails = function(parent, type, optional){
    var xpath
    if(typeof optional==='undefined'){
        xpath = ".//*[@name='"+type+"']";
    }else{
        xpath = ".//*[@name='"+type+"'][contains(text(),'"+optional[type]+"')]"
    }
    return parent.element(by.xpath(xpath))
};

var locNameChangeModal = function () {
    return element(
        by.xpath("//*[.='OK'][(ancestor::div[//span[contains(text(),'Change')][contains(text(),'Name')]])]"))
}

var assetStatusMenu = function(value){
    return siteAssetsDetailsMain()
        .element(by.xpath(".//div[@class='sitemaintenance-header-actions']"))
        .element(by.xpath("./descendant::div[contains(@class,'mod-reactselect')]" +
            "[.//*[.='"+value+"']][1]"))
};

var assetMOptionsMenu = function(){
    return element(by.xpath("//div[contains(@class,'mainrightcol')]"))
        .element(by.xpath(".//div[@class='Select-control']" +
        "[div[@class='Select-value'][i[contains(@class,'mdi-dots-vertical')]]]"))
};

var dynamicMenuContent = function(value){
    return basePage.dynamicMenuContent(value)
};

var assetTabNav = function(parent, value){
    return parent.element(by.xpath(".//nav[contains(@class,'mod-greenbar')]"))
        .element(by.xpath(".//li[a[.='"+value+"']]"))
};

/**
 * elements: sites assets details tab
 */
var assetDetTabField = function(value, obj){
    var xpath
    if(value ==="Manufacturer"||value==="Model" & typeof obj==='undefined'){
        xpath = ".//div[label[.='"+value+"']]"
    }else if(value==="location"& typeof obj==='undefined'){
        xpath = "/descendant::span[@class='location-name'][1]"
    } else if(typeof obj==='undefined'){
        xpath = ".//*[@name='"+value+"']";
    } else if(value==="notes"||value==="Manufacturer"||value==="Model"){
        xpath = ".//*[contains(text(),'"+obj[value]+"')]"
    } else if(value==="location"){
        xpath = "//div[contains(@class,'mod-location')][span[@class='location-name']" +
            "[contains(text(),'"+obj[value]+"')]]"
    }else if (value==="purchaseDate"||value==="warrantyExpirationDate"){
        xpath = ".//*[@name='"+value+"'][contains(@value,'"+obj[value+"Display"]+"')]"
    } else{
        xpath = ".//*[@name='"+value+"'][contains(@value,'"+obj[value]+"')]"
    }
    return element(by.xpath(xpath))
};


var assetDetTabAType = function(value){
    return siteAssetsDetailsMain().element(by.xpath(".//div[@label='Asset Type']" +
        "[contains(text(),'"+value+"')]"))
};

var detailsTabQRCode = function(){
    return siteAssetsDetailsMain().element(by.xpath(".//button[.//span[.='Print QR Code']]"))
}

/**
 * elements: sites assets activity
 */

var avtivityLog = function(parent,value,user){
    return parent.element(by.xpath(".//div[contains(@class,'scitable-row')][contains(@class,'mod-assets')]" +
        "[.//span[*[contains(text(),'"+value+"')]]][.//span[*[contains(text(),'"+user+"')]]]"))
};

/**
 * elements: site assets QR code
 */

var qrCodeModal = function(){
    return element(by.xpath("/descendant::div[contains(@class,'scimodal-content')]" +
        "[contains(@class,'mod-qrcode')][.//div[.='Select QR Code Size']][1]"))
};

var qrCodeText = function(value){
    return qrCodeModal().element(by.xpath(".//p[contains(@class,'qrcode-text')]" +
        "[.='"+value+"']"))
};

var cancelQRCodeModal = function(){
    return qrCodeModal().element(by.xpath(".//span[.='CANCEL']"))
};

/**
 * elements: site assets dupe asset modal
 */
var dupeAssetLocModal = function(){
    return element(by.xpath("/descendant::div[contains(@class,'scimodal-content')]" +
        "[.//div[contains(text(),'Duplicate ')]][1]"))
};

var howManyDupesField = function(){
    return dupeAssetLocModal().element(by.xpath(".//input[@type='number']"))
};

var submitDupe = function(){
    return dupeAssetLocModal().element(by.xpath(".//button[.='OK']"))
};

/**
 * elements: site assets readings
 */

var assetLocReadings = function (parent,value) {
    return parent.element(by.xpath(".//div[@class='sitelocationdetails-readings']"))
        .element(by.xpath(".//span[.='"+value+"']"))
};

/**
 * elements: asset loc strategies or PM
 */
var assetLocStratPM = function (parent,value) {
    return parent.element(by.xpath(".//div[div[.='Preventative Maintenance']]"))
                 .element(by.xpath(".//span[contains(text(),'"+value+"')]"))
};

/**
 * elements: site settings
 */
var siteSettingsMain = function(){
    return siteMain().element(by.xpath(".//div[contains(@class,'page-body-content')]" +
        "[contains(@class,'sitesettings')]"));
};

var siteSettingsInfo = function(){
    return siteSettingsMain().element(by.xpath(".//div[@class='sitesettingsinfo']"));
};

var siteSettingsFormField = function(value){
    return siteSettingsInfo().element(by.xpath(".//input[@name='" + value + "']"))
};

var siteSettingsLeftNav = function(value){
    return element(by.xpath(".//li[contains(@data-reactid,'"+value+"')]"));
};

var siteSettingsSideNav = function(){
    return siteSettingsMain().element(by.xpath(".//ul[contains(@class,'tabs-nav-list')]" +
        "[contains(@class,'mod-left')]"));
};

var siteSettingsSideNavLink = function (value) {
    return siteSettingsSideNav().element(by.xpath("./descendant::li[contains(@class," +
        "'tabs-nav-list-item')]["+value+"]"));
};

/**
 * elements: site settings asset types
 */
var siteSettingsAssetMain = function(){
    return siteSettingsMain().element(by.xpath(".//div[@class='sitesettingsassets']" +
        "[div[contains(@class,'scitable')]]"));
};

var newAssetType = function(){
    return siteSettingsAssetMain().element(by.xpath("./descendant::span[.='New Type'][2]"));
};

var newAssetTypeModal = function(){
    return element(by.xpath(".//div[@class='scimodal-content'][div[.='New Asset Type']]"));
};

var newAssetTypeName = function(){
    return newAssetTypeModal().element(by.xpath(".//input[@type='text']"));
};

var newAssetTypeCreate = function(){
    return newAssetTypeModal().element(by.xpath(".//button[.='Create']"));
};

var newAssetTypeCancel = function(){
    return newAssetTypeModal().element(by.xpath(".//button[.='Cancel']"));
};

var assetTypeRow = function(value){
  return siteSettingsAssetMain().element(by.xpath(".//div[contains(@class,'scitable-row')]" +
      "[span[span[.='" + value + "']]]"));
};

/**
 * elements: site settings location types
 */
var siteSettingsLocationsMain = function(){
    return siteSettingsMain().element(by.xpath(".//div[@class='sitesettingslocations']" +
        "[div[contains(@class,'scitable')]]"));
};

var newLocationType = function(){
    return siteSettingsLocationsMain().element(by.xpath("./descendant::span[.='New Type'][2]"));
};

var newLocationTypeModal = function(){
    return element(by.xpath(".//div[@class='scimodal-content'][div[.='New Location Type']]"));
};

var newLocationTypeName = function(){
    return newLocationTypeModal().element(by.xpath(".//input[@type='text']"));
};

var newLocationTypeCreate = function(){
    return newLocationTypeModal().element(by.xpath(".//button[.='Create']"));
};

var newLocationTypeCancel = function(){
    return newLocationTypeModal().element(by.xpath(".//button[.='Cancel']"));
};

var locationTypeRow = function(value){
    return siteSettingsLocationsMain().element(by.xpath(".//div[contains(@class,'scitable-row')]" +
        "[span[span[.='" + value + "']]]"));
};

/**
 * elements: site settings labels
 */
var siteSettingsLabelsMain = function(){
    return siteSettingsMain().element(by.xpath("./descendant::div[@class='sitesettingslabels'][1]"));
};

var newLabels = function(){
    return siteSettingsLabelsMain().element(by.xpath("./descendant::span[.='New Label'][1]"));
};

var newLabelsModal = function(){
    return element(by.xpath(".//div[@class='scimodal-content'][div[.='Add Label']]"));
};

var newLabelsName = function(){
    return newLabelsModal().element(by.xpath(".//input[@type='text']"));
};

var newLabelsCreate = function(){
    return newLabelsModal().element(by.xpath(".//button[.='Create Label']"));
};

var newLabelsCancel = function(){
    return newLabelsModal().element(by.xpath(".//button[.='Cancel']"));
};

var labelRow = function(value){
    return siteSettingsLabelsMain().element(by.xpath(".//div[contains(@class,'scitable-row')]" +
        "[span[span[.='" + value + "']]]"));
};

/**
 * elements: site settings deadlines warnings
 */

var deadlineWarningMain = function () {
    return element(by.xpath(".//div[contains(@class,'sitesettingsdeadlines')]" +
        "[contains(@class,'sitesettingstab')][.//div[.='Deadlines and Warnings for Guest " +
        "Requests and Tenant Requests']]"));
};

var requestDeadlineRow = function (value) {
    return deadlineWarningMain().element(by.xpath(".//div[label[.='"+value+" Request" +
        " Deadline']]"));
};

var requestDeadlineInput = function (value) {
    return requestDeadlineRow(value).element(by.xpath(".//input[@type='number']"));
};

var requestDeadlineSelect = function (value) {
    return requestDeadlineRow(value).element(by.xpath(".//div[@class='Select-control']"));
};

/**
 * actions
 */
var waitThenClick = function(element){
    return basePage.waitThenClick(element);
};

var clickThenSendKeys = function(element,value1,value2){
    return basePage.clickThenSendKeys(element,value1,value2);
};

var clickClearThenSendKeys = function(element,value1,value2){
    return basePage.clickClearThenSendKeys(element,value1,value2)
};

var isElementPresent = function (element,boolean) {
    return basePage.isElementPresent(element,boolean);
}

var closeSuccessMsg = function () {
    return basePage.waitThenClick(closeToastMsg(),'toast msg')
};

var toastMsg = function (value) {
    return basePage.toastMsg(value);
};

var closeToastMsg = function() {
    return basePage.closeToastMsg();
};

/**
 * actions: top
 */
var checkSiteHeader = function (value) {
    return expect(siteHeader(value).isPresent()).toBe(true);
};

var clickNewSite = function () {
    return basePage.waitThenClick(newSite(),'new site button');
};

/**
 * actions: new site modal
 */
var clickNewSiteModalEnterName = function (value) {
    return basePage.clickThenSendKeys(newSiteModalNameField(),value,protractor.Key.TAB,
    'new site modal name field')
};

var clickNewSiteModalCancel = function () {
    newSiteModalCancelButton().click().then(
        function () {
            expect(searchSites().isPresent()).toBe(true);
        }, function (err) {
            throw err;
        }
    )
};

var clickNewSiteModalCreate = function () {
    return basePage.waitThenClick(newSiteModalCreateButton(),'new site modal create button');
};

/**
 * actions: site list
 */
var clickSiteInList = function (value) {
    return basePage.waitThenClick(siteInList(value),'site named '+value)
};

var isSiteInList = function (obj) {
    for (var count = 0; count < obj["sites"].length; count++) {
        expect(siteInList(obj["sites"][count]).isPresent()).toBe(true);
    }
}

var chooseSiteSection = function (value) {
    return waitThenClick(siteSectionTab(value))
};

/**
 * actions: strategies
 */
var clickToDisplayAllTypes = function () {
    return typesWOProc().isPresent().then(function (isVisible) {
        if (isVisible == true) {
            basePage.waitThenClick(typesWOProcUnchecked(),"types w/o procedures check box");
        }
    });
}


var navToPrevAType = function(){
    return basePage.waitThenClick(aTypeLink(),"asset type link").then(
        function(){
            clickToDisplayAllTypes()
        })
};

var selectPrevAType = function(value){
    return basePage.waitThenClick(prevATypeInList(value),"asset type "+value)
};

var navigateToAssetOfType = function (atype) {
    return navToPrevAType().then(
        function(){
            selectPrevAType(atype)
        })
}

var selectPrevADetailsAssetTab = function(aName,boolean){
    return basePage.waitThenClick(locAssetTypeDetailsTab(prevATypeDetailsMain(),"assets"),
    'asset type assets tab')
};

var selectAssetProceduresTab = function(boolean){
    return basePage.waitThenClick(locAssetTypeDetailsTab(prevATypeDetailsMain(),"procedures"),
        'asset procedures tab');
};

var selectAssetReadingsTab = function(){
    return basePage.waitThenClick(locAssetTypeDetailsTab(prevATypeDetailsMain(),"readings"),
        "asset readings tab");
};

var openReadingModal = function () {
    return basePage.waitThenClick(newReadingButton(),"new reading button");
};

var readingRowPresent = function (value) {
    expect(readingRowName(value[0]).isPresent()).toBe(true);
    expect(readingRowType(value[0],value[1]).isPresent()).toBe(true);
    expect(readingRowUOM(value[0],value[2]).isPresent()).toBe(true);
};

var completeReadingModal = function (value) {
    return basePage.clickThenSendKeys(newReadingName(),value[0],protractor.Key.TAB,"new reading" +
        " name field").then(
            function () {
                basePage.waitThenClick(newReadingType(),"reading type field").then(
                function () {
                    basePage.waitThenClick(dynamicMenuContent(value[1]),"reading type "+value[1]).then(
                        function () {
                            basePage.waitThenClick(newReadingUOM(),"uom field").then(
                                function () {
                                    basePage.waitThenClick(dynamicMenuContent(value[2]),"uom "+value[2]).then(
                                        function () {
                                            basePage.waitThenClick(newReadingCreate(),"create" +
                                                " new reading button").then(
                                                function () {
                                                    sleep();
                                                    readingRowPresent(value)
                                                })
                                        })
                                })
                        })
                })
        })
};

var editReading = function (oValue,eValue) {
    return basePage.clickClearThenSendKeys(readingRowName(oValue[0]),eValue[0],protractor.Key.TAB).then(
        function () {
            waitThenClick(readingRowType(oValue[0],oValue[1])).then(
                function () {
                    waitThenClick(dynamicMenuContent(eValue[1])).then(
                        function () {
                            waitThenClick(readingRowUOM(oValue[0],oValue[2])).then(
                                function () {
                                    waitThenClick(dynamicMenuContent(eValue[2]))
                                },function (err) {
                                    throw err;
                                })
                        },function (err) {
                            throw err;
                        })
                },function () {
                    throw err;
                })
        },function (err) {
            throw err;
        })
}

var navToPrevLType = function(value){
    return basePage.waitThenClick(lTypeLink(),"loc type link").then(
        function(){
            clickToDisplayAllTypes()
        })
};

var selectPrevLType = function(value){
    return basePage.waitThenClick(prevLTypeInList(value),'loc type '+value);
};

var navToLocOfType = function (lType) {
    return navToPrevLType(lType).then(
        function(){
            selectPrevLType(lType)
        })
};

var selectLocTypeLocTab = function(){
    return basePage.waitThenClick(locAssetTypeDetailsTab(prevLTypeDetailsMain(),"locations"),
        'location type locaction tab');
};

var selectLocTypeReadingsTab = function(){
    return basePage.waitThenClick(locAssetTypeDetailsTab(prevLTypeDetailsMain(),"readings"),
    'loc type readings tab')
};

var selectLocTypeProceduresTab = function(boolean){
    return waitThenClick(locAssetTypeDetailsTab(prevLTypeDetailsMain(),"procedures")).then(
        function(){
            expect(newProcedureButton().isPresent()).toBe(boolean);
        },function(err){
            throw err;
        })
};

/**
 * actions: rounds procedure modal
 */

var procRoundModalElements = function (main, get, day) {
	var mainElement
	if (main === "round") {
		mainElement = newProcedureModalMain("New Round");
	} else if (main === "dupe round") {
		mainElement = newProcedureModalMain("Duplicate Round")
	} else if (main === 'edit round') {
		mainElement = newProcedureModalMain("Edit Round");
	} else if (main === "procedure") {
		mainElement = newProcedureModalMain("New PM");
	} else if (main === "dupe proc") {
		mainElement = newProcedureModalMain("Duplicate")
	} else if (main === "edit proc") {
		mainElement = newProcedureModalMain("Edit")
	} else {
		mainElement = main;
	}
	if (typeof day === 'undefined') {
		day = "Sun"
	}
	var modal = new Map();
	modal.set("name", procRoundModalName(mainElement));
	modal.set("duration", procRoundModalDuration(mainElement));
	modal.set("Yes", lifeSafetyYes(mainElement));
	modal.set("No", lifeSafetyNo(mainElement));
	modal.set("l&s", lifeSafetyToggle(mainElement));
	modal.set("perform", procRoundSelect(mainElement, 0));
	modal.set("every", procRoundSchedulerEvery(mainElement, day));
	modal.set("everyInput", procRoundSchedulerEveryInput(mainElement))
	modal.set("startingOn", roundStartingOn(mainElement));
	modal.set("for", procRoundSelect(mainElement, 1));
	modal.set("team", procRoundUnits(mainElement, "Assignee"));
	modal.set("within", roundDueWithin(mainElement));
	modal.set("units", procRoundUnits(mainElement, "Select units"));
	modal.set("time", timePickerMain(mainElement));
	modal.set("time2", timePickerMain(mainElement, "2"));
	modal.set("hour", timePickerSection(mainElement, 0, day));
	modal.set("min", timePickerSection(mainElement, 1, day));
	modal.set("amPm", timePickerSection(mainElement, 2, day));
	modal.set("roundTab", procModalSection(mainElement, "3"));
	modal.set("locAssetTab", procModalSection(mainElement, "2"))
	modal.set("add", addAStep(mainElement));
	modal.set("stepDescription", stepDescription(mainElement, day));
	modal.set("stepTabDescription", stepTabDescription(mainElement, day))
	modal.set("stepLAndS", stepLAndSCheckBox(mainElement, day));
	modal.set("locAsset", stepLocAsset(mainElement, day, "1"));
	modal.set("reading", stepReading(mainElement, day));
	modal.set("distributeTasks", procModalDistributeTasks(mainElement));
	modal.set("distributeTasksDisabled", procModalDistributeTasksDisabled(mainElement));
	modal.set("locAssetTabList", procModalLocAssetRow(mainElement, day));
	modal.set("selectAllLocAsset", procModalSelectAllLocAsset(mainElement));
	modal.set("cancel", completeProcRound(mainElement, "Cancel"));
	modal.set("create", completeProcRound(mainElement, "Create"));
	modal.set("save", completeProcRound(mainElement, "Update"));
	return modal.get(get);
};

var openNewRoundModal = function(){
    return basePage.waitThenClick(newRoundButton(),'new round button');
};

function useTimePicker(main, timeValues, time) {
	time = time || "time";
	return basePage.waitThenClick(procRoundModalElements(main, time), time + ' picker main')
	               .then(function () {
		               basePage.waitThenClick(procRoundModalElements(main, "hour", timeValues[0]), 'hour')
		                       .then(function () {
			                       basePage.waitThenClick(procRoundModalElements(main, "min", timeValues[1]), 'min')
			                               .then(function () {
				                               basePage.waitThenClick(procRoundModalElements(main, "amPm", timeValues[2]), 'am/pm')
				                                       .then(function () {
					                                       basePage.waitThenClick(procRoundModalElements(main, time), time + ' picker main')
				                                       });
			                               });
		                       });
	               });
};

var completeNRoundModal = function(main,element, value){
    for (var count = 0; count < element.length; count++) {
        (function(passedInCount) {
            var modalElement =  procRoundModalElements(main,element[passedInCount]);
            var valueToUse = value[element[passedInCount]];
        if(element[passedInCount]==="cancel" ||element[passedInCount]==="Yes"
            ||element[passedInCount]==="No"||element[passedInCount]==="create"
            || element[passedInCount]==="l&s"||element[passedInCount]==="roundTab"
            ||element[passedInCount]==="locAssetTab"||element[passedInCount]==="selectAllLocAsset"
            ||element[passedInCount]==="save"||element[passedInCount]==="distributeTasks"){
            sleep();
            basePage.waitThenClick(modalElement,element[passedInCount]+' element').then(function () {
	            var toastMsg = "created";
	            if (element[passedInCount] === "save") {
		            toastMsg = "edited"
	            }
	            if (element[passedInCount] === "create" || element[passedInCount] === "save") {
		            basePage.closeModal(toastMsg, procRoundModalElements(main, "cancel"))
	            }
            })
        } else if(element[passedInCount]==="name"||element[passedInCount]==="duration"
            ||element[passedInCount]==="within"||element[passedInCount]==="everyInput"){
            basePage.clickClearThenSendKeys(modalElement,protractor.Key.BACK_SPACE,valueToUse,
                element[passedInCount]+' field')
        } else if (element[passedInCount]==="locAsset"|| element[passedInCount]==="reading"){
            var index3
            if (element[passedInCount]==="locAsset"){
                index3=2
            }else{
                index3=3
            }
            for (var count3 = 0; count3 < value["steps"].length; count3++) {
                (function(passedInCount3) {
                var index2 = value["steps"][passedInCount3][0];
                var textToUse2 = value["steps"][passedInCount3][index3];
                basePage.waitThenClick(procRoundModalElements(main,element[passedInCount],index2),
                    element[passedInCount]+' field').then(
                    function () {
                        basePage.waitThenClick(dynamicMenuContent(textToUse2),textToUse2+' option');
                    })
                })(count3);
            }
        } else if (element[passedInCount]==="locAssetTabList"){
            for (var count4 = 0; count4 < value["steps"].length; count4++) {
                var textToUse3 = value["steps"][count4][2];
                    basePage.waitThenClick(procRoundModalElements(main,element[passedInCount],
                        textToUse3),'loc or asset '+textToUse3+' in list')
            }
        } else if(element[passedInCount]==="perform"||element[passedInCount]==="for"
            ||element[passedInCount]==="team"||element[passedInCount]==="units"){
            sleep();
            basePage.waitThenClick(procRoundModalElements(
                main,element[passedInCount]),element[passedInCount]).then(
                function(){
                    basePage.waitThenClick(dynamicMenuContent(valueToUse),
                        element[passedInCount]+' with value '+valueToUse);
                });
        } else if(element[passedInCount]==="every"){
            basePage.waitThenClick(procRoundModalElements(main,element[passedInCount],valueToUse),
            'every');
        } else if(element[passedInCount]==="startingOn"){
            basePage.waitThenClick(modalElement,'starting on').then(
                function () {
                    datePicker.useDatePicker(valueToUse);
                })
        } else if(element[passedInCount]==="time"||element[passedInCount]==="time2"){
            useTimePicker(main, valueToUse,element[passedInCount]);
        } else if(element[passedInCount]==="add"){
            for (var count2 = 0; count2 < value["steps"].length; count2++) {
                (function(passedInCount2) {
                var stepInfo = value["steps"][passedInCount2]
                var index = stepInfo[0];
                var textToUse = stepInfo[1];
                basePage.waitThenClick(procRoundModalElements(main,"add"),'add a step link').then(
                    function () {
                        basePage.clickThenSendKeys(procRoundModalElements(main,"stepTabDescription",
                            index), textToUse, protractor.Key.TAB,'step descriptoin').then(
                            function () {
                                if(value["landS"]==="Yes" & stepInfo[4]==="Yes"){
                                    basePage.waitThenClick(
                                        procRoundModalElements(main,"stepLAndS",index),'step l&s')
                                }
                            })
                    })
                })(count2);
            }
        }
        })(count);
    }
};

var checkRoundDetails = function(obj,toCheck,index){
    var displayText = new Map();
    displayText.set("rowName", "Name");
    displayText.set("name", "Name");
    displayText.set("landS", "Life & Safety");
    displayText.set("perform", "Perform");
    displayText.set("durationDetail", "When tasks are created");
    displayText.set("team", "When tasks are created");
    displayText.set("displayTime", "Create tasks");
    displayText.set("displayDate", "Next Create Date on");
    displayText.set("everyInput","Perform");
    displayText.set("every","Perform");
    basePage.waitThenClick(roundRowName(obj["name"],index),'procedure or round named '+obj["name"]).then(
        function(){
            for (var count = 0; count < toCheck.length; count++) {
                basePage.checkForElement(roundDetRowOneTow(obj["name"],displayText.get(toCheck[count]),
                    obj[toCheck[count]],index),'procedure detail '+obj[toCheck[count]]);
            }
        })
};

var checkRoundDetailsSteps = function (index1,index2,value,index) {
    for (var count = 0; count < value.length; count++) {
        basePage.checkForElement(roundDetSteps(index1,index2,value[count],index),
        index1+' round step detail = '+value[count])
    };
};

var checkProcDetailsSteps = function (index1,index2,value,index) {
    for (var count = 0; count < value.length; count++) {
        expect(procDetSteps(index1,index2,value[count],index).isPresent()).toBe(true);
    }
};

var duplicateRound = function(obj,index){
    return basePage.waitThenClick(roundRowName(obj["name"],index),obj["name"]+' round').then(
        function () {
            basePage.waitThenClick(modARound(obj["name"], "Duplicate",index),'Duplicate Round');
        });
};

var editRound = function(obj,index){
    return basePage.waitThenClick(roundRowName(obj["name"],index),obj["name"]+' round').then(
        function () {
            basePage.waitThenClick(modARound(obj["name"], "Edit",index),'Edit round');
        });
};

/**
 * actions: sites add locations button
 */
var openAddLocationButtonModal = function(){
    return basePage.interstitialWait(interstitial()).then(
        function () {
            basePage.waitThenClick(addLocationsButton(),'add location button');
        })
};

var isLocationPresent = function(value,boolean){
        expect(siteLocation(value).isPresent()).toBe(boolean);
};

/**
 * actions: site locations
 */
var selectSiteLocation = function(value){
    return basePage.waitThenClick(siteLocation(value),'location named '+value)
};


var selectLocationAssets = function () {
    return waitThenClick(assetTabNav(siteLocationDetails(),"Assets")).then(
        function(){
            expect(locationAssetFilter().isPresent()).toBe(true);
        },function(err){
            throw err;
        })
};

var selectLocDetails = function(value,obj){
    return basePage.waitThenClick(assetTabNav(siteLocationDetails(),"Details"),'loc details').then(
        function(){
            expect(locDetTabLType(value).isDisplayed()).toBe(true);
            expect(assetDetTabField("location",obj).isDisplayed()).toBe(true);
        })
}

var clickAddAssetToLocation = function(value){
    return addAssetToLocation().click().then(
        function(){
            expect(locationAssetAddHeader(value).isPresent()).toBe(true);
        },function(err){
            throw err;
        })
};

var completeAddAssetModal = function(element, value,index){
    var modal = new Map();
    modal.set("lAType", assetModalAType(index));
    modal.set("quan", locationAssetQ(index));
    modal.set("name",assetModalName(index));
    modal.set("loc",assetModalLoc(index));
    for (var count = 0; count < element.length; count++) {
        (function(passedInCount) {
        if(element[passedInCount]==="submit"){
            waitThenClick(locationAssetSubmit()).then(
                function(){
                    basePage.closeModal("created", locAssetModalClose())
                },function(err){
                    throw err;
                })
        }else if(element[passedInCount]==="dupe"){
            waitThenClick(locationAssetDupAsset(index))
        }else if(element[passedInCount]==='addAnother'){
            waitThenClick(addAnotherAsset(index))
        } else if(element[passedInCount]==="cancel"){
            browser.actions().mouseMove(locAssetModalClose()).click().perform();
        }else if (element[passedInCount]==="quan"){
            clickClearThenSendKeys(modal.get(element[passedInCount]),value[passedInCount],
                protractor.Key.TAB)
        } else if(element[passedInCount]==="lAType"||element[passedInCount]==="loc"){
            waitThenClick(modal.get(element[passedInCount])).then(
                function () {
                 waitThenClick(dynamicMenuContent(value[passedInCount]))
                },function (err) {
                    throw err;
                })
        }else if(element[passedInCount]==="name"){
            clickThenSendKeys(modal.get(element[passedInCount]),value[passedInCount],
                protractor.Key.ENTER)
        }
        })(count);
    }
};

var isLocAssetInRow = function(aType, locName){
    expect(locAssetInRow(aType, locName).isPresent()).toBe(true);
};

/**
 * actions: sites location button modal
 */
var locButtonModalFormEntry = function(element, value){
    var modal = new Map();
    modal.set("name", addLocButtonModalName());
    modal.set("lType", addLocButtonModalLType());
    modal.set("pLoc", addLocButtonModalPLoc());
    modal.set("quan", addLocButtonModalQuan());
    for (var count = 0; count < element.length; count++) {
        if(element[count]==="submit"){
            basePage.waitThenClick(submitAddLocButtonModal(value[count])).then(
                function(){
                    closeSuccessMsg();
                })
        }else if(element[count]==="cancel"){
            basePage.waitThenClick(closeAddLocButtonModal(),'add loc close button')
        }else if(element[count]==="pLoc"){
            basePage.clickThenSendKeys(addLocButtonModalPLoc(),value[count],protractor.Key.ENTER,
            'paren loc field')
        } else{
            browser.actions().mouseMove(modal.get(element[count])).click().sendKeys(protractor.Key.BACK_SPACE,
				value[count], protractor.Key.TAB).perform();
        }
    }
};

var closeAdLocButtonModal = function(){
    closeAddLocButtonModal().click().then(
        function () {
            expect(siteLocationsMain().isPresent()).toBe(true);
        }, function (err) {
            throw err;
        })
};

/**
 * actions: locations tree
 */
var locTreeModalEntry = function(testElement, value){
    for (var count = 0; count < testElement.length; count++) {
        if(testElement[count]==="create"){
            basePage.waitThenClick(createLocationTreeModal(),'loc tree modal create button').then(
                function () {
                    closeSuccessMsg();
                })
        }else if(testElement[count]==="cancel"){
            basePage.waitThenClick(cancelLocationTreeModal(),'loc tree modal cancel')
        }else if (testElement[count]==="name"){
            basePage.clickClearThenSendKeys(addLocationTreeModalName(),value[count], protractor.Key.TAB,
                'loc tree modal name field')
        }else{
            basePage.clickThenSendKeys(addLocationTreeModalType(), value[count],
                protractor.Key.TAB,'loc tree modal ltype')
        }
    }
};

var openLocationTreeAddModal = function(){
    return waitThenClick(addLocationFromTree()).then(
            function(){
                browser.wait(protractor.ExpectedConditions.presenceOf(addLocationTreeModalMain()),
                    wait).then(function() {
                },function(err){
                    throw err;
                })
            },function(err){
                throw err;
            }
        )
};

var useLocationTreeModal = function(testElement, value){
    return openLocationTreeAddModal().then(
        function(){
            locTreeModalEntry(testElement, value)
        },function(err){
            throw err;
        })
};

var addChildLocFromTree = function(obj,testElement, value){
    return selectSiteLocation(obj["name"]).then(
        function(){
            basePage.waitThenClick(locTreeListAction(obj["name"],"circle")).then(
                function(){
                    locTreeModalEntry(testElement, value)
                })
        })
};

var selectChildLoc = function(parent,child){
    return browser.wait(protractor.ExpectedConditions.presenceOf(parentLocOpen(parent["name"])),
        wait).then(
            function(){
                basePage.waitThenClick(childLocation(child["name"]),'child loc named '+child["name"])
            },function(err){
                basePage.waitThenClick(expandParentLoc(parent["name"]),
                    'parent loc named '+parent["name"]).then(
                    function(){
                        basePage.waitThenClick(childLocation(child["name"]),
                            'child loc named '+child["name"])
                    })
            })
};

/**
 * actions: sites assets
 */
var openATabAssetModal = function(){
    return waitThenClick(addAssetButton());
};

var selectAssetInList = function(obj){
    return basePage.waitThenClick(siteAssetInList(obj["name"]),'asset named '+obj["name"]);
};

var selectDupAssetInList = function(obj,index){
    return waitThenClick(siteAssetInListCount(obj["name"]).get(index))
};

var chkLocAssetsDetails = function(parent, value, obj){
    for (var count = 0; count < value.length; count++) {
        basePage.checkForElement(locAssetDetails(parent,value[count],obj),
            parent+' detail '+value[count])
    }
};

var editLocAssetDetails = function(parent, value, obj) {
    for (var count = 0; count < value.length; count++) {
        (function(passedInCount) {
            var element = locAssetDetails(parent, value[passedInCount])
            basePage.clickClearThenSendKeys(element,obj[value[passedInCount]],protractor.Key.TAB,
            'loc detail field '+value[passedInCount])
            if(value[passedInCount] === "name"){
                basePage.waitThenClick(locNameChangeModal(),'loc modal ok button')
            }
        })(count);
    }
};

var navToAssetDetailsTab = function(obj, value){
    return basePage.waitThenClick(assetTabNav(siteAssetsDetailsMain(),"Details"),'asset details' +
        ' tab').then(
        function(){
            basePage.checkForElement(assetDetTabAType(obj["type"]),obj["type"]+' tab detail')
            basePage.checkForElement(assetDetTabField("location",obj),'location tab detail')
            if(typeof value != 'undefined'){
                for (var count = 0; count < value.length; count++) {
                    basePage.checkForElement(assetDetTabField(value[count],obj),
                        value[count]+' detail')
                }
            }
        });
};

var navToAssetReadingsTab = function (parent, value) {
    return assetTabNav(parent,"Readings").click().then(
        function () {
            for (var count = 0; count < value.length; count++) {
                expect(assetLocReadings(parent,value[count]).isPresent()).toBe(true)
            }
        },function (err) {
            throw err;
        })
};

var navToAssetStratTab = function (parent, value) {
    return basePage.waitThenClick(assetTabNav(parent,"Strategies"),parent+' strategies tab').then(
        function () {
            for (var count = 0; count < value.length; count++) {
                expect(assetLocStratPM(parent,value[count]).isPresent()).toBe(true)
            }
        })
};

var checkAssetActivity = function(obj,value,user){
    return assetTabNav(siteAssetsDetailsMain(),"Activity").click().then(
        function(){
            if(typeof value != 'purchaseDate'||typeof  value != 'warrantyExpirationDate'){
                for (var count = 0; count < value.length; count++) {
                    basePage.checkForElement(avtivityLog(siteAssetsDetailsMain()
                        ,obj[value[count]],user),'asset activity log value '+value[count])
                }
            }else{
                for (var count = 0; count < value.length; count++) {
                    basePage.checkForElement(avtivityLog(siteAssetsDetailsMain(),
                        obj[value[count]+"Display"],user),'asset activity log value '+value[count])
                }
            }
        })
};

var detailsEdit = function(obj,value){
    for (var count = 0; count < value.length; count++) {
        (function(passedInCount) {
            var element = assetDetTabField(value[passedInCount])
            basePage.waitThenClick(element, value[passedInCount]).then(
                function(){
                    if(value[passedInCount]==="purchaseDate"||value[passedInCount]===
                        "warrantyExpirationDate"){
                        datePicker.useDatePicker(obj[value[passedInCount]]);
                        sleep();
                    }else if(value[passedInCount]==="Manufacturer"||value[passedInCount]===
                        "Model"||value[passedInCount]||value[passedInCount]==="location"){
                        basePage.clickThenSendKeys(element,obj[value[passedInCount]],
                            protractor.Key.TAB);
                        sleep();
                    } else{
                        basePage.clickClearThenSendKeys(element,obj[value[passedInCount]],
                            protractor.Key.TAB);
                        sleep();
                    }
                })
        })(count);
    }
};

var changeAssetStatus = function(value1,value2){
    return basePage.waitThenClick(assetStatusMenu(value1),'asset status '+value1).then(
        function(){
            basePage.waitThenClick(dynamicMenuContent(value2),'status option '+value2)
        })
};

var changeAssetListView = function(current, choice){
    return basePage.waitThenClick(siteAssetViewMenu(current),'asset view '+current).then(
        function(){
            basePage.waitThenClick(dynamicMenuContent(choice),'asset view '+choice)
        })
};

var assetSearch = function(value){
    return basePage.clickThenSendKeys(assetSearchField(),value,protractor.Key.TAB,'search field');
};

var useAssetFilterByType = function(aType){
    return basePage.waitThenClick(filterByType(),'filter by type').then(
        function(){
            basePage.waitThenClick(dynamicMenuContent(aType),'loc type '+aType);
        })
};

var clearTheAssetFilters = function(){
    return basePage.waitThenClick(clearAssetFilters(),'clear filters');
};

/**
 * actions: sites assets more options menu
 */

var addTaskToAsset = function(taskValue, taskObj,menu){
    return basePage.waitThenClick(assetMOptionsMenu(),'more options menu').then(
        function(){
            basePage.waitThenClick(basePage.dynamicMenuContent(menu),menu+' option').then(
                function(){
                    spectrum_tasks_page.addTaskFromModal(taskValue,taskObj);
                });
        });
};

var openQRCodeModal = function(obj){
    return basePage.waitThenClick(assetMOptionsMenu(),'asset more options menu').then(
        function(){
            basePage.waitThenClick(dynamicMenuContent("Print QR Code for Asset"),'print qr code' +
                ' link').then(
                function(){
                    expect(qrCodeText(obj["name"]).isPresent()).toBe(true);
                })
        })
};

var closeQRCodeModal = function(){
    return basePage.waitThenClick(cancelQRCodeModal(),'cancel qr code modal');
};

var openDupeAssetModal = function(menu){
    return basePage.waitThenClick(assetMOptionsMenu(),'more options menu').then(
        function(){
            basePage.waitThenClick(dynamicMenuContent(menu),'option '+menu)
        })
};

var completeDupeAssetMenu = function(value,aName){
    return basePage.clickClearThenSendKeys(howManyDupesField(),value,protractor.Key.TAB,'how' +
        ' many dupes field').then(
            function () {
                basePage.waitThenClick(submitDupe(),'submit dupe button')
            })
};

/**
 * actions: site settings
 */
var settingsFormEntry = function(field, value){
    siteSettingsFormField(field).sendKeys(value);
};

var settingsFormValidation = function(field, value){
    expect(siteSettingsFormField(field).getAttribute('value')).toEqual(value);
};

/**
 * actions: site settings asset types
 */

var goToAssetTypes = function(){
    return basePage.waitThenClick(siteSettingsSideNavLink("2"),'asset types link');
};

var completeNewAssetTypeModal = function(value, choice){
    return basePage.waitThenClick(newAssetType(),'new asset type button').then(
        function(){
            basePage.clickThenSendKeys(newAssetTypeName(),value,protractor.Key.TAB,'asset type' +
                ' name').then(
                function(){
                    if (choice == "create") {
                        basePage.waitThenClick(newAssetTypeCreate(),'asset type create button').then(
                            function () {
                                basePage.checkForElement(assetTypeRow(value),'asset type named '
                                +value)
                            });
                    } else {
                        basePage.waitThenClick(newAssetTypeCancel(),'asset type cancel');
                    }
                });
        });
};

/**
 * actions: site settings location types
 */
var goToLocationTypes = function(){
    return basePage.waitThenClick(siteSettingsSideNavLink("3"),'location types link');
};

var completeNewLocationTypeModal = function(value, choice){
    return basePage.waitThenClick(newLocationType(),'new location type').then(
        function(){
            basePage.clickThenSendKeys(newLocationTypeName(),value,protractor.Key.TAB,
            'new loc type name field').then(
                function(){
                    if (choice == "create") {
                        basePage.waitThenClick(newLocationTypeCreate(),'new loc type create').then(
                            function () {
                                basePage.checkForElement(locationTypeRow(value),'location type' +
                                    ' named '+value);
                            });
                    } else {
                        basePage.waitThenClick(newLocationTypeCancel(),'new loc cancel');
                    }
                });
        });
};

/**
 * actions: site settings labels
 */
var goToLabels = function(){
    return basePage.waitThenClick(siteSettingsSideNavLink("4"),'labels link');
};

var completeNewLabelsModal = function(value, choice){
    return basePage.interstitialWait(basePage.interstitial()).then(
        function () {
            basePage.waitThenClick(newLabels(),'new labels modal button').then(
                function(){
                    basePage.clickClearThenSendKeys(newLabelsName(),value,protractor.Key.TAB,
                        'new label name field').then(
                        function(){
                            if (choice == "create") {
                                basePage.waitThenClick(newLabelsCreate(),'new label create' +
                                    ' button').then(
                                    function () {
                                        basePage.closeModal('created',newLabelsCancel())
                                    })
                            } else {
                                basePage.waitThenClick(newLabelsCancel(),'new label cancel')
                            }
                        });
                });
        });
};

/**
 * actions: site settings deadlines & warnings
 */
var goToDeadlineWarnings = function () {
    return basePage.waitThenClick(siteSettingsSideNavLink("6"),'deadline warnings')
};

var setRequestDeadline = function (value1, value2, value3) {
    return basePage.clickClearThenSendKeys(requestDeadlineInput(value3),value1,protractor.Key.TAB,
        'guest request deadline input').then(
            function () {
                basePage.waitThenClick(requestDeadlineSelect(value3),'guest request select').then(
                    function () {
                        basePage.waitThenClick(basePage.dynamicMenuContent(value2),'option '+value2)
                    });
            });
}


/**
 * services
 */
spectrum_sites_page.prototype.isSitesPageLoaded = function () {
    expect(newSite().isPresent()).toBe(true);
};

spectrum_sites_page.prototype.isSiteHeaderCorrect = function (obj) {
    return checkSiteHeader(obj["sites"])
}

/**
 * services: new site modal
 */
spectrum_sites_page.prototype.newSiteModalCancel = function () {
    return clickNewSite().then(
        function () {
            clickNewSiteModalCancel();
        });
};

spectrum_sites_page.prototype.checkSiteInList = function (newSiteName) {
    return clickSiteInList(newSiteName);
};

spectrum_sites_page.prototype.checkForAvailableSites = function (obj) {
    return isSiteInList(obj);
};

spectrum_sites_page.prototype.createNewSite = function (value) {
    return clickNewSite().then(
        function () {
            clickNewSiteModalEnterName(value).then(
                function () {
                    clickNewSiteModalCreate().then(
                        function () {
                            browser.wait(protractor.ExpectedConditions.presenceOf(basePage.toastMsg(
                                'Site created')), wait).then(
                                function () {
                                    basePage.waitThenClick(basePage.closeToastMsg(),"toast msg")
                                },function (err) {
                                    throw new Error("site created toast msg not found: "+err.stack+"\n" +
                                        " -----------");
                                })
                        })
                })
        })
};

/**
 * services: maintenance strategies
 */
spectrum_sites_page.prototype.goToStrategies = function () {
    return chooseSiteSection("Strategies");
};

spectrum_sites_page.prototype.goToRounds = function(boolean){
    chooseSiteSection("Rounds").then(
        function(){
            basePage.globalWait();
            expect(newRoundButton().isPresent()).toBe(boolean)
        });
};

spectrum_sites_page.prototype.createNewRound = function (element, value) {
    return openNewRoundModal().then(
        function(){
            completeNRoundModal("round",element, value)
        })
};

spectrum_sites_page.prototype.dupplicateARound = function (obj,main) {
    return duplicateRound(obj).then(
        function () {
            completeNRoundModal(main,["create"], [""])
        });
};

spectrum_sites_page.prototype.editARound = function (oObj,element,eObj,main) {
    return editRound(oObj).then(
        function () {
            completeNRoundModal(main,element, eObj)
        })
};

spectrum_sites_page.prototype.newRoundPresent = function(roundName,index){
    return browser.wait(protractor.ExpectedConditions.elementToBeClickable(
        roundRowName(roundName,index)), wait)
};

spectrum_sites_page.prototype.checkARoundsDetails = function(obj,toCheck,index){
    return checkRoundDetails(obj,toCheck,index);
};

spectrum_sites_page.prototype.checkRoudDetSteps = function (rName,index2,value,index) {
    return checkRoundDetailsSteps(rName,index2,value,index)
};

spectrum_sites_page.prototype.checkProcedureDetSteps = function (rName,index2,value,index) {
    return checkProcDetailsSteps(rName,index2,value,index)
};

spectrum_sites_page.prototype.checkForPrevAType = function(value){
    navToPrevAType(value);
};

spectrum_sites_page.prototype.selectAssetOfType = function (value,obj,boolean) {
    return navigateToAssetOfType(obj["type"]).then(
        function(){
            selectPrevADetailsAssetTab(obj["name"],boolean).then(
                function () {
                    basePage.waitThenClick(prevAssetOfType(obj["name"]),
                        'asset of type named '+obj["name"]).then(
                     function () {
                         basePage.interstitialWait(basePage.interstitial()).then(
                             function () {
                                 chkLocAssetsDetails(siteAssetsDetailsMain(),value,obj)
                             })
                     })
                })
        })
};

spectrum_sites_page.prototype.navToAssetProcedures = function (aType,boolean) {
    return navigateToAssetOfType(aType).then(
        function() {
            selectAssetProceduresTab(boolean)
        });
};

spectrum_sites_page.prototype.addNewProcedureAsset = function(element,obj){
    return basePage.waitThenClick(newProcedureButton(),'new procedure button').then(
        function () {
            completeNRoundModal("procedure",element,obj)
        })
};

spectrum_sites_page.prototype.addNewReadingAsset = function(atype,value){
    return navigateToAssetOfType(atype).then(
        function(){
            selectAssetReadingsTab().then(
                function () {
                    openReadingModal().then(
                        function () {
                            completeReadingModal(value)
                        })
                })
        })
};

spectrum_sites_page.prototype.editAssetReading = function (atype,oValue,eValue) {
    return navigateToAssetOfType(atype).then(
        function () {
         selectAssetReadingsTab().then(
             function () {
              editReading(oValue,eValue);
             })
        })
};

spectrum_sites_page.prototype.assetReadingPresent = function (atype,value) {
    return navigateToAssetOfType(atype).then(
        function () {
            selectAssetReadingsTab().then(
                function () {
                    readingRowPresent(value);
                },function (err) {
                    throw err;
                })
        },function (err) {
            throw err;
        })
};

spectrum_sites_page.prototype.checkForPrevLType = function(value){
    navToPrevLType(value);
};

spectrum_sites_page.prototype.checkForPrevLocOfType = function(lType,loc){
    return navToLocOfType(lType).then(
                function(){
                    selectLocTypeLocTab(loc);
                },function(err){
                    throw err;
                })
};

spectrum_sites_page.prototype.selectLocOfType = function (value,obj) {
    return navToLocOfType(obj["type"]).then(
        function() {
            selectLocTypeLocTab().then(
                function () {
                    basePage.waitThenClick(prevLocOfType(obj["name"]),
                    'loc type '+obj["name"]).then(
                        function () {
                            basePage.interstitialWait(interstitial()).then(
                                function () {
                                    chkLocAssetsDetails(siteLocationDetails(), value, obj)
                                })
                        })
                })
        })
};

spectrum_sites_page.prototype.addNewReadingLoc = function(lType,value){
    return navToLocOfType(lType).then(
        function(){
            selectLocTypeReadingsTab().then(
                function () {
                    openReadingModal().then(
                        function () {
                            completeReadingModal(value)
                        })
                })
        })
};

spectrum_sites_page.prototype.editLocReading = function (lType,oValue,eValue) {
    return navToLocOfType(lType).then(
        function(){
            selectLocTypeReadingsTab().then(
                function () {
                    editReading(oValue,eValue);
                },function (err) {
                    throw err;
                })
        },function (err) {
            throw err;
        })
};

spectrum_sites_page.prototype.locReadingPresent = function (lType,value) {
    return navToLocOfType(lType).then(
        function(){
            selectLocTypeReadingsTab().then(
                function () {
                    readingRowPresent(value);
                },function (err) {
                    throw err;
                })
        },function (err) {
            throw err;
        })
};

spectrum_sites_page.prototype.navToLocProcedures = function (lType,boolean) {
    return navToLocOfType(lType).then(
        function() {
            selectLocTypeProceduresTab(boolean)
        },function (err) {
            throw err;
        })
}

/**
 * services: sites location page
 */
spectrum_sites_page.prototype.goToSitesLocations = function (boolean) {
    chooseSiteSection("Locations").then(
        function(){
            expect(addLocationsButton().isPresent()).toBe(boolean);
        },function(err){
            throw err;
        })
};

spectrum_sites_page.prototype.addLocationButtonModalFormValidation = function (value) {
    openAddLocationButtonModal();
    closeAdLocButtonModal(value);
};

spectrum_sites_page.prototype.addLocationButtonModalEntry = function (element, value) {
    openAddLocationButtonModal().then(
        function(){
            locButtonModalFormEntry(element, value);
        })
};

spectrum_sites_page.prototype.childlessLocationPresent = function (value,boolean) {
	isLocationPresent(value,boolean);
};

spectrum_sites_page.prototype.selectALocInTree = function(obj){
    return selectSiteLocation(obj["name"]);
}

spectrum_sites_page.prototype.addLocationFromTree = function (element, value) {
    useLocationTreeModal(element, value);
};

spectrum_sites_page.prototype.cloneLocFromTree = function(parent,child,testElement, value){
    addChildLocFromTree(parent,testElement, value).then(
                function(){
                    selectChildLoc(parent,child)
                })
};

spectrum_sites_page.prototype.locDetailsValidation = function(value,obj){
    selectSiteLocation(obj["name"]).then(
        function(){
            chkLocAssetsDetails(siteLocationDetails(),value,obj)
        })
};

spectrum_sites_page.prototype.editLocDetails = function(obj,value,editObj){
    selectSiteLocation(obj["name"]).then(
        function(){
            editLocAssetDetails(siteLocationDetails(),value,editObj);
            sleep();
        })
}

spectrum_sites_page.prototype.locDetTabValidation = function(obj){
    selectSiteLocation(obj["name"]).then(
        function(){
            selectLocDetails(obj["type"],obj);
        },function(err){
            throw err;
        })
};

spectrum_sites_page.prototype.childLocDetTabValidation = function(parent,child){
    selectChildLoc(parent,child).then(
        function(){
            selectLocDetails(child["type"],child);
        })
};

spectrum_sites_page.prototype.childLocDetTabEdit = function(parent,oChild,eChild,value){
    selectChildLoc(parent,oChild).then(
        function(){
            selectLocDetails(oChild["type"],oChild).then(
                function(){
                    detailsEdit(eChild,value);
                })
        })
};

spectrum_sites_page.prototype.addAssetToLocation = function (locName) {
    selectSiteLocation(locName).then(
        function(){
            selectLocationAssets().then(
                function(){
                    clickAddAssetToLocation(locName)
                })
        })
};

spectrum_sites_page.prototype.addAssetToChildLocation = function (parent,oChild) {
    selectChildLoc(parent,oChild).then(
        function(){
            selectLocationAssets().then(
                function(){
                    clickAddAssetToLocation(oChild["name"])
                },function(err){
                    throw err;
                })
        },function(err){
            throw err;
        })
};

spectrum_sites_page.prototype.locationHasAsset = function (value1,locName) {
    selectSiteLocation(locName).then(
        function(){
            selectLocationAssets().then(
                function(){
                    isLocAssetInRow(value1);
                },function(err){
                    throw err;
                })
        },function(err){
            throw err;
        })
};

spectrum_sites_page.prototype.childLocationHasAsset = function (parent,oChild, assetName) {
    selectChildLoc(parent,oChild).then(
        function(){
            selectLocationAssets().then(
                function(){
                    isLocAssetInRow(assetName);
                },function(err){
                    throw err;
                })
        },function(err){
            throw err;
        })
};

spectrum_sites_page.prototype.dupLocFromTree = function(obj,value,dupObj){
    return basePage.waitThenClick(locTreeListAction(obj["name"],"content-copy"),'dup loc button')
                   .then(
                       function(){
                           completeDupeAssetMenu(value,dupObj["name"]).then(
                function(){
                    isLocationPresent(dupObj["name"],true)
                },function(err){
                    throw err;
                })
        },function(err){
            throw err;
        })
};

spectrum_sites_page.prototype.useLocTypeFilter = function(obj){
    return useAssetFilterByType(obj["type"]);
};

spectrum_sites_page.prototype.useClearAllLocFilters = function(){
    return clearTheAssetFilters();
};

spectrum_sites_page.prototype.useLocSearch = function(obj){
    return assetSearch(obj["name"])
};

/**
 * services: sites assets page
 */
spectrum_sites_page.prototype.addAssetModalCompletion = function(element, value1,index){
    completeAddAssetModal(element, value1,index)
};

spectrum_sites_page.prototype.goToSitesAssets = function (boolean) {
    chooseSiteSection("Assets").then(
        function(){
            expect(addAssetButton().isPresent()).toBe(boolean);
        },function(err){
            throw err;
        })
};

spectrum_sites_page.prototype.isSitesAssetsInList = function (aName,boolean) {
    expect(siteAssetInList(aName).isPresent()).toBe(boolean);
};

spectrum_sites_page.prototype.selectTheSiteInList = function(obj){
    selectAssetInList(obj);
};

spectrum_sites_page.prototype.siteInListCount = function(aName,count){
    expect(siteAssetInListCount(aName).count()).toEqual(count)
};

spectrum_sites_page.prototype.assetTabAddAsset = function () {
    openATabAssetModal()
};

spectrum_sites_page.prototype.checkSiteAssetDetails = function(value,obj){
    return selectAssetInList(obj).then(
        function(){
            chkLocAssetsDetails(siteAssetsDetailsMain(),value,obj)
        });
};

spectrum_sites_page.prototype.checkAssetReadings = function (obj) {
    return selectAssetInList(obj).then(
        function () {
            navToAssetReadingsTab(siteAssetsDetailsMain(),obj["reading"])
        })
};

spectrum_sites_page.prototype.checkAssetPM = function (obj) {
    return selectAssetInList(obj).then(
        function () {
            navToAssetStratTab(siteAssetsDetailsMain(),obj["pm"])
        })
};

spectrum_sites_page.prototype.checkLocReadings = function (obj) {
    return selectSiteLocation(obj["name"]).then(
        function () {
            navToAssetReadingsTab(siteLocationsMain(),obj["reading"])
        },function (err) {
            throw err;
        })
};

spectrum_sites_page.prototype.checkLocPM = function (obj) {
    return selectSiteLocation(obj["name"]).then(
        function () {
            navToAssetStratTab(siteLocationsMain(),obj["pm"])
        },function (err) {
            throw err;
        })
};


spectrum_sites_page.prototype.checkDupAssetDetailsTab = function(index, obj,value){
    selectDupAssetInList(obj,index).then(
        function(){
            navToAssetDetailsTab(obj,value);
        },function(err){
            throw err;
        })
}

spectrum_sites_page.prototype.editAssetDetails = function(value,oObj,editObj){
    selectAssetInList(oObj).then(
        function(){
            editLocAssetDetails(siteAssetsDetailsMain(),value,editObj);
        },function(err){
            throw err;
        })
};

spectrum_sites_page.prototype.assetDetailsTabValidation = function(obj,value){
    return selectAssetInList(obj).then(
        function(){
            navToAssetDetailsTab(obj,value);
        })
};

spectrum_sites_page.prototype.checkAssetActivityLog = function(obj, value,user){
    return selectAssetInList(obj).then(
        function(){
            checkAssetActivity(obj,value,user);
        })
}

spectrum_sites_page.prototype.assetDetailsTabEdit = function(obj,value){
    return selectAssetInList(obj).then(
        function(){
            navToAssetDetailsTab(obj).then(
                function(){
                    detailsEdit(obj,value);
                })
        })
};

spectrum_sites_page.prototype.assetDetTabORCode = function(obj){
    return selectAssetInList(obj).then(
        function(){
            navToAssetDetailsTab(obj).then(
                function(){
                    basePage.waitThenClick(detailsTabQRCode(),'details tab qr code').then(
                        function(){
                            browser.wait(protractor.ExpectedConditions.presenceOf(
                                qrCodeText(obj["name"])), wait)
                                   .then(
                                     function(){
                                         basePage.waitThenClick(cancelQRCodeModal(),'cancel qr' +
                                             ' code modal')
                                     })
                        })
                })
        })
};

spectrum_sites_page.prototype.editAssetStatus = function(oObj,eObj){
    return selectAssetInList(oObj).then(
        function(){
            changeAssetStatus(oObj["status"],eObj["status"])
        })
};

spectrum_sites_page.prototype.viewAssetsByType = function(current,obj){
    changeAssetListView(current,"By Type").then(
        function(){
            basePage.checkForElement(siteAssetListByType(obj["type"],obj["name"]),'asset of type' +
                ' '+obj["type"]+' named '+obj["name"])
        })
};

spectrum_sites_page.prototype.viewRetiredAssets = function(current,obj){
    changeAssetListView(current,"Retired").then(
        function(){
            basePage.checkForElement(retiredOfflineAssetInList("mod-retired",obj["name"]),
            'retired asset named '+obj["name"])
        })
};

spectrum_sites_page.prototype.viewOfflineAssets = function(current,obj){
    return changeAssetListView(current,"A-Z").then(
        function(){
            expect(retiredOfflineAssetInList("mod-offline",obj["name"]).isPresent()).toBe(true);
        })
};

spectrum_sites_page.prototype.viewAZAssets = function(current,obj){
    changeAssetListView(current,"A-Z").then(
        function(){
            expect(siteAssetInList(obj["name"]).isPresent()).toBe(true);
        })
};

spectrum_sites_page.prototype.useAssetSearch = function(obj){
    assetSearch(obj["name"],siteAssetInList(obj["name"]))
};

spectrum_sites_page.prototype.useAssetTypeFilter = function(obj){
    useAssetFilterByType(obj["type"],obj["name"],siteAssetInList(obj["name"]));
};

spectrum_sites_page.prototype.useClearAllFilters = function(obj){
    return clearTheAssetFilters();
};

spectrum_sites_page.prototype.addTaskToAsset = function(value, obj,menu){
    return addTaskToAsset(value, obj,menu);
};

spectrum_sites_page.prototype.doesMOQRModalDisplayAName = function(obj){
    return selectAssetInList(obj).then(
        function(){
            openQRCodeModal(obj).then(
                function(){
                    closeQRCodeModal();
                })
        })
};

spectrum_sites_page.prototype.mODupLocAsset = function(value,dupObj,menu){
    return openDupeAssetModal(menu).then(
                function(){
                    completeDupeAssetMenu(value,dupObj["name"]);
                })
};

/**
 * services: site settings
 */
spectrum_sites_page.prototype.goToSiteSettings = function () {
    chooseSiteSection("Site Settings");
};


spectrum_sites_page.prototype.validateSiteSettingsForm = function (element, value) {
    for (var count = 0; count < element.length; count++) {
        settingsFormValidation(element[count], value[count])
    }
};

spectrum_sites_page.prototype.createNewAssetType = function (value, choice) {
    return goToAssetTypes(true).then(
        function(){
            completeNewAssetTypeModal(value, choice)
        });
};

spectrum_sites_page.prototype.createNewLocationType = function (value, choice) {
    return goToLocationTypes(true).then(
        function(){
            completeNewLocationTypeModal(value, choice)
        });
};


spectrum_sites_page.prototype.createNewLabel = function (value, choice) {
    return goToLabels().then(
        function(){
            completeNewLabelsModal(value, choice)
        })
};

spectrum_sites_page.prototype.setGuestRequestDeadline = function (value1,value2) {
    return goToDeadlineWarnings().then(
        function () {
            setRequestDeadline(value1,value2,"Guest");
        });
};

spectrum_sites_page.prototype.setTenantRequestDeadline = function (value1,value2) {
    return goToDeadlineWarnings().then(
        function () {
            setRequestDeadline(value1,value2,"Tenant");
        });
};

spectrum_sites_page.prototype.useTheTimePicker = function (main,timeValues) {
    return useTimePicker(main,timeValues)
}

exports.spectrum_sites_page = new spectrum_sites_page();