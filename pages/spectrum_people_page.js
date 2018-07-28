var spectrum_people_page = function() {
};
var spectrum_tasks_page = require('./spectrum_tasks_page.js').spectrum_tasks_page;
var basePage = require('./page.js').page;

var locatorMap = new Map();
/**
 * locators: toggle
 */
locatorMap.set("peopleMain", by.xpath("/descendant::div[contains(@class,'people')][contains(@class,'page')][1]"));
locatorMap.set("userTeamToggle", by.xpath("./descendant::div[contains(@class,'page-nav')][1]"));
locatorMap.set("peopleToggle", by.xpath("/descendant::a[contains(@class,'page-nav-list-item-link')][.='People'][1]"));
locatorMap.set("teamToggle", by.xpath("/descendant::a[contains(@class,'page-nav-list-item-link')][.='Teams'][1]"));
locatorMap.set("toggleActive", by.xpath(".//a[contains(@class,'is-active')]"));

locatorMap.set("invitePerson", by.xpath(".//button[@type='button'][span[.='Invite Person']]"));

/**
 * locators: lists and details
 */
locatorMap.set("usersOrTeamslist", by.xpath(".//div[div[contains(@class,'list-sort-panel')]]"));
locatorMap.set("userListParent", by.xpath(".//div[@class='peoplelist']"));
locatorMap.set("teamsListParent", by.xpath(".//div[@class='teamlist-list-wrap']"));
locatorMap.set("showDisabled", by.xpath(".//label[span[span[contains(text(),'Show disabled')]]"));
locatorMap.set("disabledFlag", by.xpath(".//i[contains(@class,'alert-octagon')]"));
locatorMap.set("disabledDialogAreaMain", by.xpath(".//div[contains(@class,'peopledetails-tasksmsg')]"));
locatorMap.set("detailsToggle", by.xpath(".//ul[contains(@class,'tabs-nav-list')]"));
locatorMap.set("addToTeam", by.xpath(".//div[@class='Select-placeholder'][contains(text(), 'Add To Team')]"));
locatorMap.set("addTeamMember", by.xpath(".//div[@class='Select-placeholder'][contains(text(), 'Add to Team')]"));
locatorMap.set("addSite", by.xpath(".//div[@class='Select-placeholder'][contains(text(), 'Add Site')]"));
locatorMap.set("detailsListItemParent", by.xpath(".//div[div[ul[li[@class='detailssection-list-item']]]]"));
locatorMap.set("removeItemFromDetailsList", by.xpath("./descendant::*[contains(@class,'close-circle')][1]"));
locatorMap.set("userDetailsMain", by.xpath(".//div[@class='peopledetails']"));
locatorMap.set("teamDetailsMain", by.xpath(".//div[@class='teamdetails']"));
locatorMap.set("userFName", by.xpath(".//*[@id='firstName']"));
locatorMap.set("userLName", by.xpath(".//*[@id='lastName']"));
locatorMap.set("userEmail", by.xpath(".//*[@name='email']"));
locatorMap.set("userPhone", by.xpath(".//*[@name='phone']"));

/**
 * locators: team modal
 */
locatorMap.set("createTeamButton", by.xpath(".//span[contains(text(), 'Create New Team')]"));
locatorMap.set("newTeamModal", by.xpath(".//div[@class='modal-content'][div[div[contains(text(), 'New Team')]]]"));
locatorMap.set("newTeamModalTeamNameMain", by.xpath(".//div[label[span[contains(text(), 'Team Name')]]]"));
locatorMap.set("newTeamModalTeamNameInput", by.xpath(".//input[@type='text']"));
locatorMap.set("newTeamModalDescriptionMain", by.xpath(".//div[label[contains(text(), 'Team Description')]]"));
locatorMap.set("newTeamModalDescriptionInput", by.xpath(".//textarea[@class='form-control']"));
locatorMap.set("newTeamModalCancel", by.xpath(".//button[contains(text(), 'Cancel')]"));
locatorMap.set("newTeamModalCreate", by.xpath(".//button[contains(text(), 'Create Team')]"));
locatorMap.set("closeToast", by.xpath("//div[@class='sysmsg-content-close']"));

/**
 * locators: invite person modal
 */
locatorMap.set("invitePersonModal", by.xpath("//div[@class='peopletab-invitemodal']"));
locatorMap.set("firstNameParent", by
	.xpath(".//div[contains(@class,'formcol-4')][label[contains(text(), 'First')]]"));
locatorMap.set("lastNameParent", by.xpath(".//div[contains(@class,'formcol-4')][label[contains(text(), 'Last')]]"));
locatorMap.set("emailParent", by.xpath(".//div[contains(@class,'input-group')][*[contains(@placeholder, 'Email')]]"));
locatorMap.set("phoneParent", by
	.xpath(".//div[contains(@class,'input-group')][*[contains(@placeholder, 'Mobile Phone')]]"));
locatorMap.set("emailPhoneToggleParent", by.xpath(".//span[contains(@class,'formcontrol-toggler-btn')]"));
locatorMap.set("invitePersonTextInput1", by.xpath("./descendant::input[@type='text'][1]"));
locatorMap.set("invitePersonTeam", by.xpath(".//div[contains(@class,'peopletab-invitemodal-content-formgroup-input')][contains(@class,'is-searchable')]"));
locatorMap.set("invitePersonCancel", by.xpath(".//button[contains(text(), 'Cancel')]"));
locatorMap.set("invitePersonSubmit", by.xpath(".//button[contains(text(), 'Invite')]"));

var flow = protractor.promise.controlFlow();
function waitOne() {
	return protractor.promise.delayed(3000);
}

function sleep() {
	flow.execute(waitOne);
};

var wait = basePage.globalWait();

var dynamicMenuContent = function(value){
    return basePage.dynamicMenuContent(value)
};

/**
 * elements: toggle
 */
var peopleToggle = function(choice) {
	return element(locatorMap.get("peopleMain")).element(locatorMap.get("userTeamToggle")).element(locatorMap.get(choice));
};

var toggleActive = function(choice) {
	return element(by.xpath("//a[contains(@class,'page-nav-list-item-link')]" +
        "[contains(@class,'is-active')][contains(text(),'"+choice+"')]"));
};

var invitePersonButton = function() {
	return element(by.xpath("/descendant::div[contains(@class,'people')][contains(@class,'page')][1]"))
        .element(by.xpath(".//button[@type='button'][span[.='Invite Person']]"));
}

/**
 * elements: users list
 */
var peopleSectionMain = function(){
    return element(by.xpath("/descendant::div[@class='people page'][1]"))
}


var userListParent = function() {
	return peopleSectionMain().element(by.xpath(".//div[@class='peoplelist']"));
};

var userListItem = function(value) {
	return userListParent()
        .element(by.xpath(".//li[contains(@class,'peoplelist-list-item')]" +
            "[.//span[contains(text(), '" + value + "')]]"));
};

var userListItemDetail = function(value2) {
	return element(by.xpath("//span[@class='peoplelist-list-item-contact']" +
        "[span[contains(text(),'"+value2+"')]]"))
};

var userFiltersParent = function() {
	return userListParent().element(by.xpath("./descendant::div[contains(@class,'peoplelist-filters')][1]"));
};

var userViewMenu = function() {
	return userFiltersParent().element(by.xpath("./descendant::div[contains(@class,'peoplelist-filters-right')][1]"))
							  .element(by.xpath("./descendant::div[contains(@class,'mod-peoplelist-filters')][1]"));
};

var userViewMenuABC = function() {
	return userListParent().element(by.xpath(".//*[@id='alphabetical'][contains(text(), 'A-Z')]"));
};

var userViewMenuDisabled = function() {
	return userListParent().element(by.xpath(".//*[@id='disabled'][contains(text(), 'Accounts Disabled')]"));
};

/**
 * elements: user details
 */
var userDetailsParent = function() {
	return peopleSectionMain().element(by.xpath(".//div[contains(@class,'peopletab-tabpane-rightcol')]" +
        "[div[@class='peopledetails']]"));
};

var userRoleMenu = function () {
    return peopleSectionMain().element(by.xpath(".//span[@class='statusbar-message']" +
        "[span[.='Account type']]"))
                              .element(by.xpath("./descendant::div[@class='Select-control']"))
};

var userRoleChangeModalMain = function () {
    return peopleSectionMain().element(by.xpath("./descendant::div[contains(@class,'scimodal-content')]" +
        "[.//div[contains(@class,'scimodal-content-header')][contains(text(),'Change')]][1]"))
};

var userRoleChangeModalText = function (value1,value2) {
    return userRoleChangeModalMain().element(by.xpath(".//p[contains(text(),'"+value1+"')]" +
        "[contains(text(),'"+value2+"')]"))
};

var userRoleChangeModalUpdate = function () {
    return userRoleChangeModalMain().element(by.xpath(".//button[.='Update']"))
};

var disabledUserDialog = function() {
	return userDetailsParent().element(locatorMap.get("disabledDialogAreaMain"));
};

var reviewTasksButton = function(value2) {
	return disabledUserDialog().element(
		by.xpath(".//*[@class='peopledetails-tasksmsg-link'][contains(text(), '" + value2 + "')]"));
};

var reviewTasksMsg = function(value2) {
	return disabledUserDialog().element(by.xpath(".//*[contains(text(), '" + value2 + "')]"));
};

var userDetail = function(value2) {
	return userDetailsParent().element(by.xpath(".//input[contains(@value,'" + value2 + "')]"));
};

var userFLName = function(value){
    return userDetailsParent().element(by.xpath(".//span[contains(text(),'"+value+"')]"));
}

var detailEdit = function(value2) {
	return userDetailsParent().element(locatorMap.get(value2));
};

var userIsADispatcher = function (value) {
    return userDetailsParent().element(by.xpath(".//div[label[@label='This user is a " +
        "dispatcher']]")).element(by.xpath(".//i[contains(@class,'checkbox-icon-"+value+"')]"));
};

var disableUserButton = function(value2) {
	return userDetailsParent().element(by.xpath(".//a[contains(text(), '" + value2 + "')][@class='statusbar-nav-link']"));
};

var accountType = function(value2) {
	return userDetailsParent().element(by.xpath(".//span[span[.='Account type']]"))
		.element(by.xpath(".//*[contains(text(),'"+value2+"')]"));
};

var showDisabled = function(index) {
	return listParent(index).element(by.xpath(".//input[@type='checkbox']"));
};

var addTeamToUser = function(choice) {
	return userDetailsParent().element(by.xpath(".//div[@class='Select-placeholder']" +
        "[contains(text(), '"+choice+"')]"));
};

var teamInListMain = function(value) {
	return userDetailsParent().element(
		by.xpath(".//li[@class='peopledetailsteam-list-item'][a[contains(text(), '" + value + "')]]"));
}

var teamInList = function(team) {
	return userDetailsParent().element(
		by.xpath(".//a[contains(text(), '" + team + "')][@href][@class='peopledetailsteam-list-item-name']"));
};

var removeTeamFromList = function(team) {
	return teamInListMain(team).element(locatorMap.get("removeItemFromDetailsList"));
};

/**
 * elements: team list
 */
var teamsListParent = function() {
	return peopleSectionMain().element(by.xpath("./descendant::div[@class='teamlist'][1]"));
};

var teamListItem = function(value) {
	return teamsListParent().element(
		by.xpath(".//span[contains(text(), '" + value + "')][contains(@class,'teamlist-list-item-name')]"));
};

var teamSelected = function() {
	return teamsListParent().element(by.xpath(".//li[contains(@class,'teamlist-list-item')]" +
        "[contains(@class,'is-active')]"));
}

var teamListItemDetail = function(value2) {
	return teamSelected().element(
		by.xpath(".//span[contains(text(), '" + value2 + "')][contains(@class,'teamlist-list-item-description')]"));
};

/**
 * elements: team details
 */
var teamDetailsParent = function() {
	return peopleSectionMain().element(by.xpath(".//div[@class='teamdetails']"));
};

var teamDetail = function(value2) {
	return teamDetailsParent().element(by.xpath(".//div[contains(text(),'"+value2+"')]"));
};

var teamsDetailsToggle = function(value2) {
	return teamDetailsParent().element(locatorMap.get("detailsToggle")).element(
		by.xpath(".//a[contains(@class,'tabs-nav-list-item-link')][contains(text(), '" + value2 + "')]"));
};

var teamsDetailsToggleIsActive = function(value2) {
	return teamDetailsParent().element(locatorMap.get("detailsToggle")).element(
		by.xpath(".//a[contains(text(), '" + value2 + "')] [contains(@class,'is-active')]"));
};

var addMemberToTeam = function() {
	return teamDetailsParent().element(by.xpath(".//div[@class='Select-placeholder']" +
        "[contains(text(), 'Add')]"));
};

var memberInList = function(team) {
	return teamDetailsParent()
        .element(by.xpath(".//a[contains(text(), '" + team + "')]" +
            "[contains(@class,'teamdetails-list-item-name')]"));
};

var removeMemberFromList = function(user) {
	return teamDetailsParent()
        .element(by.xpath(".//li[@class='teamdetails-list-item'][a[.='"+user+"']]"))
        .element(by.xpath(".//a[@class='teamdetails-list-item-remove']"));
};

var teamTitle = function() {
	return teamDetailsParent().element(by.xpath(".//p[contains(@class,'teamdetails-title')]")).element(
		by.xpath(".//span[contains(@class,'contenteditable')]"));
};

var teamDescription = function() {
	return teamDetailsParent().element(by.xpath(".//p[contains(@class,'teamdetails-description')]"))
                              .element(by.xpath(".//span[contains(@class,'contenteditable')]"));
};

/**
 * elements: team modal
 */
var newTeamButton = function() {
	return element(locatorMap.get("peopleMain")).element(by.xpath(".//span[.='New Team']"));
};

var newTeamModalMain = function() {
	return element(locatorMap.get("peopleMain"))
        .element(by.xpath(".//div[div[.='Create New Team']]"));
};

var teamModalTeamName = function() {
    return newTeamModalMain().element(by.xpath("//div[contains(@class,'formcol')]" +
        "[div[div[div[input[@label='Team Name']]]]]"));
};

var teamModalDescription = function() {
    return newTeamModalMain().element(by.xpath("//div[contains(@class,'formcol')]" +
        "[div[div[div[input[@label='Team Description']]]]]"));
};

var teamModalSites = function() {
	return newTeamModalMain().element(by.xpath(".//div[contains(@class,'Select')]" +
        "[contains(@class,'formcontrol-input')][contains(@class,'mod-required')]"));
}

var teamModalCancel = function() {
	return newTeamModalMain().element(by.xpath(".//button[.='Cancel']"));
};

var modalSubmit = function() {
	return newTeamModalMain().element(locatorMap.get("newTeamModalCreate"));
};

var modalRequiredMsg = function(value) {
	return newTeamModalMain().element(by.xpath(".//span[contains(text(), '" + value + "')]"));
}

var toastMsg = function (value) {
    return basePage.toastMsg(value);
};

var closeToastMsg = function() {
	return basePage.closeToastMsg();
};


/**
 * elements: invite person modal
 */
var invitePersonModal = function() {
	return element(by.xpath("//div[contains(@class,'scimodal-contentwrap')]" +
        "[.//span[.='Invite New Person ']]"));
};

var invitePersonFName = function(index) {
    return element.all(by.xpath("//input[@label='First Name']")).get(index);
};

var invitePersonLName = function(index) {
    return element.all(by.xpath("//input[@label='Last Name']")).get(index);
};

var invitePersonEmailPhoneToggle = function(value,index) {
	return element.all(by.xpath(".//span[contains(@class,'formcontrol-toggler')]" +
        "[contains(@class,'mod-required')]")).get(index)
                  .element(by.xpath(".//i[contains(@class, '" + value + "')]"));
};

var invitePersonEmail = function(index) {
    return element.all(by.xpath("//input[@label='Phone/Email']")).get(index);
};

var invitePersonPhone = function(index) {
    return element.all(by.xpath("//input[@label='Phone/Email']")).get(index);
};

var invitePersonTeam = function(index) {
    return element.all(by.xpath("//div[contains(@class,'formcontrol-inpputwrap-cell-input')]" +
        "[.//label[.='Team(s)']]")).get(index)
};

var invitePersonRoleMenu = function(index){
	return element.all(by.xpath("//div[contains(@class,'formcontrol-inpputwrap-cell-input')]" +
        "[.//label[.='Role']]")).get(index)
}

var invitePersonRole = function(option,index) {
	return basePage.waitThenClick(invitePersonRoleMenu(index),'invite user role field').then(
	    function () {
            basePage.waitThenClick(dynamicMenuContent(option),option+' role')
        })
};

var invitePersonTeamForm = function(option,index) {
    return basePage.waitThenClick(invitePersonTeam(index),'invite user team field').then(
        function () {
            basePage.waitThenClick(dynamicMenuContent(option),option+' team')
        })
};

var iPModalCancel = function() {
	return element(by.xpath(".//button[contains(@class,'closebtn')]"));
};

var iPModalSubmit = function() {
	return element(by.xpath("./descendant::div[@class='invitenewperson'][1]"))
        .element(by.xpath(".//button[.//span[contains(text(),'Invite')]]"));
};

var inviteAnother = function(index){
    return element.all(by.xpath("//span[.='Invite Another']")).get(index)
}

/**
 * actions
 */
var waitThenClick = function(element){
	return basePage.waitThenClick(element);
};

var clickThenSendKeys = function (element,value1,value2) {
	return basePage.clickThenSendKeys(element,value1,value2)
};

/**
 * actions: toggle
 */
var chooseToggle = function(choice1) {
	return basePage.waitThenClick(peopleToggle(choice1),choice1+" people section toggle")
};

/**
 * actions: users
 */
var selectUserIteminList = function(itemName) {
	return basePage.waitThenClick(userListItem(itemName),"user "+itemName+" in people list");
};



var disableEnableUser = function(value, boolean, msg1, msg2) {
	disableUserButton(value).click().then(function() {
		expect(reviewTasksButton(msg2).isPresent()).toBe(boolean);
		expect(reviewTasksMsg(msg1).isPresent()).toBe(boolean);
	}, function(err) {
		throw err;
	})
};

var viewUsersByABC = function(itemName, boolean) {
	userViewMenu().click().then(function() {
		userViewMenuABC().isDisplayed().then(function() {
			browser.actions().mouseMove(userViewMenuABC()).click().perform();
			expect(userListItem(itemName).isPresent()).toBe(boolean);
		}, function(err) {
			throw err;
		})
	}, function(err) {
		throw err;
	})
};

var viewDisabledUsersInList = function(itemName, boolean) {
	browser.wait(protractor.ExpectedConditions.elementToBeClickable(userViewMenu()), wait)
		   .then(function(){
			   userViewMenu().click().then(function() {
				   browser.wait(protractor.ExpectedConditions.presenceOf(userViewMenuDisabled()), wait).then(function() {
					   userViewMenuDisabled().isDisplayed().then(function() {
						   browser.actions().mouseMove(userViewMenuDisabled()).click().perform().then(
							   function(){
								   browser.wait(protractor.ExpectedConditions.presenceOf(userListItem(itemName)), wait).then(function() {
									   expect(userListItem(itemName).isPresent()).toBe(boolean);
								   },function(err){
									   throw err;
								   })
							   },function(err){
								   throw err;
							   });
					   }, function(err) {
						   throw err;
					   })
				   },function(err){
					 throw err;
				   })
			   }, function(err) {
				   throw err;
			   })
		   },function(err){
			 throw err;
		   })
};

var checkUserDetails = function(value, obj) {
	sleep();
	for (var count = 0; count < value.length; count++) {
		if (value[count] === "role") {
		    basePage.checkForElement(accountType(obj["role"]),'user role detail ');
		} else if(value[count] === "userFName"||value[count] === "userLName"){
            basePage.checkForElement(userFLName(obj[value[count]]),'user '+value[count]+' detail');
		} else if(value[count]==="dispatcher"){
		    basePage.checkForElement(userIsADispatcher("active"),'user is a dispatcher active')
        } else{
            basePage.checkForElement(userDetail(obj[value[count]]),'user '+value[count]+' detail');
        }
	}
};

var editUserRole = function (value,obj,admin) {
	return basePage.waitThenClick(userRoleMenu(),'user role menu').then(
        function () {
            basePage.waitThenClick(dynamicMenuContent(value),'role '+value).then(
                function () {
                    if(typeof admin !='undefined'){
                        basePage.checkForElement(userRoleChangeModalText(obj["username"],value),
                            'user role change modal').then(
                            function () {
                                basePage.waitThenClick(userRoleChangeModalUpdate(),'user role change' +
                                    ' modal update button')
                            })
                    }
                })
        })
}

var editUserDetails = function(value, editObj) {
	for (var count = 0; count < value.length; count++) {
		(function(passedInCount) {
		    sleep();
		    if(value[passedInCount]==="userFName"||value[passedInCount]==="userLName"){
		        basePage.clickAndClear(detailEdit(value[passedInCount]),'dont tab').then(
		            function () {
                        basePage.typeEachCharacter(detailEdit(value[passedInCount]),
                        editObj[value[passedInCount]])
                    })
            } else if(value[passedInCount]==="dispatcher"){
		        basePage.waitThenClick(userIsADispatcher("inactive"),'dispatcher check box');
            } else{
                basePage.clickClearThenSendKeys(detailEdit(value[passedInCount]),
                    editObj[value[passedInCount]],protractor.Key.TAB,
                    'user field '+value[passedInCount])
            }
		})(count);
	}
};

var clickTeamInList = function(team1, user) {
	teamInListMain(team1).isDisplayed().then(function() {
		teamInList(team1).click().then(function() {
			teamsDetailsToggleSelect("members", "sites");
			expect(memberInList(user).isPresent()).toBe(true);
		}, function(err) {
			throw err;
		})
	}, function(err) {
		throw err;
	})
};

var removeTeamFromDetailsList = function(item) {
    return basePage.waitThenClick(removeTeamFromList(item),"remove team from list button").then(
    	function() {
			expect(teamInList(item).isPresent()).toBe(false);
		});
};


var addTeamToUserFunction = function(choice, team) {
    return basePage.waitThenClick(addTeamToUser(choice),choice+" menu").then(
        function () {
            basePage.waitThenClick(dynamicMenuContent(team),team+" option").then(
                function () {
                    browser.wait(protractor.ExpectedConditions.presenceOf(teamInList(team)), wait)
                })
        })
};

/**
 * actions: teams
 */
var selectTeamIteminList = function(itemName) {
    return basePage.waitThenClick(teamListItem(itemName),'team named '+itemName);
};

var chooseATeam = function(obj){
    return chooseToggle("teamToggle").then(
        function() {
            selectTeamIteminList(obj["teamName"])
        })
}

var teamsDetailsToggleSelect = function(toggle1, toggle2) {
    return basePage.waitThenClick(teamsDetailsToggle(toggle1)).then(function() {
		expect(teamsDetailsToggleIsActive(toggle1).isPresent()).toBe(true);
		expect(teamsDetailsToggleIsActive(toggle2).isPresent()).toBe(false);
	})
};

var checkATeamsDetails = function(obj) {
    browser.wait(protractor.ExpectedConditions.presenceOf(teamDetail(obj["teamName"])), wait).then(function() {
		expect(teamDetail(obj["description"]).isPresent()).toBe(true);
	}, function(err) {
		throw err;
	})
};

var removeMemberFromTeam = function(item) {
	return basePage.waitThenClick(removeMemberFromList(item), "remove member from team button");
};

var addMemberToTeamFunction = function(team) {
    return waitThenClick(addMemberToTeam()).then(
        function () {
            waitThenClick(dynamicMenuContent(team)).then(
                function () {
                    expect(memberInList(team).isPresent()).toBe(true);
                },function (err) {
                    throw err;
                })
        },function (err) {
            throw err;
        })
};

var editTeam = function(element, value) {
    var teamEditElementMap = new Map();
    teamEditElementMap.set("teamName", teamTitle());
    teamEditElementMap.set("description", teamDescription());
	teamEditElementMap.get(element).isDisplayed().then(function() {
		browser.actions().mouseMove(teamEditElementMap.get(element)).click().perform();
		sleep();
		teamEditElementMap.get(element).clear();
		sleep();
		browser.actions().mouseMove(teamEditElementMap.get(element)).click().sendKeys(value).perform();
	}, function(err) {
		throw err;
	})
};

var editTeamAtributes = function(element, value) {
	for (var count = 0; count < element.length; count++) {
		editTeam(element[count], value[count]);
	}
};

var clickMemberInList = function(member, team) {
    return basePage.waitThenClick(memberInList(member),'user named '+member).then(
        function () {
            basePage.waitThenClick(peopleDetailTeamsTab(),"user details team tab").then(
                function () {
                    basePage.checkForElement(teamInList(team),'team named '+team)
                });
        });
};

/**
 * actions: team modal
 */
var clickCreateNewTeam = function() {
    return basePage.waitThenClick(newTeamButton(),"create new team button");
};

var siteOption = function(optionText) {
    return basePage.waitThenClick(teamModalSites(),"team modal sites field").then(
        function () {
            basePage.waitThenClick(dynamicMenuContent(optionText),"team modal site "+optionText)
        })
};

var newTeamModalField = function(element, value) {
    var modalElementMap = new Map();
    modalElementMap.set("teamName", teamModalTeamName());
    modalElementMap.set("description", teamModalDescription());
    basePage.clickThenSendKeys(modalElementMap.get(element),value[element],
        protractor.Key.TAB,"new team modal "+modalElementMap.get(element)+" field");
};

var clickModalCancel = function() {
	teamModalCancel().click().then(function() {
		expect(newTeamButton().isPresent()).toBe(true);
	}, function(err) {
		throw err;
	})
};

var closeSuccessMsg = function() {
	closeToastMsg().isDisplayed().then(function() {
		sleep();
		closeToastMsg().click();
		sleep();
	}, function(err) {
		throw err;
	})
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

var clickInviteAnother = function(index){
    return basePage.waitThenClick(inviteAnother(index)).then(
                   function(){
                       browser.wait(protractor.ExpectedConditions.
                       presenceOf(invitePersonFName(Number(index) + Number('1'))), wait)
                              .then(function() {
                           expect(invitePersonFName(Number(index) + Number('1')).isPresent())
                               .toBe(true);
                       })
                   })
}

/**
 * actions: invite person modal
 */

var clickInviteNewPerson = function() {
	return basePage.waitThenClick(invitePersonButton(),'invite user button')
};

var emailPhoneToggle = function(choice1, choice2,index) {
	invitePersonEmailPhoneToggle(choice1,index).click();
};

var invitePersonModalField = function(element, value,index) {
    var iPModalMap = new Map();
    iPModalMap.set("fName", invitePersonFName(index));
    iPModalMap.set("lName", invitePersonLName(index));
    iPModalMap.set("modalPhone", invitePersonPhone(index));
    iPModalMap.set("modalEmail", invitePersonEmail(index));
    basePage.clickThenSendKeys(iPModalMap.get(element),value,protractor.Key.TAB,element+' field')
};

var clickIPModalCancel = function() {
	iPModalCancel().click().then(function() {
		expect(invitePersonButton().isPresent()).toBe(true);
	}, function(err) {
		throw err;
	})


};

var clickIPModalCreate = function() {
    basePage.waitThenClick(iPModalSubmit(),'invite user submit button').then(
        function() {
        basePage.closeModal("invited",iPModalCancel())
	})
};

/**
 * services: misc
 */
spectrum_people_page.prototype.isPeoplePageLoaded = function() {
	expect(element(locatorMap.get("peopleMain")).isPresent()).toBe(true);
};

/**
 * services: toggle
 */
spectrum_people_page.prototype.peopleToggle = function() {
	return chooseToggle("peopleToggle", "teamToggle").then(
	    function () {
            basePage.checkForElement(toggleActive("People"),'active people toggle')
        }
    )
};

spectrum_people_page.prototype.teamsToggle = function() {
	chooseToggle("teamToggle", "peopleToggle");
};

/**
 * services: users
 */
spectrum_people_page.prototype.checkUserDetails = function(value, obj) {
    sleep();
	return selectUserIteminList(obj["username"]).then(
        function(){
            checkUserDetails(value, obj);
        });
};

spectrum_people_page.prototype.editAUsersRole = function (obj,value,admin) {
    return chooseToggle("peopleToggle").then(
        function () {
            selectUserIteminList(obj["username"]).then(
                function () {
                    editUserRole(value,obj,admin);
                });
        })
};

spectrum_people_page.prototype.validateUserDetailRoles = function (obj,value,boolean) {
    return chooseToggle("peopleToggle").then(
        function () {
            selectUserIteminList(obj["username"], obj["userEmail"], pending).then(
                function () {
                    basePage.isMenuContentPresent(userRoleMenu(),value,boolean).then(
                        function () {
                            waitThenClick(userRoleMenu())
                        },function (err) {
                            throw err;
                        })
                },function (err) {
                    throw err;
                })
        },function (err) {
            throw err;
        })
};

spectrum_people_page.prototype.cannotEditRole = function (obj,boolean) {
    return chooseToggle("peopleToggle").then(
        function () {
            selectUserIteminList(obj["username"], obj["userEmail"], pending).then(
                function () {
                    expect(userRoleMenu().isPresent()).toBe(boolean);
                },function (err) {
                    throw err;
                })
        },function (err) {
            throw err;
        })
}

spectrum_people_page.prototype.editUser = function(value, origObj, editObj) {
    sleep();
	return selectUserIteminList(origObj["username"], origObj["userEmail"]).then(
        function () {
            editUserDetails(value, editObj);
        });
};

spectrum_people_page.prototype.disableUser = function(obj) {
	chooseToggle("peopleToggle", "teamToggle").then();
	selectUserIteminList(obj["username"], obj["userEmail"], "");
	disableEnableUser("Disable", true, obj["disabledMsg1"], obj["disabledMsg2"]);
	viewDisabledUsersInList(obj["username"], true);
	viewUsersByABC(obj["username"], false);
};

spectrum_people_page.prototype.viewDisableUsers = function(obj) {
	viewDisabledUsersInList(obj["username"], true);
};

spectrum_people_page.prototype.viewUsersByABC = function(obj) {
	viewUsersByABC(obj["username"], true);
};

spectrum_people_page.prototype.enableUser = function(obj) {
	chooseToggle("peopleToggle", "teamToggle");
	viewDisabledUsersInList(obj["username"], true);
	selectUserIteminList(obj["username"], obj["userEmail"], pending);
	disableEnableUser("Enable", false, obj["disabledMsg1"], obj["disabledMsg2"]);
	viewDisabledUsersInList(obj["username"], false);
	viewUsersByABC(obj["username"], true);
};

spectrum_people_page.prototype.addUserToATeam = function(obj, index, pending) {
	return chooseToggle("peopleToggle", "teamToggle").then(
	    function () {
            selectUserIteminList(obj["username"], obj["userEmail"], pending).then(
                function () {
                    basePage.waitThenClick(peopleDetailTeamsTab(),'people details team tab').then(
                        function () {
                            addTeamToUserFunction("Add To Team", obj["teams"][index]);
                        });
                });
        });
};

var peopleDetailSitesTab = function () {
    return userDetailsParent().element(by.xpath(".//a[contains(@class,'mod-greenbar')]" +
        "[.='sites']"))
};

var peopleDetailTeamsTab = function () {
    return userDetailsParent().element(by.xpath(".//a[contains(@class,'mod-greenbar')]" +
        "[.='teams']"))
};

spectrum_people_page.prototype.addUserToASite = function(obj, index, pending) {
    return chooseToggle("peopleToggle", "teamToggle").then(
        function () {
            selectUserIteminList(obj["username"], obj["userEmail"], pending).then(
                function () {
                    if(obj["role"]==="Site Admin"){
                        basePage.waitThenClick(peopleDetailSitesTab(), "site admin tab").then(
                            function () {
                                addTeamToUserFunction("Add To Site", obj["sites"][index]);
                            },function (err) {
                                throw err;
                            })
                    }else{
                        addTeamToUserFunction("Add To Site", obj["sites"][index]);
                    }
                },function (err) {
                    throw err
                })
        },function (err) {
            throw err;
        })
};

spectrum_people_page.prototype.removeUserFromATeam = function(obj, index, pending, site) {
	return chooseToggle("peopleToggle").then(
	    function () {
            selectUserIteminList(obj["username"], obj["userEmail"], pending).then(
                function () {
                    if(obj["role"]==="Site Admin" && typeof site !='undefined'){
                        basePage.waitThenClick(peopleDetailSitesTab(),"user details site tab").then(
                            function () {
                                removeTeamFromDetailsList(obj["sites"][index]);
                            });
                    }else{
                        basePage.waitThenClick(peopleDetailTeamsTab(),"user details team tab").then(
                            function () {
                                removeTeamFromDetailsList(obj["teams"][index]);
                            });
                    }
                })
        })
};



spectrum_people_page.prototype.clickUserLink = function(obj, index, pending) {
	chooseToggle("peopleToggle", "teamToggle");
	selectUserIteminList(obj["username"], obj["userEmail"], pending);
	clickTeamInList(obj["teams"][index], obj["username"]);
};

/**
 * services: teams
 */
spectrum_people_page.prototype.checkTeamDetails = function(obj) {
    return chooseATeam(obj).then(
        function(){
            teamsDetailsToggleSelect("members", "sites").then(
                function(){
                    checkATeamsDetails(obj);
                })
        })
};

spectrum_people_page.prototype.addTeamMember = function(obj, index) {
    return chooseATeam(obj).then(
				function () {
					teamsDetailsToggleSelect("members", "sites").then(
						function () {
							addMemberToTeamFunction(obj["members"][index]);
						},function (err) {
							throw err;
						})
				},function (err) {
					throw err;
				})
};

spectrum_people_page.prototype.removeTeamMember = function(obj, index) {
    return chooseATeam(obj).then(
        function(){
            teamsDetailsToggleSelect("members", "sites").then(
                function(){
                    removeMemberFromTeam(obj["members"][index]);
                })
        })
};

spectrum_people_page.prototype.editTeamDetails = function(obj, editFields, editValues) {
	chooseToggle("teamToggle", "peopleToggle");
	selectTeamIteminList(obj["teamName"]);
	editTeamAtributes(editFields, editValues);
};

spectrum_people_page.prototype.clickMemberLink = function(obj, index) {
    return chooseATeam(obj).then(
        function(){
            teamsDetailsToggleSelect("members", "sites").then(
                function(){
                    clickMemberInList(obj["members"][index], obj["teamName"]);
                });
        });
};

spectrum_people_page.prototype.addSiteToTeam = function(obj, index) {
    return chooseATeam(obj).then(
        function(){
            teamsDetailsToggleSelect("sites", "members").then(
                function(){
                    addMemberToTeamFunction(obj["sites"][index]);
                },function(err){
                    throw err;
                })
        },function(err){
            throw err;
        })
};

spectrum_people_page.prototype.removeSiteToTeam = function(obj, index) {
    chooseToggle("teamToggle", "peopleToggle").then(
        function(){
            selectTeamIteminList(obj["teamName"]).then(
                function(){
                    teamsDetailsToggleSelect("sites", "members").then(
                        function(){
                            removeMemberFromTeam(obj["sites"][index]);
                        },function(err){
                            throw err;
                        })
                },function(err){
                    throw err;
                })
        },function(err){
            throw err;
        })
};

/**
 * services: team modal
 */
spectrum_people_page.prototype.createNewTeam = function(element, value) {
	chooseToggle("teamToggle", "peopleToggle").then(
        function(){
            clickCreateNewTeam().then(
                function(){
                    for (var count = 0; count < element.length; count++) {
                        if (element[count] === "site") {
                            siteOption(value["sites"][0]);
                        }else if(element[count] === "create"){
                            basePage.waitThenClick(modalSubmit(),"team modal submit button").then(
                                function () {
                                    basePage.closeModal("created",teamModalCancel())
                                })
                        } else {
                            newTeamModalField(element[count], value);
                        }
                    }
                });
        });
};

spectrum_people_page.prototype.checkCreateTeamSites = function (value,boolean) {
         chooseToggle("teamToggle").then(
             function () {
                 clickCreateNewTeam().then(
                     function () {
                         basePage.isMenuContentPresent(teamModalSites(),value,boolean).then(
                             function () {
                                 waitThenClick(teamModalCancel());
                             },function (err) {
                                 throw err;
                             })
                     },function (err) {
                         throw err;
                     })
             },function (err) {
                 throw err;
             })
};

/**
 * services: invite new person
 */

spectrum_people_page.prototype.clickToInviteUser = function(){
    return clickInviteNewPerson();
};

spectrum_people_page.prototype.inviteNewPerson = function(element, value, choice, msg,index) {
	for (var count = 0; count < element.length; count++) {
        (function(passedInCount) {
		if (element[passedInCount] === "email") {
			emailPhoneToggle(element[count], "phone",index);
		} else if (element[passedInCount] === "phone") {
			emailPhoneToggle(element[count], "email",index);
		} else if (element[passedInCount] === "role") {
			invitePersonRole(value[count],index)
		} else if (element[passedInCount] === "team") {
            invitePersonTeamForm(value[count],index)
		} else {
			invitePersonModalField(element[passedInCount], value[passedInCount],index)
		}
        })(count);
	}
	sleep();
	if (choice == "create") {
		clickIPModalCreate();
	}else if(choice=="another"){
        clickInviteAnother(index);
    } else {
		clickIPModalCancel();
	}
};

spectrum_people_page.prototype.invitePersonRoleMenuValidation = function (index,value,boolean) {
    return basePage.isMenuContentPresent(invitePersonRoleMenu(index),value,boolean).then(
        function () {
            basePage.waitThenClick(iPModalCancel(), "invite person modal cancel");
        })
};

spectrum_people_page.prototype.invitePersonTeamMenuValidation = function (index,value,boolean) {
    return basePage.isMenuContentPresent(invitePersonTeam(index),value,boolean).then(
        function () {
            basePage.waitThenClick(iPModalCancel(), "invite person modal cancel");
        },function (err) {
            throw err;
        })
};

exports.spectrum_people_page = new spectrum_people_page();