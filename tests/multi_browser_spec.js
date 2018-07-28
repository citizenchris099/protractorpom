/**
 * Created by chrismanning on 5/24/16.
 */

var spectrum_login_page = require('../pages/spectrum_login_page.js').spectrum_login_page;
var spectrum_tasks_page = require('../pages/spectrum_tasks_page.js').spectrum_tasks_page;
var spectrum_people_page = require('../pages/spectrum_people_page.js').spectrum_people_page;
var spectrum_sites_page = require('../pages/spectrum_sites_page.js').spectrum_sites_page;
var spectrum_top_sideBar = require('../pages/spectrum_top_sideBar.js').spectrum_top_sideBar;
var phraseGen = require('../pages/phraseGen.js').phraseGen;
var taskInformation = require('./taskInformation.js').taskInformation;
var userInformation = require('./userInformation.js').userInformation;
var teamInformation = require('./teamInformation.js').teamInformation;
var multiTest = browser.params.environment.multiBrowser;
var testSection = browser.params.environment.toTest;
var localTasking = browser.params.environment.url;
var spec_Share = require('./spec_Share.js').spec_Share;

var users = spec_Share.users();

var logInAs = function(username, password) {
    spectrum_login_page.taskingLogin(username, password);
};

var logOut = function() {
    spectrum_tasks_page.logOut();
    spectrum_login_page.isLoginPageLoaded();
};

var switchBrowser = function(currentBrowser){
    browser = currentBrowser;
    element = currentBrowser.element;
    return{
        browser : browser,
        element : element
    }
};

var supertest = require('supertest');
api = supertest(localTasking)

if(multiTest==='yes'){
    describe('multi browser comments tests',function(){
        var browserA, browserB;

        var browsers = {
            a : browser,
            b : browser.forkNewDriverInstance()
        };
        browserA = browsers.a;
        browserB = browsers.b;

        var taskEntry = [ "addTaskSummary", "addTaskDescription","addTaskSite",
            "addTasklocation", "labelEntry", "addTaskAssignee","addedDays"];
        var addTaskTest = taskInformation.addTaskData();
        var commentTaskTest = taskInformation.editTaskValues([ "" ], "not started", addTaskTest);
        var taskEdit = [ "addTaskSummary","addTaskDescription","addTasklocation",
            "labelEntry","addedDays" ];
        var editTaskTest = taskInformation.editTaskValues(taskEdit,
            "not started", addTaskTest);

        var tu4Task001 = taskInformation.addTaskData();
        tu4Task001.addTaskAssignee = users[1].userName;
        var tu4TaskEditSummary = taskInformation.editTaskValues(["addTaskSummary"],
            "not started", tu4Task001);
        var tu4TaskEditDesc = taskInformation.editTaskValues(["addTaskDescription"],
            "not started", tu4TaskEditSummary);
        var tu4TaskEditLoc = taskInformation.editTaskValues(["addTasklocation"],
            "not started", tu4TaskEditDesc);
        var tu4TaskEditDD = taskInformation.editTaskValues(["addedDays"],
            "not started", tu4TaskEditLoc);
        var tu4TaskComment = taskInformation.editTaskValues([ "" ], "not started", tu4TaskEditDD);

        beforeAll(function(done) {
            api.post('/api/reset/all')
               .set('Accept','application/json')
               .send({})
               .expect('Content-Type',/json/)
               .expect(200)
               .end(function(err,res){
                   if(err){
                       done.fail(err);
                   }else{
                       console.log("fixtures reset and responce body = ",res.body)
                       done();
                   }
               })
        });
        it('can load browser a',function(){
            var browserAndElement = switchBrowser(browserA);
            browser = browserAndElement.browser;
            element = browserAndElement.element;

            browserA.ignoreSynchronization = true
            browserA.get(localTasking);
            browserA.manage().timeouts().implicitlyWait(5000);
            browser.driver.manage().window().setSize(1600, 1000);

            logInAs(users[0].email,users[0].password);
            spectrum_top_sideBar.goToWork();
            spectrum_tasks_page.isMainPageLoaded();
        });
        it('can load browser b',function(){
            var browserAndElement = switchBrowser(browserB);
            browser = browserAndElement.browser;
            element = browserAndElement.element;

            browserB.ignoreSynchronization = true;
            browserB.get(localTasking);
            browserB.manage().timeouts().implicitlyWait(5000);
            browser.driver.manage().window().setSize(1600, 1000);

            logInAs(users[1].email,users[1].password);
            spectrum_top_sideBar.goToWork();
            spectrum_tasks_page.isMainPageLoaded();
        });

        it('can create a task in browser a',function(){
            var browserAndElement = switchBrowser(browserA);
            browser = browserAndElement.browser;
            element = browserAndElement.element;

            spectrum_tasks_page.addTask(taskEntry, addTaskTest);
            spectrum_tasks_page.areAllTasksDisplayed(addTaskTest, true);
            spectrum_tasks_page.checkTaskDetails(taskEntry, addTaskTest);
        });
        it('checks for task in browser b',function(){
            var browserAndElement = switchBrowser(browserB);
            browser = browserAndElement.browser;
            element = browserAndElement.element;

            spectrum_tasks_page.areAllTasksDisplayed(addTaskTest, true);
            spectrum_tasks_page.checkTaskDetails(taskEntry, addTaskTest);
        });
        it('adds a comment to the task from browser a',function(){
            var browserAndElement = switchBrowser(browserA);
            browser = browserAndElement.browser;
            element = browserAndElement.element;

            spectrum_tasks_page.addComment(commentTaskTest, commentTaskTest["existingCommentText"]);
        });
        it('checks for the presence of the comment in broser b',function(){
            var browserAndElement = switchBrowser(browserB);
            browser = browserAndElement.browser;
            element = browserAndElement.element;

            spectrum_tasks_page.checkComment(1, commentTaskTest);
        });
        it('validates the presence of the comment flags in browser b', function() {
            spectrum_tasks_page.checkTaskInQueue(commentTaskTest, "OPEN");
            spectrum_tasks_page.checkTaskCommentFlags(commentTaskTest, 1, true);
        });
        it('edits a task in browser a',function(){
            var browserAndElement = switchBrowser(browserA);
            browser = browserAndElement.browser;
            element = browserAndElement.element;

            spectrum_tasks_page.editTaskDetails(addTaskTest, editTaskTest,taskEdit);
        });
        it('checks for edits in browser b',function(){
            var browserAndElement = switchBrowser(browserB);
            browser = browserAndElement.browser;
            element = browserAndElement.element;

            logOut();
            logInAs(users[1].email,users[1].password);
            spectrum_top_sideBar.goToWork();
            spectrum_tasks_page.areAllTasksDisplayed(editTaskTest, true).then(
                function () {
                    spectrum_tasks_page.checkTaskDetails(taskEdit, editTaskTest);
                },function (err) {
                    throw err;
                })
        });

        describe('notificatoin tests',function () {
            it('can edit notification settings in browser b',function(){
                var browserAndElement = switchBrowser(browserB);
                browser = browserAndElement.browser;
                element = browserAndElement.element;
                spectrum_top_sideBar.uMNotificationSettings(["Changes On My Tasks",
                    "Desktop Push Notifications"])
            });
            it('can create a task in browser a and assign to tu4 / browser b',function () {
                var browserAndElement = switchBrowser(browserA);
                browser = browserAndElement.browser;
                element = browserAndElement.element;
                spectrum_tasks_page.addTask(taskEntry, tu4Task001);
            });
            it('displays a notification in browser b with the correct details',function(){
                var browserAndElement = switchBrowser(browserB);
                browser = browserAndElement.browser;
                element = browserAndElement.element;
                spectrum_top_sideBar.closeDeskNotification("Test User3 assigned you a task").then(
                    function () {
                        spectrum_top_sideBar.checkNotificationInList("Test User3 assigned you a task")
                    },function (err) {
                        throw err;
                    })
            });
            it('edits a task summary in browser a',function(){
                var browserAndElement = switchBrowser(browserA);
                browser = browserAndElement.browser;
                element = browserAndElement.element;
                logOut();
                logInAs(users[0].email,users[0].password);
                spectrum_top_sideBar.goToWork();
                spectrum_tasks_page.areAllTasksDisplayed(tu4Task001, true).then(
                    function () {
                        spectrum_tasks_page.checkTaskDetails(taskEdit, tu4Task001);
                        spectrum_tasks_page.editTaskDetails(tu4Task001, tu4TaskEditSummary,
                            [ "addTaskSummary" ]);
                    },function (err) {
                        throw err;
                    })
            });
            it('displays a notification in browser b indicating summary was edited',function(){
                var msg = "Test User3 updated your task summary to: "+
                    '"'+tu4TaskEditSummary["addTaskSummary"]+'"'
                var browserAndElement = switchBrowser(browserB);
                browser = browserAndElement.browser;
                element = browserAndElement.element;
                spectrum_top_sideBar.closeDeskNotification(msg).then(
                    function () {
                        spectrum_top_sideBar.checkNotificationInList(msg)
                    },function (err) {
                        throw err;
                    })
            });
            it('edits a task description in browser a',function(){
                var browserAndElement = switchBrowser(browserA);
                browser = browserAndElement.browser;
                element = browserAndElement.element;
                logOut();
                logInAs(users[0].email,users[0].password);
                spectrum_top_sideBar.goToWork();
                spectrum_tasks_page.areAllTasksDisplayed(tu4TaskEditSummary, true).then(
                    function () {
                        spectrum_tasks_page.checkTaskDetails(taskEdit, tu4TaskEditSummary);
                        spectrum_tasks_page.editTaskDetails(tu4TaskEditSummary, tu4TaskEditDesc,
                            [ "addTaskDescription" ]);
                    },function (err) {
                        throw err;
                    })
            });
            it('displays a notification in browser b indicating description was edited',function(){
                var msg = "Test User3 updated the description of your task to: "+
                    '"'+tu4TaskEditDesc["addTaskDescription"]+'"'
                var browserAndElement = switchBrowser(browserB);
                browser = browserAndElement.browser;
                element = browserAndElement.element;
                spectrum_top_sideBar.closeDeskNotification(msg).then(
                    function () {
                        spectrum_top_sideBar.checkNotificationInList(msg)
                    },function (err) {
                        throw err;
                    })
            });
            it('edits a task location in browser a',function(){
                var browserAndElement = switchBrowser(browserA);
                browser = browserAndElement.browser;
                element = browserAndElement.element;
                logOut();
                logInAs(users[0].email,users[0].password);
                spectrum_top_sideBar.goToWork();
                spectrum_tasks_page.areAllTasksDisplayed(tu4TaskEditDesc, true).then(
                    function () {
                        spectrum_tasks_page.checkTaskDetails(taskEdit, tu4TaskEditDesc);
                        spectrum_tasks_page.editTaskDetails(tu4TaskEditDesc, tu4TaskEditLoc,
                            [ "addTasklocation" ]);
                    },function (err) {
                        throw err;
                    })
            });
            it('displays a notification in browser b indicating location was edited',function(){
                var browserAndElement = switchBrowser(browserB);
                browser = browserAndElement.browser;
                element = browserAndElement.element;
                spectrum_top_sideBar.closeDeskNotification(tu4TaskEditLoc["addTasklocation"]).then(
                    function () {
                        spectrum_top_sideBar.checkNotificationInList(tu4TaskEditLoc["addTasklocation"])
                    },function (err) {
                        throw err;
                    })
            });
            it('edits a task location in browser a',function(){
                var browserAndElement = switchBrowser(browserA);
                browser = browserAndElement.browser;
                element = browserAndElement.element;
                logOut();
                logInAs(users[0].email,users[0].password);
                spectrum_top_sideBar.goToWork();
                spectrum_tasks_page.areAllTasksDisplayed(tu4TaskEditLoc, true).then(
                    function () {
                        spectrum_tasks_page.checkTaskDetails(taskEdit, tu4TaskEditLoc);
                        spectrum_tasks_page.editTaskDetails(tu4TaskEditLoc, tu4TaskEditDD,
                            [ "addedDays" ]);
                    },function (err) {
                        throw err;
                    })
            });
            it('displays a notification in browser b indicating location was edited',function(){
                var browserAndElement = switchBrowser(browserB);
                browser = browserAndElement.browser;
                element = browserAndElement.element;
                spectrum_top_sideBar.closeDeskNotification(tu4TaskEditDD["displayDateAlt"]).then(
                    function () {
                        spectrum_top_sideBar.checkNotificationInList(tu4TaskEditDD["displayDateAlt"])
                    },function (err) {
                        throw err;
                    })
            });
            it('adds a comment to the task from browser a',function(){
                var browserAndElement = switchBrowser(browserA);
                browser = browserAndElement.browser;
                element = browserAndElement.element;
                spectrum_tasks_page.addComment(tu4TaskComment,
                    tu4TaskComment["existingCommentText"]);
            });
            it('displays a notification in browser b indicating comment was added',function(){
                var msg = "Test User3 commented on your task: "+
                    '"'+tu4TaskComment["existingCommentText"]+'"'
                var browserAndElement = switchBrowser(browserB);
                browser = browserAndElement.browser;
                element = browserAndElement.element;
                spectrum_top_sideBar.closeDeskNotification(msg).then(
                    function () {
                        spectrum_top_sideBar.checkNotificationInList(msg)
                    },function (err) {
                        throw err;
                    })
            });
        })
    })
}