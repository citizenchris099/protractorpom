var spectrum_login_page = require('../pages/spectrum_login_page.js').spectrum_login_page;
var spectrum_tasks_page = require('../pages/spectrum_tasks_page.js').spectrum_tasks_page;
var spectrum_people_page = require('../pages/spectrum_people_page.js').spectrum_people_page;
var spectrum_sites_page = require('../pages/spectrum_sites_page.js').spectrum_sites_page;
var spectrum_top_sideBar = require('../pages/spectrum_top_sideBar.js').spectrum_top_sideBar;
var spectrum_dashboard = require('../pages/spectrum_dashboard.js').spectrum_dashboard;
var phraseGen = require('../pages/phraseGen.js').phraseGen;
var taskInformation = require('./taskInformation.js').taskInformation;
var userInformation = require('./userInformation.js').userInformation;
var assetInformation = require('./assetInformation.js').assetInformation;
var procRoundInformation = require('./procRoundInformation.js').procRoundInformation;
var locInformation = require('./locInformation.js').locInformation;
var teamInformation = require('./teamInformation.js').teamInformation;
var spec_Share = require('./spec_Share.js').spec_Share;
var tt001 = teamInformation.tt001();
var comment = phraseGen.randomPhrase();
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
var userToTest2 = "Test User4";
var isLoggedin;
function getRandomIntInclusive(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};var supertest = require('supertest');
api = supertest(localTasking)
describe('Flywheel Automation', function () {
	beforeAll(function () {
		browser.ignoreSynchronization = true;
		browser.get(localTasking);
		browser.manage().timeouts().implicitlyWait(5000);
		// browser.driver.manage().window().setSize(1600, 1000);
		// browser.driver.manage().window().setSize(2048, 1152);
		browser.driver.manage().window().maximize();
	});
	var logOutInAs = function (username, password) {
		spectrum_tasks_page.logOut().then(function () {
			spectrum_login_page.taskingLogin(username, password);
		}).then(function () {
			isLoggedin = true;
		});
	};
	var goToWork = function () {
		spectrum_top_sideBar.goToWork();
	};
	var choice = getRandomIntInclusive(0, 8)
	var loginUser = users[choice]
	var logIn = function (logInMethod) {
		var emailPhone
		if (logInMethod === "email") {
			emailPhone = loginUser.email
		} else if (logInMethod === "phone") {
			emailPhone = loginUser.phone
		}
		spectrum_login_page.taskingLogin(emailPhone, loginUser.password).then(function () {
			isLoggedin = true;
		});
	};
	var logOut = function () {
		spectrum_tasks_page.logOut();
		spectrum_login_page.isLoginPageLoaded();
	};
	var logOutIn = function () {
		logOut();
		logIn("email");
	};
	var goToPeople = function () {
		spectrum_top_sideBar.goToPeople(true);
	};
	var goToSites = function (value) {
		spectrum_top_sideBar.goToSites();
		spectrum_sites_page.isSitesPageLoaded();
		spectrum_sites_page.checkSiteInList(value);
	};
	var refreshWorkPage = function (value) {
		// browser.refresh();
		logOutIn();
		if (typeof value != 'undefined') {
			spectrum_tasks_page.sleepALittleWhile();
		}
		goToWork();
		spectrum_tasks_page.clearAllFilterSelection();
	};
	var checkTaskDetails = function (addTaskTest, taskEntry, value) {
		refreshWorkPage(value);
		spectrum_tasks_page.areAllTasksDisplayed().then(function () {
			spectrum_tasks_page.checkTaskDetails(taskEntry, addTaskTest);
		});
	};
	var checkTaskPresent = function (addTaskTest, queue) {
		// browser.refresh();
		goToWork();
		spectrum_tasks_page.areAllTasksDisplayed().then(function () {
			spectrum_tasks_page.checkTaskInQueue(addTaskTest, queue);
		});
	};
	var checkTaskNotPresent = function (addTaskTest, queue) {
		// browser.refresh();
		goToWork();
		spectrum_tasks_page.areAllTasksDisplayed().then(function () {
			spectrum_tasks_page.checkTaskNotInQueue(addTaskTest, queue);
		});
	};
	describe('Test Suite', function () {
		beforeAll(function (done) {
			api.post('/api/testReset/users?team=' + browser.params.environment.team + '&site='
			         + browser.params.environment.site)
			   .set('Accept', 'application/json')
			   .send({})
			   .expect('Content-Type', /json/)
			   .expect(200)
			   .end(function (err, res) {
				   if (err) {
					   console.log("error = " + err + " & res = " + res)
					   done.fail(err);
				   } else {
					   console.log("fixtures reset and responce body = ", res.body);
					   siteToTest = res.body.site.name;
					   teamToTest = res.body.team.name;
					   clientToTest = res.body.client.name;
					   locToTest1 = res.body.locations[0].name;
					   locToTest2 = res.body.locations[1].name;
					   done();
				   }
			   })
		});
		afterEach(function () {
			/*browser.manage().logs().get('browser').then(function(browserLogs) {
			    /!**
			     * browserLogs is an array of objects with level and message fields
			     *!/
			    browserLogs.forEach(function(log){
			        if (log.level.value > 900) { // it's an error log
			            console.log('Browser console error!');
			            console.log(log.message);
			        }
			    });
			});*/
		});
		function basicTests() {
			describe('basic', function () {
				afterAll(function () {
					// logOut();
				})
				describe('log in and out tests', function () {
					afterAll(function () {
						logOut();
					});
					it('can log into flywheel using email', function () {
						logIn("email");
					});
					it('can log out of flywheel', function () {
						logOut();
					})
					it('can log into flywheel using a phone number', function () {
						logIn("phone");
					});
				})
				describe('navigation tests', function () {
					beforeAll(function () {
						browser.refresh();
						logIn("email");
					})
					it('can navigate to the work section', function () {
						spectrum_top_sideBar.goToWork();
					});
					it('can navigate to site section', function () {
						goToSites(siteToTest);
					});
					it('can navigate to site settings', function () {
						spectrum_sites_page.goToSiteSettings();
					});
					it('can navigate to site locations', function () {
						spectrum_sites_page.goToSitesLocations(true);
					});
					it('can navigate to site assets', function () {
						spectrum_sites_page.goToSitesAssets(true);
					});
					it('can navigate to site strategies', function () {
						spectrum_sites_page.goToStrategies();
					});
					it('can navigate to site rounds', function () {
						spectrum_sites_page.goToRounds(true);
					});
					it('can navigate to the people section', function () {
						goToPeople();
					});
					it('can toggle the people view in the people section', function () {
						spectrum_people_page.peopleToggle();
					});
					it('can toggle the team view in the people section', function () {
						spectrum_people_page.teamsToggle();
					});
					it('can navigate back to the flywheel daoshboard section', function () {
						spectrum_top_sideBar.goToDashBaord();
					});
					tasksTests();
					peopleTests();
				});
				describe('misc tests', function () {
					miscTests();
				});
				/**
				 * TODO add basic modal tests ex: does modal open, are all fields present etc..
				 */
			})
		};
		function basicTests2() {
			describe('basic2 tests', function () {
				describe('sites smoke', function () {
					sitesTests();
				});
				describe('roles and perm', function () {
					roleAndPermissionsTests();
				});
			})
		};
		function miscTests() {
			describe('misc tests', function () {
				describe('user profile tests', function () {
					var element, updateUser, value;
					beforeAll(function () {
						element = [
							"firstName", "lastName", "email", "phone", "billableRate",
							"internalRate", "Save"];
						updateUser = userInformation.addUserData("Admin", [teamToTest]);
						value = [
							updateUser["userFName"], updateUser["userLName"],
							updateUser["userEmail"], updateUser["userPhone"],
							updateUser["billableRate"], updateUser["internalRate"], ""]
						if (isLoggedin != true) {
							spectrum_login_page.taskingLogin(users[1].email, users[1].password)
							                   .then(function () {
								                   isLoggedin = true;
							                   });
						} else {
							logOutInAs(users[1].email, users[1].password);
						}
					});
					it('can edit the user profile', function () {
						spectrum_top_sideBar.updateUProfile(element, value)
					});
					it('dispays the updated values on the user profile', function () {
						var details = [
							"userPhone", "userLName", "userFName", "billableRate", "internalRate",
							"userEmail"];
						spectrum_top_sideBar.validateUserProfile(details, updateUser)
					});
					it('can log in using newly updated email', function () {
						logOutInAs(updateUser["userEmail"], users[1].password);
					});
					if (testType == "regression") {
						it('can log in using newly updated phone', function () {
							logOutInAs(updateUser["userPhone"], users[1].password);
						});
						/**
						 * TODO post profile details check failng
						 */
						it('displays the updated values in the user details section', function () {
							var details = [
								"userPhone", "role", "userLName", "userFName", "billableRate",
								"internalRate", "userEmail"];
							logOutInAs(users[9].email, users[9].password);
							spectrum_top_sideBar.selectClient(clientToTest);
							goToPeople();
							spectrum_people_page.peopleToggle().then(function () {
								spectrum_people_page.checkUserDetails(details, updateUser);
							})
						});
						it('can update password from user profile screen', function () {
							logOutInAs(updateUser["userPhone"], users[1].password);
							spectrum_top_sideBar.updatePWord(users[1].password, updateUser["password"])
						});
						it('can login w/newly updated pword', function () {
							logOutInAs(updateUser["userPhone"], updateUser["password"]);
						});
						it('can update notification settings from the user menu link', function () {
							spectrum_top_sideBar.uMNotificationSettings([
								                                            "Changes On My Tasks",
								                                            "Desktop Push Notifications"])
						});
					}
				})
			});
		};
		function sitesTests() {
			var choice = "create";
			var element, value, value2, value3, testLoc1, testLoc2, testLoc3, editLoc, editLocDup,
			    testLoc4, testLoc4Dup, parLoc, childLoc, parLoc1, childLocEdit, testLocPM,
			    testLocRound, testLocRoundEdit, newLabel, testAsset, testAsset2, testAsset3,
			    testAsset3Dup, testAsset4, testAsset4Dup, testAsset5, testAsset6, testAsset7,
			    testAsset8, editAsset, editAsset2, editAsset3, editAsset4, testAssetPM,
			    testAssetRound, testAssetRoundEdit, addTaskTest, round1, taskEntry;
			describe(' sites tests', function () {
				beforeAll(function (done) {
					testLoc1 = locInformation.testLoc(siteToTest);
					testLoc2 = locInformation.testLoc(siteToTest);
					testLoc2.type = testLoc1["type"];
					testLoc3 = locInformation.testLoc(siteToTest);
					testLoc3.type = testLoc1["type"];
					editLoc = locInformation.editLoc(testLoc3, ["name"]);
					editLocDup = locInformation.cloneALoc(editLoc);
					editLocDup.name = editLocDup["name"] + " (1)"
					testLoc4 = locInformation.testLoc(siteToTest);
					testLoc4Dup = locInformation.cloneALoc(testLoc4);
					testLoc4Dup.name = testLoc4Dup["name"] + " (1)";
					parLoc = locInformation.testLoc(siteToTest);
					parLoc.type = testLoc1["type"];
					childLoc = locInformation.testLoc(parLoc["name"]);
					childLoc.type = testLoc1["type"];
					parLoc1 = locInformation.testLoc(siteToTest);
					parLoc1.type = testLoc1["type"];
					childLocEdit = locInformation.cloneALoc(childLoc);
					childLocEdit.location = parLoc1["name"];
					testLocPM = locInformation.testLoc(siteToTest);
					testLocPM.type = testLoc2["type"];
					testLocRound = locInformation.testLoc(siteToTest);
					testLocRound.type = testLoc2["type"];
					testLocRoundEdit = locInformation.editLoc(testLocRound, ["reading"]);

					testAsset = assetInformation.testAsset("In Service", testLoc2["name"]);
					newLabel = phraseGen.randomLabel() + getRandomIntInclusive(1, 10);
					testAsset2 = assetInformation.testAsset("In Service", testLoc2["name"]);
					testAsset2.type = testAsset["type"];
					testAsset3 = assetInformation.testAsset("In Service", testLoc2["name"]);
					testAsset3Dup = assetInformation.cloneAnAsset(testAsset3)
					testAsset3Dup.name = testAsset3Dup.name + " (1)";
					testAsset4 = assetInformation.testAsset("In Service", testLoc2["name"]);
					testAsset4.type = testAsset3["type"];
					testAsset4Dup = assetInformation.cloneAnAsset(testAsset4)
					testAsset4Dup.name = testAsset4.name + " (1)";
					testAsset5 = assetInformation.testAsset("In Service", testLoc2["name"]);
					testAsset5.type = testAsset3["type"];
					testAsset6 = assetInformation.testAsset("In Service", locToTest1);
					testAsset6.type = testAsset["type"];
					testAsset7 = assetInformation.testAsset("In Service", testLoc2["name"]);
					testAsset7.type = testAsset3["type"];
					testAsset8 = assetInformation.testAsset("In Service", childLocEdit["name"]);
					testAsset8.type = testAsset["type"];
					editAsset = assetInformation.editAsset(testAsset, ["name"]);
					editAsset2 = assetInformation.editAsset(testAsset2, ["Offline"]);
					editAsset3 = assetInformation.editAsset(editAsset2, ["Retired"]);
					editAsset4 = assetInformation.editAsset(editAsset3, ["In Service"]);
					testAssetPM = assetInformation.testAsset("In Service", testLoc1["name"]);
					testAssetPM.type = testAsset["type"];
					testAssetRound = assetInformation.testAsset("In Service", testLoc1["name"]);
					testAssetRound.type = testAsset["type"];
					testAssetRoundEdit = assetInformation.editAsset(testAssetRound, ["reading"]);

					round1
						= procRoundInformation.testProcRound(1, "No", users[1].userName, testAssetRound);

					if (isLoggedin != true) {
						logIn("email");
					}

					goToSites(siteToTest);
					done();
				});
				describe('site settings ', function () {
					beforeAll(function (done) {
						spectrum_sites_page.goToSiteSettings();
						done();
					});
					it('can create new asset type', function () {
						spectrum_sites_page.createNewAssetType(testAsset["type"], choice);
					});
					it('can create new location type', function () {
						spectrum_sites_page.createNewLocationType(testLoc1["type"], choice);
					});
					it('can create new label', function () {
						spectrum_sites_page.createNewLabel(newLabel, choice);
					});
					if (testType == "regression") {
						/**
						 * TODO add site information / address entry and validation tests
						 */
					}
					;
				})
				describe('site locations ', function () {
					beforeAll(function (done) {
						logOutInAs(users[0].email, users[0].password);
						goToSites(siteToTest);
						spectrum_sites_page.goToSitesLocations(true);
						done();
					})
					describe('add location button modal tests', function () {
						beforeAll(function () {
							element = ["name", "lType", "pLoc", "quan", "submit"];
							value = [
								testLoc2["name"], testLoc2["type"], testLoc2["location"], "1",
								"Add Location"];
						})
						it('can use the add location button modal', function () {
							spectrum_sites_page.addLocationButtonModalEntry(element, value);
						});
						it('displays a location created from the add location button modal', function () {
							spectrum_sites_page.childlessLocationPresent(value[0], true);
						});
						it('displays the correct loc name in the details pane', function () {
							spectrum_sites_page.locDetailsValidation(["name"], testLoc2);
						})
						it('displays correct info in the details tab', function () {
							spectrum_sites_page.locDetTabValidation(testLoc2);
						});
					})
					describe('add asset from location asset tab', function () {
						it('can add asset to newly created location', function () {
							var element = ["lAType", "name", "quan", "submit"]
							var value = [testAsset["type"], testAsset["name"], "1", ""]
							spectrum_sites_page.addAssetToLocation(testLoc2["name"]);
							spectrum_sites_page.addAssetModalCompletion(element, value, 0);
						});
						it('displays the newly added asset in the locations asset tab', function () {
							spectrum_sites_page.locationHasAsset(testAsset["name"], testLoc2["name"]);
						});
						it('displays the asset created on the asset section asset list', function () {
							spectrum_sites_page.goToSitesAssets(true);
							spectrum_sites_page.isSitesAssetsInList(testAsset["name"], true);
						});
					})
					if (testType == "regression") {
						describe('edit location details', function () {
							beforeAll(function () {
								element = ["name", "lType", "pLoc", "quan", "submit"];
								value = [
									testLoc3["name"], testLoc3["type"], testLoc3["location"], "1",
									"Add Location"];
								spectrum_sites_page.goToSitesLocations(true);
								spectrum_sites_page.addLocationButtonModalEntry(element, value);
								spectrum_sites_page.childlessLocationPresent(value[0], true);
								spectrum_sites_page.locDetailsValidation(["name"], testLoc3);
							});
							it('can edit a locations name', function () {
								spectrum_sites_page.editLocDetails(testLoc3, ["name"], editLoc)
							});
							it('displays the edited location name', function () {
								browser.refresh();
								goToSites(siteToTest);
								spectrum_sites_page.goToSitesLocations(true);
								spectrum_sites_page.locDetailsValidation(["name"], editLoc);
							});
							it('can add description to location', function () {
								spectrum_sites_page.editLocDetails(editLoc, ["description"], editLoc)
							});
							it('displays the edited location description', function () {
								browser.refresh();
								goToSites(siteToTest);
								spectrum_sites_page.goToSitesLocations(true);
								spectrum_sites_page.locDetailsValidation([
									                                         "name",
									                                         "description"], editLoc);
							});
						});
						describe('parent child loc tests', function () {
							beforeAll(function () {
								element = ["name", "lType", "pLoc", "quan", "submit"];
								value = [
									parLoc["name"], parLoc["type"], parLoc["location"], "1",
									"Add Location"];
								value2 = [
									parLoc1["name"], parLoc1["type"], parLoc1["location"], "1",
									"Add Location"];
								value3 = [
									testLoc4["name"], testLoc4["type"], testLoc4["location"], "1",
									"Add Location"];
								spectrum_sites_page.goToSiteSettings();
								spectrum_sites_page.createNewLocationType(testLoc4["type"], choice);
								spectrum_sites_page.goToSitesLocations(true);
								spectrum_sites_page.addLocationButtonModalEntry(element, value);
								spectrum_sites_page.addLocationButtonModalEntry(element, value2);
								spectrum_sites_page.addLocationButtonModalEntry(element, value3);
								spectrum_sites_page.childlessLocationPresent(value[0], true);
								spectrum_sites_page.childlessLocationPresent(value2[0], true);
								spectrum_sites_page.childlessLocationPresent(value3[0], true);
							})
							it('can create a child loc', function () {
								spectrum_sites_page.cloneLocFromTree(parLoc, childLoc, [
									"name", "lType", "create"], [
									                                     childLoc["name"],
									                                     childLoc["type"], ""])
							});
							it('displays the correct loc type and parent loc for child', function () {
								spectrum_sites_page.childLocDetTabValidation(parLoc, childLoc);
							});
							it('can change the parent of a child loc', function () {
								spectrum_sites_page.childLocDetTabEdit(parLoc, childLoc, childLocEdit, ["location"])
							});
							it('displays the new parent child relationship', function () {
								browser.refresh();
								goToSites(siteToTest);
								spectrum_sites_page.goToSitesLocations(true);
								spectrum_sites_page.childLocDetTabValidation(parLoc1, childLocEdit);
							});
							it('can add asset to child location', function () {
								var element = ["lAType", "name", "quan", "submit"]
								var value = [testAsset8["type"], testAsset8["name"], "1", ""]
								spectrum_sites_page.addAssetToChildLocation(parLoc1, childLocEdit);
								spectrum_sites_page.addAssetModalCompletion(element, value, 0);
							});
							it('displays the newly added asset to child in the locations'
							   + ' asset tab', function () {
								spectrum_sites_page.childLocationHasAsset(parLoc1, childLocEdit, testAsset8["name"]);
							});
							it('displays the asset added to child on the asset'
							   + ' section asset list', function () {
								spectrum_sites_page.goToSitesAssets(true);
								spectrum_sites_page.isSitesAssetsInList(testAsset8["name"], true);
							});
							it('displays the correct child loc in the assets det tab', function () {
								spectrum_sites_page.assetDetailsTabValidation(testAsset8);
							});
						});
						describe('loc filter tests', function () {
							beforeAll(function () {
								spectrum_sites_page.goToSitesLocations(true);
							});
							afterAll(function () {
								spectrum_sites_page.useClearAllLocFilters(testLoc4);
							});
							it('displays the correct loc after using loc type filter', function () {
								spectrum_sites_page.useLocTypeFilter(parLoc).then(function () {
									spectrum_sites_page.childlessLocationPresent(parLoc["name"], true);
								})
							});
							it('does not display a loc of type not chosen in filter', function () {
								spectrum_sites_page.childlessLocationPresent(testLoc4["name"], false);
							});
							it('can clear the loc filters', function () {
								spectrum_sites_page.useClearAllLocFilters().then(function () {
									spectrum_sites_page.childlessLocationPresent(testLoc4["name"], true);
								})
							});
							it('can search for loc using search filter', function () {
								spectrum_sites_page.useLocSearch(parLoc).then(function () {
									spectrum_sites_page.childlessLocationPresent(parLoc["name"], true);
								})
							});
							it('does not display a loc not searched for', function () {
								spectrum_sites_page.useClearAllLocFilters(testLoc4)
								                   .then(function () {
									                   spectrum_sites_page.useLocSearch(parLoc)
									                                      .then(function () {
										                                      spectrum_sites_page.childlessLocationPresent(testLoc4["name"], false);
									                                      })
								                   })
							});
							it('can use both loc search and type filter', function () {
								spectrum_sites_page.useClearAllLocFilters().then(function () {
									spectrum_sites_page.useLocTypeFilter(parLoc).then(function () {
										spectrum_sites_page.useLocSearch(parLoc).then(function () {
											spectrum_sites_page.childlessLocationPresent(parLoc["name"], true);
										})
									})
								})
							});
							it('does not display the loc not searched for and not of loc'
							   + ' type', function () {
								spectrum_sites_page.childlessLocationPresent(testLoc4["name"], false);
							})
						})
						describe('duplicate loc tests', function () {
							beforeAll(function () {
								spectrum_sites_page.goToSitesLocations(true);
							});
							it('can duplicate a loc from the loc tree', function () {
								spectrum_sites_page.dupLocFromTree(testLoc4, "1", testLoc4Dup)
							});
							it('displays dupe location created from loc tree', function () {
								browser.refresh();
								goToSites(siteToTest);
								spectrum_sites_page.goToSitesLocations(true);
								spectrum_sites_page.childlessLocationPresent(testLoc4Dup["name"], true);
							});
							it('displays the correct loc name for the dupe loc in the'
							   + ' details pane', function () {
								spectrum_sites_page.locDetailsValidation(["name"], testLoc4Dup);
							})
							it('displays correct info for the dup loc in the details tab', function () {
								spectrum_sites_page.locDetTabValidation(testLoc4Dup);
							});
							it('can duplicate a loc from the more options menu', function () {
								spectrum_sites_page.selectALocInTree(editLoc);
								spectrum_sites_page.mODupLocAsset("1", editLocDup, "Duplicate"
								                                                   + " Location");
							});
							it('displays dupe location created from mo menu', function () {
								browser.refresh();
								goToSites(siteToTest);
								spectrum_sites_page.goToSitesLocations(true);
								spectrum_sites_page.childlessLocationPresent(editLocDup["name"], true);
							});
							it('displays the correct loc name for the mo op dup loc in the'
							   + ' details pane', function () {
								spectrum_sites_page.locDetailsValidation(["name"], editLocDup);
							})
							it('displays correct info for the mo op dup loc in the details'
							   + ' tab', function () {
								spectrum_sites_page.locDetTabValidation(editLocDup);
							});
						});
						describe('add task to loc', function () {
							beforeAll(function () {
								addTaskTest = taskInformation.addTaskData();
								addTaskTest.addTasklocation = testLoc2["name"];
								taskEntry = ["addTaskSummary"];
							})
							it('can get to the add task modal from asset more options menu', function () {
								spectrum_sites_page.selectALocInTree(testLoc2).then(function () {
									spectrum_sites_page.addTaskToAsset(taskEntry, addTaskTest, "Add Task for Location");
								});
							});
							it('displays the task created w/correct asset', function () {
								checkTaskDetails(addTaskTest, [
									"addTaskSummary", "addTasklocation"]);
							});
						});
					}
				});
				describe('site assets', function () {
					beforeAll(function () {
						goToSites(siteToTest);
						spectrum_sites_page.goToSitesAssets(true);
					});
					it('has newly created asset listed', function () {
						spectrum_sites_page.isSitesAssetsInList(testAsset["name"], true);
					});
					it('displays the correct asset name in the asset details section', function () {
						spectrum_sites_page.checkSiteAssetDetails(["name"], testAsset);
					});
					it('displays the correct asset type in the details tab', function () {
						spectrum_sites_page.assetDetailsTabValidation(testAsset);
					});
					it('can view assets by type', function () {
						spectrum_sites_page.viewAssetsByType("A-Z", testAsset);
					});
					it('can search for asset by name', function () {
						spectrum_sites_page.useAssetSearch(testAsset);
					});
					it('can clear Asset filters', function () {
						spectrum_sites_page.useClearAllFilters(testAsset);
					});
					it('can add asset from asset tab', function () {
						var element = ["lAType", "name", "loc", "quan", "submit"]
						var value = [
							testAsset2["type"], testAsset2["name"], testLoc2["name"], "1", ""]
						spectrum_sites_page.assetTabAddAsset();
						spectrum_sites_page.addAssetModalCompletion(element, value, 0);
					});
					it('has new asset created from asset tab modal', function () {
						spectrum_sites_page.isSitesAssetsInList(testAsset2["name"], true);
					});
					it('displays the newly created asset in the location section', function () {
						spectrum_sites_page.goToSitesLocations(true);
						spectrum_sites_page.locationHasAsset(testAsset2["name"], testLoc2["name"]);
					});
					if (testType == "regression") {
						describe('asset details', function () {
							// var details = ["notes","warrantyExpirationDate","serialNumber",
							//     "vendor","vendorContactName","vendorContactPhone",
							//     "purchasePrice","lifespan","warrantyContactName",
							//     "warrantyContactPhone","purchaseDate", "Manufacturer","Model"];

							var details = [
								"notes", "serialNumber", "vendor", "vendorContactName",
								"vendorContactPhone", "purchasePrice", "lifespan",
								"warrantyContactName", "warrantyContactPhone"];

							it('can add details to the asset details tab', function () {
								logOutInAs(users[0].email, users[0].password);
								goToSites(siteToTest);
								spectrum_sites_page.goToSitesAssets(true);
								spectrum_sites_page.assetDetailsTabEdit(testAsset, details);
							});
							it('displays the correct added values', function () {
								browser.refresh();
								goToSites(siteToTest);
								spectrum_sites_page.goToSitesAssets(true);
								spectrum_sites_page.assetDetailsTabValidation(testAsset, details);
							});
							it('displays the correct info in the asset log', function () {
								var details = [
									"notes", "serialNumber", "vendor", "vendorContactName",
									"vendorContactPhone", "purchasePrice", "lifespan",
									"warrantyContactName", "warrantyContactPhone"];
								// var details = ["notes","serialNumber"];
								spectrum_sites_page.checkAssetActivityLog(testAsset, details, users[0].userName)
							});
							it('can edit asset name', function () {
								spectrum_sites_page.editAssetDetails(["name"], testAsset, editAsset)
							});
							it('displays the edited asset name', function () {
								browser.refresh();
								goToSites(siteToTest);
								spectrum_sites_page.goToSitesAssets(true);
								spectrum_sites_page.checkSiteAssetDetails(["name"], editAsset);
							});
							it('can edit asset location from asset details tab', function () {
								spectrum_sites_page.assetDetailsTabEdit(editAsset, ["location"]);
							});
							it('displays the correct edited location', function () {
								browser.refresh();
								goToSites(siteToTest);
								spectrum_sites_page.goToSitesAssets(true);
								spectrum_sites_page.assetDetailsTabValidation(editAsset, ["location"]);
							});
							it('can add a description to an assett', function () {
								spectrum_sites_page.goToSitesAssets(true);
								spectrum_sites_page.editAssetDetails(["description"], testAsset2, testAsset2)
							});
							it('displays the added description in the asset details section', function () {
								browser.refresh();
								goToSites(siteToTest);
								spectrum_sites_page.goToSitesAssets(true);
								spectrum_sites_page.checkSiteAssetDetails([
									                                          "name",
									                                          "description"], testAsset2);
							});
						});
						describe('asset status and filter tests', function () {
							beforeAll(function () {
								spectrum_sites_page.goToSiteSettings();
								spectrum_sites_page.createNewAssetType(testAsset3["type"], choice);
								spectrum_sites_page.goToSitesAssets(true);
								var element = ["lAType", "name", "loc", "quan", "submit"]
								var value = [
									testAsset3["type"], testAsset3["name"], testLoc2["name"], "1",
									""]
								spectrum_sites_page.assetTabAddAsset();
								spectrum_sites_page.addAssetModalCompletion(element, value, 0)
								spectrum_sites_page.isSitesAssetsInList(testAsset3["name"], true);
							})

							it('can change status of asset to offline', function () {
								spectrum_sites_page.editAssetStatus(testAsset2, editAsset2);
							});
							it('displays offline assets in the A-Z view', function () {
								spectrum_sites_page.viewOfflineAssets("A-Z", editAsset3);
							});
							it('can change status of asset to retired', function () {
								spectrum_sites_page.editAssetStatus(editAsset2, editAsset3);
							});
							it('displays retired assets using the retired view', function () {
								spectrum_sites_page.viewRetiredAssets("A-Z", editAsset3);
							});
							it('does not display in service assets in the retired view', function () {
								spectrum_sites_page.isSitesAssetsInList(testAsset3["name"], false);
							})
							it('can return retired asset to in service status', function () {
								spectrum_sites_page.editAssetStatus(editAsset3, editAsset4);
							});
							it('displays in service assets using the A-Z view', function () {
								spectrum_sites_page.viewAZAssets("Retired", editAsset4);
							});
							it('can filter assets by type', function () {
								spectrum_sites_page.useAssetTypeFilter(editAsset4)
							});
							it('does not display assets of a type that is not selected', function () {
								spectrum_sites_page.isSitesAssetsInList(testAsset3["name"], false)
							});
							it('can use a combination of asset type and search filter', function () {
								spectrum_sites_page.useClearAllFilters();
								spectrum_sites_page.useAssetSearch(editAsset4);
								spectrum_sites_page.useAssetTypeFilter(editAsset4);
							});
							it('displays the asset after applying bothy search and type filter', function () {
								spectrum_sites_page.isSitesAssetsInList(editAsset4["name"], true);
							})
						});
						describe('asset QR codes tests', function () {
							beforeAll(function () {
								spectrum_sites_page.useClearAllFilters(testAsset3);
							});
							it('displays the asset name in the More Options QR code modal', function () {
								spectrum_sites_page.doesMOQRModalDisplayAName(testAsset3);
							});
							it('displays the asset name in the details tab OR code modal', function () {
								spectrum_sites_page.assetDetTabORCode(testAsset3);
							});
						});
						describe('add task to asset', function () {
							beforeAll(function () {
								addTaskTest = taskInformation.addTaskData();
								addTaskTest.addTasklocation = testAsset3["name"]
							})
							it('can get to the add task modal from asset more options menu', function () {
								spectrum_sites_page.selectTheSiteInList(testAsset3);
								spectrum_sites_page.addTaskToAsset(["addTaskSummary"], addTaskTest, "Add Task for Asset");
							});
							it('displays the task created w/correct asset', function () {
								logOutIn();
								refreshWorkPage();
								checkTaskDetails(addTaskTest, [
									"addTaskSummary", "addTasklocation"]);
							});
						});
						describe('duplicate asset tests', function () {
							beforeAll(function () {
								goToSites(siteToTest);
								spectrum_sites_page.goToSitesAssets(true);
							});
							it('can duplicate an asset from the more options menu', function () {
								spectrum_sites_page.selectTheSiteInList(testAsset3);
								spectrum_sites_page.mODupLocAsset("1", testAsset3Dup, "Duplicate Asset");
							});
							it('displays the correct asset name for the duplicate asset', function () {
								browser.refresh();
								goToSites(siteToTest);
								spectrum_sites_page.goToSitesAssets(true);
								spectrum_sites_page.checkSiteAssetDetails(["name"], testAsset3Dup);
							});
							it('displays the correct asset type for the duplicate asset', function () {
								spectrum_sites_page.assetDetailsTabValidation(testAsset3Dup);
							});
						});
						describe('adding multiple assets at a time', function () {
							it('can add two of the same assets from the add asset modal', function () {
								var element = ["lAType", "name", "loc", "quan", "dupe", "submit"]
								var value = [
									testAsset4["type"], testAsset4["name"], testAsset4["location"],
									"1", "", ""]
								spectrum_sites_page.assetTabAddAsset();
								spectrum_sites_page.addAssetModalCompletion(element, value, 0)
							});
							it('displays the correct number of assets', function () {
								spectrum_sites_page.siteInListCount(testAsset4["name"], 2);
							});
							it('displays the correct details for the first of two assets', function () {
								spectrum_sites_page.checkDupAssetDetailsTab(0, testAsset4);

							});
							it('displays the correct details for the second of two assets', function () {
								spectrum_sites_page.checkDupAssetDetailsTab(1, testAsset4);
							})
							it('can add multiple assets with differing values from the same'
							   + ' modal', function () {
								var element = ["lAType", "name", "loc", "quan", "addAnother"]
								var value = [
									testAsset5["type"], testAsset5["name"], testAsset5["location"],
									"1", ""]
								var element1 = ["name", "lAType", "loc", "quan", "submit"]
								var value1 = [
									testAsset6["name"], testAsset6["type"], testAsset6["location"],
									"1", ""]
								spectrum_sites_page.assetTabAddAsset();
								spectrum_sites_page.addAssetModalCompletion(element, value, 0)
								spectrum_sites_page.addAssetModalCompletion(element1, value1, 1)
							});
							it('displays first asset created via the multi entry modal', function () {
								spectrum_sites_page.assetDetailsTabValidation(testAsset5);
							});
							it('displays second asset created via the multi entry modal', function () {
								spectrum_sites_page.assetDetailsTabValidation(testAsset6);
							});
							it('can add mul assets using quantity field', function () {
								var element = ["lAType", "name", "loc", "quan", "submit"]
								var value = [
									testAsset7["type"], testAsset7["name"], testAsset7["location"],
									"4", ""]
								spectrum_sites_page.assetTabAddAsset();
								spectrum_sites_page.addAssetModalCompletion(element, value, 0)
							});
							it('displays the correct number of assets after creating mul'
							   + ' assets using the quan field', function () {
								spectrum_sites_page.siteInListCount(testAsset7["name"], 4);
							});
							it('displays the correct details for all dupe assets created', function () {
								spectrum_sites_page.checkDupAssetDetailsTab(0, testAsset7)
								spectrum_sites_page.checkDupAssetDetailsTab(1, testAsset7)
								spectrum_sites_page.checkDupAssetDetailsTab(2, testAsset7)
								spectrum_sites_page.checkDupAssetDetailsTab(3, testAsset7)
							})
						});
					}
				});
				describe('strategies', function () {
					beforeAll(function () {
						spectrum_sites_page.goToStrategies();
						spectrum_sites_page.goToSitesLocations(true);
						spectrum_sites_page.addLocationButtonModalEntry([
							                                                "name", "lType", "pLoc",
							                                                "quan", "submit"], [
							                                                testLocRound["name"],
							                                                testLocRound["type"],
							                                                testLocRound["location"],
							                                                "1", "Add Location"]);
						spectrum_sites_page.goToSitesAssets(true);
						spectrum_sites_page.assetTabAddAsset();
						spectrum_sites_page.addAssetModalCompletion([
							                                            "lAType", "name", "loc",
							                                            "quan", "submit"], [
							                                            testAssetRound["type"],
							                                            testAssetRound["name"],
							                                            testLocRound["name"], "1",
							                                            ""], 0);
						spectrum_sites_page.goToSitesLocations(true);
						spectrum_sites_page.addLocationButtonModalEntry([
							                                                "name", "lType", "pLoc",
							                                                "quan", "submit"], [
							                                                testLocPM["name"],
							                                                testLocPM["type"],
							                                                testLocPM["location"],
							                                                "1", "Add Location"]);
						spectrum_sites_page.goToSitesAssets(true);
						spectrum_sites_page.assetTabAddAsset();
						spectrum_sites_page.addAssetModalCompletion([
							                                            "lAType", "name", "loc",
							                                            "quan", "submit"], [
							                                            testAssetPM["type"],
							                                            testAssetPM["name"],
							                                            testLocPM["name"], "1",
							                                            ""], 0);
					});
					it('can select an asset of type', function () {
						spectrum_sites_page.goToStrategies().then(function () {
							spectrum_sites_page.selectAssetOfType(["name"], testAssetRound, true)
						})
					});
					it('can select a loc of type', function () {
						spectrum_sites_page.goToStrategies().then(function () {
							spectrum_sites_page.selectLocOfType(["name"], testLocRound)
						})
					})
				});
				describe('rounds', function () {
					beforeAll(function () {
						spectrum_sites_page.goToRounds(true);
					})
					it('can create a round w/o l&s steps', function () {
						var element = [
							"name", "duration", "perform", "startingOn", "team", "within", "units",
							"time", "locAssetTab", "add", "create"];
						spectrum_sites_page.createNewRound(element, round1).then(function () {
							spectrum_sites_page.newRoundPresent(round1["name"]);
						})
					});
					it('displays the correct details for the hourly round w/o l&s steps', function () {
						spectrum_sites_page.checkARoundsDetails(round1, [
							"name", "landS", "perform", "durationDetail", "team", "displayTime",
							"displayDate"]);
					});
					it('displays the correct steps in the round details for hourly round '
					   + 'w/o l&s steps', function () {
						var step = round1["steps"][0]
						spectrum_sites_page.checkRoudDetSteps(round1["name"], step[0], [step[1]]);
					});
				});
			});
		};
		function sitesTests2() {
			var choice = "create";
			var testLoc1, testLoc2, testLoc3, editLoc, editLocDup, testLoc4, testLoc4Dup, parLoc,
			    childLoc, parLoc1, childLocEdit, testLocPM, testLocRound, testLocRoundEdit,
			    newLabel, testAsset, testAsset2, testAsset3, testAsset3Dup, testAsset4,
			    testAsset4Dup, testAsset5, testAsset6, testAsset7, testAsset8, editAsset,
			    editAsset2, editAsset3, editAsset4, testAssetPM, testAssetRound, testAssetRoundEdit,
			    procedure1, procedure2, procedure3, procedure4, procedure5, procedure6, procedure7,
			    procedure8, procedure9, procedure10, procedure11, procedure12, procedure13,
			    procedure14, procedure15, procedure16, procedure17, procedure18;
			describe(' sites tests 2', function () {
				beforeAll(function (done) {
					testLoc1 = locInformation.testLoc(siteToTest);
					testLoc2 = locInformation.testLoc(siteToTest);
					testLoc2.type = testLoc1["type"];
					testLoc3 = locInformation.testLoc(siteToTest);
					testLoc3.type = testLoc1["type"];
					editLoc = locInformation.editLoc(testLoc3, ["name"]);
					editLocDup = locInformation.cloneALoc(editLoc);
					editLocDup.name = editLocDup["name"] + " (1)"
					testLoc4 = locInformation.testLoc(siteToTest);
					testLoc4Dup = locInformation.cloneALoc(testLoc4);
					testLoc4Dup.name = testLoc4Dup["name"] + " (1)";
					parLoc = locInformation.testLoc(siteToTest);
					parLoc.type = testLoc1["type"];
					childLoc = locInformation.testLoc(parLoc["name"]);
					childLoc.type = testLoc1["type"];
					parLoc1 = locInformation.testLoc(siteToTest);
					parLoc1.type = testLoc1["type"];
					childLocEdit = locInformation.cloneALoc(childLoc);
					childLocEdit.location = parLoc1["name"];
					testLocPM = locInformation.testLoc(siteToTest);
					testLocPM.type = testLoc2["type"];
					testLocRound = locInformation.testLoc(siteToTest);
					testLocRound.type = testLoc2["type"];
					testLocRoundEdit = locInformation.editLoc(testLocRound, ["reading"]);
					testAsset = assetInformation.testAsset("In Service", testLoc2["name"]);
					newLabel = phraseGen.randomLabel() + getRandomIntInclusive(1, 10);
					testAsset2 = assetInformation.testAsset("In Service", testLoc2["name"]);
					testAsset2.type = testAsset["type"];
					testAsset3 = assetInformation.testAsset("In Service", testLoc2["name"]);
					testAsset3Dup = assetInformation.cloneAnAsset(testAsset3)
					testAsset3Dup.name = testAsset3Dup.name + " (1)";
					testAsset4 = assetInformation.testAsset("In Service", testLoc2["name"]);
					testAsset4.type = testAsset3["type"];
					testAsset4Dup = assetInformation.cloneAnAsset(testAsset4)
					testAsset4Dup.name = testAsset4.name + " (1)";
					testAsset5 = assetInformation.testAsset("In Service", testLoc2["name"]);
					testAsset5.type = testAsset3["type"];
					testAsset6 = assetInformation.testAsset("In Service", locToTest1);
					testAsset6.type = testAsset["type"];
					testAsset7 = assetInformation.testAsset("In Service", testLoc2["name"]);
					testAsset7.type = testAsset3["type"];
					testAsset8 = assetInformation.testAsset("In Service", childLocEdit["name"]);
					testAsset8.type = testAsset["type"];
					editAsset = assetInformation.editAsset(testAsset, ["name"]);
					editAsset2 = assetInformation.editAsset(testAsset2, ["Offline"]);
					editAsset3 = assetInformation.editAsset(editAsset2, ["Retired"]);
					editAsset4 = assetInformation.editAsset(editAsset3, ["In Service"]);
					testAssetPM = assetInformation.testAsset("In Service", testLoc1["name"]);
					testAssetPM.type = testAsset["type"];
					testAssetRound = assetInformation.testAsset("In Service", testLoc1["name"]);
					testAssetRound.type = testAsset["type"];
					testAssetRoundEdit = assetInformation.editAsset(testAssetRound, ["reading"]);
					procedure1
						= procRoundInformation.testProcRound(1, "No", users[1].userName, testAssetPM);
					testAssetPM.pm = [
						procedure1["name"], procedure1["durationDetail2"], procedure1["team"]];
					procedure2
						= procRoundInformation.testProcRound(1, "No", users[1].userName, testLocPM);
					procedure3
						= procRoundInformation.testProcRound(1, "No", users[1].userName, testAssetPM);
					procedure4
						= procRoundInformation.testProcRound(1, "Yes", users[1].userName, testAssetPM);
					procedure4.steps[0][4] = "No";
					procedure5
						= procRoundInformation.testProcRound(2, "No", users[1].userName, testAssetPM);
					procedure6
						= procRoundInformation.testProcRound(2, "No", users[1].userName, testAssetPM);
					procedure7
						= procRoundInformation.testProcRound(3, "No", users[1].userName, testAssetPM);
					procedure8
						= procRoundInformation.testProcRound(4, "No", users[1].userName, testAssetPM);
					procedure9
						= procRoundInformation.testProcRound(5, "No", users[1].userName, testAssetPM);
					procedure10
						= procRoundInformation.testProcRound(6, "No", users[1].userName, testAssetPM);
					procedure11
						= procRoundInformation.testProcRound(7, "No", users[1].userName, testAssetPM);
					procedure12
						= procRoundInformation.testProcRound(1, "No", users[1].userName, testAssetPM);
					procedure13
						= procRoundInformation.testProcRound(1, "No", users[1].userName, testLocPM);
					procedure14
						= procRoundInformation.testProcRound(1, "No", users[1].userName, testLocPM);
					testLocPM.pm = [
						procedure14["name"], procedure14["durationDetail2"], procedure14["team"]];
					procedure15
						= procRoundInformation.testProcRound(1, "No", users[1].userName, testLocRound);
					testLocRound.pm = [
						procedure15["name"], procedure15["durationDetail2"], procedure15["team"]];
					procedure16
						= procRoundInformation.testProcRound(1, "No", users[1].userName, testLocRound);
					procedure17
						= procRoundInformation.testProcRound(1, "No", users[1].userName, testAssetRound);
					testAssetRound.pm = [
						procedure17["name"], procedure17["durationDetail2"], procedure17["team"]];
					procedure18
						= procRoundInformation.testProcRound(1, "No", users[1].userName, testAssetRound);
					if (isLoggedin != true) {
						logIn("email");
					}
					goToSites(siteToTest);
					done();
				});
				describe('site settings ', function () {
					beforeAll(function (done) {
						spectrum_sites_page.goToSiteSettings();
						done();
					});
					it('can create new asset type', function () {
						spectrum_sites_page.createNewAssetType(testAsset["type"], choice);
					});
					it('can create new location type', function () {
						spectrum_sites_page.createNewLocationType(testLoc1["type"], choice);
					});
					it('can create new label', function () {
						spectrum_sites_page.createNewLabel(newLabel, choice);
					});
					if (testType == "regression") {
						/**
						 * TODO add site information / address entry and validation tests
						 */
					}
					;
				})
				describe('strategies', function () {
					beforeAll(function () {
						spectrum_sites_page.goToStrategies();
						spectrum_sites_page.goToSitesLocations(true);
						spectrum_sites_page.addLocationButtonModalEntry([
							                                                "name", "lType", "pLoc",
							                                                "quan", "submit"], [
							                                                testLocRound["name"],
							                                                testLocRound["type"],
							                                                testLocRound["location"],
							                                                "1", "Add Location"]);
						spectrum_sites_page.goToSitesAssets(true);
						spectrum_sites_page.assetTabAddAsset();
						spectrum_sites_page.addAssetModalCompletion([
							                                            "lAType", "name", "loc",
							                                            "quan", "submit"], [
							                                            testAssetRound["type"],
							                                            testAssetRound["name"],
							                                            testLocRound["name"], "1",
							                                            ""], 0);
						spectrum_sites_page.goToSitesLocations(true);
						spectrum_sites_page.addLocationButtonModalEntry([
							                                                "name", "lType", "pLoc",
							                                                "quan", "submit"], [
							                                                testLocPM["name"],
							                                                testLocPM["type"],
							                                                testLocPM["location"],
							                                                "1", "Add Location"]);
						spectrum_sites_page.goToSitesAssets(true);
						spectrum_sites_page.assetTabAddAsset();
						spectrum_sites_page.addAssetModalCompletion([
							                                            "lAType", "name", "loc",
							                                            "quan", "submit"], [
							                                            testAssetPM["type"],
							                                            testAssetPM["name"],
							                                            testLocPM["name"], "1",
							                                            ""], 0);
					});
					it('can select an asset of type', function () {
						spectrum_sites_page.goToStrategies().then(function () {
							spectrum_sites_page.selectAssetOfType(["name"], testAssetRound, true)
						})
					});
					it('can select a loc of type', function () {
						spectrum_sites_page.goToStrategies().then(function () {
							spectrum_sites_page.selectLocOfType(["name"], testLocRound)
						})
					})
					if (testType == "regression") {
						describe('readings tests', function () {
							it('can create a new reading for asset type', function () {
								spectrum_sites_page.goToStrategies();
								spectrum_sites_page.addNewReadingAsset(testAssetPM["type"], testAssetPM["reading"])

							});
							it('can create a new reading for a location type', function () {
								spectrum_sites_page.goToStrategies();
								spectrum_sites_page.addNewReadingLoc(testLocPM["type"], testLocPM["reading"])
							});
						});
						describe('procedures tests', function () {
							describe('for asset type', function () {
								beforeAll(function () {
									spectrum_sites_page.goToStrategies();
									spectrum_sites_page.navToAssetProcedures(testAssetPM["type"], true)
								})
								it('can create a procedure with reading for an asset type', function () {
									var element = [
										"name", "duration", "perform", "startingOn", "team",
										"within", "units", "time", "locAssetTab",
										"selectAllLocAsset", "roundTab", "add", "reading",
										"create"];
									spectrum_sites_page.addNewProcedureAsset(element, procedure1)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure1["name"]);
									                   })
								});
								it('displays the correct details for the hourly procedure', function () {
									spectrum_sites_page.checkARoundsDetails(procedure1, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the round details for hourly'
								   + ' procedure w/o l&s steps', function () {
									var step = procedure1["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure1["name"], step[0], [step[1]]);
								});
								it('displays the correct pm details for an asset of type', function () {
									spectrum_sites_page.selectAssetOfType(["name"], testAssetPM, true)
									                   .then(function () {
										                   spectrum_sites_page.checkAssetPM(testAssetPM);
									                   });
								});
								it('can create a procedure with reading for a specific asset'
								   + ' type', function () {
									var element = [
										"name", "duration", "perform", "startingOn", "team",
										"within", "units", "time", "locAssetTab", "locAssetTabList",
										"roundTab", "add", "create"];
									spectrum_sites_page.goToStrategies();
									spectrum_sites_page.navToAssetProcedures(testAssetPM["type"], true)
									spectrum_sites_page.addNewProcedureAsset(element, procedure17)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure1["name"]);
									                   })
								});
								it('displays the correct details for the procedure', function () {
									spectrum_sites_page.checkARoundsDetails(procedure17, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the round details for hourly'
								   + ' procedure w/o l&s steps', function () {
									var step = procedure17["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure17["name"], step[0], [step[1]]);
								});
								it('displays the correct pm details for an asset of type', function () {
									spectrum_sites_page.selectAssetOfType(["name"], testAssetRound, true)
									                   .then(function () {
										                   spectrum_sites_page.checkAssetPM(testAssetRound);
									                   });
								});

								it('can create a procedure with distributed tasks', function () {
									var element = [
										"name", "duration", "perform", "startingOn", "team",
										"within", "units", "time", "locAssetTab",
										"selectAllLocAsset", "distributeTasks", "roundTab", "add",
										"create"];
									spectrum_sites_page.goToStrategies();
									spectrum_sites_page.navToAssetProcedures(testAssetRound["type"], true)
									spectrum_sites_page.addNewProcedureAsset(element, procedure18)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure18["name"]);
									                   });
								});
								it('displays the correct details for the distributed tasks'
								   + ' procedure', function () {
									spectrum_sites_page.checkARoundsDetails(procedure18, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the distributed tasks'
								   + ' procedure', function () {
									var step = procedure18["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure18["name"], step[0], [step[1]]);
								});
								it('can create a daily procedure', function () {
									var element = [
										"name", "duration", "perform", "startingOn", "team",
										"within", "units", "time", "locAssetTab",
										"selectAllLocAsset", "roundTab", "add", "create"];
									spectrum_sites_page.goToStrategies();
									spectrum_sites_page.navToAssetProcedures(testAssetPM["type"], true)
									spectrum_sites_page.addNewProcedureAsset(element, procedure2)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure2["name"]);
									                   });
								});
								it('displays the correct details for the daily procedure', function () {
									spectrum_sites_page.checkARoundsDetails(procedure2, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the daily procedure', function () {
									var step = procedure2["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure2["name"], step[0], [step[1]]);
								});
								it('can create a daily procedure intermitently', function () {
									var element = [
										"name", "duration", "perform", "everyInput", "startingOn",
										"team", "within", "units", "time", "locAssetTab",
										"selectAllLocAsset", "roundTab", "add", "create"];
									spectrum_sites_page.addNewProcedureAsset(element, procedure3)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure3["name"]);
									                   })
								});
								it('displays the correct details for the daily intermitent procedure', function () {
									spectrum_sites_page.checkARoundsDetails(procedure3, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate", "everyInput"]);
								});
								it('displays the correct steps in the daily intermitent procedure', function () {
									var step = procedure3["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure3["name"], step[0], [step[1]]);
								});
								it('can create a procedure w/ l&s steps', function () {
									var element = [
										"name", "duration", "l&s", "perform", "startingOn", "team",
										"within", "units", "time", "locAssetTab",
										"selectAllLocAsset", "roundTab", "add", "create"]
									spectrum_sites_page.addNewProcedureAsset(element, procedure4)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure4["name"]);
									                   })
								});
								it('displays the correct details for the hourly procedure w/ l&s'
								   + ' steps', function () {
									spectrum_sites_page.checkARoundsDetails(procedure4, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the hourly procedure w/  l&s'
								   + ' steps', function () {
									var step = procedure4["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure4["name"], step[0], [step[1]]);
								});
								it('can create a weekly procedure intermitently', function () {
									var element = [
										"name", "duration", "perform", "everyInput", "every",
										"startingOn", "team", "within", "units", "time",
										"locAssetTab", "selectAllLocAsset", "roundTab", "add",
										"create"];
									spectrum_sites_page.addNewProcedureAsset(element, procedure5)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure5["name"]);
									                   })
								});
								it('displays the correct details for the weekly intermitent'
								    + '  procedure', function () {
									spectrum_sites_page.checkARoundsDetails(procedure5, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate", "everyInput"]);
								});
								it('displays the correct steps in the weekly intermitent'
								    + '  procedure', function () {
									var step = procedure5["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure5["name"], step[0], [step[1]]);
								});
								it('can duplicate a procedure', function () {
									spectrum_sites_page.dupplicateARound(procedure5, "dupe proc")
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure5["name"], 1);
									                   })
								});
								it('displays the correct details for the dup procedure', function () {
									spectrum_sites_page.checkARoundsDetails(procedure5, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"], 1);
								});
								it('displays the correct steps in the dup procedure', function () {
									var step = procedure5["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure5["name"], step[0], [step[1]], 1);
								});
								it('can edit a procedure', function () {
									var element = [
										"name", "duration", "perform", "startingOn", "team",
										"within", "units", "time", "save"]
									spectrum_sites_page.editARound(procedure5, element, procedure6, "edit proc")
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure6["name"]);
									                   })
								});
								it('displays the correct details for the edited procedure', function () {
									spectrum_sites_page.checkARoundsDetails(procedure6, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the edited procedure', function () {
									var step = procedure5["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure6["name"], step[0], [step[1]]);
								});
								it('can create an bi-weekly procedure w/o l&s steps', function () {
									var element = [
										"name", "duration", "perform", "startingOn", "team",
										"within", "units", "time", "locAssetTab",
										"selectAllLocAsset", "roundTab", "add", "create"];
									spectrum_sites_page.addNewProcedureAsset(element, procedure7)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure7["name"]);
									                   })
								});
								it('displays the correct details for the bi-weekly procedure w/o'
								   + ' l&s steps', function () {
									spectrum_sites_page.checkARoundsDetails(procedure7, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the round details for'
								   + ' bi-weekly procedure w/o l&s steps', function () {
									var step = procedure7["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure7["name"], step[0], [step[1]]);
								});
								it('can create an monthly procedure w/o l&s steps', function () {
									var element = [
										"name", "duration", "startingOn", "team", "within", "units",
										"time", "perform", "locAssetTab", "selectAllLocAsset",
										"roundTab", "add", "create"]
									spectrum_sites_page.addNewProcedureAsset(element, procedure8)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure8["name"]);
									                   });
								});
								it('displays the correct details for the monthly procedure w/o'
								   + ' l&s steps', function () {
									spectrum_sites_page.checkARoundsDetails(procedure8, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the round details for monthly'
								   + '  procedure w/o l&s steps', function () {
									var step = procedure8["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure8["name"], step[0], [step[1]]);
								});
								it('can create an quarterly procedure w/o l&s steps', function () {
									var element = [
										"name", "duration", "startingOn", "team", "within", "units",
										"time", "perform", "locAssetTab", "selectAllLocAsset",
										"roundTab", "add", "create"]
									spectrum_sites_page.addNewProcedureAsset(element, procedure9)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure9["name"]);
									                   });
								});
								it('displays the correct details for the quarterly procedure w/o'
								   + ' l&s  steps', function () {
									spectrum_sites_page.checkARoundsDetails(procedure9, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the round details for'
								   + ' quarterly  procedure w/o l&s steps', function () {
									var step = procedure9["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure9["name"], step[0], [step[1]]);
								});
								it('can create an semi-annualy procedure w/o l&s steps', function () {
									var element = [
										"name", "duration", "startingOn", "team", "within", "units",
										"time", "perform", "locAssetTab", "selectAllLocAsset",
										"roundTab", "add", "create"]
									spectrum_sites_page.addNewProcedureAsset(element, procedure10)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure10["name"]);
									                   });
								});
								it('displays the correct details for the semi-annualy procedure'
								   + ' w/o l&s  steps', function () {
									spectrum_sites_page.checkARoundsDetails(procedure10, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the round details'
								   + ' for semi-annualy procedure w/o l&s steps', function () {
									var step = procedure10["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure10["name"], step[0], [step[1]]);
								});
								it('can create an annualy procedure w/o l&s steps', function () {
									var element = [
										"name", "duration", "startingOn", "team", "within", "units",
										"time", "perform", "locAssetTab", "selectAllLocAsset",
										"roundTab", "add", "create"]
									spectrum_sites_page.addNewProcedureAsset(element, procedure11)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure11["name"]);
									                   });
								});
								it('displays the correct details for the annualy procedure w/o'
								   + ' l&s steps', function () {
									spectrum_sites_page.checkARoundsDetails(procedure11, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the round details for annualy'
								   + '  procedure w/o l&s steps', function () {
									var step = procedure11["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure11["name"], step[0], [step[1]]);
								});
							});
							describe('for loc type', function () {
								beforeAll(function () {
									spectrum_sites_page.goToStrategies();
									spectrum_sites_page.navToLocProcedures(testLocPM["type"], true);
								})
								it('can create a procedure with reading for all'
								   + ' locations  of type', function () {
									var element = [
										"name", "duration", "perform", "startingOn", "team",
										"within", "units", "time", "locAssetTab",
										"selectAllLocAsset", "roundTab", "add", "reading", "create"]
									spectrum_sites_page.addNewProcedureAsset(element, procedure14)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure14["name"]);
									                   });
								});
								it('displays the correct details for the hourly procedure with'
								   + ' reading', function () {
									spectrum_sites_page.checkARoundsDetails(procedure14, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the round details for'
								   + ' the procedure', function () {
									var step = procedure14["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure14["name"], step[0], [step[1]]);
								});
								it('displays the correct pm details for a loc of type', function () {
									spectrum_sites_page.selectLocOfType(["name"], testLocPM)
									                   .then(function () {
										                   spectrum_sites_page.checkLocPM(testLocPM);
									                   });
								});
								it('can add a procedure to a specific location', function () {
									var element = [
										"name", "duration", "perform", "startingOn", "team",
										"within", "units", "time", "locAssetTab", "locAssetTabList",
										"roundTab", "add", "create"]
									spectrum_sites_page.goToStrategies();
									spectrum_sites_page.navToLocProcedures(testLocRound["type"], true);
									spectrum_sites_page.addNewProcedureAsset(element, procedure15)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure15["name"]);
									                   });
								});
								it('displays the correct details for the hourly procedure', function () {
									spectrum_sites_page.checkARoundsDetails(procedure15, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the round details for'
								   + ' hourly procedure w/o l&s steps', function () {
									var step = procedure15["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure15["name"], step[0], [step[1]]);
								});
								it('displays the correct pm details for a loc of type', function () {
									spectrum_sites_page.selectLocOfType(["name"], testLocRound)
									                   .then(function () {
										                   spectrum_sites_page.checkLocPM(testLocRound);
									                   });
								});
								it('can create a procedure with reading for all'
								   + ' locations of type and evenly distribute tasks', function () {
									var element = [
										"name", "duration", "perform", "startingOn", "team",
										"within", "units", "time", "locAssetTab",
										"selectAllLocAsset", "distributeTasks", "roundTab", "add",
										"create"]
									spectrum_sites_page.goToStrategies();
									spectrum_sites_page.navToLocProcedures(testLocRound["type"], true);
									spectrum_sites_page.addNewProcedureAsset(element, procedure16)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure16["name"]);
									                   });
								});
								it('displays the correct details distributed tasks procedure', function () {
									spectrum_sites_page.checkARoundsDetails(procedure16, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the distributed tasks'
								   + ' procedure', function () {
									var step = procedure16["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure16["name"], step[0], [step[1]]);
								});
								it('can create a daily procedure', function () {
									var element = [
										"name", "duration", "perform", "startingOn", "team",
										"within", "units", "time", "locAssetTab",
										"selectAllLocAsset", "roundTab", "add", "create"];
									spectrum_sites_page.goToStrategies();
									spectrum_sites_page.navToLocProcedures(testLoc1["type"], true);
									spectrum_sites_page.addNewProcedureAsset(element, procedure2)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure2["name"]);
									                   });
								});
								it('displays the correct details for the daily procedure', function () {
									spectrum_sites_page.checkARoundsDetails(procedure2, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the daily procedure', function () {
									var step = procedure2["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure2["name"], step[0], [step[1]]);
								});
								it('can create a daily procedure intermitently', function () {
									var element = [
										"name", "duration", "perform", "everyInput", "startingOn",
										"team", "within", "units", "time", "locAssetTab",
										"selectAllLocAsset", "roundTab", "add", "create"];
									spectrum_sites_page.addNewProcedureAsset(element, procedure3)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure3["name"]);
									                   });
								});
								it('displays the correct details for the daily intermitent'
								   + ' procedure', function () {
									spectrum_sites_page.checkARoundsDetails(procedure3, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate", "everyInput"]);
								});
								it('displays the correct steps in the daily intermitent'
								   + ' procedure', function () {
									var step = procedure3["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure3["name"], step[0], [step[1]]);
								});
								it('can create a procedure w/ l&s steps', function () {
									var element = [
										"name", "duration", "l&s", "perform", "startingOn", "team",
										"within", "units", "time", "locAssetTab",
										"selectAllLocAsset", "roundTab", "add", "create"]
									spectrum_sites_page.addNewProcedureAsset(element, procedure4)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure4["name"]);
									                   });
								});
								it('displays the correct details for the hourly procedure'
								   + ' w/ l&s steps', function () {
									spectrum_sites_page.checkARoundsDetails(procedure4, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the hourly procedure w/'
								   + ' l&s steps', function () {
									var step = procedure4["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure4["name"], step[0], [step[1]]);
								});
								it('can create a weekly procedure intermitently', function () {
									var element = [
										"name", "duration", "perform", "everyInput", "every",
										"startingOn", "team", "within", "units", "time",
										"locAssetTab", "selectAllLocAsset", "roundTab", "add",
										"create"];
									spectrum_sites_page.addNewProcedureAsset(element, procedure5)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure5["name"]);
									                   });
								});
								it('displays the correct details for the weekly intermitent'
								   + ' procedure', function () {
									spectrum_sites_page.checkARoundsDetails(procedure5, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate", "everyInput"]);
								});
								it('displays the correct steps in the weekly intermitent'
								   + ' procedure', function () {
									var step = procedure5["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure5["name"], step[0], [step[1]]);
								});
								it('can duplicate a procedure', function () {
									spectrum_sites_page.dupplicateARound(procedure5, "dupe proc")
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure5["name"], 1);
									                   });
								});
								it('displays the correct details for the dup procedure', function () {
									spectrum_sites_page.checkARoundsDetails(procedure5, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"], 1);
								});
								it('displays the correct steps in the dup procedure', function () {
									var step = procedure5["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure5["name"], step[0], [step[1]], 1);
								});
								it('can edit a procedure', function () {
									var element = [
										"name", "duration", "perform", "startingOn", "team",
										"within", "units", "time", "save"]
									spectrum_sites_page.editARound(procedure5, element, procedure6, "edit proc")
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure6["name"]);
									                   });
								});
								it('displays the correct details for the edited procedure', function () {
									spectrum_sites_page.checkARoundsDetails(procedure6, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the edited procedure', function () {
									var step = procedure5["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure6["name"], step[0], [step[1]]);
								});
								it('can create an bi-weekly procedure w/o l&s steps', function () {
									var element = [
										"name", "duration", "startingOn", "team", "within", "units",
										"time", "perform", "locAssetTab", "selectAllLocAsset",
										"roundTab", "add", "create"]
									spectrum_sites_page.addNewProcedureAsset(element, procedure7)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure7["name"]);
									                   });
								});
								it('displays the correct details for the bi-weekly'
								   + ' procedure w/o l&s steps', function () {
									spectrum_sites_page.checkARoundsDetails(procedure7, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the round details for'
								   + ' bi-weekly ' + 'procedure w/o l&s steps', function () {
									var step = procedure7["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure7["name"], step[0], [step[1]]);
								});
								it('can create an monthly procedure w/o l&s steps', function () {
									var element = [
										"name", "duration", "startingOn", "team", "within", "units",
										"time", "perform", "locAssetTab", "selectAllLocAsset",
										"roundTab", "add", "create"]
									spectrum_sites_page.addNewProcedureAsset(element, procedure8)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure8["name"]);
									                   });
								});
								it('displays the correct details for the monthly procedure w/o l&s '
								   + 'steps', function () {
									spectrum_sites_page.checkARoundsDetails(procedure8, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the round details for monthly '
								   + 'procedure w/o l&s steps', function () {
									var step = procedure8["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure8["name"], step[0], [step[1]]);
								});
								it('can create an quarterly procedure w/o l&s steps', function () {
									var element = [
										"name", "duration", "startingOn", "team", "within", "units",
										"time", "perform", "locAssetTab", "selectAllLocAsset",
										"roundTab", "add", "create"]
									spectrum_sites_page.addNewProcedureAsset(element, procedure9)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure9["name"]);
									                   });
								});
								it('displays the correct details for the quarterly procedure w/o l&s '
								   + 'steps', function () {
									spectrum_sites_page.checkARoundsDetails(procedure9, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the round details for quarterly '
								   + 'procedure w/o l&s steps', function () {
									var step = procedure9["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure9["name"], step[0], [step[1]]);
								});
								it('can create an semi-annualy procedure w/o l&s steps', function () {
									var element = [
										"name", "duration", "startingOn", "team", "within", "units",
										"time", "perform", "locAssetTab", "selectAllLocAsset",
										"roundTab", "add", "create"]
									spectrum_sites_page.addNewProcedureAsset(element, procedure10)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure10["name"]);
									                   });
								});
								it('displays the correct details for the semi-annualy procedure w/o l&s '
								   + 'steps', function () {
									spectrum_sites_page.checkARoundsDetails(procedure10, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the round details for semi-annualy '
								   + 'procedure w/o l&s steps', function () {
									var step = procedure10["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure10["name"], step[0], [step[1]]);
								});
								it('can create an annualy procedure w/o l&s steps', function () {
									var element = [
										"name", "duration", "startingOn", "team", "within", "units",
										"time", "perform", "locAssetTab", "selectAllLocAsset",
										"roundTab", "add", "create"]
									spectrum_sites_page.addNewProcedureAsset(element, procedure11)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure11["name"]);
									                   });
								});
								it('displays the correct details for the annualy procedure w/o l&s '
								   + 'steps', function () {
									spectrum_sites_page.checkARoundsDetails(procedure11, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the round details for annualy '
								   + 'procedure w/o l&s steps', function () {
									var step = procedure11["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure11["name"], step[0], [step[1]]);
								});
							});
						});
					}
				});
			});
		};
		function sitesTests3() {
			var choice = "create";
			var testLoc1, testLoc2, testLoc3, editLoc, editLocDup, testLoc4, testLoc4Dup, parLoc,
			    childLoc, parLoc1, childLocEdit, testLocPM, testLocRound, testLocRoundEdit,
			    newLabel, testAsset, testAsset2, testAsset3, testAsset3Dup, testAsset4,
			    testAsset4Dup, testAsset5, testAsset6, testAsset7, testAsset8, editAsset,
			    editAsset2, editAsset3, editAsset4, testAssetPM, testAssetRound, testAssetRoundEdit,
			    round1, round2, round3, round4, round5, round6, round7, round8, round9, round10,
			    round11, round12, round13, round14, round15, round16, round17, round18,round19,
			    round20, round21,round22, round23;
			describe(' sites tests 3', function () {
				beforeAll(function (done) {
					testLoc1 = locInformation.testLoc(siteToTest);
					testLoc2 = locInformation.testLoc(siteToTest);
					testLoc2.type = testLoc1["type"];
					testLoc3 = locInformation.testLoc(siteToTest);
					testLoc3.type = testLoc1["type"];
					editLoc = locInformation.editLoc(testLoc3, ["name"]);
					editLocDup = locInformation.cloneALoc(editLoc);
					editLocDup.name = editLocDup["name"] + " (1)"
					testLoc4 = locInformation.testLoc(siteToTest);
					testLoc4Dup = locInformation.cloneALoc(testLoc4);
					testLoc4Dup.name = testLoc4Dup["name"] + " (1)";
					parLoc = locInformation.testLoc(siteToTest);
					parLoc.type = testLoc1["type"];
					childLoc = locInformation.testLoc(parLoc["name"]);
					childLoc.type = testLoc1["type"];
					parLoc1 = locInformation.testLoc(siteToTest);
					parLoc1.type = testLoc1["type"];
					childLocEdit = locInformation.cloneALoc(childLoc);
					childLocEdit.location = parLoc1["name"];
					testLocPM = locInformation.testLoc(siteToTest);
					testLocPM.type = testLoc2["type"];
					testLocRound = locInformation.testLoc(siteToTest);
					testLocRound.type = testLoc2["type"];
					testLocRoundEdit = locInformation.editLoc(testLocRound, ["reading"]);

					testAsset = assetInformation.testAsset("In Service", testLoc2["name"]);
					newLabel = phraseGen.randomLabel() + getRandomIntInclusive(1, 10);
					testAsset2 = assetInformation.testAsset("In Service", testLoc2["name"]);
					testAsset2.type = testAsset["type"];
					testAsset3 = assetInformation.testAsset("In Service", testLoc2["name"]);
					testAsset3Dup = assetInformation.cloneAnAsset(testAsset3)
					testAsset3Dup.name = testAsset3Dup.name + " (1)";
					testAsset4 = assetInformation.testAsset("In Service", testLoc2["name"]);
					testAsset4.type = testAsset3["type"];
					testAsset4Dup = assetInformation.cloneAnAsset(testAsset4)
					testAsset4Dup.name = testAsset4.name + " (1)";
					testAsset5 = assetInformation.testAsset("In Service", testLoc2["name"]);
					testAsset5.type = testAsset3["type"];
					testAsset6 = assetInformation.testAsset("In Service", locToTest1);
					testAsset6.type = testAsset["type"];
					testAsset7 = assetInformation.testAsset("In Service", testLoc2["name"]);
					testAsset7.type = testAsset3["type"];
					testAsset8 = assetInformation.testAsset("In Service", childLocEdit["name"]);
					testAsset8.type = testAsset["type"];
					editAsset = assetInformation.editAsset(testAsset, ["name"]);
					editAsset2 = assetInformation.editAsset(testAsset2, ["Offline"]);
					editAsset3 = assetInformation.editAsset(editAsset2, ["Retired"]);
					editAsset4 = assetInformation.editAsset(editAsset3, ["In Service"]);
					testAssetPM = assetInformation.testAsset("In Service", testLoc1["name"]);
					testAssetPM.type = testAsset["type"];
					testAssetRound = assetInformation.testAsset("In Service", testLoc1["name"]);
					testAssetRound.type = testAsset["type"];
					testAssetRoundEdit = assetInformation.editAsset(testAssetRound, ["reading"]);

					round1 = procRoundInformation.testProcRound(1, "No", users[1].userName, testAssetRound);
					round2 = procRoundInformation.testProcRound(1, "No", users[1].userName, testAssetRound);
					round3 = procRoundInformation.testProcRound(1, "No", users[1].userName, testAssetRound);
					round4 = procRoundInformation.testProcRound(1, "Yes", users[1].userName, testAssetRound);
					round5 = procRoundInformation.testProcRound(1, "No", users[1].userName, testAssetRound);
					round6 = procRoundInformation.testProcRound(1, "No", users[1].userName, testLocRound);
					round7 = procRoundInformation.testProcRound(2, "No", users[1].userName, testAssetRound);
					round8 = procRoundInformation.testProcRound(1, "No", users[1].userName, testAssetRound);
					round9 = procRoundInformation.testProcRound(1, "No", users[1].userName, testLocRound);
					round10 = procRoundInformation.testProcRound(1, "No", users[1].userName, testAssetRound);
					round11 = procRoundInformation.testProcRound(1, "No", users[1].userName, testAssetRound);
					round11.steps = [["1", phraseGen.randomPhrase(), testAssetRound, "No", "No"],
						["2", phraseGen.randomPhrase(), testLocRound, "No", "Yes"]]
					round12 = procRoundInformation.testProcRound(1, "No", users[1].userName, testAssetRound);
					round12.steps = [["1", phraseGen.randomPhrase(), testAssetRound["name"], "No", "No"],
						["2", phraseGen.randomPhrase(), testLocRound["name"], "No", "Yes"]]
					round13 = procRoundInformation.testProcRound(1, "Yes", users[1].userName, testAssetRound);
					round13.steps = [["1", phraseGen.randomPhrase(), testAssetRound["name"], "No", "No"],
						["2", phraseGen.randomPhrase(), testLocRound["name"], "No", "Yes"]]
					round14 = procRoundInformation.testProcRound(3, "No", users[1].userName, testAssetRound);
					round15 = procRoundInformation.testProcRound(4, "No", users[1].userName, testAssetRound);
					round16 = procRoundInformation.testProcRound(5, "No", users[1].userName, testAssetRound);
					round17 = procRoundInformation.testProcRound(6, "No", users[1].userName, testAssetRound);
					round18 = procRoundInformation.testProcRound(7, "No", users[1].userName, testAssetRound);

					round19 = procRoundInformation.testProcRound(0, "No", users[1].userName, testAssetRound, 'fixed');
					round20 = procRoundInformation.testProcRound(0, "Yes", users[1].userName, testAssetRound, 'fixed');
					round21 = procRoundInformation.testProcRound(0, "No", users[1].userName, testAssetRound, 'fixed');
					round22 = procRoundInformation.testProcRound(0, "No", users[1].userName, testLocRound, 'fixed');
					if (isLoggedin != true) {
						logIn("email");
					}
					goToSites(siteToTest);
					done();
				});
				describe('site settings ', function () {
					beforeAll(function (done) {
						spectrum_sites_page.goToSiteSettings();
						done();
					});
					it('can create new asset type > ', function () {
						spectrum_sites_page.createNewAssetType(testAsset["type"], choice);
					});
					it('can create new location type > ', function () {
						spectrum_sites_page.createNewLocationType(testLoc1["type"], choice);
					});
					it('can create new label > ', function () {
						spectrum_sites_page.createNewLabel(newLabel, choice);
					});
					if (testType == "regression") {
						/**
						 * TODO add site information / address entry and validation tests
						 */
					}
					;
				})
				describe('strategies', function () {
					beforeAll(function () {
						spectrum_sites_page.goToStrategies();
						spectrum_sites_page.goToSitesLocations(true);
						spectrum_sites_page.addLocationButtonModalEntry([
							                                                "name", "lType", "pLoc",
							                                                "quan", "submit"], [
							                                                testLocRound["name"],
							                                                testLocRound["type"],
							                                                testLocRound["location"],
							                                                "1", "Add Location"]);
						spectrum_sites_page.goToSitesAssets(true);
						spectrum_sites_page.assetTabAddAsset();
						spectrum_sites_page.addAssetModalCompletion([
							                                            "lAType", "name", "loc",
							                                            "quan", "submit"], [
							                                            testAssetRound["type"],
							                                            testAssetRound["name"],
							                                            testLocRound["name"], "1",
							                                            ""], 0);
						spectrum_sites_page.goToSitesLocations(true);
						spectrum_sites_page.addLocationButtonModalEntry([
							                                                "name", "lType", "pLoc",
							                                                "quan", "submit"], [
							                                                testLocPM["name"],
							                                                testLocPM["type"],
							                                                testLocPM["location"],
							                                                "1", "Add Location"]);
						spectrum_sites_page.goToSitesAssets(true);
						spectrum_sites_page.assetTabAddAsset();
						spectrum_sites_page.addAssetModalCompletion([
							                                            "lAType", "name", "loc",
							                                            "quan", "submit"], [
							                                            testAssetPM["type"],
							                                            testAssetPM["name"],
							                                            testLocPM["name"], "1",
							                                            ""], 0);
					});
					it('can select an asset of type', function () {
						spectrum_sites_page.goToStrategies().then(function () {
							spectrum_sites_page.selectAssetOfType(["name"], testAssetRound, true)
						})
					});
					it('can select a loc of type', function () {
						spectrum_sites_page.goToStrategies().then(function () {
							spectrum_sites_page.selectLocOfType(["name"], testLocRound)
						})
					})
					if (testType == "regression") {
						describe('readings tests', function () {
							it('can create a new reading for asset type', function () {
								spectrum_sites_page.goToStrategies();
								spectrum_sites_page.addNewReadingAsset(testAssetRound["type"], testAssetRound["reading"])

							});
							it('can create a new reading for a location type', function () {
								spectrum_sites_page.goToStrategies();
								spectrum_sites_page.addNewReadingLoc(testLocRound["type"], testLocRound["reading"])
							});
							it('displays the reading for a specific asset of type', function () {
								spectrum_sites_page.goToSitesAssets(true);
								spectrum_sites_page.checkAssetReadings(testAssetRound)
							});
							it('displays the reading for a specific loc of type', function () {
								spectrum_sites_page.goToSitesLocations(true)
								spectrum_sites_page.checkLocReadings(testLocRound)
							})
							/**
							 * TODO update edit reading automation
							 */
							xit('can edit an asset reading', function () {
								spectrum_sites_page.editAssetReading(testAssetRound["type"], testAssetRound["reading"], testAssetRoundEdit["reading"])
							});
							xit('displays the edited round', function () {
								browser.refresh();
								goToSites(siteToTest);
								spectrum_sites_page.goToStrategies();
								spectrum_sites_page.assetReadingPresent(testAssetRoundEdit["type"], testAssetRoundEdit["reading"])
							})

							xit('can edit an loc reading', function () {
								spectrum_sites_page.editLocReading(testLocRound["type"], testLocRound["reading"], testLocRoundEdit["reading"])
								                   .then(function () {
									                   browser.refresh();
									                   goToSites(siteToTest);
									                   spectrum_sites_page.goToStrategies();
									                   spectrum_sites_page.locReadingPresent(testLocRoundEdit["type"], testLocRoundEdit["reading"])
								                   })
							});
						});
					}
				});
				describe('rounds', function () {
					beforeAll(function () {
						logOutIn();
						goToSites(siteToTest);
						spectrum_sites_page.goToRounds(true);
					})
					it('can create a round w/o l&s steps', function () {
						var element = ["name", "duration", "perform", "startingOn", "team",
							"within", "units",
							"time", "locAssetTab", "add", "create"];
						spectrum_sites_page.createNewRound(element, round1).then(function () {
							spectrum_sites_page.newRoundPresent(round1["name"]);
						})
					});
					it('displays the correct details for the round w/o l&s steps', function () {
						spectrum_sites_page.checkARoundsDetails(round1, ["name", "landS",
							"perform", "durationDetail", "team", "displayTime",
							"displayDate"]);
					});
					it('displays the correct steps in the round details for the round '
					   + 'w/o l&s steps', function () {
						var step = round1["steps"][0]
						spectrum_sites_page.checkRoudDetSteps(round1["name"], step[0], [step[1]]);
					});
					if (testType == "regression") {
						it('can create a daily round', function () {
							var element = [
								"name", "duration", "perform", "startingOn", "team", "within",
								"units", "time", "locAssetTab", "add", "create"];
							spectrum_sites_page.createNewRound(element, round2).then(function () {
								spectrum_sites_page.newRoundPresent(round2["name"]);
							});
						});
						it('displays the correct details for the daily round', function () {
							spectrum_sites_page.checkARoundsDetails(round2, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"]);
						});
						it('displays the correct steps in the daily round', function () {
							var step = round2["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round2["name"], step[0], [step[1]]);
						});
						it('can create a daily round intermitently', function () {
							var element = [
								"name", "duration", "perform", "everyInput", "startingOn", "team",
								"within", "units", "time", "locAssetTab", "add", "create"];
							spectrum_sites_page.createNewRound(element, round3).then(function () {
								spectrum_sites_page.newRoundPresent(round3["name"]);
							});
						});
						it('displays the correct details for the daily intermitent round', function () {
							spectrum_sites_page.checkARoundsDetails(round3, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate", "everyInput"]);
						});
						it('displays the correct steps in the daily intermitent round', function () {
							var step = round3["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round3["name"], step[0], [step[1]]);
						});
						it('can create a round w/ l&s steps', function () {
							var element = [
								"name", "duration", "perform", "startingOn", "team", "within",
								"units", "time", "locAssetTab", "add", "create"];
							spectrum_sites_page.createNewRound(element, round4).then(function () {
								spectrum_sites_page.newRoundPresent(round4["name"]);
							});
						});
						it('displays the correct details for the round w/ l&s steps', function () {
							spectrum_sites_page.checkARoundsDetails(round4, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"]);
						});
						it('displays the correct steps in the round w/ l&s steps', function () {
							var step = round4["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round4["name"], step[0], [step[1]]);
						});
						it('can create a round w/ asset in step', function () {
							var element = [
								"name", "duration", "perform", "startingOn", "team", "within",
								"units", "time", "locAssetTab", "add", "locAsset", "create"];
							spectrum_sites_page.createNewRound(element, round5).then(function () {
								spectrum_sites_page.newRoundPresent(round5["name"]);
							});
						});
						it('displays the correct details for the  round w/ asset in step', function () {
							spectrum_sites_page.checkARoundsDetails(round5, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"]);
						});
						it('displays the correct steps in the round w/ asset in step', function () {
							var step = round5["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round5["name"], step[0], [
								step[1], step[2]]);
						});
						it('can create a round w/ loc in step', function () {
							var element = [
								"name", "duration", "perform", "startingOn", "team", "within",
								"units", "time", "locAssetTab", "add", "locAsset", "create"];
							spectrum_sites_page.createNewRound(element, round6).then(function () {
								spectrum_sites_page.newRoundPresent(round6["name"]);
							});
						});
						it('displays the correct details for the round w/ loc in step', function () {
							spectrum_sites_page.checkARoundsDetails(round6, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"]);
						});
						it('displays the correct steps in the round w/ loc in step', function () {
							var step = round6["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round6["name"], step[0], [
								step[1], step[2]]);
						});
						it('can create a weekly round intermitently', function () {
							var element = [
								"name", "duration", "perform", "everyInput", "every", "startingOn",
								"team", "within", "units", "time", "locAssetTab", "add", "create"];
							spectrum_sites_page.createNewRound(element, round7).then(function () {
								spectrum_sites_page.newRoundPresent(round7["name"]);
							});
						});
						it('displays the correct details for the weekly intermitent round', function () {
							spectrum_sites_page.checkARoundsDetails(round7, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"]);
						});
						it('displays the correct steps in the weekly intermitent round', function () {
							var step = round7["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round7["name"], step[0], [step[1]]);
						});
						it('can create a round w/ asset & reading in step', function () {
							var element = [
								"name", "duration", "perform", "startingOn", "team", "within",
								"units", "time", "locAssetTab", "add", "locAsset", "reading",
								"create"];
							spectrum_sites_page.createNewRound(element, round8).then(function () {
								spectrum_sites_page.newRoundPresent(round8["name"]);
							});
						});
						it('displays the correct details for the round w/ asset & '
						   + 'reading in step', function () {
							spectrum_sites_page.checkARoundsDetails(round8, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"]);
						});
						it('displays the correct steps in the round w/ asset & '
						   + 'reading in step', function () {
							var step = round8["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round8["name"], step[0], [
								step[1], step[2], testAssetRound["reading"][0]]);
						});
						it('can create a round w/ loc & reading in step', function () {
							var element = [
								"name", "duration", "perform", "startingOn", "team", "within",
								"units", "time", "locAssetTab", "add", "locAsset", "reading",
								"create"];
							spectrum_sites_page.createNewRound(element, round9).then(function () {
								spectrum_sites_page.newRoundPresent(round9["name"]);
							});
						});
						it('displays the correct details for the round w/ loc & '
						   + 'reading in step', function () {
							spectrum_sites_page.checkARoundsDetails(round9, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"]);
						});
						it('displays the correct steps in the round w/ loc & '
						   + 'reading in step', function () {
							var step = round9["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round9["name"], step[0], [
								step[1], step[2], testLocRound["reading"][0]]);
						});
						it('can duplicate a round', function () {
							spectrum_sites_page.dupplicateARound(round1, "dupe round")
							                   .then(function () {
								                   spectrum_sites_page.newRoundPresent(round1["name"], 1);
							                   });
						});
						it('displays the correct details for the dup round', function () {
							spectrum_sites_page.checkARoundsDetails(round1, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"], 1);
						});
						it('displays the correct steps in the dup round', function () {
							var step = round1["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round1["name"], step[0], [step[1]], 1);
						});
						it('can edit a round', function () {
							var element = [
								"name", "duration", "perform", "startingOn", "team", "within",
								"units", "time", "save"]
							spectrum_sites_page.editARound(round1, element, round10, "edit"
							                                                         + " round")
							                   .then(function () {
								                   spectrum_sites_page.newRoundPresent(round10["name"]);
							                   });
						});
						it('displays the correct details for the edited round', function () {
							spectrum_sites_page.checkARoundsDetails(round10, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"]);
						});
						it('displays the correct steps in the edited round', function () {
							var step = round1["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round10["name"], step[0], [step[1]]);
						});
						it('can create a round w/o l&s steps & 2 steps', function () {
							var element = [
								"name", "duration", "perform", "startingOn", "team", "within",
								"units", "time", "locAssetTab", "add", "create"];
							spectrum_sites_page.createNewRound(element, round11).then(function () {
								spectrum_sites_page.newRoundPresent(round11["name"]);
							});
						});
						it('displays the correct details for the round w/o l&s steps '
						   + '& 2 steps', function () {
							spectrum_sites_page.checkARoundsDetails(round11, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"]);
						});
						it('displays the correct first step in the round details for a'
						   + ' round w/o l&s steps & 2 steps', function () {
							var step = round11["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round11["name"], step[0], [step[1]]);
						});
						it('displays the correct 2nd step in the round details for a'
						   + ' round w/o l&s steps & 2 steps', function () {
							var step = round11["steps"][1]
							spectrum_sites_page.checkRoudDetSteps(round11["name"], step[0], [step[1]]);
						});
						it('can create a round w/asset in 2 steps', function () {
							var element = [
								"name", "duration", "perform", "startingOn", "team", "within",
								"units", "time", "locAssetTab", "add", "locAsset", "create"];
							spectrum_sites_page.createNewRound(element, round12).then(function () {
								spectrum_sites_page.newRoundPresent(round12["name"]);
							});
						});
						it('displays the correct details for the round w/asset in '
						   + '2 steps', function () {
							spectrum_sites_page.checkARoundsDetails(round12, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"]);
						});
						it('displays the correct first step in the round details for a'
						   + ' round w/asset in 2 steps', function () {
							var step = round12["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round12["name"], step[0], [
								step[1], step[2]]);
						});
						it('displays the correct 2nd step in the round details for a'
						   + ' round w/asset in 2 steps', function () {
							var step = round12["steps"][1]
							spectrum_sites_page.checkRoudDetSteps(round12["name"], step[0], [
								step[1], step[2]]);
						});
						it('can create a round w/ l&s steps on 1 of 2 steps', function () {
							var element = [
								"name", "duration", "perform", "startingOn", "team", "within",
								"units", "time", "locAssetTab", "add", "create"];
							spectrum_sites_page.createNewRound(element, round13).then(function () {
								spectrum_sites_page.newRoundPresent(round13["name"]);
							})
						});
						it('displays the correct details for the round w/ l&s steps'
						   + 'on 1 of 2 steps', function () {
							spectrum_sites_page.checkARoundsDetails(round13, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"]);
						});
						it('displays the correct steps in the round w/ l&s steps'
						   + 'on 1 of 2 steps', function () {
							var step = round13["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round13["name"], step[0], [step[1]]);
						});
						it('displays the correct steps in the round w/ l&s steps'
						   + 'on 1 of 2 steps', function () {
							var step = round13["steps"][1]
							spectrum_sites_page.checkRoudDetSteps(round13["name"], step[0], [step[1]]);
						});
						it('can create an bi-weekly round w/o l&s steps', function () {
							var element = [
								"name", "duration", "perform", "startingOn", "team", "within",
								"units", "time", "locAssetTab", "add", "create"];
							spectrum_sites_page.createNewRound(element, round14).then(function () {
								spectrum_sites_page.newRoundPresent(round14["name"]);
							})
						});
						it('displays the correct details for the bi-weekly round w/o l&s '
						   + 'steps', function () {
							spectrum_sites_page.checkARoundsDetails(round14, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"]);
						});
						it('displays the correct steps in the round details for bi-weekly '
						   + 'round w/o l&s steps', function () {
							var step = round14["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round14["name"], step[0], [step[1]]);
						});
						it('can create an monthly round w/o l&s steps', function () {
							var element = [
								"name", "duration", "perform", "startingOn", "team", "within",
								"units", "time", "locAssetTab", "add", "create"];
							spectrum_sites_page.createNewRound(element, round15).then(function () {
								spectrum_sites_page.newRoundPresent(round15["name"]);
							})
						});
						it('displays the correct details for the monthly round w/o l&s '
						   + 'steps', function () {
							spectrum_sites_page.checkARoundsDetails(round15, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"]);
						});
						it('displays the correct steps in the round details for monthly '
						   + 'round w/o l&s steps', function () {
							var step = round15["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round15["name"], step[0], [step[1]]);
						});
						it('can create an quarterly round w/o l&s steps', function () {
							var element = [
								"name", "duration", "perform", "startingOn", "team", "within",
								"units", "time", "locAssetTab", "add", "create"];
							spectrum_sites_page.createNewRound(element, round16).then(function () {
								spectrum_sites_page.newRoundPresent(round16["name"]);
							})
						});
						it('displays the correct details for the quarterly round w/o l&s '
						   + 'steps', function () {
							spectrum_sites_page.checkARoundsDetails(round16, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"]);
						});
						it('displays the correct steps in the round details for quarterly '
						   + 'round w/o l&s steps', function () {
							var step = round16["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round16["name"], step[0], [step[1]]);
						});
						it('can create an semi-annualy round w/o l&s steps', function () {
							var element = [
								"name", "duration", "perform", "startingOn", "team", "within",
								"units", "time", "locAssetTab", "add", "create"];
							spectrum_sites_page.createNewRound(element, round17).then(function () {
								spectrum_sites_page.newRoundPresent(round17["name"]);
							})
						});
						it('displays the correct details for the semi-annualy round w/o l&s '
						   + 'steps', function () {
							spectrum_sites_page.checkARoundsDetails(round17, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"]);
						});
						it('displays the correct steps in the round details for semi-annualy '
						   + 'round w/o l&s steps', function () {
							var step = round17["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round17["name"], step[0], [step[1]]);
						});
						it('can create an annual round w/o l&s steps', function () {
							var element = [
								"name", "duration", "perform", "startingOn", "team", "within",
								"units", "time", "locAssetTab", "add", "create"];
							spectrum_sites_page.createNewRound(element, round18).then(function () {
								spectrum_sites_page.newRoundPresent(round18["name"]);
							})
						});
						it('displays the correct details for the annualy round w/o l&s '
						   + 'steps', function () {
							spectrum_sites_page.checkARoundsDetails(round18, [
								"name", "landS", "perform", "durationDetail", "team",
								"displayTime", "displayDate"]);
						});
						it('displays the correct steps in the round details for annualy '
						   + 'round w/o l&s steps', function () {
							var step = round18["steps"][0]
							spectrum_sites_page.checkRoudDetSteps(round18["name"], step[0], [step[1]]);
						});
						describe('hourly rounds tests', function () {
							it('can create an Hourly round w/o l&s steps', function () {
								var element = ["name", "duration", "perform", "startingOn", "team",
									"within", "units", "time", "time2", "locAssetTab", "add",
									"create"];
								spectrum_sites_page.createNewRound(element, round19)
									.then(function () {
										spectrum_sites_page.newRoundPresent(round19["name"]);
									})
							});
							it('displays the correct details for the Hourly round w/o l&s steps', function () {
								spectrum_sites_page.checkARoundsDetails(round19, ["name",
									"landS",
									"perform", "durationDetail", "team", "displayTime",
									"displayDate"]);
							});
							it('displays the correct steps in the Hourly round details for the'
							   + ' round w/o l&s steps', function () {
								var step = round19["steps"][0]
								spectrum_sites_page.checkRoudDetSteps(round19["name"], step[0], [step[1]]);
							});
							it('can create an Hourly round w/ l&s steps', function () {
								var element = ["name", "duration", "perform", "startingOn", "team",
									"within", "units", "time", "time2", "locAssetTab", "add",
									"create"];
								spectrum_sites_page.createNewRound(element, round20)
									.then(function () {
										spectrum_sites_page.newRoundPresent(round20["name"]);
									})
							});
							it('displays the correct details for the Hourly round w/ l&s steps', function () {
								spectrum_sites_page.checkARoundsDetails(round20, ["name",
									"landS",
									"perform", "durationDetail", "team", "displayTime",
									"displayDate"]);
							});
							it('displays the correct steps in the Hourly round details for the'
							   + ' round w/ l&s steps', function () {
								var step = round20["steps"][0]
								spectrum_sites_page.checkRoudDetSteps(round20["name"], step[0], [step[1]]);
							});
							it('can create an Hourly round w/ asset in step', function () {
								var element = [
									"name", "duration", "perform", "startingOn", "team", "within",
									"units", "time", "time2", "locAssetTab", "add", "locAsset",
									"create"];
								spectrum_sites_page.createNewRound(element, round21)
									.then(function () {
										spectrum_sites_page.newRoundPresent(round21["name"]);
									});
							});
							it('displays the correct details for the  Hourly round w/ asset in'
							   + ' step', function () {
								spectrum_sites_page.checkARoundsDetails(round21, [
									"name", "landS", "perform", "durationDetail", "team",
									"displayTime", "displayDate"]);
							});
							it('displays the correct steps in the Hourly round w/ asset in step', function () {
								var step = round21["steps"][0]
								spectrum_sites_page.checkRoudDetSteps(round21["name"], step[0], [
									step[1], step[2]]);
							});
							it('can create an Hourly round w/ loc in step', function () {
								var element = [
									"name", "duration", "perform", "startingOn", "team", "within",
									"units", "time", "time2", "locAssetTab", "add", "locAsset",
									"create"];
								spectrum_sites_page.createNewRound(element, round22)
									.then(function () {
										spectrum_sites_page.newRoundPresent(round22["name"]);
									});
							});
							it('displays the correct details for the  Hourly round w/ loc in'
							   + ' step', function () {
								spectrum_sites_page.checkARoundsDetails(round22, [
									"name", "landS", "perform", "durationDetail", "team",
									"displayTime", "displayDate"]);
							});
							it('displays the correct steps in the Hourly round w/ loc in step', function () {
								var step = round22["steps"][0]
								spectrum_sites_page.checkRoudDetSteps(round22["name"], step[0], [
									step[1], step[2]]);
							});
						});
					}
				});
			});
		};
		function peopleTests() {
			describe('people', function () {
				var addUser, addUser1, addUser2, details, elements, values, values1, values2,
				    editDetails, editUser;
				beforeAll(function () {
					addUser = userInformation.addUserData("Account Admin", [teamToTest]);
					addUser1 = userInformation.addUserData("Member", [teamToTest]);
					addUser2 = userInformation.addUserData("Member", [teamToTest]);
					//details = [ "userFName"];
					details = ["userFName", "userLName", "role", "userPhone"];
					elements = ["fName", "lName", "modalPhone", "role", "team"];
					values = [
						addUser["userFName"], addUser["userLName"], addUser["userPhone"],
						"Account Admin"]
					values1 = [
						addUser1["userFName"], addUser1["userLName"], addUser1["userPhone"],
						"Member", teamToTest]
					values2 = [
						addUser2["userFName"], addUser2["userLName"], addUser2["userPhone"],
						"Member", teamToTest]
					editDetails = ["userFName", "userLName", "userEmail", "userPhone"];
					editUser = userInformation.editUserData(editDetails, addUser);
					if (isLoggedin != true) {
						logIn("email");
					}
				})
				describe('users', function () {
					beforeAll(function () {
						goToPeople();
						spectrum_people_page.peopleToggle();
					});
					describe('invite new user ', function () {
						it('can create a pending user', function () {
							spectrum_people_page.clickToInviteUser();
							spectrum_people_page.inviteNewPerson([
								                                     "fName", "lName", "modalPhone",
								                                     "role"], values, "create", "", 0);
						});
						it('displays the correct details for the pending user', function () {
							browser.refresh();
							goToPeople();
							spectrum_people_page.checkUserDetails(details, addUser);
						});
					});
					if (testType == "regression") {
						describe('edit pending user', function () {
							/**
							 * TODO fix edit user values ticket 6019
							 */
							it('can add pending user to a team', function () {
								spectrum_people_page.addUserToATeam(addUser, 0, ["pending"]);
							});
							it('can remove pending user from a team', function () {
								browser.refresh();
								goToPeople();
								spectrum_people_page.removeUserFromATeam(addUser, 0, ["pending"]);
							})
							it('can edit a pending user', function () {
								spectrum_people_page.editUser(editDetails, addUser, editUser);
							});
							it('displays the correct values for an edited pending user', function () {
								browser.refresh();
								goToPeople();
								spectrum_people_page.peopleToggle();
								spectrum_people_page.checkUserDetails(editDetails, editUser);
							});
						})
						describe('inviting multiple users', function () {
							it('can invite multipe users', function () {
								spectrum_people_page.clickToInviteUser();
								spectrum_people_page.inviteNewPerson(elements, values1, "another", "", 0);
								spectrum_people_page.inviteNewPerson(elements, values2, "create", "", 1);
							})
							it('displays the correct values for the first invited user', function () {
								browser.refresh();
								goToPeople();
								spectrum_people_page.peopleToggle();
								spectrum_people_page.checkUserDetails(details, addUser1);
							});
							it('displays the correct values for the second invited user', function () {
								browser.refresh();
								goToPeople();
								spectrum_people_page.peopleToggle();
								spectrum_people_page.checkUserDetails(details, addUser2);
							});
						})
					}
					;
				});
				describe('teams', function () {
					var newTeamName, newTeamDescripton, newTeam, tt004;
					beforeAll(function () {
						newTeamName = "Team " + phraseGen.randomName();
						newTeamDescripton = newTeamName + " is the best team"
						newTeam = teamInformation.newTeam(newTeamName, newTeamDescripton, 0, 1, [
							userToTest1, userToTest2], [siteToTest]);
						if (testType == "regression") {
							tt001.members = ["Test User1", "Test User2", editUser["username"]]
						} else {
							tt001.members = ["Test User1", "Test User2", addUser["username"]]
						}
						goToPeople();
						spectrum_people_page.teamsToggle();
					});
					it('can create new team', function () {
						var element = ["teamName", "description", "site", "create"];
						var values = [
							newTeam["teamName"], newTeam["description"], newTeam["sites"][0], ""];
						spectrum_people_page.createNewTeam(element, newTeam);
					});
					it('verifies newly created team details', function () {
						spectrum_people_page.checkTeamDetails(newTeam);
					});
					if (testType == "regression") {
						it('can add a team member to newly created team', function () {
							spectrum_people_page.addTeamMember(newTeam, 0);
						});
						it('can click on team member added to newly created team', function () {
							spectrum_people_page.clickMemberLink(newTeam, 0);
						});
						it('can remove a team member > ', function () {
							spectrum_people_page.removeTeamMember(newTeam, 0);
						});
						/**
						 * TODO: UX ticket 1176 and 1211 will fix this
						 */
						xit('can remove site from newly created team > ', function () {
							spectrum_people_page.removeSiteToTeam(newTeam, 0);
						});
						/**
						 * TODO: UX ticket 1176 and 1211 will fix this
						 */
						xit('can add site to newly created team > ', function () {
							spectrum_people_page.addSiteToTeam(newTeam, 0);
						});
					}
				});
			});
		};
		function tasksTests() {
			describe('tasks tests', function () {
				var taskEntry, addTaskTest, taskEdit, editTaskTest;
				beforeAll(function () {
					if (isLoggedin != true) {
						logIn("email");
					}
					spectrum_top_sideBar.goToWork();
				});
				describe('simple add task tests', function () {
					beforeAll(function () {
						taskEntry = ["addTaskSummary", "addTaskSite"];
						addTaskTest = taskInformation.addTaskData(siteToTest);
					})
					it('can add a task', function () {
						spectrum_tasks_page.addTask(taskEntry, addTaskTest);
					});
					it('has the correct task details', function () {
						checkTaskDetails(addTaskTest, taskEntry);
					});
				});
				describe('add task modal tests', function () {
					beforeAll(function () {
						taskEntry = ["addTaskSummary", "addTaskSite"];
					});
					describe('from work section', function () {
						beforeAll(function () {
							addTaskTest = taskInformation.addTaskData(siteToTest);
						});
						it('can create a task usting the add task modal', function () {
							spectrum_top_sideBar.addTaskModal();
							spectrum_tasks_page.addTaskFromModal(taskEntry, addTaskTest)
						});
						it('displays the correct task details for a task created from the add'
						   + ' task modal', function () {
							checkTaskDetails(addTaskTest, taskEntry);
						});
					})
					if (testType == "regression") {
						describe('from the people section', function () {
							beforeAll(function () {
								addTaskTest = taskInformation.addTaskData(siteToTest);
								goToPeople();
								spectrum_people_page.peopleToggle();
							});
							it('can create a task usting the add task modal', function () {
								spectrum_top_sideBar.addTaskModal();
								spectrum_tasks_page.addTaskFromModal(taskEntry, addTaskTest)
							});
						})
						describe('from the sites section', function () {
							beforeAll(function () {
								addTaskTest = taskInformation.addTaskData(siteToTest);
								goToSites(siteToTest);
							});
							it('can create a task usting the add task modal', function () {
								spectrum_top_sideBar.addTaskModal();
								spectrum_tasks_page.addTaskFromModal(taskEntry, addTaskTest)
							});
						})
						describe('from the dashboard section', function () {
							beforeAll(function () {
								addTaskTest = taskInformation.addTaskData(siteToTest);
								spectrum_top_sideBar.goToDashBaord();
							});
							it('can create a task usting the add task modal', function () {
								spectrum_top_sideBar.addTaskModal();
								spectrum_tasks_page.addTaskFromModal(taskEntry, addTaskTest)
							});
						})
					}
				})
				if (testType == "regression") {
					describe('tasks regression ', function () {
						beforeAll(function () {
							browser.refresh();
							spectrum_top_sideBar.goToWork();
						});
						describe('full task creation', function () {
							beforeAll(function () {
								taskEntry = [
									"addTaskSite", "labelEntry", "addedDays", "addTaskAssignee",
									"addTasklocation", "addTaskSummary", "addTaskDescription"];
								addTaskTest = taskInformation.addTaskData(siteToTest);
								addTaskTest.addTasklocation = locToTest1;
								addTaskTest.addTaskAssignee = userToTest1
							});
							/**
							 * TODO add full task modal tests
							 */
							/**
							 * TODO add time picker tests
							 */
							/**
							 * TODO add new task queue info tests. ex: date and labels now show
							 * up in the tasks queue etc..
							 */
							it('can create tasks using every field available', function () {
								spectrum_tasks_page.addTask(taskEntry, addTaskTest);
							});
							it('displays every task detail as entered', function () {
								checkTaskDetails(addTaskTest, taskEntry);
							});
						});
						describe('edit task', function () {
							beforeAll(function () {
								taskEntry = [
									"addTaskSite", "labelEntry", "addedDays", "addTaskAssignee",
									"addTasklocation", "addTaskSummary", "addTaskDescription"];
								addTaskTest = taskInformation.addTaskData(siteToTest);
								addTaskTest.addTasklocation = locToTest1;
								addTaskTest.addTaskAssignee = userToTest1
								taskEdit = [
									"addTaskSummary", "addTaskDescription", "addTasklocation",
									"labelEntry", "addedDays"];
								editTaskTest
									= taskInformation.editTaskValues(taskEdit, "not started", addTaskTest);
								editTaskTest.addTasklocation = locToTest2;
								browser.refresh();
								spectrum_top_sideBar.goToWork();
							});
							it('can add a task to be edited', function () {
								spectrum_tasks_page.addTask(taskEntry, addTaskTest);
							});
							it('task to be edited has the correct initial values', function () {
								checkTaskDetails(addTaskTest, taskEntry);
							});
							it('can edit a task', function () {
								spectrum_tasks_page.editTaskDetails(addTaskTest, editTaskTest, taskEdit);
							});
							it('has the edited task values ', function () {
								checkTaskDetails(editTaskTest, taskEdit);
							});
						})
					});
				}
			});
		};
		function tasksTests2() {
			describe('tasks tests 2', function () {
				var taskEntry, addTaskTest, taskEdit, blockTaskTest, cancelTaskTest;
				beforeAll(function () {
					if (isLoggedin != true) {
						logIn("email");
					}
					browser.refresh();
					spectrum_top_sideBar.goToWork();
				});
				if (testType == "regression") {
					/**
					 * TODO removed uneeded searches from ANY task test
					 */
					describe('tasks2 regression', function () {
						describe('date picker tests', function () {
							describe('now', function () {
								beforeAll(function () {
									addTaskTest
										= taskInformation.addTaskDatePickerData(0, siteToTest);
									taskEntry = ["addTaskSummary", "addTaskSite", "addedDaysNow"];
									browser.refresh();
									spectrum_top_sideBar.goToWork();
								})
								it('can add a task using the now date function', function () {
									spectrum_tasks_page.addTask(taskEntry, addTaskTest);
								});
								it(' check now date task detals > ', function () {
									checkTaskDetails(addTaskTest, taskEntry);
								});
							});
							describe('today', function () {
								beforeAll(function () {
									addTaskTest
										= taskInformation.addTaskDatePickerData(0, siteToTest);
									taskEntry = ["addTaskSummary", "addTaskSite", "addedDaysToday"];
								})
								it('can add task using today date function', function () {
									spectrum_tasks_page.addTask(taskEntry, addTaskTest);
								});
								it('creates today task with the correct details', function () {
									checkTaskDetails(addTaskTest, taskEntry);
								});
							});
							describe('tomorrow', function () {
								beforeAll(function () {
									addTaskTest
										= taskInformation.addTaskDatePickerData(1, siteToTest);
									taskEntry = ["addTaskSummary", "addTaskSite", "addedDaysTmrw"];
								})
								it(' add tasking using tomorrow date > ', function () {
									spectrum_tasks_page.addTask(taskEntry, addTaskTest);
								});
								it(' check tomorrow date task detals > ', function () {
									checkTaskDetails(addTaskTest, taskEntry);
								});
							});
						});
						describe('block & cancel tests ', function () {
							/**
							 * TODO add new block tests that test all the preset reasons etc..
							 */
							describe('block task tests', function () {
								beforeAll(function () {
									taskEntry = ["addTaskSummary", "addTaskSite"];
									addTaskTest = taskInformation.addTaskData(siteToTest);
									browser.refresh();
									spectrum_top_sideBar.goToWork();
									spectrum_tasks_page.clearAllFilterSelection();
									spectrum_tasks_page.addTask(taskEntry, addTaskTest);
									blockTaskTest
										= taskInformation.editTaskValues([""], "blocked", addTaskTest);
								});
								it('can block a task', function () {
									spectrum_tasks_page.useSearchFilter(addTaskTest["addTaskSummary"])
									                   .then(function () {
										                   spectrum_tasks_page.blockTask(addTaskTest);
									                   })
								});
								it('displays blocked task in open queue', function () {
									checkTaskDetails(blockTaskTest, taskEntry);
								});
								it('displays the correct reason for blocking the task', function () {
									spectrum_tasks_page.checkTaskDetailsBlocked(blockTaskTest);
								});
								it('displays the correct task queue flag for a blocked task', function () {
									spectrum_tasks_page.checkTaskFlag(blockTaskTest, true);
								});
								it('does not display the task in the closed queue', function () {
									spectrum_tasks_page.checkTaskNotInQueue(blockTaskTest, "CLOSED");
								});
							});
							describe('cancel task tests', function () {
								beforeAll(function () {
									taskEntry = ["addTaskSummary", "addTaskSite"];
									addTaskTest = taskInformation.addTaskData(siteToTest);
									cancelTaskTest
										= taskInformation.editTaskValues([""], "canceled", addTaskTest);
									browser.refresh();
									spectrum_top_sideBar.goToWork();
									spectrum_tasks_page.clearAllFilterSelection();
									spectrum_tasks_page.addTask(taskEntry, addTaskTest);
								});
								it('can cancel a task', function () {
									spectrum_tasks_page.useSearchFilter(addTaskTest["addTaskSummary"])
									                   .then(function () {
										                   spectrum_tasks_page.cancelTask(addTaskTest);
									                   })
								});
								it('does not put canceled tasks in the open queue', function () {
									browser.refresh();
									spectrum_top_sideBar.goToWork();
									spectrum_tasks_page.clearAllFilterSelection();
									spectrum_tasks_page.useSearchFilter(cancelTaskTest["addTaskSummary"])
									                   .then(function () {
										                   spectrum_tasks_page.checkTaskNotInQueue(cancelTaskTest, "OPEN");
									                   })
								});
								it('puts the canceled tasks in the closed queue', function () {
									spectrum_tasks_page.clearAllFilterSelection();
									spectrum_tasks_page.useSearchFilter(cancelTaskTest["addTaskSummary"])
									                   .then(function () {
										                   spectrum_tasks_page.checkTaskInQueue(cancelTaskTest, "CLOSED");
									                   })
								});
								it('displays the correct reason for canceling the task', function () {
									spectrum_tasks_page.checkTaskDetailsCanceled(cancelTaskTest);
								});
								it('displays the correct details for a canceled task', function () {
									spectrum_tasks_page.checkTaskDetails(taskEntry, cancelTaskTest);
								});
								it('displays the correct task queue flag for a cancelled task', function () {
									spectrum_tasks_page.checkTaskFlag(cancelTaskTest, true);
								});
							});
						});
						describe('add task status tests', function () {
							var addTaskStatusTest, changeStatusTaskTest, editTaskStatusTest,
							    changeStatusTaskTest2, completeTaskTest;
							beforeAll(function () {
								taskEntry = ["addTaskSummary", "addTaskSite", "addTaskAssignee"];
								addTaskStatusTest = taskInformation.addTaskData(siteToTest);
								addTaskStatusTest.addTaskAssignee = users[7].userName;
								changeStatusTaskTest
									= taskInformation.editTaskValues([""], "In Progress", addTaskStatusTest);
								taskEdit = ["addTaskAssignee"];
								editTaskStatusTest
									= taskInformation.editTaskValues(taskEdit, "On Hold", changeStatusTaskTest);
								editTaskStatusTest.addTaskAssignee = users[6].userName;
								changeStatusTaskTest2
									= taskInformation.editTaskValues([""], "In Progress", editTaskStatusTest);
								completeTaskTest
									= taskInformation.editTaskValues([""], "Complete", changeStatusTaskTest2);
								logOutInAs(users[0].email, users[0].password);
								goToWork();
								spectrum_tasks_page.addTask(taskEntry, addTaskStatusTest);
							});
							describe('change to in progress tests', function () {
								it('can change a task status to in progress', function () {
									spectrum_tasks_page.useSearchFilter(addTaskStatusTest["addTaskSummary"])
									                   .then(function () {
										                   spectrum_tasks_page.changeTaskStatus(changeStatusTaskTest);
									                   })
								});
								it('does not put an in progress task into the closed task'
								   + ' queue ', function () {
									spectrum_tasks_page.checkTaskNotInQueue(changeStatusTaskTest, "CLOSED");
								});
								it('does put an in progress task into the open queue', function () {
									spectrum_tasks_page.checkTaskInQueue(changeStatusTaskTest, "OPEN");
								});
								it('displays the correct status for an in progress task', function () {
									spectrum_tasks_page.checkTaskStatus(changeStatusTaskTest);
								});
								it('can change a task assignee', function () {
									spectrum_tasks_page.editTaskDetails(changeStatusTaskTest, editTaskStatusTest, taskEdit);
								});
								it('puts task on hold when assignee is changed', function () {
									spectrum_tasks_page.checkTaskStatus(editTaskStatusTest);
								});
							});
							describe('change to complete tests', function () {
								it('change task status complete', function () {
									spectrum_tasks_page.changeTaskStatus(completeTaskTest);
								});
								it('check complete task in closed queue', function () {
									spectrum_tasks_page.checkTaskInQueue(completeTaskTest, "CLOSED");
								});
								it('check complete task flag', function () {
									spectrum_tasks_page.checkTaskFlag(completeTaskTest, true);
								});
								it('check complete task not in open queue', function () {
									spectrum_tasks_page.checkTaskNotInQueue(completeTaskTest, "OPEN");
								});
							});
						});
					});
				}
			});
		};
		function tasksTests3() {
			describe('tasks tests 3', function () {
				var taskEntry, addTaskTest, commentTaskTest;
				beforeAll(function () {
					if (isLoggedin != true) {
						logIn("email");
					}
					browser.refresh();
					spectrum_top_sideBar.goToWork();
				});
				if (testType == "regression") {
					describe('tasks3 regression', function () {
						describe('add task quick filter tests', function () {
							var user3QuickFiltertask, team4QuickFiltertask, tu6;
							beforeAll(function () {
								taskEntry = ["addTaskSummary", "addTaskSite", "addTaskAssignee"];
								user3QuickFiltertask = taskInformation.addTaskData(siteToTest);
								user3QuickFiltertask.addTaskAssignee = userToTest1;
								team4QuickFiltertask = taskInformation.addTaskData(siteToTest);
								team4QuickFiltertask.addTaskAssignee = teamToTest;
								spectrum_tasks_page.addTask(taskEntry, user3QuickFiltertask);
								spectrum_tasks_page.addTask(taskEntry, team4QuickFiltertask);
							})
							describe('my tasks tests', function () {
								afterAll(function () {
									spectrum_tasks_page.clearAllFilterSelection();
								});
								it('logs in as user assigned to task and applies the my tasks'
								   + ' filter', function () {
									logOutInAs(users[0].email, users[0].password);
									goToWork();
									spectrum_tasks_page.myTasksFilter();
								});
								it('displays the task created to user 3 when using the my'
								   + ' task filter', function () {
									spectrum_tasks_page.checkTaskInQueue(user3QuickFiltertask, "OPEN");
								});
								it('logs in as user not assigned to task and applies my tasks'
								   + ' filter', function () {
									logOutInAs(users[1].email, users[1].password);
									goToWork();
									spectrum_tasks_page.myTasksFilter();
								});
								it('does not display tasks not assigned to user when my tasks'
								   + ' filter applied', function () {
									spectrum_tasks_page.checkTaskNotInQueue(user3QuickFiltertask, "OPEN");
								});
							});
							describe('team tasks tests', function () {
								beforeAll(function () {
									tu6 = userInformation.tu006();
									tu6.teams = [teamToTest];
									goToPeople();
									spectrum_people_page.peopleToggle();
									spectrum_people_page.removeUserFromATeam(tu6, 0, [""]);
								});
								afterAll(function () {
									spectrum_tasks_page.clearAllFilterSelection();
								});
								it('logs in as member of team4 and applies team tasks filter', function () {
									logOutInAs(users[2].email, users[2].password);
									goToWork();
									spectrum_tasks_page.teamTasksFilter();
								})
								it('displays the task created to team 4 when using the team'
								   + ' task filter', function () {
									spectrum_tasks_page.checkTaskInQueue(team4QuickFiltertask, "OPEN");
								});
								it('logs in as user that is not member of team4 and applies team'
								   + ' tasks filters', function () {
									logOutInAs(users[3].email, users[3].password);
									goToWork();
									spectrum_tasks_page.teamTasksFilter();
								})
								it('task not present for user task is not assigned to', function () {
									spectrum_tasks_page.checkTaskNotInQueue(team4QuickFiltertask, "OPEN");
								});
							});
							describe('tasks I created tests', function () {
								beforeAll(function () {
									taskEntry = ["addTaskSummary", "addTaskSite",];
									addTaskTest = taskInformation.addTaskData(siteToTest);
									logOutInAs(users[1].email, users[1].password);
									goToWork();
									spectrum_tasks_page.addTask(taskEntry, addTaskTest);
									spectrum_tasks_page.areAllTasksDisplayed(addTaskTest, true);
								})
								it('task present for user task created by ', function () {
									spectrum_tasks_page.tasksICreatedQuickFilter(addTaskTest, true);
								});
								it('task not present for user task not created by ', function () {
									logOutInAs(users[0].email, users[0].password);
									goToWork();
									spectrum_tasks_page.tasksICreatedQuickFilter(addTaskTest, false);
								});
							});
							describe('blocked task filter tests', function () {
								var blockTaskTest, notBlockTaskTest1;
								beforeAll(function () {
									taskEntry = ["addTaskSummary", "addTaskSite",];
									blockTaskTest = taskInformation.addTaskData(siteToTest);
									notBlockTaskTest1 = taskInformation.addTaskData(siteToTest);
									spectrum_tasks_page.clearAllFilterSelection();
									spectrum_tasks_page.addTask(taskEntry, blockTaskTest);
									spectrum_tasks_page.addTask(taskEntry, notBlockTaskTest1);
									spectrum_tasks_page.areAllTasksDisplayed();
								});
								it('can block a task', function () {
									spectrum_tasks_page.useSearchFilter(blockTaskTest["addTaskSummary"])
									                   .then(function () {
										                   spectrum_tasks_page.blockTask(blockTaskTest)
										                                      .then(function () {
											                                      spectrum_tasks_page.clearAllFilterSelection();
										                                      });
									                   });
								});
								it('displays blocked tasks when using the blocked task quick'
								   + ' filter', function () {
									spectrum_tasks_page.blockedTasksQuickFilter(blockTaskTest, true);
								});
								it('does not display unblocked tasks when using the blocked'
								   + ' tasks quick filter', function () {
									spectrum_tasks_page.clearAllFilterSelection();
									spectrum_tasks_page.blockedTasksQuickFilter(notBlockTaskTest1, false);
								});
							});
						});
						describe('edit task add comment tests', function () {
							beforeAll(function () {
								taskEntry = ["addTaskSummary", "addTaskSite"];
								addTaskTest = taskInformation.addTaskData(siteToTest);
								commentTaskTest
									= taskInformation.editTaskValues([""], "not started", addTaskTest);
								logOutInAs(users[0].email, users[0].password);
								goToWork();
								spectrum_tasks_page.clearAllFilterSelection();
								spectrum_tasks_page.addTask(taskEntry, addTaskTest);
								spectrum_tasks_page.useSearchFilter(addTaskTest["addTaskSummary"]);
							});
							it('can add a comment to a task', function () {
								spectrum_tasks_page.addComment(commentTaskTest, commentTaskTest["existingCommentText"]);
							});
							it('displays the correct comment information', function () {
								spectrum_tasks_page.checkComment(1, commentTaskTest);
							});
							it('displays a comment flag when a task has a comment', function () {
								spectrum_tasks_page.checkTaskInQueue(commentTaskTest, "OPEN");
								spectrum_tasks_page.checkTaskCommentFlags(commentTaskTest, 1, true);
							});
						});
					});
				}
			});
		};
		function tasksTests4() {
			describe('tasks tests 4', function () {
				var taskEntry, addTaskTest, addTaskTest1, cancelTaskTest;
				beforeAll(function () {
					if (isLoggedin != true) {
						logIn("email");
					}
					browser.refresh();
					spectrum_top_sideBar.goToWork();
				});
				if (testType == "regression") {
					describe('tasks4 regression', function () {
						describe('add task all filters tests', function () {
							var allFilterMenus, allFilterSelections, allFilterSite, labels;
							describe('location filter', function () {
								beforeAll(function () {
									taskEntry = [
										"addTaskSummary", "addTaskSite", "addTasklocation"];
									addTaskTest = taskInformation.addTaskData(siteToTest);
									addTaskTest.addTasklocation = locToTest1;
									addTaskTest1
										= taskInformation.addTaskLocation2Data(siteToTest, locToTest2);
									spectrum_tasks_page.addTask(taskEntry, addTaskTest);
									spectrum_tasks_page.addTask(taskEntry, addTaskTest1);
									allFilterMenus = ["Location/Asset"];
									allFilterSelections = [addTaskTest["addTasklocation"]];
									allFilterSite = [addTaskTest["addTaskSite"]]
								});
								xdescribe('w/o search', function () {
									afterAll(function () {
										spectrum_tasks_page.clearAllFilterSelection();
									});
									it('can apply a task location filter', function () {
										spectrum_tasks_page.useAllFilters(allFilterMenus, allFilterSelections, allFilterSite);
									});
									it('displays a task assigned to the location chosen in'
									   + ' location task filter', function () {
										spectrum_tasks_page.areAllTasksDisplayed()
										                   .then(function () {
											                   spectrum_tasks_page.checkTaskInQueue(addTaskTest, "OPEN");
										                   });
									});
									it('does not display a task not assigned to the location'
									   + ' chosen in the location task filter', function () {
										spectrum_tasks_page.checkTaskNotInQueue(addTaskTest1, "OPEN");
									});
								})
								describe('w/search', function () {
									afterAll(function () {
										spectrum_tasks_page.clearAllFilterSelection();
									});
									it('can apply location filter with search', function () {
										spectrum_tasks_page.useAllFiltersSearch(allFilterMenus, allFilterSelections, allFilterSite);
									})
									it('check task in queue after using Location Search', function () {
										spectrum_tasks_page.areAllTasksDisplayed()
										                   .then(function () {
											                   spectrum_tasks_page.checkTaskInQueue(addTaskTest, "OPEN");
										                   })
									});
									xit('does not display a task not assigned to the location'
									   + ' chosen in the location search task filter', function () {
										spectrum_tasks_page.checkTaskNotInQueue(addTaskTest1, "OPEN");
									});
								})
							});
							describe('due filter tests', function () {
								beforeAll(function () {
									taskEntry = ["addTaskSummary", "addTaskSite", "addedDays"];
									addTaskTest
										= taskInformation.addTaskDatePickerData(1, siteToTest);
									addTaskTest1
										= taskInformation.addTaskDatePickerData(7, siteToTest);
									spectrum_tasks_page.addTask(taskEntry, addTaskTest);
									spectrum_tasks_page.addTask(taskEntry, addTaskTest1);
									allFilterMenus = ["From", "To"];
									allFilterSelections = [0, 4];
								});
								afterAll(function () {
									spectrum_tasks_page.clearAllFilterSelection();
								});
								it('can use the due filter', function () {
									spectrum_tasks_page.useAllFilters(allFilterMenus, allFilterSelections);
								});
								it('displays the task that is within the range entered into'
								   + ' the due date filter', function () {
									spectrum_tasks_page.areAllTasksDisplayed().then(function () {
										spectrum_tasks_page.checkTaskInQueue(addTaskTest, "OPEN");
									});
								});
								it('does not display the task that is outside of the due'
								   + ' filter range', function () {
									spectrum_tasks_page.checkTaskNotInQueue(addTaskTest1, "OPEN");
								});
							})
							describe('labels filter tests', function () {
								beforeAll(function () {
									taskEntry = ["addTaskSummary", "addTaskSite", "labelEntry"];
									addTaskTest = taskInformation.addTaskData(siteToTest);
									addTaskTest1
										= taskInformation.addTaskLocation2Data(siteToTest, locToTest2);
									spectrum_tasks_page.addTask(taskEntry, addTaskTest);
									spectrum_tasks_page.addTask(taskEntry, addTaskTest1);
									labels = addTaskTest["labelEntry"];
									allFilterMenus = ["Label"];
									allFilterSelections = [labels[0]];
								});
								describe('single label tests', function () {
									describe('w/o search', function () {
										afterAll(function () {
											spectrum_tasks_page.clearAllFilterSelection();
										});
										it('can apply a label filter to tasks list', function () {
											spectrum_tasks_page.useAllFilters(allFilterMenus, allFilterSelections);
										})
										it('displays the correct task in queue after'
										   + ' label filter chosen', function () {
											spectrum_tasks_page.areAllTasksDisplayed()
											                   .then(function () {
												                   spectrum_tasks_page.checkTaskInQueue(addTaskTest, "OPEN");
											                   });
										});
										it('does not display task w/o label after label'
										   + ' filter chosen', function () {
											spectrum_tasks_page.checkTaskNotInQueue(addTaskTest1, "OPEN");
										});
									});
									describe('w/search', function () {
										afterAll(function () {
											spectrum_tasks_page.clearAllFilterSelection();
										});
										it('can apply a label filter using search to the tasks'
										   + ' list', function () {
											spectrum_tasks_page.useAllFiltersSearch(allFilterMenus, allFilterSelections);
										})
										it('displays the correct task in queue after label'
										   + ' search filter chosen', function () {
											spectrum_tasks_page.areAllTasksDisplayed()
											                   .then(function () {
												                   spectrum_tasks_page.checkTaskInQueue(addTaskTest, "OPEN");
											                   });
										});
										it('does not display task w/o label after label'
										   + ' search filter chosen', function () {
											spectrum_tasks_page.checkTaskNotInQueue(addTaskTest1, "OPEN");
										});
									});
								});
								describe('multiple lable tests', function () {
									beforeAll(function () {
										allFilterMenus = ["Label", "Label", "Label", "Label"];
										allFilterSelections = [
											labels[0], labels[1], labels[2], labels[3]];
									});
									afterAll(function () {
										spectrum_tasks_page.clearAllFilterSelection();
									});
									it('can apply multiple labels to the label filter in the'
									   + ' tasks list', function () {
										spectrum_tasks_page.useAllFilters(allFilterMenus, allFilterSelections);
									});
									it('displays the correct tasks when multiple lables'
									   + ' are app', function () {
										spectrum_tasks_page.areAllTasksDisplayed()
										                   .then(function () {
											                   spectrum_tasks_page.checkTaskInQueue(addTaskTest, "OPEN");
										                   });
									});
									it('multiple labels:  negative', function () {
										spectrum_tasks_page.checkTaskNotInQueue(addTaskTest1, "OPEN");
									});
								});
							});
						});
					});
				}
			});
		};
		function tasksTests5() {
			describe('tasks tests 5', function () {
				var taskEntry, addTaskTest, addTaskTest1, cancelTaskTest;
				beforeAll(function () {
					if (isLoggedin != true) {
						logIn("email");
					}
					browser.refresh();
					spectrum_top_sideBar.goToWork();
				});
				if (testType == "regression") {
					describe('tasks5 regression', function () {
						describe('add task all filters tests', function () {
							var allFilterMenus, allFilterSelections, allFilterSite, labels;
							describe('assignee filter', function () {
								beforeAll(function () {
									spectrum_tasks_page.clearAllFilterSelection();
									taskEntry = [
										"addTaskSummary", "addTaskSite", "addTaskAssignee"];
									addTaskTest = taskInformation.addTaskData(siteToTest);
									addTaskTest1
										= taskInformation.addTaskLocation2Data(siteToTest, locToTest2);
									spectrum_tasks_page.addTask(taskEntry, addTaskTest);
									spectrum_tasks_page.addTask(taskEntry, addTaskTest1);
									allFilterMenus = ["Assignee"];
									allFilterSelections = [addTaskTest["addTaskAssignee"]];
									logOutIn();
									goToWork();
								})
								describe('w/o search', function () {
									afterAll(function () {
										spectrum_tasks_page.clearAllFilterSelection();
									});
									it('can apply an assignee filter to the tasks list', function () {
										spectrum_tasks_page.useAllFilters(allFilterMenus, allFilterSelections);
									})
									it('displays the correct task in queue after assignee'
									   + ' filter chosen', function () {
										spectrum_tasks_page.areAllTasksDisplayed()
										                   .then(function () {
											                   spectrum_tasks_page.checkTaskInQueue(addTaskTest, "OPEN");
										                   });
									});
									it('does not display task in queue after'
									   + ' assignee filter chosen', function () {
										spectrum_tasks_page.checkTaskNotInQueue(addTaskTest1, "OPEN");
									});
								});
								describe('w/search', function () {
									afterAll(function () {
										spectrum_tasks_page.clearAllFilterSelection();
									});
									it('can apply an assignee filter w/search to the tasks list', function () {
										spectrum_tasks_page.useAllFiltersSearch(allFilterMenus, allFilterSelections);
									})
									it('displays the correct task in queue after assignee'
									   + ' search filter chosen', function () {
										spectrum_tasks_page.areAllTasksDisplayed()
										                   .then(function () {
											                   spectrum_tasks_page.checkTaskInQueue(addTaskTest, "OPEN");
										                   });
									});
									it('does not display task w/o location after assignee'
									   + ' search filter chosen', function () {
										spectrum_tasks_page.checkTaskNotInQueue(addTaskTest1, "OPEN");
									});
								})
							});
							describe('status filter', function () {
								beforeAll(function () {
									taskEntry = [
										"addTaskSummary", "addTaskSite", "addTaskAssignee"];
									allFilterMenus = ["Status"];
									addTaskTest = taskInformation.addTaskData(siteToTest);
									spectrum_tasks_page.addTask(taskEntry, addTaskTest);
									logOutIn();
									goToWork();
								});
								describe('not started', function () {
									describe('happy path test', function () {
										afterAll(function () {
											spectrum_tasks_page.clearAllFilterSelection();
										});
										it('can apply the not started status filter', function () {
											spectrum_tasks_page.useAllFilters(allFilterMenus, ["Not Started"]);
										})
										it('displays tasks w/status not started when not started'
										   + ' filter applied', function () {
											checkTaskPresent(addTaskTest, "OPEN");
										});
									})
									describe('negative test', function () {
										afterAll(function () {
											spectrum_tasks_page.clearAllFilterSelection();
										});
										it('can apply the in progress status filter', function () {
											spectrum_tasks_page.useAllFilters(allFilterMenus, ["In Progress"]);
										});
										it('does not display tasks w/status not started when in'
										   + ' progress filter applied', function () {
											checkTaskNotPresent(addTaskTest, "OPEN")
										});
									});
								});
								describe('in progress', function () {
									beforeAll(function () {
										var changeStatusTaskTest = taskInformation.editTaskValues([""], "In Progress", addTaskTest);
										spectrum_tasks_page.useSearchFilter(changeStatusTaskTest["addTaskSummary"])
										                   .then(function () {
											                   spectrum_tasks_page.changeTaskStatus(changeStatusTaskTest)
											                                      .then(function () {
												                                      spectrum_tasks_page.clearAllFilterSelection();
											                                      })
										                   });
									});
									describe('negative test', function () {
										afterAll(function () {
											spectrum_tasks_page.clearAllFilterSelection();
										});
										it('can apply the not started status filter', function () {
											spectrum_tasks_page.useAllFilters(allFilterMenus, ["Not Started"]);
										})
										it('does not displays tasks w/status in progress when'
										   + ' not started filter applied', function () {
											checkTaskNotPresent(addTaskTest, "OPEN");
										});
									});
									describe('happy path', function () {
										afterAll(function () {
											spectrum_tasks_page.clearAllFilterSelection();
										});
										it('can apply the in progress status filter', function () {
											spectrum_tasks_page.useAllFilters(allFilterMenus, ["In Progress"]);
										});
										it('does display tasks w/status in progress when in'
										   + ' progress filter selected', function () {
											checkTaskPresent(addTaskTest, "OPEN");
										});
									});
								});
								describe('on hold', function () {
									beforeAll(function () {
										var changeStatusTaskTest = taskInformation.editTaskValues([""], "On Hold", addTaskTest);
										spectrum_tasks_page.useSearchFilter(changeStatusTaskTest["addTaskSummary"])
										                   .then(function () {
											                   spectrum_tasks_page.changeTaskStatus(changeStatusTaskTest)
											                                      .then(function () {
												                                      spectrum_tasks_page.clearAllFilterSelection();
											                                      })
										                   })
									});
									describe('negative test', function () {
										afterAll(function () {
											spectrum_tasks_page.clearAllFilterSelection();
										});
										it('can apply the in progress status filter', function () {
											spectrum_tasks_page.useAllFilters(allFilterMenus, ["In Progress"]);
										});
										it('does not display tasks that are on hold when the in'
										   + ' progress filter is applied', function () {
											checkTaskNotPresent(addTaskTest, "OPEN");
										});
									});
									describe('happy path', function () {
										afterAll(function () {
											spectrum_tasks_page.clearAllFilterSelection();
										});
										it('can apply the On Hold status filter', function () {
											spectrum_tasks_page.useAllFilters(allFilterMenus, ["On Hold"]);
										});
										it('displays tasks that are on hold when the on hold filter'
										   + ' applied', function () {
											checkTaskPresent(addTaskTest, "OPEN");
										});
									});
								});
								describe('complete', function () {
									beforeAll(function () {
										var changeStatusTaskTest = taskInformation.editTaskValues([""], "Complete", addTaskTest);
										spectrum_tasks_page.useSearchFilter(changeStatusTaskTest["addTaskSummary"])
										                   .then(function () {
											                   spectrum_tasks_page.changeTaskStatus(changeStatusTaskTest)
											                                      .then(function () {
												                                      spectrum_tasks_page.clearAllFilterSelection();
											                                      });
										                   });
									});
									describe('negative test', function () {
										afterAll(function () {
											spectrum_tasks_page.clearAllFilterSelection();
										});
										it('can apply the in progress status filter', function () {
											spectrum_tasks_page.useAllFilters(allFilterMenus, ["In Progress"]);
										});
										it('does not display complete tasks when the in progress'
										   + ' filter is applied', function () {
											checkTaskNotPresent(addTaskTest, "CLOSED");
										});
									});
									describe('happy path', function () {
										afterAll(function () {
											spectrum_tasks_page.clearAllFilterSelection();
										});
										it('can apply the complete status filter', function () {
											spectrum_tasks_page.useAllFilters(allFilterMenus, ["Complete"]);
										});
										it('displays completed tasks when the complete filter is'
										   + ' applied', function () {
											checkTaskPresent(addTaskTest, "CLOSED");
										});
									});
								});
								describe('canceled', function () {
									beforeAll(function () {
										taskEntry = [
											"addTaskSummary", "addTaskDescription", "addTaskSite"];
										addTaskTest = taskInformation.addTaskData(siteToTest);
										cancelTaskTest
											= taskInformation.editTaskValues([""], "canceled", addTaskTest);
										spectrum_tasks_page.addTask(taskEntry, addTaskTest);
										logOutIn();
										goToWork();
									});
									it('can cancel a task > ', function () {
										spectrum_tasks_page.useSearchFilter(addTaskTest["addTaskSummary"])
										                   .then(function () {
											                   spectrum_tasks_page.cancelTask(addTaskTest);
										                   });
									});
									describe('negative test', function () {
										afterAll(function () {
											spectrum_tasks_page.clearAllFilterSelection();
										});
										it('can apply the in progress status filter', function () {
											spectrum_tasks_page.useAllFilters(allFilterMenus, ["In Progress"]);
										});
										it('does not display canceled tasks when the in progress'
										   + ' filter is applied', function () {
											checkTaskNotPresent(cancelTaskTest, "CLOSED");
										});
									});
									describe('happy path', function () {
										afterAll(function () {
											spectrum_tasks_page.clearAllFilterSelection();
										});
										it('can apply the Canceled status filter', function () {
											spectrum_tasks_page.useAllFilters(allFilterMenus, ["Canceled"]);
										});
										it('displays canceled tasks when the canceled tasks filter'
										   + ' applied', function () {
											checkTaskPresent(cancelTaskTest, "CLOSED");
										});
									});
								});
							});
						});
					});
				}
				;
			});
		};
		function tasksTests6() {
			describe('tasks tests 6', function () {
				var taskEntry, addTaskTest, addTaskTest1, cancelTaskTest;
				beforeAll(function () {
					if (isLoggedin != true) {
						logIn("email");
					}
					browser.refresh();
					spectrum_top_sideBar.goToWork();
				});
				if (testType == "regression") {
					describe('tasks6 regression', function () {
						describe('add task all filters tests', function () {
							var allFilterMenus, allFilterSelections, allFilterSite, labels;
							describe('more options filters', function () {
								var allFilterMenus = ["More Options"];
								describe('unread', function () {
									var user4Task, allFilterSelections;
									beforeAll(function () {
										taskEntry = [
											"addTaskSummary", "addTaskSite", "addTaskAssignee"];
										user4Task = taskInformation.addTaskData(siteToTest);
										user4Task.addTaskAssignee = userToTest2
										allFilterSelections = ["Unread"];
										logOutInAs(users[0].email, users[0].password);
										goToWork();
										spectrum_tasks_page.addTask(taskEntry, user4Task);
										spectrum_tasks_page.areAllTasksDisplayed();
										logOutInAs(users[0].email, users[0].password);
										goToWork();
									});
									it('can apply unread task filter', function () {
										spectrum_tasks_page.useAllFilters(allFilterMenus, allFilterSelections);
									});
									it('displays tasks unread by assignee', function () {
										checkTaskPresent(user4Task, "OPEN")
									});
									it('logs in as assignee and applies unread filter', function () {
										logOutInAs(users[1].email, users[1].password);
										goToWork();
										spectrum_tasks_page.useAllFilters(allFilterMenus, allFilterSelections);
									})
									it('displays tasks created by another user that are'
									   + ' unread by assignee', function () {
										spectrum_tasks_page.areAllTasksDisplayed()
										                   .then(function () {
											                   spectrum_tasks_page.useSearchFilter(user4Task["addTaskSummary"])
											                                      .then(function () {
												                                      spectrum_tasks_page.checkTaskDetails(taskEntry, user4Task);
											                                      });
										                   });
									});
									it('can reset filters then reapply unread filter', function () {
										logOutInAs(users[1].email, users[1].password);
										goToWork();
										spectrum_tasks_page.useAllFilters(allFilterMenus, allFilterSelections);
									})
									it('does not display tasks created by another user that'
									   + ' have been read by assignee', function () {
										spectrum_tasks_page.areAllTasksDisplayed()
										                   .then(function () {
											                   spectrum_tasks_page.checkTaskNotInQueue(user4Task, "OPEN");
										                   });
									});
									it('can log in as task creator and apply unread filter', function () {
										logOutInAs(users[0].email, users[0].password);
										goToWork();
										spectrum_tasks_page.useAllFilters(allFilterMenus, allFilterSelections);
									})
									it('does not display tasks assigned to other user once'
									   + ' assignee has read them', function () {
										spectrum_tasks_page.areAllTasksDisplayed()
										                   .then(function () {
											                   spectrum_tasks_page.checkTaskNotInQueue(user4Task, "OPEN");
										                   });
									});
								});
								describe('blocked', function () {
									beforeAll(function () {
										taskEntry = ["addTaskSummary", "addTaskSite"];
										allFilterSelections = ["Blocked"];
										addTaskTest = taskInformation.addTaskData(siteToTest);
										addTaskTest1 = taskInformation.addTaskData(siteToTest);
										spectrum_tasks_page.addTask(taskEntry, addTaskTest);
										spectrum_tasks_page.addTask(taskEntry, addTaskTest1);
										spectrum_tasks_page.areAllTasksDisplayed();
										logOutIn();
										goToWork();
									});
									it('can block a task', function () {
										spectrum_tasks_page.useSearchFilter(addTaskTest["addTaskSummary"])
										                   .then(function () {
											                   spectrum_tasks_page.blockTask(addTaskTest)
											                                      .then(function () {
												                                      spectrum_tasks_page.clearAllFilterSelection();
											                                      });
										                   });
									});
									describe('negative test', function () {
										afterAll(function () {
											spectrum_tasks_page.clearAllFilterSelection();
										});
										it('can apply the blocked task filter', function () {
											spectrum_tasks_page.useAllFilters(allFilterMenus, allFilterSelections);
										});
										it('does not display un blocked tasks when using the blocked'
										   + ' task filter', function () {
											spectrum_tasks_page.areAllTasksDisplayed()
											                   .then(function () {
												                   spectrum_tasks_page.checkTaskNotInQueue(addTaskTest1, "OPEN");
											                   });
										});
									});
									describe('happy path', function () {
										afterAll(function () {
											spectrum_tasks_page.clearAllFilterSelection();
										});
										it('can apply the blocked task filter', function () {
											spectrum_tasks_page.useAllFilters(allFilterMenus, allFilterSelections);
										});
										it('displays blocked task when using blocked task filter', function () {
											spectrum_tasks_page.areAllTasksDisplayed()
											                   .then(function () {
												                   spectrum_tasks_page.checkTaskInQueue(addTaskTest, "OPEN");
											                   });
										});
									})
								});
								describe('i created', function () {
									beforeAll(function () {
										taskEntry = ["addTaskSummary", "addTaskSite"];
										addTaskTest = taskInformation.addTaskData(siteToTest);
										allFilterSelections = ["Created by me"];
										logOutInAs(users[0].email, users[0].password);
										goToWork();
										spectrum_tasks_page.addTask(taskEntry, addTaskTest);
										logOutInAs(users[0].email, users[0].password);
										goToWork();
									});
									afterAll(function () {
										spectrum_tasks_page.clearAllFilterSelection();
									});
									it('can apply the tasks i created filter', function () {
										spectrum_tasks_page.useAllFilters(allFilterMenus, allFilterSelections);
									});
									it('displays tasks created by a user when the created by'
									   + ' me filter applied', function () {
										checkTaskPresent(addTaskTest, "OPEN");
									});
									it('can log in as another user and apply filter', function () {
										logOutInAs(users[1].email, users[1].password);
										goToWork();
										spectrum_tasks_page.useAllFilters(allFilterMenus, allFilterSelections);
									})
									it('does not display tasks created by other users when'
									   + ' created by me filter applied', function () {
										checkTaskNotPresent(addTaskTest, "OPEN")
									});
								});
							});
							describe('misc task tests', function () {
								beforeAll(function () {
									taskEntry = [
										"addTaskSummary", "addTaskDescription", "addTaskSite",
										"addTasklocation", "labelEntry", "addTaskAssignee",
										"addedDays"];
									addTaskTest = taskInformation.addTaskData(siteToTest);
									addTaskTest.addTasklocation = locToTest1;
									addTaskTest.addTaskAssignee = userToTest1
									labels = addTaskTest["labelEntry"];
									allFilterMenus = [
										"More Options", "Label", "Label", "Label", "Label",
										"Assignee", "Status", "From", "To"];
									allFilterSelections = [
										"Created by me", labels[0], labels[1], labels[2], labels[3],
										addTaskTest["addTaskAssignee"], "Not Started", 0, 4];
									allFilterSite = [addTaskTest["addTaskSite"]]
									logOutInAs(users[0].email, users[0].password);
									goToWork();
									spectrum_tasks_page.addTask(taskEntry, addTaskTest);
									logOutInAs(users[0].email, users[0].password);
									goToWork();
								});
								it('can apply multiple filters', function () {
									spectrum_tasks_page.useAllFilters(allFilterMenus, allFilterSelections);
									spectrum_tasks_page.useAllFiltersSearch(["Location/Asset"], [addTaskTest["addTasklocation"]], allFilterSite);
								})
								it('will display a task after multiple applicable filters are'
								   + ' applied', function () {
									checkTaskPresent(addTaskTest, "OPEN")
								});
							});
						});
					});
				}
				;
			});
		};
		function roleAndPermissionsTests() {
			/**
			 * TODO new role (modal) tests
			 */
			describe('role and permissions tests', function () {
				var choice, newSiteName, newTeamName, newTeamDescripton, newTeam, newTeam2, tt003,
				    tu3, tu4, tu5, tu6, tu7, taskEntry, procedure1, round1, testLoc1, testAsset,
				    newLabel, addTaskTest, addTaskTest1;
				beforeAll(function () {
					choice = "create";
					newSiteName = phraseGen.randomLabel();
					newTeamName = "Team " + siteToTest;
					newTeamDescripton = siteToTest + " is the best team"
					newTeam = teamInformation.newTeam(newTeamName, newTeamDescripton, 0, 1, [
						userToTest1, userToTest2, "Test User5", "Test User6", "Test User7"], [
						                                  siteToTest, "site 3", "site 4"]);
					newTeam2
						= teamInformation.newTeam(phraseGen.randomLabel(), phraseGen.randomPhrase(), 0, 1, [
						userToTest1, userToTest2, "Test User5", "Test User6",
						"Test User7"], [siteToTest, "site 3", "site 4"]);
					tt003 = new Object();
					tt003.teamName = teamToTest;
					tt003.description = "does the work assigned to " + teamToTest;
					tt003.members = [
						userToTest1, userToTest2, "Test User5", "Test User6", "Test" + " User7"];
					tt003.enabled = "Team Enabled";
					tt003.sites = ["site 3"];
					tu3 = userInformation.tu003(newTeam["teamName"], siteToTest);
					tu4 = userInformation.tu004(newTeam["teamName"], siteToTest);
					tu5 = userInformation.tu005(newTeam["teamName"], siteToTest);
					tu6 = userInformation.tu006(newTeam["teamName"], siteToTest);
					tu7 = userInformation.tu007(newTeam["teamName"], siteToTest);
					taskEntry = ["addTaskSummary", "addTaskSite"];
					testLoc1 = locInformation.testLoc(siteToTest);
					testAsset = assetInformation.testAsset("In Service", testLoc1["name"]);
					procedure1
						= procRoundInformation.testProcRound(1, "No", users[1].userName, testLoc1);
					round1
						= procRoundInformation.testProcRound(1, "No", users[1].userName, testLoc1);
					newLabel = phraseGen.randomLabel() + getRandomIntInclusive(1, 10);
					testLoc1.pm = [
						procedure1["name"], procedure1["durationDetail2"], procedure1["team"]];
					testAsset.pm = [
						procedure1["name"], procedure1["durationDetail2"], procedure1["team"]];
					if (isLoggedin != true) {
						spectrum_login_page.taskingLogin(users[9].email, users[9].password)
						                   .then(function () {
							                   isLoggedin = true;
						                   });
					} else {
						logOutInAs(users[9].email, users[9].password);
					}
				});
				describe('system admin tests', function () {
					it('can choose to switch to an existing client', function () {
						spectrum_top_sideBar.selectClient(clientToTest);
					});
					xit('can create a new site', function () {
						spectrum_top_sideBar.goToSites();
						spectrum_sites_page.isSitesPageLoaded();
						spectrum_sites_page.createNewSite(newSiteName);
					});
					/**
					 * TODO waiting on 5959
					 */
					xit('displays the new site in the site list', function () {
						logOutInAs(users[9].email, users[9].password);
						goToSites(newSiteName);
					})
					it('can create a new team for the site', function () {
						goToPeople();
						spectrum_people_page.teamsToggle();
						spectrum_people_page.createNewTeam([
							                                   "teamName", "description", "site",
							                                   "create"], newTeam);
					});
					it('can remove all memebers from a team', function () {
						spectrum_people_page.removeTeamMember(tt003, 0).then(function () {
							spectrum_people_page.removeTeamMember(tt003, 1).then(function () {
								spectrum_people_page.removeTeamMember(tt003, 2).then(function () {
									spectrum_people_page.removeTeamMember(tt003, 3)
									                    .then(function () {
										                    spectrum_people_page.removeTeamMember(tt003, 4);
									                    })
								})
							})
						})
					});
					it('can add an Account Admin to a team', function () {
						spectrum_people_page.addUserToATeam(tu5, 0, "");
					});
					it('can edit a users role to Account Admin', function () {
						spectrum_people_page.editAUsersRole(tu5, tu5["role"]);
					});
				});
				describe('Account Admin tests', function () {
					beforeAll(function () {
						logOutInAs(users[2].email, users[2].password);
						goToPeople();
					})
					describe('edit user roles,teams,sites', function () {
						it('can add a the user that will be a follower to a team', function () {
							// spectrum_people_page.addUserToASite(tu3,0,"")
							spectrum_people_page.addUserToATeam(tu3, 2, "");
						});
						it('can edit a users role to follower', function () {
							spectrum_people_page.editAUsersRole(tu3, tu3["role"], 'follower')
						});
						it('can add an Member to a team', function () {
							spectrum_people_page.addUserToATeam(tu4, 2, "");
						});
						it('can edit a users role to member', function () {
							spectrum_people_page.editAUsersRole(tu4, tu4["role"], 'admin')
						});
						it('can add an site admin to a team', function () {
							spectrum_people_page.addUserToATeam(tu6, 2, "");
						});
						it('can edit a users role to site admin', function () {
							spectrum_people_page.editAUsersRole(tu6, tu6["role"], 'site')
						});
						xit('can add a site admin to a site', function () {
							spectrum_people_page.addUserToASite(tu6, 0, "")
						});
						it('can add an basic member to a team', function () {
							spectrum_people_page.addUserToATeam(tu7, 2, "");
						});
						it('can edit a users role to basic member', function () {
							spectrum_people_page.editAUsersRole(tu7, tu7["role"], 'admin')
						});
					});
				});
				describe('site admin tests', function () {
					it('can log in as site admin', function () {
						logOutInAs(users[3].email, users[3].password);
					});
					describe('site admin basic navigaton tests', function () {
						it('can navigate to the work section as site admin', function () {
							spectrum_top_sideBar.goToWork();
						});
						it('can navigate to site section as site admin', function () {
							spectrum_top_sideBar.goToSites();
						});
						it('navigates the site admin to the site assigned to them', function () {
							spectrum_sites_page.isSiteHeaderCorrect(tu6)
						})
						it('can navigate to site settings as site admin', function () {
							spectrum_sites_page.goToSiteSettings();
						});
						it('can navigate to site locations as site admin', function () {
							spectrum_sites_page.goToSitesLocations(true);
						});
						it('can navigate to site assets as site admin', function () {
							spectrum_sites_page.goToSitesAssets(true);
						});
						it('can navigate to site strategies as site admin', function () {
							spectrum_sites_page.goToStrategies();
						});
						it('can navigate to site rounds as site admin', function () {
							spectrum_sites_page.goToRounds(true);
						});
						it('can navigate to the people section as site admin', function () {
							goToPeople();
						});
						it('can toggle the people view in the people section as site admin', function () {
							spectrum_people_page.peopleToggle();
						});
						it('can toggle the team view in the people section as site admin', function () {
							spectrum_people_page.teamsToggle();
						});
						it('can navigate back to the flywheel daoshboard section as site admin', function () {
							spectrum_top_sideBar.goToDashBaord();
						});
					})
					if (testType == "regression") {
						describe('site admin site settings tests', function () {
							beforeAll(function () {
								spectrum_top_sideBar.goToSites();
								spectrum_sites_page.goToSiteSettings();
							})
							it('can create new asset type as site admin', function () {
								spectrum_sites_page.createNewAssetType(testAsset["type"], choice);
							});
							it('can create new location type as site admin', function () {
								spectrum_sites_page.createNewLocationType(testLoc1["type"], choice);
							});
							it('can create new label as site admin', function () {
								spectrum_sites_page.createNewLabel(newLabel, choice);
							});
						});
						describe('site admin loc/assets tests', function () {
							it('can nav to locations as site admin ', function () {
								spectrum_sites_page.goToSitesLocations(true);
							})
							it('can use the add location button modal', function () {
								var element = ["name", "lType", "pLoc", "quan", "submit"];
								var value = [
									testLoc1["name"], testLoc1["type"], testLoc1["location"], "1",
									"Add Location"];
								spectrum_sites_page.addLocationButtonModalEntry(element, value);
							});
							it('displays the location created by the site admin', function () {
								spectrum_sites_page.childlessLocationPresent(testLoc1["name"], true);
							});
							it('can nav to assets tab as site admin', function () {
								spectrum_sites_page.goToSitesAssets(true);
							});
							it('can add asset from asset tab ', function () {
								var element = ["lAType", "name", "loc", "quan", "submit"]
								var value = [
									testAsset["type"], testAsset["name"], testLoc1["name"], "1", ""]
								spectrum_sites_page.assetTabAddAsset();
								spectrum_sites_page.addAssetModalCompletion(element, value, 0);
							});
							it('displays the asset created by the site admin', function () {
								spectrum_sites_page.isSitesAssetsInList(testAsset["name"], true);
							})
						})
						describe('reading tests', function () {
							it('can nav to strategies as site admin', function () {
								spectrum_sites_page.goToStrategies();
							})
							it('can create a new reading for asset type', function () {
								spectrum_sites_page.addNewReadingAsset(testAsset["type"], testAsset["reading"]);
							});
							it('can nav to strategies as site admin', function () {
								browser.refresh();
								spectrum_sites_page.goToStrategies();
							})
							it('can create a new reading for a location type', function () {
								spectrum_sites_page.addNewReadingLoc(testLoc1["type"], testLoc1["reading"]);
							});
							it('displays the reading for a specific asset of type', function () {
								spectrum_sites_page.goToSitesAssets(true);
								spectrum_sites_page.checkAssetReadings(testAsset)
							});
							it('displays the reading for a specific loc of type', function () {
								spectrum_sites_page.goToSitesLocations(true)
								spectrum_sites_page.checkLocReadings(testLoc1)
							});
						})
						describe('site admin procedure tests', function () {
							describe('asset type procedure tests', function () {
								it('can create a procedure for an asset type', function () {
									spectrum_sites_page.goToStrategies();
									spectrum_sites_page.navToAssetProcedures(testAsset["type"], true)
									var element = [
										"name", "duration", "perform", "startingOn", "team",
										"within", "units", "time", "locAssetTab",
										"selectAllLocAsset", "roundTab", "add", "create"]
									spectrum_sites_page.addNewProcedureAsset(element, procedure1)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure1["name"]);
									                   });
								});
								it('displays the correct details for the hourly procedure', function () {
									spectrum_sites_page.checkARoundsDetails(procedure1, [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]);
								});
								it('displays the correct steps in the round details for' + ' hourly'
								   + ' procedure ' + 'w/o l&s steps', function () {
									var step = procedure1["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure1["name"], step[0], [step[1]]);
								});
								it('displays the correct pm details for an asset of type', function () {
									spectrum_sites_page.selectAssetOfType(["name"], testAsset, true)
									                   .then(function () {
										                   spectrum_sites_page.checkAssetPM(testAsset);
									                   });
								});
							})
							describe('loc taype procedure tests', function () {
								it('can create a procedure for a loc type', function () {
									spectrum_sites_page.goToStrategies();
									spectrum_sites_page.navToLocProcedures(testLoc1["type"], true)
									var element = [
										"name", "duration", "perform", "startingOn", "team",
										"within", "units", "time", "locAssetTab",
										"selectAllLocAsset", "roundTab", "add", "create"]
									spectrum_sites_page.addNewProcedureAsset(element, procedure1)
									                   .then(function () {
										                   spectrum_sites_page.newRoundPresent(procedure1["name"]);
									                   })
								});
								it('displays the correct details for the hourly procedure', function () {
									var toCHeck = [
										"name", "landS", "perform", "durationDetail", "team",
										"displayTime", "displayDate"]
									spectrum_sites_page.checkARoundsDetails(procedure1, toCHeck);
								});
								it('displays the correct steps in the round details for' + ' hourly'
								   + ' procedure ' + 'w/o l&s steps', function () {
									var step = procedure1["steps"][0]
									spectrum_sites_page.checkProcedureDetSteps(procedure1["name"], step[0], [step[1]]);
								});
								it('displays the correct pm details for an loc of type', function () {
									spectrum_sites_page.selectLocOfType(["name"], testLoc1)
									                   .then(function () {
										                   spectrum_sites_page.checkLocPM(testLoc1);
									                   })
								});
							})
						});
						describe('site admin round test', function () {
							it('can create a round w/o l&s steps', function () {
								spectrum_sites_page.goToRounds(true);
								var element = [
									"name", "duration", "perform", "startingOn", "team", "within",
									"units", "time", "locAssetTab", "add", "create"];
								spectrum_sites_page.createNewRound(element, round1)
								                   .then(function () {
									                   spectrum_sites_page.newRoundPresent(round1["name"]);
								                   });
							});
						});
						describe('people tests', function () {
							beforeAll(function () {
								goToPeople();
							});
							describe('users ', function () {
								var addUser, elements, values, details;
								beforeAll(function () {
									addUser = userInformation.addUserData("Member", [newTeamName]);
									elements = ["fName", "lName", "modalPhone", "role", "team"];
									values = [
										addUser["userFName"], addUser["userLName"],
										addUser["userPhone"], "Member", addUser["teams"][0]];
									details = ["userFName", "userLName", "role", "userPhone"];
									spectrum_people_page.peopleToggle();
								});
								describe('new user modal tests', function () {
									it('cannot invite site or account admins', function () {
										spectrum_people_page.clickToInviteUser().then(function () {
											spectrum_people_page.invitePersonRoleMenuValidation(0, [
												"Site Admin", "Account Admin"], false)
										})
									});
									/**
									 * TODO need this addressed at some point
									 */
									xit('cannot invite person onto teams not associated with'
									    + ' given site', function () {
										spectrum_people_page.clickToInviteUser().then(function () {
											spectrum_people_page.invitePersonTeamMenuValidation(0, [teamToTest], false)
										})
									});
									it('can only invite person as member,basic member or follower'
									   + ' role', function () {
										spectrum_people_page.clickToInviteUser();
										spectrum_people_page.invitePersonRoleMenuValidation(0, [
											"Member", "Follower", "Basic Member"], true)
									});
									/**
									 * TODO need this addressed at some point
									 */
									xit('can only invite person onto teams associated with given'
									    + ' site', function () {
										spectrum_people_page.clickToInviteUser().then(function () {
											spectrum_people_page.invitePersonTeamMenuValidation(0, [siteToTest], true)
										});
									});
									it('can create a pending user', function () {
										spectrum_people_page.clickToInviteUser();
										spectrum_people_page.inviteNewPerson(elements, values, "create", "", 0);
									});
									it('displays the correct details for the pending user', function () {
										spectrum_people_page.checkUserDetails(details, addUser);
									});
								});
								describe('edit existing user role tests', function () {
									it('cannot edit role of Account Admin', function () {
										spectrum_people_page.cannotEditRole(tu5, false);
									});
									it('can edit role of follwer', function () {
										spectrum_people_page.cannotEditRole(tu3, true);
									});
									it('can edit role of member', function () {
										spectrum_people_page.cannotEditRole(tu4, true);
									});
									it('Member & Follower available for Follower', function () {
										spectrum_people_page.validateUserDetailRoles(tu3, [
											"Member", "Follower", "Basic Member"], true)
									});
									it('Account Admin & Site Admin unavailable for Follower', function () {
										spectrum_people_page.validateUserDetailRoles(tu3, [
											"Account Admin", "Site Admin"], false)
									});
									it('Member & Follower available for Member', function () {
										spectrum_people_page.validateUserDetailRoles(tu4, [
											"Member", "Follower", "Basic Member"], true)
									});
									it('Account Admin & Site Admin unavailable for Member', function () {
										spectrum_people_page.validateUserDetailRoles(tu4, [
											"Account Admin", "Site Admin"], false)
									});
								});

							});
							describe('teams', function () {
								beforeAll(function () {
									spectrum_people_page.teamsToggle();
								});
								/**
								 * TODO decide what to do w/these
								 */
								xit('only displays sites available to site admin on create team'
								    + ' modal', function () {
									spectrum_people_page.checkCreateTeamSites([newSiteName], true);
								});
								xit('does not display sites unavailale to site admin', function () {
									spectrum_people_page.checkCreateTeamSites([
										                                          "site 3",
										                                          "site 4"], false)
								})
								it('can create new team', function () {
									var element = ["teamName", "description", "create"];
									spectrum_people_page.createNewTeam(element, newTeam2);
								});
								it('verifies newly created team details', function () {
									spectrum_people_page.checkTeamDetails(newTeam2);
								});
								/**
								 * TODO write team site validation tests
								 */
							})
						});
						describe('tasks tests', function () {
							beforeAll(function () {
								spectrum_top_sideBar.goToWork();
								addTaskTest = taskInformation.addTaskData(newSiteName);
								addTaskTest1 = taskInformation.addTaskData(newSiteName);
							})
							it('can add a task from work page', function () {
								spectrum_tasks_page.addTask(["addTaskSummary"], addTaskTest);
							});
							it('can verify the details of the task added by site admin via quick'
							   + ' add', function () {
								logOutInAs(users[3].email, users[3].password);
								goToWork();
								spectrum_tasks_page.areAllTasksDisplayed().then(function () {
									spectrum_tasks_page.checkTaskDetails(["addTaskSummary"], addTaskTest);
								});
							});
							it('can add task via quick add modal', function () {
								spectrum_top_sideBar.addTaskModal();
								spectrum_tasks_page.addTaskFromModal(["addTaskSummary"], addTaskTest1, 'delay');
							});
							it('can verify the details of the task added by site admin via task'
							   + ' add modal', function () {
								logOutInAs(users[3].email, users[3].password);
								goToWork();
								spectrum_tasks_page.areAllTasksDisplayed().then(function () {
									spectrum_tasks_page.checkTaskDetails(["addTaskSummary"], addTaskTest1);
								});
							});
						})
					}

				});
				/**
				 * TODO add other role tests
				 */
				// describe('member tests',function () {
				//     var addTaskTest,addTaskTest1;
				//     beforeAll(function () {
				//         addTaskTest = taskInformation.addTaskData(siteToTest);
				//         addTaskTest.addTaskSite = newSiteName;
				//         addTaskTest.addTaskAssignee = newTeamName;
				//         addTaskTest.addTasklocation = locToTest1;
				//
				//         addTaskTest1 = taskInformation.addTaskData(siteToTest);
				//         addTaskTest1.addTaskSite = newSiteName;
				//         addTaskTest1.addTaskAssignee = newTeamName;
				//         addTaskTest1.addTasklocation = locToTest1;
				//
				//         logOutInAs(users[1].email,users[1].password);
				//         spectrum_top_sideBar.goToSites();
				//         spectrum_sites_page.checkSiteInList(newSiteName);
				//     });
				//     it('does not display create procedure button for asset type',function () {
				//         spectrum_sites_page.goToStrategies();
				//         spectrum_sites_page.navToAssetProcedures("Chiller",false)
				//     });
				//     it('does not display create procedure button for loc type',function () {
				//         spectrum_sites_page.goToStrategies();
				//         spectrum_sites_page.navToLocProcedures("Building",false)
				//     });
				//     it('does not display new round button',function () {
				//         spectrum_sites_page.goToRounds(false);
				//     });
				//     it('does not display new location button',function () {
				//         spectrum_sites_page.goToSitesLocations(false);
				//     });
				//     it('does not display new asset button',function () {
				//         spectrum_sites_page.goToSitesAssets(false);
				//     });
				//     it('does not display the new asset type link',function () {
				//         spectrum_sites_page.goToSiteSettings();
				//         spectrum_sites_page.newATypeNotPresent();
				//     });
				//     it('does not display the new loc type link',function () {
				//         spectrum_sites_page.goToSiteSettings();
				//         spectrum_sites_page.newLTypeNotPresent();
				//     });
				//     it('does not display new team or person link',function () {
				//         spectrum_top_sideBar.goToPeople(false);
				//     });
				//     it('can add a task from work page',function () {
				//         spectrum_top_sideBar.goToWork();
				//         spectrum_tasks_page.addTask(taskEntry, addTaskTest);
				//     });
				//     it('can add task via quick add modal',function () {
				//         spectrum_top_sideBar.addTaskModal();
				//         spectrum_tasks_page.addTaskFromModal(taskEntry, addTaskTest1);
				//     })
				// });
			});
		};
		function dashboardTests() {
			describe('dashbaord tests', function () {
				var taskEntry, addTaskTest, teamTaskTest, openTaskCount, completedTaskCount,
				    completeTaskTest, newTeam, newTeamName, newTeamDescripton, newLabel,
				    teamTaskCount, teamCompleTaskCount, tu5, tt003;
				beforeAll(function () {
					if (isLoggedin != true) {
						logIn("email");
					}
					;
					spectrum_top_sideBar.goToDashBaord();
					openTaskCount = 0;
					completedTaskCount = 0;
					teamTaskCount = 0;
					teamCompleTaskCount = 0;
				});
				describe('basic dashbaord tests', function () {
					it('can navigate to the maintenance dashboard', function () {
						spectrum_dashboard.navigateToMaintenanceDashboard();
					});
					it('can navigate to the energy dashboard', function () {
						spectrum_dashboard.navigateToEnergyDashboard();
					});
					it('can navigate to the people dashboard', function () {
						spectrum_dashboard.navigateToPeopleDashboard();
					});
					it('displays the correct initial open task count value', function () {
						browser.refresh();
						spectrum_dashboard.checkOpenTaskCount(openTaskCount.toString());
					});
					it('displays the correct initial completed task count value', function () {
						browser.refresh();
						spectrum_dashboard.checkCompletedTaskCount(completedTaskCount.toString());
					});
					it('can select an initial site from the site pulldown menu', function () {
						spectrum_dashboard.chooseFirstSite(siteToTest);
					});
				});
				if (testType == "regression") {
					describe('people dashboard tests', function () {
						beforeAll(function () {
							taskEntry = ["addTaskSummary", "addTaskSite", "addTaskAssignee"];
						})
						describe('simple task count tests', function () {
							beforeAll(function () {
								addTaskTest = taskInformation.addTaskData(siteToTest);
								addTaskTest.addTaskAssignee = users[7].userName;
								completeTaskTest
									= taskInformation.editTaskValues([""], "Complete", addTaskTest);
								spectrum_top_sideBar.goToWork();
								spectrum_tasks_page.addTask(taskEntry, addTaskTest);
								openTaskCount++;
								spectrum_top_sideBar.goToDashBaord();
								spectrum_dashboard.navigateToPeopleDashboard();
								browser.refresh();
							});
							it('displays updated open task count after new task created', function () {
								spectrum_dashboard.checkOpenTaskCount(openTaskCount.toString());
							});
							it('does not update the complete task count when task has not been'
							   + ' completed', function () {
								browser.refresh();
								spectrum_dashboard.checkCompletedTaskCount(completedTaskCount.toString());
							});
							it('displays the correct open task count in the site row', function () {
								spectrum_dashboard.siteRowOpenTaskCount(siteToTest, openTaskCount.toString());
							});
							it('displays the correct completed task count in the site row after'
							   + ' a task was added', function () {
								spectrum_dashboard.siteRowCompleteTaskCount(siteToTest, completedTaskCount.toString());
							});
							it('displays updated complete tasks count when task completed', function () {
								spectrum_top_sideBar.goToWork();
								spectrum_tasks_page.useSearchFilter(addTaskTest["addTaskSummary"])
								                   .then(function () {
									                   spectrum_tasks_page.changeTaskStatus(completeTaskTest);
								                   }).then(function () {
									completedTaskCount++;
									spectrum_top_sideBar.goToDashBaord();
									spectrum_dashboard.navigateToPeopleDashboard();
									browser.refresh();
									spectrum_dashboard.checkCompletedTaskCount(completedTaskCount.toString());
								});
							});
							it('displays corect open task count when task completed', function () {
								spectrum_dashboard.checkOpenTaskCount(openTaskCount.toString());
							});
							it('displays the correct open task count in the site row after a'
							   + ' task was completed', function () {
								spectrum_dashboard.siteRowOpenTaskCount(siteToTest, openTaskCount.toString());
							});
							it('displays the correct completed task count in the site row after'
							   + ' a task was completed', function () {
								spectrum_dashboard.siteRowCompleteTaskCount(siteToTest, completedTaskCount.toString());
							});
						});
						describe('display date range tests', function () {
							it('can choose to display data from this week', function () {
								spectrum_dashboard.chooseThisWeek();
							});
							it('displays corect open task count when this week option chosen', function () {
								spectrum_dashboard.checkOpenTaskCount(openTaskCount.toString());
							});
							it('displays corect complete task count when this week option chosen', function () {
								spectrum_dashboard.checkCompletedTaskCount(completedTaskCount.toString());
							});
							it('displays the correct open task count in the site row after this'
							   + ' week filter chosen', function () {
								spectrum_dashboard.siteRowOpenTaskCount(siteToTest, openTaskCount.toString());
							});
							it('displays the correct completed task count in the site row after'
							   + ' this week filter chosen', function () {
								spectrum_dashboard.siteRowCompleteTaskCount(siteToTest, completedTaskCount.toString());
							});
							it('can choose to display data from last week', function () {
								spectrum_dashboard.chooseLastWeek();
							});
							it('displays the correct open task count when last week option chosen', function () {
								spectrum_dashboard.checkOpenTaskCount("0");
							});
							it('displays the correct complete task count when last week option chosen', function () {
								spectrum_dashboard.checkCompletedTaskCount("0");
							});
							it('displays the correct open task count in the site row after last'
							   + ' week filter chosen', function () {
								spectrum_dashboard.siteRowOpenTaskCount(siteToTest, "0");
							});
							it('displays the correct completed task count in the site row after'
							   + ' last week filter chosen', function () {
								spectrum_dashboard.siteRowCompleteTaskCount(siteToTest, "0");
							});
							it('can choose to display data from this month', function () {
								spectrum_dashboard.chooseThisMonth();
							});
							it('displays the correct open task count when this month option chosen', function () {
								spectrum_dashboard.checkOpenTaskCount(openTaskCount.toString());
							});
							it('displays corect complete task count when this month option chosen', function () {
								spectrum_dashboard.checkCompletedTaskCount(completedTaskCount.toString());
							});
							it('displays the correct open task count in the site row after this'
							   + ' month filter chosen', function () {
								spectrum_dashboard.siteRowOpenTaskCount(siteToTest, openTaskCount.toString());
							});
							it('displays the correct completed task count in the site row after'
							   + ' this month filter chosen', function () {
								spectrum_dashboard.siteRowCompleteTaskCount(siteToTest, completedTaskCount.toString());
							});
							it('can choose to display data from last month', function () {
								spectrum_dashboard.chooseLastMonth();
							});
							it('displays the correct open task count when last month options chosen', function () {
								spectrum_dashboard.checkOpenTaskCount("0");
							});
							it('displays the correct complete task count when last month option chosen', function () {
								spectrum_dashboard.checkCompletedTaskCount("0");
							});
							it('displays the correct open task count in the site row after last'
							   + ' month filter chosen', function () {
								spectrum_dashboard.siteRowOpenTaskCount(siteToTest, "0");
							});
							it('displays the correct completed task count in the site row after'
							   + ' last month filter chosen', function () {
								spectrum_dashboard.siteRowCompleteTaskCount(siteToTest, "0");
							});
							it('can choose to display data from this year', function () {
								spectrum_dashboard.chooseThisYear();
							});
							it('displays the correct open task count when this year option chosen', function () {
								spectrum_dashboard.checkOpenTaskCount(openTaskCount.toString());
							});
							it('displays corect complete task count when this year option chosen', function () {
								spectrum_dashboard.checkCompletedTaskCount(completedTaskCount.toString());
							});
							it('displays the correct open task count in the site row after this'
							   + ' year filter chosen', function () {
								spectrum_dashboard.siteRowOpenTaskCount(siteToTest, openTaskCount.toString());
							});
							it('displays the correct completed task count in the site row after'
							   + ' year week filter chosen', function () {
								spectrum_dashboard.siteRowCompleteTaskCount(siteToTest, completedTaskCount.toString());
							});
						});
						describe('display team & label option tests', function () {
							beforeAll(function () {
								taskEntry = [
									"labelEntry", "addTaskSummary", "addTaskSite",
									"addTaskAssignee"];
								newLabel = phraseGen.randomLabel() + getRandomIntInclusive(1, 10);
								newTeamName = "Team " + phraseGen.randomName();
								newTeamDescripton = newTeamName + " is the best team"
								newTeam
									= teamInformation.newTeam(newTeamName, newTeamDescripton, 0, 1, [
									userToTest1, userToTest2], [siteToTest]);
								tu5 = userInformation.tu005(newTeamName, siteToTest);
								tt003 = new Object();
								tt003.teamName = teamToTest;
								tt003.description = "does the work assigned to " + teamToTest;
								tt003.members = [
									userToTest1, userToTest2, "Test User5", "Test User6",
									"Test" + " User7"];
								tt003.enabled = "Team Enabled";
								tt003.sites = ["site 3"];
								teamTaskTest = taskInformation.addTaskData(siteToTest);
								teamTaskTest.addTaskAssignee = tu5["username"];
								teamTaskTest.labelEntry = [newLabel];
								completeTaskTest
									= taskInformation.editTaskValues([""], "Complete", teamTaskTest);
								goToPeople();
								spectrum_people_page.createNewTeam([
									                                   "teamName", "description",
									                                   "site", "create"], newTeam);
								spectrum_people_page.teamsToggle();
								spectrum_people_page.removeTeamMember(tt003, 2)
								spectrum_people_page.addUserToATeam(tu5, 0, "");
								goToSites(siteToTest);
								spectrum_sites_page.goToSiteSettings();
								spectrum_sites_page.createNewLabel(newLabel, "create");
								spectrum_top_sideBar.goToWork();
								spectrum_tasks_page.clearAllFilterSelection();
								spectrum_tasks_page.addTask(taskEntry, teamTaskTest);
								openTaskCount++;
								teamTaskCount++;
								spectrum_top_sideBar.goToDashBaord();
								spectrum_dashboard.navigateToPeopleDashboard();
								spectrum_top_sideBar.goToDashBaord();
								spectrum_dashboard.navigateToPeopleDashboard();
								browser.refresh();
							});
							it('displays the correct open task count after task added to team on'
							   + ' site', function () {
								browser.refresh();
								spectrum_dashboard.checkOpenTaskCount(openTaskCount.toString());
							});
							it('displays the correct completed task count after task added to'
							   + ' team on site', function () {
								browser.refresh();
								spectrum_dashboard.checkCompletedTaskCount(completedTaskCount.toString());
							});
							it('displays the correct open task count in the site row after task added to'
							   + ' team on site', function () {
								spectrum_dashboard.siteRowOpenTaskCount(siteToTest, openTaskCount.toString());
							});
							it('displays the correct completed task count in the site row after task added to'
							   + ' team on site', function () {
								spectrum_dashboard.siteRowCompleteTaskCount(siteToTest, completedTaskCount.toString());
							});
							it('can select newly created team in the team filter menu', function () {
								spectrum_dashboard.useTeamFilter(newTeam["teamName"]);
							});
							it('displays the correct open task count after team filter chosen', function () {
								browser.refresh();
								spectrum_dashboard.checkOpenTaskCount(teamTaskCount.toString());
							});
							it('displays the correct completed task count after team filter'
							   + ' chosen', function () {
								browser.refresh();
								spectrum_dashboard.checkCompletedTaskCount(teamCompleTaskCount.toString());
							});
							it('displays the correct open task count in the site row after team'
							   + ' filter chosen', function () {
								spectrum_dashboard.siteRowOpenTaskCount(siteToTest, teamTaskCount.toString());
							});
							it('displays the correct completed task count in the site row after'
							   + ' team filter chosen', function () {
								spectrum_dashboard.siteRowCompleteTaskCount(siteToTest, teamCompleTaskCount.toString());
							});
							it('displays the correct open task count in the team row after the'
							   + ' team filter is chosen', function () {
								spectrum_dashboard.teamRowOpenTaskCount(newTeamName, teamTaskCount.toString());
							});
							it('displays the correct completed tasks count in the team row after'
							   + ' the team filter is chosen', function () {
								spectrum_dashboard.teamRowCompleteTaskCount(newTeamName, teamCompleTaskCount.toString());
							});
							it('can select newly created label in the label filter menu', function () {
								spectrum_dashboard.useLabelFilter(newLabel);
							});
							it('displays the correct open task count after label filter chosen', function () {
								browser.refresh();
								spectrum_dashboard.checkOpenTaskCount(teamTaskCount.toString());
							});
							it('displays the correct completed task count after label filter'
							   + ' chosen', function () {
								browser.refresh();
								spectrum_dashboard.checkCompletedTaskCount(teamCompleTaskCount.toString());
							});
							it('displays the correct open task count in the site row after label'
							   + ' filter chosen', function () {
								spectrum_dashboard.siteRowOpenTaskCount(siteToTest, teamTaskCount.toString());
							});
							it('displays the correct completed task count in the site row after'
							   + ' label filter chosen', function () {
								spectrum_dashboard.siteRowCompleteTaskCount(siteToTest, teamCompleTaskCount.toString());
							});
							it('displays the correct open task count in the team row after the'
							   + ' label filter is chosen', function () {
								spectrum_dashboard.teamRowOpenTaskCount(newTeamName, teamTaskCount.toString());
							});
							it('displays the correct completed tasks count in the team row after'
							   + ' the label filter is chosen', function () {
								spectrum_dashboard.teamRowCompleteTaskCount(newTeamName, teamCompleTaskCount.toString());
							});
							it('displays updated complete tasks count when team task completed', function () {
								spectrum_top_sideBar.goToWork();
								spectrum_tasks_page.clearAllFilterSelection();
								spectrum_tasks_page.useSearchFilter(teamTaskTest["addTaskSummary"])
								                   .then(function () {
									                   spectrum_tasks_page.changeTaskStatus(completeTaskTest);
								                   }).then(function () {
									completedTaskCount++;
									teamCompleTaskCount++;
									spectrum_top_sideBar.goToDashBaord();
									spectrum_dashboard.navigateToPeopleDashboard();
									browser.refresh();
									spectrum_dashboard.checkCompletedTaskCount(teamCompleTaskCount.toString());
								});
							});
							it('displays the correct open task count after team task completed', function () {
								spectrum_dashboard.checkOpenTaskCount(teamTaskCount.toString());
							});

							it('displays the correct open task count in the site row after team'
							   + ' task completed', function () {
								spectrum_dashboard.siteRowOpenTaskCount(siteToTest, teamTaskCount.toString());
							});
							it('displays the correct completed task count in the site row after'
							   + ' team task completed', function () {
								spectrum_dashboard.siteRowCompleteTaskCount(siteToTest, teamCompleTaskCount.toString());
							});
							it('displays the correct open task count in the team row after team'
							   + ' task completed', function () {
								spectrum_dashboard.teamRowOpenTaskCount(newTeamName, teamTaskCount.toString());
							});
							it('displays the correct completed tasks count in the team row after'
							   + ' team task completed', function () {
								spectrum_dashboard.teamRowCompleteTaskCount(newTeamName, teamCompleTaskCount.toString());
							});
						});
					});
				}
				;
			});
		};
		function guestServices() {
			describe('guest services tests', function () {
				var tu7, guestRequestTask, tenantRequestTask, grTaskEntry, trTaskEntry,
				    gsTaskDetails, blockGSTask, blockTSTask, guestRequestTask2, tenantRequestTask2;
				beforeAll(function () {
					grTaskEntry = [
						"addTaskSummary", "addTaskSite", "guestRequest", "requesterInput"];
					trTaskEntry = [
						"addTaskSummary", "addTaskSite", "tenantRequest", "requesterInput"];
					gsTaskDetails = [
						"addTaskSummary", "addTaskSite", "guestRequest", "requesterInput",
						"labelEntry", "deadline"];
					guestRequestTask = taskInformation.addTaskData(siteToTest);
					guestRequestTask.labelEntry = ["Guest Request"];
					guestRequestTask.deadline = "Guest Request due in"
					guestRequestTask2 = taskInformation.addTaskData(siteToTest);
					guestRequestTask2.labelEntry = ["Guest Request"];
					guestRequestTask2.deadline = "Guest Request due in"
					tenantRequestTask = taskInformation.addTaskData(siteToTest);
					tenantRequestTask.labelEntry = ["Tenant Request"];
					tenantRequestTask.deadline = "Tenant Request due in"
					tenantRequestTask2 = taskInformation.addTaskData(siteToTest);
					tenantRequestTask2.labelEntry = ["Tenant Request"];
					tenantRequestTask2.deadline = "Tenant Request due in"
					blockGSTask = taskInformation.editTaskValues([""], "blocked", guestRequestTask);
					blockTSTask
						= taskInformation.editTaskValues([""], "blocked", tenantRequestTask);
					if (isLoggedin != true) {
						logIn("email");
					}
					tu7 = userInformation.tu007();
				});
				describe('dispatcher set up', function () {
					beforeEach(function () {
						logOutIn();
						goToPeople();
						spectrum_people_page.peopleToggle();
					});
					it('can edit a user to be a dispatcher', function () {
						spectrum_people_page.editUser(["dispatcher"], tu7, tu7);
					});
					it('displays the user as dispatcher in user details', function () {
						spectrum_people_page.checkUserDetails(["dispatcher"], tu7);
					});
				});
				describe('guest request tests', function () {
					beforeAll(function () {
						goToSites(siteToTest);
						spectrum_sites_page.goToSiteSettings();
					});
					it('can edit the guest request deadline', function () {
						spectrum_sites_page.setGuestRequestDeadline("45", "Minute(s)");
					});
					it('allows a dispatcher to create a guest request task', function () {
						logOutInAs(users[4].email, users[4].password);
						spectrum_top_sideBar.goToWork();
						spectrum_tasks_page.addTask(grTaskEntry, guestRequestTask);
					});
					it('displays the guest request task with the correct details', function () {
						checkTaskDetails(guestRequestTask, gsTaskDetails);
					});
					it('can create a guest task usting the add task modal', function () {
						logOutInAs(users[4].email, users[4].password);
						spectrum_top_sideBar.addTaskModal();
						spectrum_tasks_page.addTaskFromModal(grTaskEntry, guestRequestTask2)
					});
					it('displays the guest request task created from modal with the correct'
					   + ' details', function () {
						checkTaskDetails(guestRequestTask2, gsTaskDetails);
					});
					it('can block a guest request task', function () {
						spectrum_tasks_page.blockTask(guestRequestTask, "Block Request Task");
					});
					it('displays blocked guest task in open queue', function () {
						checkTaskDetails(blockGSTask, grTaskEntry);
					});
					it('displays the correct reason for blocking the guest task', function () {
						spectrum_tasks_page.checkTaskDetailsBlocked(blockGSTask);
					});
					it('displays the correct bock guest task date and time', function () {
						spectrum_tasks_page.checkGSBlockedDateTime(blockGSTask);
					});
				});
				describe('tenant request tests', function () {
					beforeAll(function () {
						goToSites(siteToTest);
						spectrum_sites_page.goToSiteSettings();
					});
					it('can edit the tenant request deadline', function () {
						spectrum_sites_page.setTenantRequestDeadline("45", "Minute(s)");
					});
					it('allows a dispatcher to create a tenant request task', function () {
						logOutInAs(users[4].email, users[4].password);
						spectrum_top_sideBar.goToWork();
						spectrum_tasks_page.addTask(trTaskEntry, tenantRequestTask);
					});
					it('displays the tenant request ticket with the correct details', function () {
						checkTaskDetails(tenantRequestTask, gsTaskDetails);
					});
					it('can create a guest task usting the add task modal', function () {
						logOutInAs(users[4].email, users[4].password);
						spectrum_top_sideBar.addTaskModal();
						spectrum_tasks_page.addTaskFromModal(trTaskEntry, tenantRequestTask2)
					});
					it('displays the guest request task created from modal with the correct'
					   + ' details', function () {
						checkTaskDetails(tenantRequestTask2, gsTaskDetails);
					});
					it('can block a tenant request task', function () {
						spectrum_tasks_page.blockTask(tenantRequestTask, "Block Request Task");
					});
					it('displays blocked tenant task in open queue', function () {
						checkTaskDetails(blockTSTask, trTaskEntry);
					});
					it('displays the correct reason for blocking the tenant task', function () {
						spectrum_tasks_page.checkTaskDetailsBlocked(blockTSTask);
					});
					it('displays the correct bock tenant task date and time', function () {
						spectrum_tasks_page.checkGSBlockedDateTime(blockTSTask);
					});
				});
			});
		};
		for (var count = 0; count < 1; count++) {
			if (multiTest === 'no') {
				if (testSection === "basic") {
					basicTests();
				} else if (testSection === "basic2") {
					basicTests2();
				} else if (testSection === "dashboard") {
					dashboardTests();
				} else if (testSection === "people") {
					peopleTests();
				} else if (testSection === "sites") {
					sitesTests();
				} else if (testSection === "sites2") {
					sitesTests2();
				} else if (testSection === "sites3") {
					sitesTests3();
				} else if (testSection === 'misc') {
					miscTests();
				} else if (testSection === 'role') {
					roleAndPermissionsTests();
				} else if (testSection === 'tasks') {
					tasksTests();
				} else if (testSection === 'tasks2') {
					tasksTests2();
				} else if (testSection === 'tasks3') {
					tasksTests3();
				} else if (testSection === 'tasks4') {
					tasksTests4();
				} else if (testSection === 'tasks5') {
					tasksTests5();
				} else if (testSection === 'tasks6') {
					tasksTests6();
				} else if (testSection === 'guest_services') {
					guestServices();
				} else if (testSection === "all") {
					tasksTests();
					peopleTests();
					sitesTests();
					miscTests();
					roleAndPermissionsTests();
				}
				;
			}
			;
			// console.log("url tested = "+localTasking);
			// console.log("test type = "+testType);
			// console.log("section to test = "+testSection);
		}
	});
});