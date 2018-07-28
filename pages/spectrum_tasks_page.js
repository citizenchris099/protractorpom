var spectrum_tasks_page = function() {
};
exports.spectrum_tasks_page = new spectrum_tasks_page();
var basePage = require('./page.js').page;
var spectrum_top_sideBar = require('./spectrum_top_sideBar.js').spectrum_top_sideBar;
var spectrum_sites_page = require('./spectrum_sites_page.js').spectrum_sites_page;
var datePicker = require('./datePicker.js').datePicker;

var allFilterSearchMap = new Map();
allFilterSearchMap.set("allFilterLocation", "Search locations");
allFilterSearchMap.set("allFilterLabels", "Search labels");
allFilterSearchMap.set("allFilterAssignee", "Search assignees");

var statusMap = new Map();
statusMap.set("not started", 0);
statusMap.set("in progress", 1);
statusMap.set("on hold", 2);
statusMap.set("complete", 3);

// ////////locators //////////
var locatorMap = new Map();
locatorMap.set("loginName", by.xpath("//span[@class='avatar']"));
locatorMap.set("logOut", by.xpath("//span[.='Log Out']"));

// ////////locators //////////

/**
 * locators: filters
 */
locatorMap.set("searchBox", by
		.xpath("./descendant::input[@type='text'][contains(@class,'search-input')][@placeholder='Search'][2]"));
locatorMap.set("quickFiltersParent", by.xpath("//ul[@class='quickfilters']"));
locatorMap.set("quickFilterMenu", by
		.xpath(".//div[contains(@class,'quickfilter-item-link')][contains(text(), 'Quick Filters')]"));
locatorMap.set("quickFilterMenuChoices", by.xpath(".//div[contains(@class,'quickfilter-item-choiceset')][1]"));
locatorMap.set("allFilters", by.xpath("//span[.='All Filters']"));
locatorMap.set("allFilterStatus", by.xpath("//div[@id='statuses']"));
locatorMap.set("allFilterMoreO", by.xpath("//div[@id='moreOptions']"));
locatorMap.set("allFiltersDropDownParent", by
		.xpath(".//div[contains(@class,'dropmenugroup-menu')][contains(@class,'is-open')]"));
locatorMap.set("allFiltersSearch", by.xpath(".//input[contains(@placeholder,'Search')]"));
locatorMap.set("clearAdFilters", by.xpath("//div[@class='taskqueuefilters-clearallfilters']"));

/**
 * locators: add task
 */
locatorMap.set("showAddTaskParent", by.xpath("//button[contains(@class,'taskquickaddtoggle-button')]"));
locatorMap.set("showAddTaskForm", by.xpath(".//i[contains(@class,'plus-circle-outline')]"));
locatorMap.set("addTaskParent", by.xpath("/descendant::div[contains(@class,'taskquickaddform')][1]"));
locatorMap.set("atModalParent",by.xpath("//div[contains(@class,'scimodal-content')]" +
    "[div[.='Add Task']]"))
locatorMap.set("addTaskSummary", by.xpath(".//textarea[@label='Task Summary']"));
locatorMap.set("addTaskDescription", by
		.xpath(".//textarea[contains(@label,'escription')]"));
locatorMap.set("addTasklocation", by.xpath(".//div[contains(@class,'Select-placeholder')]" +
	" [contains(text(),'Location')]"));
locatorMap.set("addTaskSite", by.xpath(".//div[contains(@class,'Select-placeholder')]" +
	" [.='Site']"));
locatorMap.set("addTaskDueDate", by.xpath(".//p[.='Due']"));
locatorMap.set("addTasklabels", by.xpath(".//div[@class='Select-placeholder'][contains(text(),'Labels')]"));
locatorMap.set("addTaskAssignee", by.xpath("./descendant::div[.='Assignee'][1]"));
locatorMap.set("addTaskCreate", by.xpath("/descendant::button[contains(text(),'Create')][1]"));
locatorMap.set("dueDateParent", by.xpath(".//div[contains(@class,'datepicker__input-container')]"));
locatorMap.set("dueDateClear", by.xpath(".//div[@class='close-icon']"));
locatorMap.set("toastParent", by.xpath("//div[contains(@className,'sysmsg')]"));
locatorMap.set("closeToast", by.xpath("//div[@class='sysmsg-content-close']"));
locatorMap.set("closeAddTask", by.xpath(".//i[contains(@class,'-close')]"));
locatorMap.set("guestRequest", by.xpath("./descendant::input[contains(@class," +
    "'toggleboxinput')][1]"));
locatorMap.set("tenantRequest", by.xpath("./descendant::input[contains(@class," +
    "'toggleboxinput')][2]"));
locatorMap.set("requesterInput", by.xpath(".//div[p[.='Requester']]"));

/**
 * locators: task queue
 */
locatorMap.set("taskListGroup", by.xpath("//div[@class='taskqueue-togglegroup']"));
locatorMap.set("taskListParent", by.xpath("//div[@class='taskqueue-tasklist']"));
locatorMap.set("moreTaskParent", by.xpath("//div[@class='load-more']"));
locatorMap.set("moreTaskButton", by.xpath(".//button[.='More Tasks']"));
locatorMap.set("taskIsSelected", by.xpath(".//div[contains(@class,'is-selected')]"));
locatorMap.set("taskStatus", by.xpath(".//*[contains(@class,'taskqueue-task-activity-status')]"));
locatorMap.set("taskComplete", by.xpath(".//div[contains(@class,'mod-complete')]"));
locatorMap.set("taskBlocked", by.xpath(".//i[contains(@class,'-alert-octagon')]"));
locatorMap.set("taskCanceled", by.xpath(".//i[contains(@class,'-block-helper')]"));
locatorMap.set("taskStar", by.xpath(".//span[contains(@class,'checkboxstar-icon')]"));
locatorMap.set("taskActivityFlags", by.xpath(".//div[@class='taskqueue-task-activity-flags']"));
locatorMap.set("taskActivityFlagsCommentNumParent", by.xpath("./descendant::li[@class='iconlist-text'][1]"));
locatorMap.set("taskCommentFlag", by.xpath(".//i[contains(@class,'-comment-text-outline')]"));
locatorMap.set("taskOverDueParent", by.xpath(".//div[@class='taskqueue-task-overdue']"));
locatorMap.set("taskOverDueFlag", by.xpath(".//i[contains(@class,'-clock-fast')]"));
locatorMap.set("taskListNoTasks", by.xpath(".//span[@class='alert-description'][contains(text()," +
    "'There are no open tasks that match your citeria')]"));

/**
 * locators: task details
 */
locatorMap.set("taskDetailsParent", by.xpath("./descendant::div[contains(@class,'taskdetails')]" +
    "[contains(@class,'is-active')][1]"));
locatorMap.set("taskDetailsSummary", by.xpath(".//textarea[@name='summary']"));
locatorMap.set("taskDetailsDescription", by.xpath(".//textarea[@name='description']"));
locatorMap.set("taskDetailsStatus", by.xpath("./descendant::div[contains(@class,'dropmenugroup-trigger')][2]"));
locatorMap.set("taskDetailsStatusOption", by.xpath(".//a[@name='status']"));
locatorMap.set("taskDetailsBlockCancel", by.xpath(".//*[contains(@class,'-dots-vertical')]"));
locatorMap.set("taskDetailsBlockedCanceledArea", by.xpath("./descendant::div[contains(@class,'alert')][1]"));
locatorMap.set("taskDetailsBlockedCanceledAlert", by.xpath(".//div[.='Because I said so'] [@class='alert-description']"));

/**
 * locators: comments
 */
locatorMap.set("taskDetailsCommentField", by.xpath(".//textarea[contains(@placeholder,'Add a comment')]"));
locatorMap.set("taskDetailsCommentButton", by.xpath(".//button[contains(text(), 'Comment')]"));
locatorMap.set("existingCommentParent", by.xpath(".//div[@class='comment']"));
locatorMap.set("existingComment1", by.xpath(".//div[@class='comment'][1]"));
locatorMap.set("existingCommentAuthor", by.css(".comment-author span:nth-child(1)"));
locatorMap.set("existingCommentDateTime", by.css(".comment-author span:nth-child(2)"));
locatorMap.set("existingCommentText", by.xpath(".//div[@class='comment-text']"));

var blockCancelReason = "Because I said so";

var flow = protractor.promise.controlFlow();
function waitOne() {
	return protractor.promise.delayed(4000);
}

function sleep() {
	flow.execute(waitOne);
};

var wait = basePage.globalWait();


/**
 * elements: add task
 */

var interstitial = function () {
    return  basePage.interstitial()
};

var workPageMain = function(){
    return element(by.xpath("//div[@class='work page']"))
};

var taskListNav = function(index){
    return workPageMain().element(by.xpath(".//ul[@class='page-nav-list']"))
        .all(by.xpath(".//li[@class='page-nav-list-item']")).get(index);
};


var quickAddFormMain = function() {
	return workPageMain().element(by.xpath(".//div[contains(@class,'taskquickaddform')]" +
        "[contains(@class,'is-expanded')]"))
};

var revealQuickAddForm = function () {
    return workPageMain().element(by.xpath(".//div[@class='taskquickaddtoggle-button']"))
}

var closeAddTaskForm = function() {
	return element(locatorMap.get("addTaskParent")).element(locatorMap.get("closeAddTask"));
}

var datePickerElement = function(parent) {
	return element(locatorMap.get(parent)).element(by.xpath(".//div[div[p[.='Due']]]"));
};

var cancelTaskElement = function () {
    return element(by.xpath("//button[.='Cancel']"));
};

var createTaskElement = function() {
	return quickAddFormMain().element(by.xpath(".//button[contains(text(),'Create')]"));
};

var createTaskModalElement = function() {
    return element(by.xpath("//div[contains(@class,'scimodal-content-footer')]"))
        .element(by.xpath(".//button[contains(text(),'Create')]"))
};

var closeToastMsg = function() {
	return element(locatorMap.get("closeToast"))
};

/**
 * elements: task details
 */

var taskDetailsSectionParent = function(){
    return element(by.xpath("./descendant::div[contains(@class,'taskdetails')]" +
		"[contains(@class,'is-active')][1]"))
}

var taskDetailsSectionNavMain = function(){
    return taskDetailsSectionParent()
        .element(by.xpath("./descendant::nav[contains(@class,'tabs-nav')]" +
			"[contains(@class,'mod-taskdetails')][1]"))
};

var taskDetailsSection = function(value){
    return taskDetailsSectionNavMain().all(by.xpath(".//li[contains(@class,'tabs-nav-list-item')]"))
        .get(value);
};

var taskDetailsBlockedCanceledHeader = function(value) {
	return taskDetailsSectionParent()
		.element(locatorMap.get("taskDetailsBlockedCanceledArea")).element(
			by.xpath(".//*[contains(text(), '" + value + "')]"));
};

var taskDetailsBlockedCanceledAlert = function() {
	return taskDetailsSectionParent()
		.element(locatorMap.get("taskDetailsBlockedCanceledArea")).element(
			locatorMap.get("taskDetailsBlockedCanceledAlert"));
};

var taskDetailsBlockedCanceledButton = function(value) {
	return taskDetailsSectionParent()
		.element(locatorMap.get("taskDetailsBlockedCanceledArea")).element(
			by.xpath(".//button[contains(text(), '" + value + "')]"));
};

var taskDetailsBlockCancelDisplayText = function (value) {
    return taskDetailsSectionParent().element(by.xpath(".//*[contains(text(),'"+value+"')]"));
};

var taskStatusMenu = function() {
	return taskDetailsSectionParent()
		.element(by.xpath("./descendant::div[contains(@class,'mod-reactselect')]" +
			"[input[@type='hidden']][1]"));
};

var taskStatusOptions = function(value) {
	return taskDetailsSectionParent()
        .element(by.xpath("./descendant::*[contains(text(), '" + value + "')][1]"));
};

var commentField = function() {
    return taskDetailsSectionParent()
        .element(by.xpath(".//textarea[@name='content']"));
};

var addCommentButton = function() {
	return taskDetailsSectionParent()
        .element(locatorMap.get("taskDetailsCommentButton"));
};

var commentDetails = function(index, child) {
    return taskDetailsSectionParent()
        .element(by.xpath("./descendant::div[@class='comment'][" + index + "]"))
        .element(locatorMap.get(child))
};

var taskDetailAssignee = function(value) {
	return taskDetailsSectionParent()
        .element(by.xpath(".//span[@class='name'][contains(text(), '" + value + "')]"));
};

var assigneeDetails = function(parent, value) {
	return element(locatorMap.get(parent))
        .element(by.xpath(".//div[contains(@class,'taskdetailsform-formgroup')]"))
        .element(by.xpath(".//span[contains(text(), '" + value + "')]"));
};

var taskDetailLocation = function(value) {
	return taskDetailsSectionParent()
		.element(by.xpath(".//span[.='"+value+"']"));
};

var taskDetailSummaryElement = function(value) {
	return taskDetailsSectionParent()
		.element(by.xpath(".//textarea[contains(@class,'formcontrol-textarea-input')]" +
            "[@name='name'][contains(text(),'"+value+"')]"));
};

var taskDetailDescriptionElement = function(value) {
	return taskDetailsSectionParent()
		.element(by.xpath(".//textarea[contains(@class,'formcontrol-textarea-input')]" +
            "[@name='description'][contains(text(),'"+value+"')]"));
};

var clearTaskDetailsFields = function(value){
    return taskDetailsSectionParent()
        .all(by.xpath(".//span[@class='Select-clear']")).get(value);
};

var clearDueDateElement = function() {
    return taskDetailsSectionParent()
        .element(by.xpath(".//i[contains(@class,'mdi-close')]"))
};

var taskDetailLabelRemove = function() {
	return taskDetailsSectionParent()
        .element(by.xpath("./descendant::div[contains(@class,'mod-labels')][1]"))
        .element(by.xpath("./descendant::span[contains(text(),'×')][1]"))
};

var taskDetailLabelElement = function(value) {
    return taskDetailsSectionParent()
        .element(by.xpath("./descendant::span[contains(text(), '" + value + "')][1]"))
};

var blockOrCancelTaskMenu = function() {
	return taskDetailsSectionParent()
        .element(by.xpath(".//div[@class='taskdetails-options']"));
};

var blockOrCancelOption = function(value) {
	return taskDetailsSectionParent()
        .element(by.xpath(".//*[contains(text()," + " '" + value + "')]"));
};

var blockOrCancelModal = function(value) {
	return taskDetailsSectionParent()
        .element(by.xpath(".//div[contains(@class,'scimodal-contentwrap')]" +
            "[.//div[.='"+value+"']]"));
};

var reasonForBlocking = function () {
    return blockOrCancelModal("Block Task")
        .element(by.xpath("./descendant::div[label[.='Reason for Blocking']][1]"))
};

var blockTaskDatePicker = function () {
    return blockOrCancelModal("Block Task")
        .element(by.xpath(".//div[@class='datepicker__input-container']"))
}

var newReasonField = function () {
    return blockOrCancelModal("Block Task").element(by.xpath(".//input[@label='New Reason']"))
};

var blockOrCancelModalReason = function(value) {
	return blockOrCancelModal(value).element(by.xpath(".//textarea[contains(@label,'Reason')]"));
};

var blockOrCancelModalButton = function(value) {
	return blockOrCancelModal(value).element(by.xpath(".//span[contains(text(), '" + value + "')]"));
};

/**
 * elements: filters
 */

var filtersToggleElement = function(){
    return workPageMain().element(by.xpath(".//label[contains(@class,'togglebox')]" +
        "[span[.='Filters']]"));
};

var clearAllFiltersElement = function() {
	return workPageMain().element(by.xpath(".//span[.='Clear All']"));
};

var searchFilter = function() {
	return workPageMain().element(by.xpath("./descendant::div[contains(@class," +
        "'formcontrol-inpputwrap-cell-input')][1]"))
        .element(by.xpath(".//input[@type='search']"));
};

var allOrMyTaskFilter = function(value) {
	return element(locatorMap.get("quickFiltersParent")).element(
			by.xpath(".//a[contains(text(), '" + value + "')] [contains(@class,'quickfilter-item-link')]"));
};

var allOrMyTaskFilterActive = function(value) {
	return element(locatorMap.get("quickFiltersParent")).element(
			by.xpath(".//a[contains(text(), '" + value + "')] [contains(@class,'is-active')]"));
};

var quickFilterskMenu = function() {
	return workPageMain().element(by.xpath(".//div[@class='Select-placeholder']" +
        "[.='Quick Filters']"));
};

var allFiltersMain = function() {
	return element(locatorMap.get("allFilters"));
};

var allFilterSearch = function() {
	return workPageMain()
        .element(by.xpath(".//div[@class='filtermenu']"))
        .element(by.xpath(".//input[@type='search'][contains(@class,'mod-filtersearch')]"));
}

var allFilterMainSelection = function(value){
    var filter
    if(value==="From"||value==="To"){
        filter = "Due";
    }else{
        filter = value;
    }
    return workPageMain().element(by.xpath("//span[contains(@class,'filtertrigger-label')]" +
        "[span[.='"+filter+"']]"));
};

var allFiltersSelection = function(value,value1) {
    if(typeof value1==='undefined'){
        return element(By.xpath("//div[@class='filtermenu-option'][.//span[.='"+value+"']]"))
            .element(by.xpath(".//input[@class='toggleboxinput']"));
    }else{
        return element(By.xpath("//div[@class='filtermenu-option'][.//*[contains(text(),'"+value1+"')]]" +
            "[.//span[.='"+value+"']]"));
    }
};

var allFilterDueFromTo = function(value) {
	return element(by.xpath("//div[@class='filtersmenu-duedate-datepicker-wrap']" +
        "[span[.='"+value+"']]"))
        .element(By.xpath(".//input[contains(@class,'date-input')]"))
};

var allFilterCountElement = function(value) {
	return element(by.xpath("//div[contains(text(), '" + value + "')] [@class='showfilterstoggle-count']"));
}

/**
 * elements: task queue
 */
var taskListMain = function () {
	return workPageMain().element(by.xpath("./descendant::div[@class='taskqueue-tabcontent'][1]"))
};

var taskSelected = function () {
	return taskListMain().element(by.xpath(".//div[contains(@class,'taskitem')]" +
		"[contains(@class,'is-selected')]"))
}


var taskStatus = function(value) {
	return taskSelected().element(by.xpath(".//div[contains(@class," +
		"'taskitem-details-top-status')][span[.='"+value+"']]"));
};

var taskFlag = function(value) {
	return element(locatorMap.get("taskListParent")).element(locatorMap.get("taskIsSelected"))
			.element(locatorMap.get(value));
};

var taskOverDueFlag = function() {
	return element(locatorMap.get("taskListParent")).element(locatorMap.get("taskIsSelected")).element(
			locatorMap.get("taskOverDueParent")).element(locatorMap.get("taskOverDueFlag"))
};

var taskOverDueText = function(value) {
	return element(locatorMap.get("taskListParent")).element(locatorMap.get("taskIsSelected")).element(
			locatorMap.get("taskOverDueParent")).element(
			by.xpath(".//span[contains(text(), '" + value + "')] [@class='taskqueue-task-overdue-text']"));
};

var commentCountFlag = function(value) {
	return element(locatorMap.get("taskListParent"))
        .element(locatorMap.get("taskIsSelected"))
        .element(by.xpath(".//span[@class='u-spaceleftsmsecond']"))
        .element(by.xpath(".//span[contains(text(), '" + value + "')]"));
};

var commentFlag = function() {
	return element(locatorMap.get("taskListParent"))
        .element(locatorMap.get("taskIsSelected"))
        .element(by.xpath(".//span[@class='u-spaceleftsmsecond']"))
        .element(locatorMap.get("taskCommentFlag"));
};

var starTask = function() {
	return taskSelected()
        .element(by.xpath(".//div[@class='taskqueue-task-star']"))
        .element(by.xpath("/descendant::div[contains(@class,'checkboxstar')][2]"));
};

var taskQueueGroup = function(value) {
	return element(by.xpath("//div[@class='taskqueue-togglegroup']"))
        .element(by.xpath("//span[contains(text(),'"+value+"')]"))
};

var activeTaskQueueGroup = function(value) {
	return element(locatorMap.get("taskListGroup")).element(
			by.xpath(".//a[contains(text(), '" + value + "')] [contains(@class,'is-active')]"));
};

var taskInQueue = function(value) {
	return element(by.xpath("/descendant::div[contains(@class,'taskitem')]" +
		"[.//div[contains(text(),'"+value+"')]][1]"));
};

var moreTaskElement = function() {
	return element(by.xpath(".//button[.='More Tasks']"));
};

var noTasksElement = function() {
	return basePage.findElement(locatorMap.get("taskListParent"), locatorMap.get("taskListNoTasks"));
};

/**
 * actions: add task
 */

var waitThenClick = function(element){
    return basePage.waitThenClick(element);
};

var chooseMyTasks = function(){
    return basePage.waitThenClick(taskListNav(0),"my tasks tab");
};

var chooseTeamTasks = function(){
    return basePage.waitThenClick(taskListNav(1),"team tasks tab");
};

var chooseAllTasks = function(){
    return basePage.waitThenClick(taskListNav(2), "choose all tasks tab")
};

var revealAddTaskForm = function(parent, value2, obj) {
    return basePage.waitThenClick(revealQuickAddForm(),"reveal add task form button").then(
        function () {
            useAddTaskForm(parent, value2, obj)
        });
};

var useAddTaskForm = function(parent, taskEntry, obj){
    return quickAddFormMain().isPresent().then(
        function (isVisible) {
            if (!isVisible) {
                revealAddTaskForm(parent, taskEntry, obj);
            } else {
                taskValueEntry(parent, taskEntry, obj);
        }
    });
};

var taskValueEntry = function(parent, taskEntry, obj) {
	for (var count = 0; count < taskEntry.length; count++) {
        (function(passedInCount) {
		if (taskEntry[passedInCount] === "labelEntry") {
			sleep();
			basePage.dynamicSendKeysLoop(locatorMap.get(parent), locatorMap.get("addTasklabels"),
                obj[taskEntry[passedInCount]]);
			sleep();
		} else if (taskEntry[passedInCount] === "addedDays"|| taskEntry[passedInCount]==="addedDaysNow" ||
            taskEntry[passedInCount]=== "addedDaysToday" || taskEntry[passedInCount]==="addedDaysTmrw") {
		    sleep();
            basePage.waitThenClick(datePickerElement(parent), "date picker field").then(
		        function(){
		            if(taskEntry[passedInCount] === "addedDays"){
                        datePicker.useDatePicker(obj[taskEntry[passedInCount]]);
                    }else if(taskEntry[passedInCount] === "addedDaysNow"){
                        datePicker.useNow();
                    }else if(taskEntry[passedInCount] === "addedDaysToday"){
                        datePicker.useToday();
                    }else if(taskEntry[passedInCount] === "addedDaysTmrw"){
                        datePicker.useTmrw();
                    }
                    sleep();
                })
		} else if(taskEntry[passedInCount]==="addTaskAssignee"||
            taskEntry[passedInCount]==="addTaskSite"){
		    sleep()
            basePage.waitThenClick(element(locatorMap.get(parent))
                .element(locatorMap.get(taskEntry[passedInCount])),taskEntry[passedInCount]+" field").then(
                    function () {
                        basePage.waitThenClick(basePage.dynamicMenuContent(obj[taskEntry[passedInCount]]),
                            taskEntry[passedInCount]+" "+obj[taskEntry[passedInCount]]);
                        sleep();
                    });
        } else if(taskEntry[passedInCount]==="guestRequest"
            ||taskEntry[passedInCount]==="tenantRequest"){
		    basePage.waitThenClick(element(locatorMap.get(parent)).element(locatorMap.get(
		        taskEntry[passedInCount])),taskEntry[passedInCount]+" checkbox")
        } else {
		    sleep();
             var elementToUse = element(locatorMap.get(parent))
                 .element(locatorMap.get(taskEntry[passedInCount]));
            basePage.clickThenSendKeys(elementToUse,obj[taskEntry[passedInCount]],protractor.Key.TAB,
                taskEntry[passedInCount]+" field").then(
                    function () {
                        sleep();
                    });
		}
        })(count);
	}
};

var completeCreateTask = function(delay){
    if(typeof delay != 'undefined'){
        basePage.globalWait();
    }
    return basePage.waitThenClick(createTaskModalElement(),"task modal submit button").then(
        function () {
            basePage.closeModal("created",cancelTaskElement());
        });
}

var clickToCloseAddTaskForm = function() {
    return basePage.waitThenClick(closeAddTaskForm(),"close quick add task button");
};

var addTaskAssigneeCheckedInOut = function(value) {
	expect(assigneeDetails("addTaskParent", value).isDisplayed()).toBe(true);
};

/**
 * actions: task details
 */

var taskDetailsSectionNav = function(value){
    return basePage.waitThenClick(taskDetailsSection(value), "task details tab");
};

var checkTaskDetailsBlockedCanceled = function(value1, value2, expected) {
    return basePage.checkForElement(taskDetailsBlockedCanceledHeader(value1),value1+' header',
        expected).then(
        function () {
            basePage.checkForElement(taskDetailsBlockedCanceledAlert(),value1+' alert',
                expected).then(
                function () {
                    basePage.checkForElement(taskDetailsBlockedCanceledButton(value2),value2,
                        expected).then(
                            function () {
                                basePage.checkForElement(taskDetailsBlockCancelDisplayText(
                                    blockCancelReason), blockCancelReason+' text',expected);
                            });
                });
        });
};

var checkGuestTenantBlockDateTime = function (value,expected) {
    return basePage.checkForElement(taskDetailsBlockCancelDisplayText(
        value), value+' text',expected);
};

var unBlockReopenTask = function(value1, value2) {
    return basePage.waitThenClick(taskDetailsBlockedCanceledButton(value2),value2+' button').then(
        function() {
            checkTaskDetailsBlockedCanceled(value1, value2, 'unexpected');
        });
};

var selectTaskStatus = function(obj) {
    return basePage.waitThenClick(taskInQueue(obj["addTaskSummary"]),'task with summary '+
        obj["addTaskSummary"]).then(
        function(){
            basePage.waitThenClick(taskStatusMenu(),'task status menu').then(
                function() {
                    basePage.waitThenClick(taskStatusOptions(obj["taskStatus"]),'task status' +
                        ' option '+obj["taskStatus"]);
                });
            });
};

var checkTaskStatus = function(obj) {
	return browser.wait(protractor.ExpectedConditions.presenceOf(taskStatus(obj["taskStatus"])), wait)
};

var checkTaskDetailsLabels = function(obj) {
	var labelsUsed = obj["labelEntry"];
	for (var count = 0; count < labelsUsed.length; count++) {
		basePage.displayCheck(taskDetailLabelElement(labelsUsed[count]), true);
	}
};

var removeTaskDetailsLabels = function(obj) {
	var labelsUsed = obj["labelEntry"];
	for (var count = 0; count < labelsUsed.length; count++) {
        taskDetailLabelRemove().click();
        sleep();
	}
};

var addCommentToTask = function(obj,value) {
    return selectTaskInQueue(obj).then(
        function(){
            taskDetailsSectionNav(2).then(
                function(){
                    basePage.clickThenSendKeys(commentField(),value,protractor.Key.ENTER,
                        "task details comment field").then(
                        function(){
                            basePage.waitThenClick(addCommentButton(),"add" + " comment button").then(
                                function(){
                                    taskDetailsSectionNav(0);
                                });
                        });
                })
        })
};

var commentInfoValidation = function(index, obj) {
    taskDetailsSectionNav(2).then(function(){
        var value = [ "existingCommentAuthor", "existingCommentDateTime", "existingCommentText" ];
        for (var count = 0; count < value.length; count++) {
            (function(passedInCount) {
                commentDetails(index, value[passedInCount]).getText().then(function(text) {
                    var array = text.split(",");
                    expect(array[0]).toEqual(obj[value[passedInCount]]);
                }, function(err) {
                    throw err;
                })
            })(count);
        }
    })
};

var useCancelModal = function(choice) {
    return basePage.clickThenSendKeys(blockOrCancelModalReason(choice),blockCancelReason,
        protractor.Key.TAB,choice+" modal").then(
	            function () {
	                basePage.waitThenClick(blockOrCancelModalButton(choice),choice+" task submit" +
                        " button");
                    sleep();
	            });
};

var useBlockTaskModal = function (obj, choice) {
    return basePage.waitThenClick(reasonForBlocking(),'reason for blocking field').then(
        function () {
            basePage.waitThenClick(basePage.dynamicMenuContent("Other"),'reason for blocking ' +
                'other option').then(
                function () {
                    basePage.clickThenSendKeys(newReasonField(),blockCancelReason,
                        protractor.Key.TAB,'block task modal new reason field').then(
                        function () {
                            if(choice==="Block Request Task"){
                                spectrum_sites_page.useTheTimePicker(
                                    blockOrCancelModal("Block Task"),obj["blockTime"]).then(
                                    function () {
                                        basePage.waitThenClick(blockTaskDatePicker(),
                                            "Block Task Date Picker Field").then(
                                            	function () {
                                                datePicker.useDatePicker(obj["addedDays"]).then(
                                                    function () {
                                                        basePage.waitThenClick(
                                                            blockOrCancelModalButton("Block Task"),
                                                            "Block Task Modal Submit Button")
                                                    });
                                            });
                                    });
                            } else{
                                basePage.waitThenClick(blockOrCancelModalButton("Block Task"),
                                    "Block Task Modal Submit Button");
                            }
                        });
                });
        });
};

var blockOrCancelTask = function (obj, choice) {
    return basePage.waitThenClick(taskInQueue(obj["addTaskSummary"]),"task with summary = "
        +obj["addTaskSummary"]).then(
		function () {
            basePage.waitThenClick(blockOrCancelTaskMenu(),"block or cancel task menu").then(
						function () {
						    var optionToUse
						    if(choice.includes('Block')){
						        optionToUse = 'Block Task'
                            }else{
						        optionToUse = 'Cancel Task'
                            }
                            basePage.waitThenClick(blockOrCancelOption(optionToUse),optionToUse+" option").then(
								function () {
                                    if(choice==="Cancel Task"){
                                        useCancelModal(choice);
                                    }else{
                                        useBlockTaskModal(obj, choice);
                                    }
								});
						});
				});
};

var detailsAssigneeCheckedInOut = function(value) {
	expect(assigneeDetails("taskDetailsParent", value).isDisplayed()).toBe(true);
};

/**
 * actions: task queue
 */
var selectTaskInQueue = function (obj) {
    return basePage.waitThenClick(taskInQueue(obj["addTaskSummary"]),"task with summary = "
        +obj["addTaskSummary"])
};

var starTaskClick = function(obj) {
    return basePage.waitThenClick(taskInQueue(obj["addTaskSummary"]),"task with summary = "+
        obj["addTaskSummary"]).then(
        function(){
            basePage.waitThenClick(starTask(),"task star")
            })
};

var selectTaskQueueGroup = function(value) {
	return basePage.waitThenClick(taskQueueGroup(value),"task queue group "+value);
};

var checkTaskQueueGroupNum = function(value) {
	expect(taskQueueGroup(value).isDisplayed()).toBe(true);
};

var checkTaskFlag = function(value, boolean) {
	expect(taskFlag(value).isPresent()).toBe(boolean);
};

var checkCommentCountFlag = function(value, boolean) {
	expect(commentCountFlag(value).isDisplayed()).toBe(boolean);
};

var checkCommentFlag = function(boolean) {
	expect(commentFlag().isDisplayed()).toBe(boolean);
};

var checkTaskOverDueFlag = function(boolean) {
	expect(taskOverDueFlag().isDisplayed()).toBe(boolean);
};

var checkTaskOverDueText = function(value, boolean) {
	expect(taskOverDueText(value).isDisplayed()).toBe(boolean);
}

var clickMoreTasks = function(value, boolean) {
    return browser.wait(protractor.ExpectedConditions.elementToBeClickable(moreTaskElement()), wait).then(
        function() {
            browser.actions().mouseMove(moreTaskElement()).click().perform().then(
                function () {
                    checkTaskDisplayed(value, boolean);
                })
        },function(err){
            if(boolean===false){
                expect(taskInQueue(value).isPresent()).toBe(boolean);
            }else{
                throw new Error("Task with summary = "+value+" not found: "+err.stack+"\n -----------");
            }
        });
};

var checkTaskDisplayed = function(value, boolean) {
    return basePage.interstitialWait(interstitial()).then(
        function () {
            browser.wait(protractor.ExpectedConditions.elementToBeClickable(taskInQueue(value)), wait)
                   .then(function(){
                       expect(taskInQueue(value).isDisplayed()).toBe(boolean)
                   },function(err){
                       clickMoreTasks(value, boolean);
                   })
        },function (err) {
            throw err;
        })
};

var checkNoTasks = function() {
	expect(noTasksElement().isDisplayed()).toBe(true);
}

/**
 * actions: filters
 */

var showFilters = function(){
    return basePage.waitThenClick(filtersToggleElement(),"show task filters toggle");
}

var selectAllOrMyFilter = function(value) {
	allOrMyTaskFilter(value).click().then(function() {
		expect(allOrMyTaskFilterActive(value).isDisplayed()).toBe(true);
	}, function(err) {
		throw err;
	})
};

var useSearchFilter = function(value) {
	return basePage.clickThenSendKeys(searchFilter(),value,protractor.Key.ENTER,"task search" +
        " field");
};

var selectQuickFilter = function(value) {
    return basePage.waitThenClick(quickFilterskMenu(),"quick filter menu").then(
                   function(){
                    basePage.waitThenClick(basePage.dynamicMenuContent(value),value+" quick menu" +
                       " option")
                   })
};

var useQuickFilters = function(value,obj,boolean){
    clearAllFilters().then(
        function(){
            selectQuickFilter(value).then(
                function(){
                    checkTaskDisplayed(obj["addTaskSummary"], boolean);
                })
        })
};

var useAllFilters = function(value1, value2, value3) {
    return basePage.interstitialWait(interstitial()).then(
        function () {
            showFilters().then(
                function(){
                    basePage.waitThenClick(allFilterMainSelection(value1),value1+ " task filter" +
                        " menu").then(
                        function(){
                            if (value1 === "From"||value1==="To") {
                                basePage.waitThenClick(allFilterDueFromTo(value1),value1+
                                    " filter option").then(
                                    function(){
                                        datePicker.useDatePicker(value2).then(
                                            function () {
                                                basePage.interstitialWait(interstitial()).then(
                                                    function () {
                                                        showFilters();
                                                    })
                                            })
                                    })
                            } else {
                                basePage.waitThenClick(allFiltersSelection(value2,value3),
                                    value2+" "+value3+" task filter option").then(
                                    function(){
                                        basePage.interstitialWait(interstitial()).then(
                                            function () {
                                                showFilters();
                                            })
                                    })
                            }
                        })
                })
        })
};

var useAllFilterSearch = function(value1, value2, value3) {
     return showFilters().then(
        function(){
            basePage.waitThenClick(allFilterMainSelection(value1),value1+" task filter menu").then(
                function(){
                    basePage.clickClearThenSendKeys(allFilterSearch(),value2,
                        protractor.Key.ENTER,value1+" task filter search field").then(
                        function(){
                            basePage.waitThenClick(allFiltersSelection(value2,value3),
                                value2+" "+value3+" task filter option").then(
                                function(){
                                    showFilters();
                                })
                        })
                })
        })
};

var clearAllFilters = function() {
    return showFilters().then(
        function(){
            basePage.waitThenClick(clearAllFiltersElement(),"clear all task filters button").then(
                        function(){
                            showFilters();
                        })
                })
};

var setAllFilterDueDate = function(value1, value2) {
	element(locatorMap.get("allFilterDue")).click();
	allFilterDueFromTo("From").click();
	datePicker.useDatePicker(value1);
	allFilterDueFromTo("To").click();
	datePicker.useDatePicker(value2);
};

var checkAllFilterCount = function(value, boolean) {
	expect(allFilterCountElement(value).isDisplayed()).toBe(boolean);
};

/**
 * services
 */

/**
 * services: utility
 */
spectrum_tasks_page.prototype.isMainPageLoaded = function() {
    expect(revealQuickAddForm().isPresent()).toBe(true);
};

spectrum_tasks_page.prototype.displayDate = function(value, stripZero) {
	return datePicker.displayDate(value, stripZero);
};

spectrum_tasks_page.prototype.commentDate = function(value, stripZero){
    return datePicker.commentDate(value, stripZero)
};

spectrum_tasks_page.prototype.logOut = function() {
	return spectrum_top_sideBar.logOut();
};

/**
 * services: add task
 */
spectrum_tasks_page.prototype.addTask = function(taskEntry, obj) {
    return basePage.interstitialWait(interstitial()).then(
        function () {
            sleep();
            useAddTaskForm("addTaskParent", taskEntry, obj).then(
                function () {
                    sleep();
                    basePage.waitThenClick(createTaskElement(),"create task button")
							.then(
                        function () {
                            basePage.waitThenClick(basePage.closeToastMsg(),"task created toast" +
                                " msg").then(
                                    function () {
                                     clickToCloseAddTaskForm();
                                    },function (err) {
                                    var error = err;
                                    clickToCloseAddTaskForm().then(
                                        function () {
                                            throw new Error("task created toast not found: "+error.stack+"\n" +
                                                " -----------");
                                        });
                                });
                        });
                });
        });
};

spectrum_tasks_page.prototype.addTaskFromModal = function(value2, obj,delay) {
    taskValueEntry("atModalParent", value2, obj);
    completeCreateTask(delay);
};

spectrum_tasks_page.prototype.addTaskAssigneeCheckedIn = function(value2, obj) {
	revealAddTaskForm();
	taskValueEntry("addTaskParent", value2, obj);
	addTaskAssigneeCheckedInOut("checked in");
	clickToCloseAddTaskForm();
};

spectrum_tasks_page.prototype.addTaskAssigneeCheckedOut = function(value2, obj) {
	revealAddTaskForm();
	taskValueEntry("addTaskParent", value2, obj);
	addTaskAssigneeCheckedInOut("checked out");
	clickToCloseAddTaskForm();
};

/**
 * services: task details
 */

spectrum_tasks_page.prototype.editTaskDetails = function(origObj, editObj,value){
    var editMap = new Map();
    editMap.set("addTaskSummary",taskDetailSummaryElement(origObj["addTaskSummary"]));
    editMap.set("addTaskDescription",taskDetailDescriptionElement(origObj["addTaskDescription"]));
    editMap.set("addTaskAssignee",taskDetailAssignee(origObj["addTaskAssignee"]));
    editMap.set("addTasklocation",taskDetailLocation(origObj["addTasklocation"]));
    for(var count = 0; count < value.length; count++){
        (function(passedInCount) {
        if(value[passedInCount]==="addTaskSummary"||value[passedInCount]==="addTaskDescription"){
        	basePage.clickClearThenSendKeys(editMap.get(value[passedInCount]),
				editObj[value[passedInCount]], protractor.Key.TAB,
                "task details "+value[passedInCount]);
        }else if(value[passedInCount]==="addTaskAssignee"||value[passedInCount]==="addTasklocation"){
            basePage.waitThenClick(editMap.get(value[passedInCount]),
                "task details "+value[passedInCount]).then(
                function () {
                    basePage.waitThenClick(basePage.dynamicMenuContent(editObj[value[passedInCount]]),
                        "task details "+value[passedInCount]+" "+editObj[value[passedInCount]])
                });
        }else if(value[passedInCount]==="labelEntry"){
            removeTaskDetailsLabels(origObj);
            sleep();
            basePage.dynamicSendKeysLoop(locatorMap.get("taskDetailsParent"),
                locatorMap.get("addTasklabels"),
                editObj[value[passedInCount]]);
        }else if (value[count] == "addedDays") {
            basePage.waitThenClick(clearDueDateElement()," task details clear due date element").then(
        	    function () {
                    basePage.waitThenClick(element(locatorMap.get("taskDetailsParent"))
                        .element(by.xpath(".//input[@placeholder='Due']")),"task details Due" +
                        " field").then(
                            function () {
                                datePicker.useDatePicker(editObj[value[passedInCount]]);
                                sleep();
                            })
        	    })
		}
        })(count);
    }
};

spectrum_tasks_page.prototype.areAllTasksDisplayed = function () {
	return chooseAllTasks();
}

spectrum_tasks_page.prototype.checkTaskDetails = function(value, obj) {
    var summaryDesc = function(text){
        return taskDetailsSectionParent()
            .element(by.xpath("./descendant::*[contains(text(),'"+text+"')][1]"))
    };
    sleep();
    checkTaskDisplayed(obj["addTaskSummary"],true).then(
        function(){
            basePage.waitThenClick(taskInQueue(obj["addTaskSummary"]),"task with summary = "+
                obj["addTaskSummary"]).then(
                function(){
                    sleep();
                    browser.wait(protractor.ExpectedConditions.presenceOf(summaryDesc(
                        obj["addTaskSummary"])), wait);
                    taskDetailsSectionNav(0).then(function(){
                        for (var count = 0; count < value.length; count++) {
                            if (value[count] == "labelEntry") {
                                checkTaskDetailsLabels(obj);
                            } else if (value[count] === "addTaskDescription"||
								value[count]==="requesterInput"||value[count]==="deadline") {
                                basePage.checkForElement(summaryDesc(obj[value[count]]),
                                value[count]+'= '+obj[value[count]])
                            } else if (value[count] === "addTasklocation") {
                                basePage.displayCheck(taskDetailLocation(obj[value[count]]), true);
                            } else if (value[count] === "addTaskAssignee") {
                                expect(taskDetailAssignee(obj[value[count]]).isDisplayed()).toBe(true);
                            } else if (value[count] === "addedDays" || value[count] === "addedDaysNow"
                                || value[count] === "addedDaysToday" || value[count] === "addedDaysTmrw") {
                                expect(element(by.xpath("//input[@type='text'][@placeholder='Due']"))
                                    .getAttribute('value')).toEqual(obj["displayDate"]);
                            }
                        }
                    })
                })
        })
};

spectrum_tasks_page.prototype.taskDetailsAssigneeCheckedIn = function(obj) {
    checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function(){
            taskInQueue(obj["addTaskSummary"]).click().then(
                function(){
                    detailsAssigneeCheckedInOut("checked in");
                },function(err){
                    throw err;
                })
        },function(err){
            throw err;
        })
};

spectrum_tasks_page.prototype.taskDetailsAssigneeCheckedOut = function(obj) {
    checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function(){
            taskInQueue(obj["addTaskSummary"]).click().then(
                function(){
                    detailsAssigneeCheckedInOut("checked out");
                },function(err){
                    throw err;
                })
        },function(err){
            throw err;
        })
};

spectrum_tasks_page.prototype.checkTaskDetailsBlocked = function(obj) {
    return checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function(){
            basePage.waitThenClick(taskInQueue(obj["addTaskSummary"]),'task with summary '+
                obj["addTaskSummary"]).then(
                function(){
                    checkTaskDetailsBlockedCanceled("Task Blocked", "Unblock");
                });
        });
};

spectrum_tasks_page.prototype.checkGSBlockedDateTime = function(obj,expected) {
    return checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function(){
            basePage.waitThenClick(taskInQueue(obj["addTaskSummary"]),'task with summary '+
                obj["addTaskSummary"]).then(
                function(){
                    checkGuestTenantBlockDateTime(obj["blockDate"]+', '+obj["blockDisplayTime"],
                        expected);
                });
        });
};

spectrum_tasks_page.prototype.checkTaskDetailsCanceled = function(obj) {
    return checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function(){
            taskInQueue(obj["addTaskSummary"]).click().then(
                function(){
                    checkTaskDetailsBlockedCanceled("Task Canceled", "Reopen");
                });
        });
};

spectrum_tasks_page.prototype.unBlockTask = function(obj) {
    checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function(){
            taskInQueue(obj["addTaskSummary"]).click().then(
                function(){
                    unBlockReopenTask("Task Blocked", "Unblock");
                },function(err){
                    throw err;
                })
        },function(err){
            throw err;
        })
};

spectrum_tasks_page.prototype.reopenTask = function(obj) {
    checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function(){
            taskInQueue(obj["addTaskSummary"]).click().then(
                function(){
                    unBlockReopenTask("Task Canceled", "Reopen");
                },function(err){
                    throw err;
                })
        },function(err){
            throw err;
        });
};

spectrum_tasks_page.prototype.blockTask = function(obj,choice) {
    choice = choice || "Block Task";
	return checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function(){
            blockOrCancelTask(obj,choice);
        });
};

spectrum_tasks_page.prototype.cancelTask = function(obj) {
    return checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function(){
            blockOrCancelTask(obj,"Cancel Task");
        });
};

spectrum_tasks_page.prototype.changeTaskStatus = function(obj) {
	return checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function(){
            selectTaskStatus(obj);
        });
};

spectrum_tasks_page.prototype.addComment = function(obj, value) {
	return checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function(){
            addCommentToTask(obj,value);
        });
};

spectrum_tasks_page.prototype.checkComment = function(index, obj) {
    checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function () {
            selectTaskInQueue(obj).then(
                function () {
                    commentInfoValidation(index, obj);
                });
        });
};

/**
 * services: task queue
 */
spectrum_tasks_page.prototype.starTaskInQueue = function(obj) {
    return checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function(){
        starTaskClick(obj);
        });
};

spectrum_tasks_page.prototype.checkTaskNotInQueue = function(obj, value) {
	return selectTaskQueueGroup(value).then(
        function(){
            checkTaskDisplayed(obj["addTaskSummary"], false);
        });
};

spectrum_tasks_page.prototype.checkTaskInQueue = function(obj, value) {
	return selectTaskQueueGroup(value).then(
        function(){
            checkTaskDisplayed(obj["addTaskSummary"], true);
        });
};

spectrum_tasks_page.prototype.checkTaskQueueNum = function(value) {
	checkTaskQueueGroupNum(value)
};

spectrum_tasks_page.prototype.checkTaskStatus = function(obj) {
	return checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function(){
            basePage.waitThenClick(taskInQueue(obj["addTaskSummary"]),
                'task with summary '+obj["addTaskSummary"]).then(
                function(){
                    checkTaskStatus(obj);
                });
        });
};

spectrum_tasks_page.prototype.checkTaskFlag = function(obj, boolean) {
    sleep();
	checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function(){
            basePage.waitThenClick(taskInQueue(obj["addTaskSummary"]),"task with summary = "+
                obj["addTaskSummary"]).then(
            function(){
                checkTaskFlag(obj["flag"], boolean);
            },function(err){
                    throw err;
                })
        },function(err){
            throw err;
        });
};

spectrum_tasks_page.prototype.checkTaskCommentFlags = function(obj, value, boolean) {
    sleep();
    checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function(){
            basePage.waitThenClick(taskInQueue(obj["addTaskSummary"]),"task with summary = "+
                obj["addTaskSummary"]).then(
                function(){
                    checkCommentCountFlag(value, boolean);
                    checkCommentFlag(boolean);
                })
        })
};

spectrum_tasks_page.prototype.checkTaskOverDueFlags = function(obj, value, boolean) {
    sleep();
    checkTaskDisplayed(obj["addTaskSummary"], true).then(
        function(){
            basePage.waitThenClick(taskInQueue(obj["addTaskSummary"]),"task with summary = "+
                obj["addTaskSummary"]).then(
                function(){
                    checkTaskOverDueFlag(boolean);
                    checkTaskOverDueText(value, boolean);
                },function(err){
                    throw err;
                })
        },function(err){
            throw err;
        })
};

spectrum_tasks_page.prototype.checkForNoTasks = function() {
	checkNoTasks();
};

/**
 * services: filters
 */
spectrum_tasks_page.prototype.allFilterCountCheck = function(value, boolean) {
	checkAllFilterCount(value, boolean);
}

spectrum_tasks_page.prototype.useAllFilters = function(value1, value2,value3) {
	for (var count = 0; count < value1.length; count++) {
        if(typeof value3==='undefined'){
            useAllFilters(value1[count], value2[count]);
        }else{
            useAllFilters(value1[count], value2[count],value3[count]);
        }
	}
};

spectrum_tasks_page.prototype.useAllFiltersSearch = function(value1, value2, value3) {
	for (var count = 0; count < value1.length; count++) {
        if(typeof value3==='undefined'){
            useAllFilterSearch(value1[count], value2[count]);
        }else{
            useAllFilterSearch(value1[count], value2[count], value3[count]);
        }
	}
};

spectrum_tasks_page.prototype.clearAllFilterSelection = function() {
	return selectTaskQueueGroup("OPEN").then(
        function(){
            clearAllFilters();
        });
};

spectrum_tasks_page.prototype.useAllFilterDueDate = function(value1, value2) {
	allFiltersMain().click();
	setAllFilterDueDate(value1, value2);
}


spectrum_tasks_page.prototype.tasksIStarredQuickFilter = function(obj,boolean) {
    useQuickFilters("Tasks I Starred",obj,boolean);
};

spectrum_tasks_page.prototype.tasksICreatedQuickFilter = function(obj,boolean) {
    useQuickFilters("Tasks I Created",obj,boolean);
};

spectrum_tasks_page.prototype.blockedTasksQuickFilter = function(obj,boolean) {
    useQuickFilters("Blocked Tasks",obj,boolean);
};

spectrum_tasks_page.prototype.allTasksFilter = function() {
	selectAllOrMyFilter("All Tasks");
};

spectrum_tasks_page.prototype.myTasksFilter = function() {
    return chooseMyTasks();
};

spectrum_tasks_page.prototype.teamTasksFilter = function(){
    return chooseTeamTasks();
}

spectrum_tasks_page.prototype.useSearchFilter = function(value) {
	return chooseAllTasks().then(
                function(){
                    useSearchFilter(value).then(
                    	function () {
							basePage.interstitialWait(interstitial())
						},function (err) {
							throw err;
						})
                },function(err){
                    throw err;
                })
};

spectrum_tasks_page.prototype.sleepALittleWhile = function () {
    return basePage.globalWait();
};