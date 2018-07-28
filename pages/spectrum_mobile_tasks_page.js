var spectrum_mobile_tasks_page = function() {
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

var blockCancelReason = "Because I said so";

/**
 * elements
 */
var workPageMain = function () {
    return element(by.xpath("//div[@class='work']"))
};

var workPageFooterMain = function () {
    return workPageMain().element(by.xpath(".//div[@class='workfooter']"));
};

var workPageSearch = function () {
    return workPageFooterMain().element(by.xpath(".//div[@class='workfooter-search']"))
        .element(by.xpath(".//input[@type='text']"));
};

var addTaskButton = function () {
    return workPageFooterMain().element(by.xpath(".//button[@class='workfooter-button']"));
};

var addTaskForm = function () {
    return workPageMain().element(by.xpath(".//div[@class='taskquickadd-body']"));
};

var addTaskSumDesc = function (value) {
    return addTaskForm().element(by.xpath(".//textarea[@label='"+value+"']"));
};

var addTaskSelectMenuMain = function (value) {
    return addTaskForm().element(by.xpath(".//*[@class='taskdetailsform-formgroup-placeholder']" +
        "[contains(text(),'"+value+"')]"));
};

var addTaskSelectOption = function (value) {
    return addTaskForm().element(by.cssContainingText('option', value));
};

var addTaskSubmitButton = function () {
    return addTaskForm().element(by.xpath(".//button[contains(@class," +
        "'taskquickadd-body-submit-button btn')][contains(@class,'mod-primary')]"));
};

var addTaskBackIcon = function () {
    return element(by.xpath(".//span[contains(@class,'card-header-backicon')]"));
};

var taskQueueNavTabs = function (value) {
    return workPageMain().element(by.xpath(".//ul[contains(@class,'tabs-nav-list')]" +
        "[contains(@class,'taskqueue')]"))
                         .element(by.xpath("./descendant::li[contains(@class,'tabs-nav-list')]" +
                             "["+value+"]"));
};

var taskQueueGroup = function (value) {
    return workPageMain().element(by.xpath(".//a[contains(@class,'togglegroup-item-link')]" +
        "[contains(text(),'"+value+"')]"));
};

var taskInQueue = function (value) {
    return workPageMain().element(by.xpath("/descendant::div[contains(@class,'taskitem')]" +
                                           "[.//div[contains(text(),'"+value+"')]][1]"))
};

var taskQueueStatus = function (summary,status) {
    return taskInQueue(summary).element(by.xpath(".//div[contains(@class," +
        "'taskitem-details-top-status')][span[.='"+status+"']]"));
};

var taskQueueBlocked = function (summary) {
    return taskInQueue(summary).element(by.xpath(".//i[contains(@class,'alert-octagon')]"))
}

var taskDetailsMain = function () {
    return workPageMain().element(by.xpath(".//div[contains(@class,'taskdetails')]" +
        "[contains(@class,'is-open')]"));
};

var taskDetail = function (value) {
    return taskDetailsMain().element(by.xpath("./descendant::*[contains(text(),'"+value+"')][1]"));
};

var taskDetailBackButton = function () {
    return taskDetailsMain().element(by.xpath(".//a[@class='taskdetails-header-backlink']"));
};

var startPauseTaskButton = function (value) {
    return taskDetailsMain().element(by.xpath(".//div[contains(@class,'taskdetails-header-" +
        "taskstatus')][.//span[@class='taskdetails-header-taskstatus-label']" +
        "[.='"+value+"']]"));
};

var taskAssigneeMsg = function () {
    return taskDetailsMain().element(by.xpath(".//div[@class='appupgrade-content-panel']" +
        "[.//*[.='Provide an Assignee']]"));
};

var taskAssigneeMsgOk = function () {
    return taskAssigneeMsg().element(by.xpath(".//button[.='Okay']"));
};

var completeTaskButton = function () {
    return taskDetailsMain().element(by.xpath(".//input[@type='checkbox']"));
};

var taskDetailMOMenu = function () {
    return taskDetailsMain().element(by.xpath(".//i[contains(@class,'mdi-dots-vertical')]"));
};

var taskDetailsMOMenuButton = function (value) {
    return taskDetailsMain().element(by.xpath(".//ul[contains(@class,'dropmenugroup-menu')]"))
        .element(by.xpath(".//div[@class='dropmenugroup-menu-item-link']" +
            "[.='"+value+"']"));
};

var blockOrCancelModal = function(value) {
    return taskDetailsMain()
        .element(by.xpath(".//div[contains(@class,'scimodal-contentwrap')]" +
            "[.//div[.='"+value+"']]"));
};

var blockOrCancelModalReason = function(value) {
    return blockOrCancelModal(value).element(by.xpath(".//textarea[contains(@label,'Reason')]"));
};

var blockOrCancelModalButton = function(value) {
    return blockOrCancelModal(value).element(by.xpath(".//span[contains(text(), '" + value + "')]"));
};

var newReasonField = function () {
    return blockOrCancelModal("Block Task").element(by.xpath(".//input[@label='New Reason']"))
};

var reasonForBlocking = function () {
    return blockOrCancelModal("Block Task")
        .element(by.xpath("./descendant::div[//label[.='Reason for Blocking']][1]"))
};

var taskDetailsBlockCancelAlertMain = function (value) {
    return taskDetailsMain().element(by.xpath(".//div[contains(@class,'alert')]" +
        "[contains(@class,'u-clearfix')][.//div[.='"+value+"']]"));
};

var taskDetailBlockCancelReason = function (blockCancel,reason) {
    return taskDetailsBlockCancelAlertMain(blockCancel)
        .element(by.xpath(".//div[.='"+reason+"']"));
};

var taskDetailUnblockReopen = function (blockCancel,button) {
    return taskDetailsBlockCancelAlertMain(blockCancel)
        .element(by.xpath(".//button[.='"+button+"']"));
};

var workFiltersButton = function () {
    return workPageMain().element(by.xpath(".//div[@class='work-filters-btn']"))
        .element(by.xpath(".//span[contains(@class,'touchable')]"));
};

var taskFiltersMain = function () {
    return workPageMain().element(by.xpath(".//div[@class='alltaskfilters']"));
};

var taskFilterChoice = function (value) {
    return taskFiltersMain().element(by.xpath(".//span[contains(text(),'"+value+"')]"));
};

var clearAllTaskFilters = function () {
    return taskFiltersMain().element(by.xpath(".//div[@class='alltaskfilters-header-clearall']" +
        "[.='Clear All']"));
};

var closeTaskFilters = function () {
    return taskFiltersMain().element(by.xpath(".//span[contains(@class,'closeicon')]" +
        "[contains(@class,'touchable')]"));
};

var taskSearchField = function () {
    return workPageMain().element(by.xpath(".//div[contains(@class," +
        "'formcontrol-inpputwrap-cell-input')][.//p[.='Search']]"))
        .element(by.xpath(".//input[@type='text']"));
};

var clearTaskSearchField = function () {
    return workPageMain().element(by.xpath(".//div[contains(@class,'searchfield-actions')]" +
        "[i[contains(@class,'ani-search')]]"));
};

/**
 * actions
 */
var searchForTask = function (value) {
    return basePage.clickThenSendKeys(taskSearchField(),value,protractor.Key.TAB,'task search' +
        ' field')
};

var clearTaskSearch = function () {
    return basePage.waitThenClick(clearTaskSearchField(),'clear task search button');
};

var applyTaskFilter = function (value) {
    return basePage.waitThenClick(workFiltersButton(),'open filter menu button').then(
        function () {
            basePage.waitThenClick(taskFilterChoice(value),'task filter '+value).then(
                function () {
                    basePage.waitThenClick(closeTaskFilters(),'close task filter menu');
                });
        });
};

var clearTaskFilter = function () {
    return basePage.waitThenClick(workFiltersButton(),'open filter menu button').then(
        function () {
            basePage.waitThenClick(clearAllTaskFilters(),'clear task filters button').then(
                function () {
                    basePage.waitThenClick(closeTaskFilters(),'close task filters button');
                });
        });
};

var checkWorkPageLoaded = function () {
    return basePage.checkForElement(workPageMain(),'work page main tab');
};

var openAddTaskForm = function () {
    return basePage.waitThenClick(addTaskButton(),'add task button');
};

var closeAddTaskForm = function () {
    return basePage.waitThenClick(addTaskBackIcon(),'add task back button');
};

var useAddTaskForm = function (obj,value) {
    var formElements = new Map();
    formElements.set('taskSummary',addTaskSumDesc("Task summary"));
    formElements.set('taskDescription', addTaskSumDesc("Task description"));
    formElements.set('siteToTest',addTaskSelectMenuMain("Site"));
    formElements.set('team',addTaskSelectMenuMain("Team"));
    formElements.set('user',addTaskSelectMenuMain("Assignee"));
    for (var count = 0; count < value.length; count++) {
        (function(passedInCount) {
        if(value[passedInCount]==='taskSummary'|| value[passedInCount]==='taskDescription'){
            basePage.typeEachCharacter(formElements.get(value[passedInCount]),
                obj[value[passedInCount]],value[passedInCount]+' field')
        }else {
            basePage.checkForElement(addTaskSelectOption(obj[value[passedInCount]]),
                value[passedInCount]+' option '+obj[value[passedInCount]]).then(
                    function () {
                        addTaskSelectOption(obj[value[passedInCount]]).click();
                    })
        }
        })(count);
    }
    basePage.waitThenClick(addTaskSubmitButton(),'add task submit button').then(
        function () {
            browser.wait(protractor.ExpectedConditions.elementToBeClickable(workPageFooterMain()),
                wait).then(
                function () {
                },function (err) {
                    var ERROR = err;
                    closeAddTaskForm().then(
                        function () {
                            throw new Error("did not make it passed the mobile add task form" +
                                " upon submit: "+ERROR.stack+"\n" + " -----------");
                        })
                })
        })
};

var checkTaskDetails = function (obj,value) {
    return showAllOpenTasks().then(
                function () {
                    selectTaskInQueue(obj["taskSummary"]).then(
                        function () {
                            for (var count = 0; count < value.length; count++) {
                                basePage.checkForElement(taskDetail(obj[value[count]]));
                            };
                        })
                });
};

var closeTaskDetails = function () {
    return basePage.waitThenClick(taskDetailBackButton(),'task details back button');
};

var checkTaskQueueStatus = function (obj,status) {
    return showAllOpenTasks().then(
        function () {
            basePage.checkForElement(taskQueueStatus(obj["taskSummary"],status),
                'task with status '+obj["taskSummary"]+' & status = '+status);
        });
};

var checkTaskCompleteStatus = function (obj) {
    return showAllClosedTasks().then(
        function () {
            basePage.checkForElement(taskQueueStatus(obj["taskSummary"],'Complete'),
                'task with status '+obj["taskSummary"]+' & status = Complete');
        });
};

var checkTaskCanceledStatus = function (obj) {
    return showAllClosedTasks().then(
        function () {
            basePage.checkForElement(taskQueueStatus(obj["taskSummary"],'Canceled'),
                'task with status '+obj["taskSummary"]+' & status = Canceled');
        });
};


var checkTaskBlockedStatus = function (obj,expected) {
    return showAllOpenTasks().then(
        function () {
            basePage.checkForElement(taskQueueBlocked(obj["taskSummary"]),
                'task with status '+obj["taskSummary"]+' blocked icon',expected)
        });
};

var startTask = function (obj) {
    return selectTaskInQueue(obj["taskSummary"]).then(
        function () {
            sleep();
            basePage.waitThenClick(startPauseTaskButton("Start"),'Start Task Button').then(
                function () {
                    basePage.checkForElement(startPauseTaskButton("Pause"),'Pause Task Button');
                });
        });
};

var startTaskNoAssignee = function (obj) {
    return selectTaskInQueue(obj["taskSummary"]).then(
        function () {
            sleep();
            basePage.waitThenClick(startPauseTaskButton("Start"),'Start Task Button').then(
                function () {
                    basePage.waitThenClick(taskAssigneeMsgOk(),'task assignee msg ok button');
                });
        });
};

var pauseTask = function (obj) {
    return selectTaskInQueue(obj["taskSummary"]).then(
        function () {
            sleep();
            basePage.waitThenClick(startPauseTaskButton("Pause"),'Pause Task Button').then(
                function () {
                    basePage.checkForElement(startPauseTaskButton("Resume"),'Resume Task Button');
                });
        });
};

var resumeTask = function (obj) {
    return selectTaskInQueue(obj["taskSummary"]).then(
        function () {
            sleep();
            basePage.waitThenClick(startPauseTaskButton("Resume"),'Resume Task Button').then(
                function () {
                    basePage.checkForElement(startPauseTaskButton("Pause"),'Pause Task Button');
                });
        });
};

var completeTask = function (obj) {
    return selectTaskInQueue(obj["taskSummary"]).then(
        function () {
            sleep();
            basePage.waitThenClick(completeTaskButton(),'Complete Task Button').then(
                function () {
                    basePage.checkForElement(startPauseTaskButton("Pause"),'Pause Task Button',
                    'unexpected');
                });
        });
};

var completeTaskNoAssignee = function (obj) {
    return selectTaskInQueue(obj["taskSummary"]).then(
        function () {
            sleep();
            basePage.waitThenClick(completeTaskButton(),'Complete Task Button').then(
                function () {
                    basePage.waitThenClick(taskAssigneeMsgOk(),'task assignee msg ok button');
                });
        });
};

var showMyTasks = function () {
    return basePage.waitThenClick((taskQueueNavTabs("1")),'My tasks tab');
};

var showTeamTasks = function () {
    return basePage.waitThenClick(taskQueueNavTabs("2"),'Team tasks tab');
};

var showAllTasks = function () {
    return basePage.waitThenClick(taskQueueNavTabs("3"),'All tasks tab');
};

var showOpenTasks = function () {
    return basePage.waitThenClick(taskQueueGroup("OPEN"),'OPEN task queue tab');
};

var showClosedTasks = function () {
    return basePage.waitThenClick(taskQueueGroup("CLOSED"),'CLOSED task queue tab');
};

var checkTaskPresentInQueue = function (value,expected) {
    return basePage.checkForElement(taskInQueue(value),'task with summary '+value,expected);
};

var selectTaskInQueue = function (value) {
    return basePage.waitThenClick(taskInQueue(value),'task with summary '+value);
};

var showAllOpenTasks = function () {
    return showAllTasks().then(
        function () {
            showOpenTasks();
        });
};

var showAllClosedTasks = function () {
    return showAllTasks().then(
        function () {
            showClosedTasks();
        });
};

var showOpenTeamTasks = function () {
    return showTeamTasks().then(
        function () {
            showOpenTasks();
        });
};

var showMyOpenTasks = function () {
    return showMyTasks().then(
        function () {
            showOpenTasks();
        });
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

var useBlockTaskModal = function () {
    return basePage.waitThenClick(reasonForBlocking(),'reason for blocking field').then(
        function () {
            basePage.waitThenClick(basePage.dynamicMenuContent("Other")).then(
                function () {
                    basePage.clickThenSendKeys(newReasonField(),blockCancelReason,
                        protractor.Key.TAB,'block task modal new reason field').then(
                        function () {
                            basePage.waitThenClick(blockOrCancelModalButton("Block Task"),
                                "Block Task Modal Submit Button")
                        });
                });
        });
};

var blockCancelATask = function (obj,task) {
    return selectTaskInQueue(obj["taskSummary"]).then(
        function () {
            basePage.waitThenClick(taskDetailMOMenu(),'Task Details MO Button').then(
                function () {
                    basePage.waitThenClick(taskDetailsMOMenuButton(task)).then(
                        function () {
                            if(task==='Block Task'){
                                useBlockTaskModal();
                            }else{
                                useCancelModal(task);
                            }
                        });
                });
        });
};

var checkBlockCancelTaskDetails = function (obj,blockCancel,reason,button,expected) {
    return selectTaskInQueue(obj["taskSummary"]).then(
        function () {
            basePage.checkForElement(taskDetailBlockCancelReason(blockCancel,reason),
            blockCancel+' altert msg with reason = '+reason,expected).then(
                function () {
                    basePage.checkForElement(taskDetailUnblockReopen(blockCancel,button),
                        button+' button',expected);
                });
        });
};

var unblockReopenTask = function (obj,blockCancel,button) {
    return selectTaskInQueue(obj["taskSummary"]).then(
        function () {
            basePage.waitThenClick(taskDetailUnblockReopen(blockCancel,button));
        });
};

/**
 * services
 */
spectrum_mobile_tasks_page.prototype.checkForWorkTab = function () {
    return checkWorkPageLoaded();
};

spectrum_mobile_tasks_page.prototype.addTaskMobile = function (obj,value) {
    return openAddTaskForm().then(
        function () {
            useAddTaskForm(obj,value);
        });
};

spectrum_mobile_tasks_page.prototype.checkForOpenTask = function (obj,expected) {
    return showAllOpenTasks().then(
        function () {
            checkTaskPresentInQueue(obj["taskSummary"],expected);
        });
};

spectrum_mobile_tasks_page.prototype.checkForClosedTask = function (obj,expected) {
    return showAllClosedTasks().then(
        function () {
            checkTaskPresentInQueue(obj["taskSummary"],expected);
        });
};

spectrum_mobile_tasks_page.prototype.checkForTeamTask = function (obj,expected) {
    return showOpenTeamTasks().then(
        function () {
            checkTaskPresentInQueue(obj["taskSummary"],expected);
        });
};

spectrum_mobile_tasks_page.prototype.checkForMyTask = function (obj,expected) {
    return showMyOpenTasks().then(
        function () {
            checkTaskPresentInQueue(obj["taskSummary"],expected);
        });
};

spectrum_mobile_tasks_page.prototype.checkOpenTaskDetails = function (obj,value) {
    return checkTaskDetails(obj,value).then(
        function () {
            closeTaskDetails();
        });
};

spectrum_mobile_tasks_page.prototype.clearTaskQueueFilters = function () {
    return clearTaskFilter();
}

spectrum_mobile_tasks_page.prototype.checkForUnreadTask = function (obj,expected) {
    return showAllOpenTasks().then(
        function () {
            applyTaskFilter("Unread").then(
                function () {
                    checkTaskPresentInQueue(obj["taskSummary"],expected)
                });
        });
};

spectrum_mobile_tasks_page.prototype.checkForBlockedTask = function (obj,expected) {
    return showAllOpenTasks().then(
        function () {
            applyTaskFilter("Blocked").then(
                function () {
                    checkTaskPresentInQueue(obj["taskSummary"],expected)
                });
        });
};

spectrum_mobile_tasks_page.prototype.checkForCreatedByMeTask = function (obj,expected) {
    return showAllOpenTasks().then(
        function () {
            applyTaskFilter("Created by me").then(
                function () {
                    checkTaskPresentInQueue(obj["taskSummary"],expected)
                });
        });
};

spectrum_mobile_tasks_page.prototype.startATask = function (obj) {
    return showAllOpenTasks().then(
        function () {
            startTask(obj).then(
                function () {
                    closeTaskDetails();
                });
        });
};

spectrum_mobile_tasks_page.prototype.checkTaskAssigneeStartMsg = function (obj) {
    return showAllOpenTasks().then(
        function () {
            startTaskNoAssignee(obj).then(
                function () {
                    closeTaskDetails();
                });
        });
};

spectrum_mobile_tasks_page.prototype.pauseATask = function (obj) {
    return showAllOpenTasks().then(
        function () {
            pauseTask(obj).then(
                function () {
                    closeTaskDetails();
                });
        });
};

spectrum_mobile_tasks_page.prototype.resumeATask = function (obj) {
    return showAllOpenTasks().then(
        function () {
            resumeTask(obj).then(
                function () {
                    closeTaskDetails();
                });
        });
};

spectrum_mobile_tasks_page.prototype.completeATask = function (obj) {
    return showAllOpenTasks().then(
        function () {
            completeTask(obj).then(
                function () {
                    closeTaskDetails();
                });
        });
};

spectrum_mobile_tasks_page.prototype.checkTaskAssigneeCompleteMsg = function (obj) {
    return showAllOpenTasks().then(
        function () {
            completeTaskNoAssignee(obj).then(
                function () {
                    closeTaskDetails();
                });
        });
};

spectrum_mobile_tasks_page.prototype.checkTaskQueueInProgress = function (obj) {
    return checkTaskQueueStatus(obj,"In Progress");
};

spectrum_mobile_tasks_page.prototype.checkTaskQueueNotStarted = function (obj) {
    return checkTaskQueueStatus(obj,"Not Started");
};

spectrum_mobile_tasks_page.prototype.checkTaskQueueOnHold = function (obj) {
    return checkTaskQueueStatus(obj,"On Hold");
};

spectrum_mobile_tasks_page.prototype.checkTaskComplete = function (obj) {
    return checkTaskCompleteStatus(obj);
};

spectrum_mobile_tasks_page.prototype.checkTaskCanceled = function (obj) {
    return checkTaskCanceledStatus(obj);
};

spectrum_mobile_tasks_page.prototype.checkTaskQueueIsBlocked = function (obj,expected) {
    return checkTaskBlockedStatus(obj,expected);
};

spectrum_mobile_tasks_page.prototype.blockTask = function (obj) {
    return showAllOpenTasks().then(
        function () {
            blockCancelATask(obj,'Block Task').then(
                function () {
                    closeTaskDetails();
                });
        });
};

spectrum_mobile_tasks_page.prototype.cancelTask = function (obj) {
    return showAllOpenTasks().then(
        function () {
            blockCancelATask(obj,'Cancel Task').then(
                function () {
                    closeTaskDetails();
                });
        });
};

spectrum_mobile_tasks_page.prototype.checkBlockTaskDetails = function (obj,expected) {
    return showAllOpenTasks().then(
        function () {
            checkBlockCancelTaskDetails(obj,'Task Blocked',blockCancelReason,'Unblock',expected).then(
                function () {
                    closeTaskDetails();
                });
        });
};

spectrum_mobile_tasks_page.prototype.checkCanceledTaskDetails = function (obj,expected) {
    return showAllClosedTasks().then(
        function () {
            checkBlockCancelTaskDetails(obj,'Task Canceled',blockCancelReason,'Reopen',expected).then(
                function () {
                    closeTaskDetails();
                });
        });
};

spectrum_mobile_tasks_page.prototype.unblockATask = function (obj) {
    return showAllOpenTasks().then(
        function () {
            unblockReopenTask(obj,'Task Blocked','Unblock').then(
                function () {
                    closeTaskDetails();
                });
        });
};

spectrum_mobile_tasks_page.prototype.reopenATask = function (obj) {
    return showAllClosedTasks().then(
        function () {
            unblockReopenTask(obj,'Task Canceled','Reopen').then(
                function () {
                    closeTaskDetails();
                });
        });
};

spectrum_mobile_tasks_page.prototype.searchForATask = function (obj,expected) {
    return showAllOpenTasks().then(
        function () {
            searchForTask(obj["taskSummary"]).then(
                function () {
                    checkTaskPresentInQueue(obj["taskSummary"],expected)
                });
        });
};

spectrum_mobile_tasks_page.prototype.clearTaskSearch = function (obj,expected) {
    return showAllOpenTasks().then(
        function () {
            clearTaskSearch().then(
                function () {
                    checkTaskPresentInQueue(obj["taskSummary"],expected);
                });
        });
};



exports.spectrum_mobile_tasks_page = new spectrum_mobile_tasks_page();