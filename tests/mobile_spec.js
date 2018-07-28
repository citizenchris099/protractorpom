var spectrum_login_page = require('../pages/spectrum_login_page.js').spectrum_login_page;
var spectrum_mobile_top_sideBar = require('../pages/spectrum_mobile_top_sideBar.js')
    .spectrum_mobile_top_sideBar;
var spectrum_mobile_locations = require('../pages/spectrum_mobile_locations.js')
    .spectrum_mobile_locations;
var spectrum_mobile_assets = require('../pages/spectrum_mobile_assets.js')
    .spectrum_mobile_assets;
var spectrum_mobile_tasks_page = require('../pages/spectrum_mobile_tasks_page.js')
    .spectrum_mobile_tasks_page;
var phraseGen = require('../pages/phraseGen.js').phraseGen;
var taskInformation = require('./taskInformation.js').taskInformation;
var mobile_taskinfo = require('./mobile_taskinfo.js').mobile_tasninfo;
var userInformation = require('./userInformation.js').userInformation;
var assetInformation = require('./assetInformation.js').assetInformation;
var procRoundInformation = require('./procRoundInformation.js').procRoundInformation;
var locInformation = require('./locInformation.js').locInformation;
var teamInformation = require('./teamInformation.js').teamInformation;
var spec_Share = require('./spec_Share.js').spec_Share;
var localTasking = browser.params.environment.url;
var testType = browser.params.environment.type;
var testSection = browser.params.environment.toTest;
var multiTest = browser.params.environment.multiBrowser;
var users = spec_Share.users();
var siteToTest;
var teamToTest;
var clientToTest;
var locToTest1;
var locToTest2;
var userToTest1 = "Test User3";
var isLoggedin;
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
var supertest = require('supertest');
api = supertest(localTasking)
describe('Flywheel Automation', function() {
    beforeAll(function() {
        browser.ignoreSynchronization = true;
        browser.get(localTasking);
        browser.manage().timeouts().implicitlyWait(5000);
    });
    var choice = getRandomIntInclusive(0,8)
    var loginUser = users[choice]
    var logIn = function(logInMethod) {
        var emailPhone
        if(logInMethod==="email"){
            emailPhone = loginUser.email
        }else if(logInMethod==="phone"){
            emailPhone = loginUser.phone
        }
        spectrum_login_page.taskingLogin(emailPhone, loginUser.password,'mobile').then(
            function () {
                isLoggedin = true;
            });
    };
    var logOut = function() {
        spectrum_mobile_top_sideBar.signOutOfMobile();
    };
    var logOutInAs = function(username, password) {
        spectrum_mobile_top_sideBar.signOutOfMobile().then(
            function () {
                spectrum_login_page.taskingLogin(username, password,'mobile');
            }).then(
            function () {
                isLoggedin = true;
            });
    };
    describe('Test Suite', function() {
        beforeAll(function(done) {
            api.post('/api/testReset/users?team='+browser.params.environment.team+'&site='
                +browser.params.environment.site)
               .set('Accept','application/json')
               .send({})
               .expect('Content-Type',/json/)
               .expect(200)
               .end(function(err,res){
                   if(err){
                       console.log("error = "+err+" & res = "+res)
                       done.fail(err);
                   }else{
                       console.log("fixtures reset and responce body = ",res.body);
                       siteToTest = res.body.site.name;
                       teamToTest = res.body.team.name;
                       clientToTest = res.body.client.name;
                       locToTest1 = res.body.locations[0].name;
                       locToTest2 = res.body.locations[1].name;
                       done();
                   }
               })
        });
        afterEach(function(){
            // browser.manage().logs().get('browser').then(function(browserLogs) {
            //     /**
            //      * browserLogs is an array of objects with level and message fields
            //      */
            //     browserLogs.forEach(function(log){
            //         if (log.level.value > 900) { // it's an error log
            //             console.log('Browser console error!');
            //             console.log(log.message);
            //         }
            //     });
            // });
        });
        function basicTests() {
            describe('basic',function () {
                describe('log in and out tests',function () {
                    it('can log into flywheel using email',function () {
                        logIn("email");
                    });
                    it('can log out of flywheel',function () {
                        logOut();
                    })
                    it('can log into flywheel using a phone number',function(){
                        logIn("phone");
                    });
                })
                describe('navigation tests',function () {
                    it('can navigate to locations section',function () {
                        spectrum_mobile_top_sideBar.navToLocationsSection().then(
                            function () {
                               spectrum_mobile_locations.checkLocationTab()
                            });
                    });
                    it('can navigate to asset section',function () {
                        spectrum_mobile_top_sideBar.navToAssetsSection().then(
                            function () {
                                spectrum_mobile_assets.checkAssetsTab();
                            });
                    });
                    it('can navigate to the work section',function () {
                        spectrum_mobile_top_sideBar.navToWorkSection().then(
                            function () {
                                spectrum_mobile_tasks_page.checkForWorkTab();
                            }
                        )
                    });
                    tasksTests();
                });
            })
        };
        function tasksTests(){
            describe('tasks tests', function() {
                var taskEntry,addTaskTest,addTaskTest2,editTaskTest,blockTask,cancelTask;
                beforeAll(function(){
                    if(isLoggedin != true){
                        logIn("email");
                    }
                    spectrum_mobile_top_sideBar.navToWorkSection();
                });
                describe('simple add task tests', function() {
                    beforeAll(function () {
                        taskEntry = [ "taskSummary","siteToTest"];
                        addTaskTest = mobile_taskinfo.mobileTaskDataInfo(siteToTest,teamToTest,
                            userToTest1)
                    })
                    it('can add a task', function() {
                        spectrum_mobile_tasks_page.addTaskMobile(addTaskTest,taskEntry);
                    });
                    it('has the correct task details', function() {
                        spectrum_mobile_tasks_page.checkOpenTaskDetails(addTaskTest,taskEntry);
                    });
                });
                if(testType=="regression")
                {
                    describe('regression',function () {
                        beforeAll(function () {
                            taskEntry = [ "taskSummary","siteToTest","team","user"];
                            addTaskTest = mobile_taskinfo.mobileTaskDataInfo(siteToTest,teamToTest,
                                userToTest1);
                            addTaskTest2 = mobile_taskinfo.mobileTaskDataInfo(siteToTest,teamToTest,
                                userToTest1);
                            editTaskTest = mobile_taskinfo.mobileTaskDataInfo(siteToTest,teamToTest,
                                userToTest1);
                            blockTask = mobile_taskinfo.mobileTaskDataInfo(siteToTest,teamToTest,
                                userToTest1);
                            cancelTask = mobile_taskinfo.mobileTaskDataInfo(siteToTest,teamToTest,
                                userToTest1);
                            logOutInAs(users[1].email,users[1].password);
                        });
                        describe('full task creation tests',function () {
                            it('can create task with description, team & user',function () {
                                spectrum_mobile_tasks_page.addTaskMobile(addTaskTest,taskEntry);
                            });
                            it('has the correct task details', function() {
                                spectrum_mobile_tasks_page.checkOpenTaskDetails(addTaskTest,taskEntry);
                            });
                        });
                        // describe('filters tests',function () {
                        //     it('displays the task in the team task queue',function () {
                        //         spectrum_mobile_tasks_page.checkForTeamTask(addTaskTest);
                        //     });
                        //     it('does not display the task in the my task queue',function () {
                        //         spectrum_mobile_tasks_page.checkForMyTask(addTaskTest,'unexpected');
                        //     });
                        //     it('displays unread task to creator when unread filter applied',
                        //         function () {
                        //         spectrum_mobile_tasks_page.checkForUnreadTask(addTaskTest);
                        //     });
                        //     it('displays the unread task to assignee when unread filter is' +
                        //         ' applied',function () {
                        //         logOutInAs(users[0].email,users[0].password);
                        //         spectrum_mobile_tasks_page.checkForUnreadTask(addTaskTest);
                        //     });
                        //     it('does not display a read task to assignee after a task has been' +
                        //         ' read when using the unread filter',function () {
                        //         logOutInAs(users[0].email,users[0].password);
                        //         spectrum_mobile_tasks_page.checkOpenTaskDetails(addTaskTest,
                        //             taskEntry).then(
                        //                 function () {
                        //                     spectrum_mobile_tasks_page.checkForUnreadTask(
                        //                         addTaskTest,'unexpected')
                        //                 });
                        //     });
                        //     it('can clear task filters',function () {
                        //         spectrum_mobile_tasks_page.clearTaskQueueFilters().then(
                        //             function () {
                        //                 spectrum_mobile_tasks_page.checkForOpenTask(addTaskTest);
                        //             });
                        //     });
                        //     it('does not display a read task to the creator once the assignee' +
                        //         ' has read a task when using the unread filter',function () {
                        //         logOutInAs(users[1].email,users[1].password);
                        //         spectrum_mobile_tasks_page.checkForUnreadTask(addTaskTest,
                        //             'unexpected');
                        //     });
                        //     it('can clear task filters',function () {
                        //         spectrum_mobile_tasks_page.clearTaskQueueFilters().then(
                        //             function () {
                        //                 spectrum_mobile_tasks_page.checkForOpenTask(addTaskTest);
                        //             });
                        //     });
                        //     it('displays tasks created by user when created by me filter applied',
                        //     function () {
                        //         logOutInAs(users[1].email,users[1].password);
                        //         spectrum_mobile_tasks_page.checkForCreatedByMeTask(addTaskTest);
                        //     });
                        //     it('does not display task created by other user when created by me' +
                        //         ' fiter is applied',function () {
                        //         logOutInAs(users[0].email,users[0].password);
                        //         spectrum_mobile_tasks_page.checkForCreatedByMeTask(addTaskTest,
                        //             'unexpected');
                        //     });
                        // });
                        // describe('task status tests',function () {
                        //     beforeAll(function () {
                        //         logOutInAs(users[1].email,users[1].password);
                        //         spectrum_mobile_tasks_page.addTaskMobile(addTaskTest2,
                        //             [ "taskSummary","siteToTest"]);
                        //     })
                        //     it('displays tasks that have not been started as not started in the' +
                        //         ' task queue',function () {
                        //         logOutInAs(users[1].email,users[1].password);
                        //         spectrum_mobile_tasks_page.checkTaskQueueNotStarted(addTaskTest);
                        //     });
                        //     it('can Start a task',function () {
                        //         logOutInAs(users[1].email,users[1].password);
                        //         spectrum_mobile_tasks_page.startATask(addTaskTest);
                        //     });
                        //     it('displays the task as in progress in the task queue',function () {
                        //         spectrum_mobile_tasks_page.checkTaskQueueInProgress(addTaskTest);
                        //     });
                        //     it('cannot start a task without an assignee',function () {
                        //         spectrum_mobile_tasks_page.checkTaskAssigneeStartMsg(addTaskTest2);
                        //     });
                        //     it('does not display a task without assignee as started in the tasks' +
                        //         ' queue',function () {
                        //         spectrum_mobile_tasks_page.checkTaskQueueNotStarted(addTaskTest2);
                        //     });
                        //     it('can Pause a task',function () {
                        //         logOutInAs(users[1].email,users[1].password);
                        //         spectrum_mobile_tasks_page.pauseATask(addTaskTest);
                        //     });
                        //     it('displays tasks that have been paused as on hold in task queue',
                        //         function () {
                        //         spectrum_mobile_tasks_page.checkTaskQueueOnHold(addTaskTest);
                        //     });
                        //     it('can Resume a task',function () {
                        //         logOutInAs(users[1].email,users[1].password);
                        //         spectrum_mobile_tasks_page.resumeATask(addTaskTest);
                        //     });
                        //     it('displays tasks that have been resumed as in progress',function () {
                        //         spectrum_mobile_tasks_page.checkTaskQueueInProgress(addTaskTest);
                        //     });
                        //     it('can complete a task',function () {
                        //         logOutInAs(users[1].email,users[1].password);
                        //         spectrum_mobile_tasks_page.completeATask(addTaskTest);
                        //     });
                        //     it('does not display complete task in the open queue',function () {
                        //         spectrum_mobile_tasks_page.checkForOpenTask(addTaskTest,'unexpected');
                        //     });
                        //     it('displays complete task in the closed task queue',function () {
                        //         spectrum_mobile_tasks_page.checkForClosedTask(addTaskTest);
                        //     });
                        //     it('displays the complete task as complete in tasks queue',function () {
                        //         spectrum_mobile_tasks_page.checkTaskComplete(addTaskTest);
                        //     });
                        //     it('cannot complete a tasks that does not have an assignee',function () {
                        //         logOutInAs(users[1].email,users[1].password);
                        //         spectrum_mobile_tasks_page.checkTaskAssigneeCompleteMsg(addTaskTest2);
                        //     });
                        // });
                        // describe('block and cancel task tests',function () {
                        //     describe('block task tests',function () {
                        //         beforeAll(function () {
                        //             logOutInAs(users[1].email,users[1].password);
                        //             spectrum_mobile_tasks_page.addTaskMobile(blockTask,
                        //                 [ "taskSummary","siteToTest","team","user"]);
                        //         });
                        //         it('can block a task',function () {
                        //             spectrum_mobile_tasks_page.blockTask(blockTask);
                        //         });
                        //         it('displays the task as blocked in the task queue',function () {
                        //             spectrum_mobile_tasks_page.checkTaskQueueIsBlocked(blockTask);
                        //         });
                        //         it('displays the correct alter details for a blocked task',
                        //             function () {
                        //             spectrum_mobile_tasks_page.checkBlockTaskDetails(blockTask);
                        //         });
                        //         it('displays a blocked task when the blocked task filter is' +
                        //             ' applied',function () {
                        //             spectrum_mobile_tasks_page.checkForBlockedTask(blockTask);
                        //         });
                        //         it('displays a blocked task when the Created by me filter is' +
                        //             ' applied',function () {
                        //             spectrum_mobile_tasks_page.checkForCreatedByMeTask(blockTask);
                        //         });
                        //         it('can unblock a task',function () {
                        //             logOutInAs(users[1].email,users[1].password);
                        //             spectrum_mobile_tasks_page.unblockATask(blockTask);
                        //         });
                        //         it('does not display a task as blocked in the task queue after a' +
                        //             ' task has been unblocked',function () {
                        //             spectrum_mobile_tasks_page.checkTaskQueueIsBlocked(blockTask,
                        //             'unexpected');
                        //         });
                        //         it('does not display block altert details for unblocked task',
                        //             function () {
                        //             spectrum_mobile_tasks_page.checkBlockTaskDetails(blockTask,
                        //                 'unexpected');
                        //         });
                        //         it('does not display unblocked task when the blocked task filter' +
                        //             ' is applied',function () {
                        //             spectrum_mobile_tasks_page.checkForBlockedTask(blockTask,
                        //                 'unexpected');
                        //         });
                        //     });
                        //     describe('cancel task tests',function () {
                        //         beforeAll(function () {
                        //             logOutInAs(users[1].email,users[1].password);
                        //             spectrum_mobile_tasks_page.addTaskMobile(cancelTask,
                        //                 [ "taskSummary","siteToTest","team","user"]);
                        //         });
                        //         it('can cancel a task',function () {
                        //             spectrum_mobile_tasks_page.cancelTask(cancelTask);
                        //         });
                        //         it('displays the task as canceled in the closed task queue',
                        //         function () {
                        //             spectrum_mobile_tasks_page.checkTaskCanceled(cancelTask)
                        //         });
                        //         it('displays the canceled task alert details',function () {
                        //             spectrum_mobile_tasks_page.checkCanceledTaskDetails(cancelTask);
                        //         });
                        //         it('can reopen a task',function () {
                        //             logOutInAs(users[1].email,users[1].password);
                        //             spectrum_mobile_tasks_page.reopenATask(cancelTask);
                        //         });
                        //         it('displays a reopened task in the open task queue',function () {
                        //             spectrum_mobile_tasks_page.checkForOpenTask(cancelTask);
                        //         });
                        //     });
                        // });
                        // describe('task search tests',function () {
                        //     it('can search for a task',function () {
                        //         logOutInAs(users[0].email,users[0].password);
                        //         spectrum_mobile_tasks_page.searchForATask(blockTask);
                        //     });
                        //     it('does not display the task not searched for',function () {
                        //         spectrum_mobile_tasks_page.checkForOpenTask(cancelTask,'unexpected');
                        //     });
                        //     it('can clear task search',function () {
                        //         spectrum_mobile_tasks_page.clearTaskSearch(cancelTask);
                        //     });
                        // });
                    });
                }
            });
        };
        for (var count = 0; count < 1; count++) {
            if(multiTest==='no'){
                if(testSection==="basic"){
                    basicTests();
                } else if(testSection==="tasks"){
                    tasksTests();
                };
            };
        };
    });
});