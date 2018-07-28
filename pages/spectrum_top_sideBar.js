var spectrum_top_sideBar = function() {
};
var spectrum_tasks_page = require('./spectrum_tasks_page.js').spectrum_tasks_page;
var basePage = require('./page.js').page;

var locatorMap = new Map();
/**
 * locators: avatar
 */
locatorMap.set("avatarParent", by.xpath("//li[@class='appheader-userinfo-avatar']"));
locatorMap.set("avatarMain", by.xpath("./descendant::*[contains(@class,'avatar')][1]"));
locatorMap.set("loginName", by.xpath(".//div[@class='avatar']"));
locatorMap.set("loggedInCheck", by.xpath(".//div[contains(@class,'is-checkedin')]"));
locatorMap.set("dropDownMain", by
		.xpath("/descendant::ul[contains(@class,'dropmenugroup-menu')][contains(@class,'mod-account')][1]"));
locatorMap.set("checkIn", by.xpath(".//div[.='Check In']"));
locatorMap.set("checkOut", by.xpath(".//div[.='Check Out']"));

/**
 * locators:  side bar
 */
locatorMap.set("sideBarParent", by.xpath("//nav[contains(@class,'sidenav')]"));
locatorMap.set("sideBarParentExpanded", by.xpath("//nav[contains(@class,'sidenav')][contains(@class,'is-open')]"));
locatorMap.set("tasksParent", by.xpath(".//span[contains(text(), 'Work')]"));
locatorMap.set("usersParent", by.xpath(".//span[contains(text(), 'People')]"));
locatorMap.set("sitesParent", by.xpath(".//span[contains(text(), 'Sites')]"));
locatorMap.set("navbar-item", by.xpath(".//div[@class='navbar-item']"));
locatorMap.set("expandSideBar", by.xpath(".//i[contains(@class,'chevron-right')]"));

/**
 * locators: client bar
 */
locatorMap.set("clientBarMain", by.xpath("/descendant::div[contains(@class,'adminband')][contains(@class,'clearfix')][1]"));
locatorMap.set("selectClientButton", by.xpath("./descendant::span[contains(@class,'adminbandselect-trigger-text')][1]"));
locatorMap.set("newClient", by.xpath(".//span[.='New Client']"));
locatorMap.set("invitePerson", by.xpath(".//span[.='Invite Person']"));

/**
 * locators: select client
 */
locatorMap.set("selectClientMain", by
		.xpath("./descendant::div[contains(@class,'adminbandselect-menu')][contains(@class,'is-open')][1]"));

/**
 * locators: client modal
 */
locatorMap.set("newClientModal", by.xpath("//div[@class='scimodal-content'][div[contains(text(), 'New Client')]]"));
locatorMap.set("clientNameParent", by
		.xpath(".//div[@class='formcol-12'][label[contains(text(), 'Client Name')]]"));
locatorMap.set("siteNameParent", by.xpath(".//div[@class='formcol-12'][label[contains(text(), 'Site Name')]]"));
locatorMap.set("newClientTextInput1", by.xpath("./descendant::input[@type='text'][1]"));
locatorMap.set("newClientModalCancel", by.xpath(".//button[contains(text(), 'Cancel')]"));
locatorMap.set("newClientModalCreateSite", by.xpath(".//button[contains(text(), 'Create Client')]"));
locatorMap.set("closeToast", by.xpath("//div[@class='sysmsg-content-close']"));

/**
 * locators: invite person modal
 */
locatorMap.set("invitePersonModal", by
		.xpath("//div[@class='modal-content'][div[div[contains(text(), 'Invite New Person')]]]"));
locatorMap.set("firstNameParent", by
		.xpath(".//div[contains(@class,'addform-formgroup')][label[span[contains(text(), 'Firstname')]]]"));
locatorMap.set("lastNameParent", by
		.xpath(".//div[contains(@class,'addform-formgroup')][label[contains(text(), 'Lastname')]]"));
locatorMap.set("emailPhoneParent", by.xpath(".//div[contains(@class,'col-sm-6')][contains(@class,'addform-formgroup')]"));
locatorMap.set("emailPhoneToggleParent", by.xpath(".//ul[@class='contact-togglegroup']"));
locatorMap.set("invitePersonTextInput1", by.xpath("./descendant::input[@type='text'][1]"));
locatorMap.set("invitePersonTeam", by.xpath(".//div[contains(text(), 'Select one or more teams')]"));
locatorMap.set("invitePersonCancel", by.xpath(".//button[contains(text(), 'Cancel')]"));
locatorMap.set("invitePersonSubmit", by.xpath(".//button[contains(text(), 'Invite')]"));

var flow = protractor.promise.controlFlow();
function waitOne() {
	return protractor.promise.delayed(4000);
}

function sleep() {
	flow.execute(waitOne);
};

var wait = 30000;

/**
 * elements: avatar
 */

var avatarElement = function() {
	return element(by.xpath("/descendant::*[@id='NavBarAvatar']" +
        "[.//span[@class='useravatar-text']][1]"));
};

var avatarCheckedIn = function() {
	return element(locatorMap.get("avatarParent")).element(locatorMap.get("loggedInCheck"));
};

var userMenuMain = function(){
	return element(by.xpath("//ul[@class='usernav'][li[@class='usernav-item']]"))
}

var menuElement = function(value) {
	return userMenuMain().element(by.xpath(".//span[contains(text(),'"+value+"')]"))
};

var checkInOutElement = function(locator) {
	return element(locatorMap.get("dropDownMain")).element(locatorMap.get(locator));
};

var notificationSideNav = function () {
    return element(by.xpath("//li[@class='sidenav-list-item']" +
        "[.//*[.='Notifications']]"))
};

var notificatoinMenuMain = function () {
    return element(by.xpath("//div[contains(@class,'notificationsmenu')]" +
        "[contains(@class,'panel')][div[contains(@class,'notificationsmenu-panelheader')]" +
        "[*[.='Notifications']]]"))
};

var notificationMenuActions = function (value) {
    return notificatoinMenuMain().element(by.xpath(".//div[@class='notificationsmenu-actions']"))
        .element(by.xpath(".//a[contains(@class,'"+value+"')]"))
};

var notificationItemMain = function (value) {
    return notificatoinMenuMain().element(by.xpath(".//div[@class = 'notificationitem']" +
        "[.//*[contains(text(),'"+value+"')]]"))
};

var notificationCheckRead = function (value) {
    return notificationItemMain(value).element(by.xpath(".//button[*[contains(@class,'check')]]"))
};

/**
 * elements: edit profile modal
 */
var editProfileMain = function () {
    return element(by.xpath("./descendant::div[contains(@class,'scimodal-content')][.//div[.='Edit" +
        " Profile']][1]"));
};

var editProfileFLName = function (value) {
    return editProfileMain().element(by.xpath(".//span[@id='"+value+"']"));
};

var validateProfFLName = function (value) {
    return editProfileMain().element(by.xpath(".//span[contains(text(),'"+value+"')]"));
}

var editProfileFields = function (value) {
    return editProfileMain().element(by.xpath(".//input[@name='"+value+"']"));
};

var validateProfileFields = function (value) {
    return editProfileMain().element(by.xpath(".//input[contains(@value,'"+value+"')]"));
};

var pWordFields = function (value) {
    return editProfileMain().element(by.xpath(".//input[@label='"+value+"']"))
};

var editProfileButton = function (value) {
    return editProfileMain().element(by.xpath(".//button[.='"+value+"']"));
};

/**
 * elements: new task modal
 */
var newTaskModalMain = function(){
    return element(by.xpath("//div[contains(@class,'scimodal-content')]" +
        "[div[.='Add Task']]"))
};

/**
 * elements: notification settings
 */
var notSetMain = function () {
    return element(by.xpath("//div[@class='notifications page']" +
        "[.//div[@class='page-header'][.='Notifications Settings']]"))
};

var notModSwitch = function (value) {
    return notSetMain().element(by.xpath(".//span[contains(@class,'mod-switch')]" +
        "[.='"+value+"']"))
}

/**
 * elements: notificatoins pop up
 */
var popUpMain = function () {
    return element(by.xpath("//div[@class='notificationsframe'][.//div[contains(@class," +
        "'notificationitem')]]"))
};

var popUpDetail = function (value) {
    return popUpMain().element(by.xpath(".//*[contains(text(),'"+value+"')]"))
};

var popUpClose = function () {
    return popUpMain().element(by.xpath("./descendant::*[contains(@class,'close')][1]"))
};

var popUpRead = function () {
    return popUpMain().element(by.xpath("./descendant::*[contains(@class,'check')][1]"))
}

/**
 * elements: client bar
 */
var clientBarMain = function () {
    return element(by.xpath("//div[@class='adminband']"))
}

var selectClientButton = function() {
	return clientBarMain().element(by.xpath(".//span[.='Select a client']"));
};

var newClientButton = function() {
	return element(locatorMap.get("clientBarMain")).element(locatorMap.get("newClient"));
};

var invitePersonButton = function() {
	return element(locatorMap.get("clientBarMain")).element(locatorMap.get("invitePerson"));
};

/**
 * elements: select client
 */
var selectClientMain = function() {
	return clientBarMain().element(by.xpath("./descendant::div[contains(@class," +
        "'adminbandselect-menu')][1]"));
};

var clientInList = function(value) {
	return selectClientMain().element(by.xpath(".//span[contains(text(), '" + value + "')]"));
};

/**
 * elements: client modal
 */
var newClientModal = function() {
	return element(locatorMap.get("newClientModal"));
};

var modalClientName = function() {
	return element(locatorMap.get("newClientModal")).element(locatorMap.get("clientNameParent")).
    element(locatorMap.get("newClientTextInput1"));
};

var modalSiteName = function() {
	return element(locatorMap.get("newClientModal")).element(locatorMap.get("siteNameParent")).element(
			locatorMap.get("newClientTextInput1"));
};

var modalCancel = function() {
	return element(locatorMap.get("newClientModal")).element(locatorMap.get("newClientModalCancel"));
};

var modalSubmit = function() {
	return element(locatorMap.get("newClientModal")).element(locatorMap.get("newClientModalCreateSite"));
};

var closeToastMsg = function() {
	return element(locatorMap.get("closeToast"))
};

var modalRequiredMsg = function(value) {
	return element(locatorMap.get("newClientModal")).element(by.xpath(".//span[contains(text(), '" + value + "')]"));
};

/**
 * client modal elements map. used to facilitate dynamically filling out the new
 * client modal
 */
var modalElementMap = new Map();
modalElementMap.set("clientName", modalClientName());
modalElementMap.set("siteName", modalSiteName());

/**
 * elements: invite person modal
 */
var invitePersonModal = function() {
	return element(locatorMap.get("invitePersonModal"));
};

var invitePersonFName = function() {
	return invitePersonModal().element(locatorMap.get("firstNameParent")).element(locatorMap.get("invitePersonTextInput1"));
};

var invitePersonLName = function() {
	return invitePersonModal().element(locatorMap.get("lastNameParent")).element(locatorMap.get("invitePersonTextInput1"));
};

var invitePersonEmailPhoneToggle = function(value) {
	return invitePersonModal().element(locatorMap.get("emailPhoneToggleParent")).element(
			by.xpath(".//i[contains(@class, '" + value + "')]"));
};

var invitePersonEmailPhoneToggleSelected = function(value) {
	return invitePersonModal().element(locatorMap.get("emailPhoneToggleParent")).element(
			by.xpath(".//i[contains(@class, '" + value + "')][contains(@class,'inverse')]"));
};

var invitePersonEmailPhone = function() {
	return invitePersonModal().element(locatorMap.get("emailPhoneParent")).element(locatorMap.get("invitePersonTextInput1"));
};

var invitePersonTeam = function() {
	return invitePersonModal().element(locatorMap.get("invitePersonTeam"));
};

var invitePersonRole = function(option) {
	element(by.cssContainingText('option', option)).click();
};

var iPModalCancel = function() {
	return invitePersonModal().element(locatorMap.get("invitePersonCancel"));
};

var iPModalSubmit = function() {
	return invitePersonModal().element(locatorMap.get("invitePersonSubmit"));
};

var iPModalMap = new Map();
iPModalMap.set("fName", invitePersonFName());
iPModalMap.set("lName", invitePersonLName());
iPModalMap.set("emailPhone", invitePersonEmailPhone());

/**
 * elements: side bar
 */

var sideBarParent = function(){
	return element(by.xpath("//nav[contains(@class,'sidenav')]"))
};

var sideBarButton = function(choice) {
	return sideBarParent().element(by.xpath(".//span[contains(text(), '"+choice+"')]"));
};

var expandColapseSideBar = function() {
	return sideBarParent().element(by.xpath(".//i[contains(@class,'chevron-right')]"));
};

var sideBarExpanded = function() {
	return element(by.xpath("//nav[contains(@class,'sidenav')][contains(@class,'is-open')]"));
};

/**
 * actions: side bar
 */

var waitThenClick = function(element){
    return basePage.waitThenClick(element);
};

var clickClearThenSendKeys = function (element,value1,value2) {
    return basePage.clickClearThenSendKeys(element,value1,value2)
};

var clickThenSendKeys = function (element,value1,value2) {
    return basePage.clickThenSendKeys(element,value1,value2)
};

var closeModal = function (msg,element) {
    basePage.closeModal(msg,element)
};

var clickExpandColapseSideBar = function() {
    return basePage.waitThenClick(expandColapseSideBar(),"sidebar");
};

var isSideBarExpanded = function(value){
	return sideBarExpanded().isPresent().then(function (isVisible) {
		if (isVisible) {
		    basePage.waitThenClick(sideBarButton(value),value+" sidebar button");
		} else {
		    basePage.waitThenClick(expandColapseSideBar(),"sidebar").then(
		        function() {
                basePage.waitThenClick(sideBarButton(value),value+" sidebar button");
			})
		}
	});
};

var sideBarNav = function(value){
	return isSideBarExpanded(value).then(
		function(){
            if(value !=="Add Task"){
                clickExpandColapseSideBar();
            }
		})
}

/**
 * actions: user menu
 */

var userMenuAction = function(value) {
    return basePage.waitThenClick(avatarElement(),'avatar element').then(
	    function() {
            basePage.waitThenClick(menuElement(value),'menu element '+value);
	});
};

var updateUserProfile = function (element, value) {
    return browser.wait(protractor.ExpectedConditions.presenceOf(editProfileMain()),
        wait).then(
            function () {
                for (var count = 0; count < element.length; count++) {
                    (function(passedInCount) {
                    if(element[passedInCount]==="firstName"||element[passedInCount]==="lastName"){
                        basePage.clickAndClear(editProfileFLName(element[passedInCount])).then(
                            function () {
                                sleep();
                                basePage.typeEachCharacter(editProfileFLName(element[passedInCount]),
                             value[passedInCount])
                            })
                    }else if(element[passedInCount]==="Save"){
                        waitThenClick(editProfileButton("Save")).then(
                            function () {
                                closeModal("updated",editProfileButton("Cancel"));
                            })
                    } else{
                        basePage.clickClearThenSendKeys(editProfileFields(element[passedInCount]),
                            value[passedInCount], protractor.Key.ENTER,element[passedInCount]+" field")
                    }
                    })(count);
                }
            },function (err) {
            throw err;
        })
};

var changePassword = function (oldPWord,newPWord) {
    return browser.wait(protractor.ExpectedConditions.elementToBeClickable(editProfileMain()),
        wait).then(
            function () {
                waitThenClick(editProfileButton("Change Password")).then(
                    function () {
                        clickThenSendKeys(pWordFields("Current Password"),oldPWord,
                            protractor.Key.TAB).then(
                                function () {
                                    clickThenSendKeys(pWordFields("New Password"),newPWord,
                                        protractor.Key.TAB).then(
                                            function () {
                                                clickThenSendKeys(pWordFields(
                                                    "Re-enter New Password"),newPWord,
                                                    protractor.Key.TAB).then(
                                                        function () {
                                                            waitThenClick(editProfileButton(
                                                                "Change Password"
                                                            )).then(
                                                                function () {
                                                                    waitThenClick(editProfileButton(
                                                                        "Save"))
                                                                },function (err) {
                                                                    throw err;
                                                                })
                                                        },function (err) {
                                                        throw err;
                                                    })
                                            },function (err) {
                                            throw err;
                                        })
                                },function (err) {
                                throw err;
                            })
                    },function (err) {
                        throw err;
                    })
            },function (err) {
            throw err;
        })
}

var checkUserProfileDetails = function(value, obj) {
    return browser.wait(protractor.ExpectedConditions.elementToBeClickable(editProfileMain()),
        wait).then(
        function () {
            for (var count = 0; count < value.length; count++) {
                if(value[count] === "userFName"||value[count] === "userLName"){
                    expect(validateProfFLName(obj[value[count]]).isPresent()).toBe(true);
                }else{
                    expect(validateProfileFields(obj[value[count]]).isPresent()).toBe(true);
                }
            }
        },function (err) {
            throw err;
        }
    )
};

var checkInOut = function(locator, boolean) {
	avatarElement().click().then(function() {
		checkInOutElement(locator).isDisplayed().then(function() {
			checkInOutElement(locator).click().then(function() {
				expect(avatarCheckedIn().isPresent()).toBe(boolean);
			}, function(err) {
				throw err;
			})
		}, function(err) {
			throw err;
		})
	}, function(err) {
		throw err;
	})
};

/**
 * actions: notifications
 */
var updateNotificationSettings = function (value) {
    for(var count = 0; count < value.length; count++){
        waitThenClick(notModSwitch(value[count]))
    }
};

var closePopUpNotifiction = function (value) {
    return browser.wait(protractor.ExpectedConditions.elementToBeClickable(popUpDetail(value)),
        wait).then(
        function () {
            waitThenClick(popUpClose())
        },function (err) {
            throw err;
        })
};

var readNotificationInList = function (value) {
    return waitThenClick(notificationSideNav()).then(
        function () {
            waitThenClick(notificationCheckRead(value)).then(
                function () {
                    waitThenClick(notificationSideNav())
                },function (err) {
                    throw err;
                })
        },function (err) {
            throw err;
        })
};

/**
 * actions: select client
 */
var clickSelectAClient = function(value) {
    basePage.waitThenClick(selectClientButton(), "selecting a client").then(function() {
        basePage.waitThenClick(clientInList(value), "selecting a client")
    },function(err){
        throw err;
    })
};

var checkSelectAClient = function(value) {
	selectClientButton().click().then(function() {
		expect(clientInList(value).isPresent()).toBe(true);
		selectClientButton().click();
	}, function(err) {
		throw err;
	})
};

/**
 * actions: client modal
 */

var clickNewClient = function() {
    browser.wait(protractor.ExpectedConditions.presenceOf(newClientButton()), wait).then(function() {
        newClientButton().click().then(function() {
            expect(newClientModal().isPresent()).toBe(true);
        }, function(err) {
            throw err;
        })
    }, function(err) {
        throw err;
    });
};

var newClientModalField = function(element, value) {
	modalElementMap.get(element).isDisplayed().then(function() {
		modalElementMap.get(element).sendKeys(value);
	}, function(err) {
		throw err;
	})
};

var clickModalCancel = function() {
	modalCancel().click().then(function() {
		expect(newClientButton().isPresent()).toBe(true);
	}, function(err) {
		throw err;
	})
};

var closeSuccessMsg = function() {

    browser.wait(protractor.ExpectedConditions.presenceOf(closeToastMsg()), wait).then(function() {
        closeToastMsg().click();
    }, function(err) {
        throw err;
    });
};

var clickModalCreate = function(value) {
	modalSubmit().click().then(function() {
		if (value.length > 0) {
			expect(modalRequiredMsg(value).isPresent()).toBe(true);
			clickModalCancel();
		} else {
			closeSuccessMsg();
		}
	}, function(err) {
		throw err;
	})
};

/**
 * actions: invite person modal
 */

var clickInviteNewPerson = function() {
	invitePersonButton().click().then(function() {
		expect(invitePersonModal().isPresent()).toBe(true);
	}, function(err) {
		throw err;
	})
};

var emailPhoneToggle = function(choice1, choice2) {
	invitePersonEmailPhoneToggle(choice1).click();
	expect(invitePersonEmailPhoneToggleSelected(choice1).isPresent()).toBe(true);
	expect(invitePersonEmailPhoneToggleSelected(choice2).isPresent()).toBe(false);
};

var invitePersonModalField = function(element, value) {
	iPModalMap.get(element).isDisplayed().then(function() {
		iPModalMap.get(element).sendKeys(value);
	}, function(err) {
		throw err;
	})
};

var clickIPModalCancel = function() {
	iPModalCancel().click().then(function() {
		expect(invitePersonButton().isPresent()).toBe(true);
	}, function(err) {
		throw err;
	})
};

var clickIPModalCreate = function(value) {
	iPModalSubmit().click().then(function() {
		if (value.length > 0) {
			expect(modalRequiredMsg(value).isPresent()).toBe(true);
			clickModalCancel();
		} else {
			closeSuccessMsg();
		}
	}, function(err) {
		throw err;
	})
};

/**
 * services: avatar
 */
spectrum_top_sideBar.prototype.logOut = function() {
    return basePage.interstitialWait(basePage.interstitial()).then(
        function () {
            userMenuAction("Sign Out");
        },function (err) {
            throw err;
        })
};

spectrum_top_sideBar.prototype.updateUProfile = function (element,value) {
    return userMenuAction("Your Profile").then(
        function () {
            updateUserProfile(element,value)
        })
};

/**
 * services: notifications
 */
spectrum_top_sideBar.prototype.uMNotificationSettings = function (value) {
    return userMenuAction("Notification Settings").then(
        function () {
            updateNotificationSettings(value)
        },function (err) {
            throw err;
        })
};

spectrum_top_sideBar.prototype.closeDeskNotification = function (value) {
    return closePopUpNotifiction(value)
};

spectrum_top_sideBar.prototype.checkNotificationInList = function (value) {
    return readNotificationInList(value)
}

spectrum_top_sideBar.prototype.updatePWord = function (oldPWord,nPWord) {
    return userMenuAction("Your Profile").then(
        function () {
            changePassword(oldPWord,nPWord)
        },function (err) {
            throw err;
        })
}

spectrum_top_sideBar.prototype.validateUserProfile = function (value,obj) {
    return userMenuAction("Your Profile").then(
        function () {
            checkUserProfileDetails(value,obj).then(
                function () {
                 waitThenClick(editProfileButton("Cancel"))
                },function (err) {
                    throw err;
                })
        },function (err) {
            throw err;
        })
};

spectrum_top_sideBar.prototype.checkIn = function() {
	checkInOut("checkIn", true);
};

spectrum_top_sideBar.prototype.checkOut = function() {
	checkInOut("checkOut", false);
};

/**
 * services: client
 */
spectrum_top_sideBar.prototype.addNewClient = function(element, value, choice, msg) {
	clickNewClient();
	for (var count = 0; count < element.length; count++) {
		newClientModalField(element[count], value[count])
	}
	sleep();
	if (choice == "create") {
		clickModalCreate(msg);
	} else {
		clickModalCancel();
	}
};

spectrum_top_sideBar.prototype.selectClient = function(value) {
	clickSelectAClient(value);
};

spectrum_top_sideBar.prototype.isClientInList = function(value) {
	checkSelectAClient(value);
};

/**
 * services: invite new person
 */
spectrum_top_sideBar.prototype.inviteNewPerson = function(element, value, choice, msg) {
	clickInviteNewPerson();
	for (var count = 0; count < element.length; count++) {
		if (element[count] === "envelope" || element[count] === "phone") {
			emailPhoneToggle(value[count]);
		} else if (element[count] === "role") {
			invitePersonRole(value[count])
		} else if (element[count] === "team") {
			browser.actions().mouseMove(invitePersonTeam()).click().sendKeys(value[count], protractor.Key.ENTER).perform();
		} else {
			invitePersonModalField(element[count], value[count])
		}
	}
	sleep();
	if (choice == "create") {
		clickIPModalCreate(msg);
	} else {
		clickIPModalCancel();
	}
};

/**
 * services: side bar
 */

spectrum_top_sideBar.prototype.goToWork = function() {
	return sideBarNav("Work");
};

spectrum_top_sideBar.prototype.goToPeople = function(boolean) {
	sideBarNav("People").then(
	    function () {
            expect(element(by.xpath("//span[.='New Team']")).isPresent()).toBe(boolean);
            expect(element(by.xpath("//span[.='Invite Person']")).isPresent()).toBe(boolean);
        })
};

spectrum_top_sideBar.prototype.goToSites = function() {
	return sideBarNav("Sites");
};

spectrum_top_sideBar.prototype.goToDashBaord = function() {
    return sideBarNav("Dashboard");
};

spectrum_top_sideBar.prototype.addTaskModal = function() {
    sleep();
    return sideBarNav("Add Task").then(
        function(){
            browser.wait(protractor.ExpectedConditions.presenceOf(newTaskModalMain()), wait)
        })
};

exports.spectrum_top_sideBar = new spectrum_top_sideBar();