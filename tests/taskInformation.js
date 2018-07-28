var taskInformation = function() {
};

var phraseGen = require('../pages/phraseGen.js').phraseGen;
var spectrum_tasks_page = require('../pages/spectrum_tasks_page.js').spectrum_tasks_page;
var datePicker = require('../pages/datePicker.js').datePicker;

var user1 = "Test User1";
var user2 = "Test User3";
var days = 3;
var assignee = "Test User3";
var location = "Suite 900"
var labels =[ "label 1", "label 2", "label 3", "label 4" ];
var site = "site 3";
var daysEdit = 15;
var assigneeEdit = "Test User4";
var labelEdit = [ phraseGen.randomLabel(), phraseGen.randomLabel(), phraseGen.randomLabel(),
	phraseGen.randomLabel() ];
var locationEdit = "Suite 901";
var comment = phraseGen.randomPhrase();
var minUnits = ["00","15","30","45"];
var periodUnits = ["AM","PM"]

var displayDate = function(days, stripZero) {
	return spectrum_tasks_page.displayDate(days, stripZero);
};

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function taskData(addTaskSummary, addTaskDescription, addTasklocation, locationOption, labelEntry,
                  addTaskAssignee, addedDays, displayDate, addTaskSite,taskDetailsSummary,
                  taskDetailsDescription, existingCommentAuthor, existingCommentDateTime,
                  existingCommentText, taskStatus, flag) {
    this.addTaskSummary = addTaskSummary;
    this.addTaskDescription = addTaskDescription;
    this.addTasklocation = addTasklocation;
    this.locationOption = locationOption;
    this.labelEntry = labelEntry;
    this.addTaskAssignee = addTaskAssignee;
    this.addedDays = addedDays;
    this.displayDate = displayDate;
    this.addTaskSite = addTaskSite;
    this.taskDetailsSummary = taskDetailsSummary;
    this.taskDetailsDescription = taskDetailsDescription;
    this.existingCommentAuthor = existingCommentAuthor;
    this.existingCommentDateTime = existingCommentDateTime;
    this.existingCommentText = existingCommentText;
    this.taskStatus = taskStatus;
    this.flag = flag;
};

function cloneTaskData(obj) {
	return new taskData(obj["addTaskSummary"], obj["addTaskDescription"], obj["addTasklocation"],
		obj["addTasklocation"], obj["labelEntry"], obj["addTaskAssignee"], obj["addedDays"],
		obj["displayDate"], obj["addTaskSummary"], obj["addTaskDescription"]);
};

taskInformation.prototype.addTaskData = function(site) {
	var addTask = new taskData(phraseGen.randomPhrase(), phraseGen.randomPhrase(), location, location,
		labels, assignee, days, spectrum_tasks_page.displayDate(days, false),site);
    addTask.requesterInput = phraseGen.randomName();
    addTask.blockTime = [getRandomIntInclusive(1,12).toString().trim(),
        minUnits[getRandomIntInclusive(0,3)],
        periodUnits[getRandomIntInclusive(0,1)]];
    addTask.blockDate = datePicker.blockTaskDate(days);
    addTask.blockDisplayTime = addTask.blockTime[0]+':'+addTask.blockTime[1]+' '+
        addTask.blockTime[2];
    return addTask;
};

taskInformation.prototype.addTaskDataUser2 = function() {
	return new taskData(phraseGen.randomPhrase(), phraseGen.randomPhrase(), location, location,
		labels, assignee, days, spectrum_tasks_page.displayDate(days, false),site);
};

taskInformation.prototype.addTaskDatePickerData = function(daysAdded,site) {
	return new taskData(phraseGen.randomPhrase(), phraseGen.randomPhrase(), location, location,
		labels, assignee, daysAdded, spectrum_tasks_page.displayDate(daysAdded, false),site);
};

taskInformation.prototype.addTaskLocation2Data = function(site,location) {
	return new taskData(phraseGen.randomPhrase(), phraseGen.randomPhrase(), location,
		location, labelEdit, assigneeEdit, daysEdit, spectrum_tasks_page.displayDate(daysEdit,
            false), site);
};

taskInformation.prototype.editTaskValues = function(value, status, obj) {
	var editTaskTest = cloneTaskData(obj);
	for (var count = 0; count < value.length; count++) {
		if (value[count] == "taskDetailsSummary"||value[count] == "addTaskSummary") {
			editTaskTest.taskDetailsSummary = phraseGen.randomPhrase();
			editTaskTest.addTaskSummary = editTaskTest["taskDetailsSummary"];
		} else if (value[count] == "taskDetailsDescription"||value[count] == "addTaskDescription") {
			editTaskTest.taskDetailsDescription = phraseGen.randomPhrase();
			editTaskTest.addTaskDescription = editTaskTest["taskDetailsDescription"];
		} else if (value[count] == "addTasklocation" || value[count] == "locationOption") {
			editTaskTest.addTasklocation = locationEdit;
			editTaskTest.locationOption = locationEdit;
		} else if (value[count] == "addedDays") {
			editTaskTest.addedDays = daysEdit;
			editTaskTest.displayDate = spectrum_tasks_page.displayDate(editTaskTest["addedDays"], false)
			editTaskTest.displayDateAlt = spectrum_tasks_page.commentDate(editTaskTest["addedDays"], true);
		} else if (value[count] == "addTaskAssignee") {
			editTaskTest.addTaskAssignee = assigneeEdit;
		} else if (value[count] == "labelEntry") {
			editTaskTest.labelEntry = labelEdit;
		}
	}
	editTaskTest.requesterInput = obj.requesterInput;
	editTaskTest.blockDate = obj.blockDate;
	editTaskTest.blockTime = obj.blockTime;
	editTaskTest.blockDisplayTime = obj.blockDisplayTime;
	editTaskTest.existingCommentAuthor = user2;
	editTaskTest.existingCommentDateTime = spectrum_tasks_page.commentDate(0, false);
	editTaskTest.existingCommentText = comment;
	editTaskTest.taskStatus = status;
	if (editTaskTest["taskStatus"] == "blocked") {
		editTaskTest.flag = "taskBlocked"
	} else if (editTaskTest["taskStatus"] == "Complete") {
		editTaskTest.flag = "taskComplete"
	} else if (editTaskTest["taskStatus"] == "canceled") {
		editTaskTest.flag = "taskCanceled"
	} else {
	}

	return editTaskTest;
};

taskInformation.prototype.task001Entry = function() {
	return [ "addTaskSummary", "addTaskAssignee" ];
};

taskInformation.prototype.task001 = function() {
	var task001 = new taskData();
	task001.addTaskSummary = "Task 001";
	task001.taskDetailsSummary = task001["addTaskSummary"]
	task001.taskStatus = "on hold";
	task001.addTaskAssignee = "Test User2"
	return task001;
};

taskInformation.prototype.task002Entry = function() {
	return [ "addTaskSummary", "addTaskAssignee" ];
};

taskInformation.prototype.task002 = function() {
	var task002 = new taskData();
	task002.addTaskSummary = "Task 002";
	task002.taskStatus = "in progress";
	task002.addTaskAssignee = "Test User2"
	return task002;
};

taskInformation.prototype.task003Entry = function() {
	return [ "addTaskSummary", "labelEntry", "addTaskAssignee" ];
};

taskInformation.prototype.task003 = function() {
	var task003 = new taskData();
	task003.addTaskSummary = "Task 003";
	task003.taskStatus = "in progress";
	task003.labelEntry = [ 'label 3', 'label 4' ];
	task003.addTaskAssignee = "Test User1"
	return task003;
};

taskInformation.prototype.task004Entry = function() {
	return [ "addTaskSummary", "labelEntry", "addedDays", "addTasklocation", "addTaskDescription", "addTaskAssignee" ];
};

taskInformation.prototype.task004 = function() {
	var task004 = new taskData();
	task004.addTaskSummary = "Task 004";
	task004.addedDays = 5;
	task004.displayDate = displayDate(5, true);
	task004.addTasklocation = "location 1";
	task004.taskStatus = "in progress";
	task004.labelEntry = [ 'label 1', 'label 2' ];
	task004.addTaskAssignee = "Test User1";
	task004.existingCommentText = "a really well thought out test comment";
	task004.existingCommentAuthor = "Test User1";
	task004.existingCommentDateTime = displayDate(0, false);
	task004.addTaskDescription = "a great description 1";
	task004.taskDetailsDescription = task004["addTaskDescription"];
	return task004;
};

taskInformation.prototype.task005Entry = function() {
	return [ "addTaskSummary", "addTaskDescription", "addTaskAssignee" ];
};

taskInformation.prototype.task005 = function() {
	var task005 = new taskData();
	task005.addTaskSummary = "Task 005";
	task005.taskStatus = "in progress";
	task005.addTaskAssignee = "Test User1";
	task005.addTaskDescription = "a great description 2";
	task005.flag = "taskBlocked"
	return task005;
};

taskInformation.prototype.task006Entry = function() {
	return [ "addTaskSummary", "addTaskAssignee" ];
};

taskInformation.prototype.task006 = function() {
	var task006 = new taskData();
	task006.addTaskSummary = "Task 006";
	task006.taskStatus = "canceled";
	task006.flag = "taskCanceled"
	task006.addTaskAssignee = "Test User1";
	return task006;
};

taskInformation.prototype.task007Entry = function() {
	return [ "addTaskSummary", "addTaskAssignee" ];
};

taskInformation.prototype.task007 = function() {
	var task007 = new taskData();
	task007.addTaskSummary = "Task 007";
	task007.addTaskAssignee = "Test User2";
	task007.taskStatus = "complete";
	task007.flag = "taskComplete"
	return task007;
};

taskInformation.prototype.task008Entry = function() {
	return [ "addTaskSummary", "labelEntry", "addedDays", "addTasklocation", "addTaskAssignee" ];
};

taskInformation.prototype.task008 = function() {
	var task008 = new taskData();
	task008.addTaskSummary = "Task 008";
	task008.addedDays = 5;
	task008.displayDate = displayDate(5, true);
	task008.addTasklocation = "location 2";
	task008.taskStatus = "in progress";
	task008.labelEntry = [ 'label 1', 'label 3' ];
	task008.addTaskAssignee = "Test User2";
	task008.existingCommentAuthor = "Test User2";
	task008.existingCommentDateTime = displayDate(0, false);
	task008.existingCommentText = "a really well thought out test comment";
	return task008;
};

taskInformation.prototype.task009Entry = function() {
	return [ "addTaskSummary", "labelEntry", "addTasklocation", "addTaskAssignee", "addTaskDescription", "addedDays" ];
};

taskInformation.prototype.task009 = function() {
	var task009 = new taskData();
	task009.addTaskSummary = "Task 009";
	task009.addedDays = 1;
	task009.displayDate = displayDate(1, true);
	task009.addTasklocation = "location 1";
	task009.taskStatus = "in progress";
	task009.labelEntry = [ 'label 1', 'label 4' ];
	task009.addTaskAssignee = "Test User1";
	task009.existingCommentAuthor = "Test User1";
	task009.existingCommentDateTime = displayDate(0, false);
	task009.existingCommentText = "a really well thought out test comment";
	task009.addTaskDescription = "a great description 1";
	return task009;
};

taskInformation.prototype.task010Entry = function() {
	return [ "addTaskSummary", "labelEntry", "addTasklocation", "addTaskAssignee", "addedDays", "addTaskDescription" ];
};

var task010OBJ = function() {
	var task010 = new taskData();
	task010.addTaskSummary = "Task 010";
	task010.addedDays = 2;
	task010.displayDate = displayDate(2, true);
	task010.addTasklocation = "location 2";
	task010.taskStatus = "in progress";
	task010.labelEntry = [ 'label 2', 'label 4' ];
	task010.addTaskAssignee = "Test User1";
	task010.existingCommentAuthor = "Test User2";
	task010.existingCommentDateTime = displayDate(0, false);
	task010.existingCommentText = "a really well thought out test comment 2";
	task010.addTaskDescription = "a great description 2";
	return task010;
}

taskInformation.prototype.task010 = function() {
	return task010OBJ();
};

taskInformation.prototype.task010Clone = function() {
	var task010Clone = cloneTaskData(task010OBJ());
	task010Clone.existingCommentAuthor = "Test User1";
	task010Clone.existingCommentDateTime = displayDate(0, false);
	task010Clone.existingCommentText = "a really well thought out test comment";
	return task010Clone;

}

taskInformation.prototype.task011Entry = function() {
	return [ "addTaskSummary", "addTaskAssignee" ];
};

taskInformation.prototype.task011 = function() {
	var task011 = new taskData();
	task011.addTaskSummary = "Task 011";
	task011.addTaskAssignee = "Test User1";
	task011.taskStatus = "not started";
	return task011;
};

taskInformation.prototype.task012Entry = function() {
	return [ "addTaskSummary", "addedDays", "addTaskAssignee" ];
};

taskInformation.prototype.task012 = function() {
	var task012 = new taskData();
	task012.addTaskSummary = "Task 012";
	task012.addedDays = 0;
	task012.displayDate = displayDate(0, true);
	task012.taskStatus = "in progress";
	task012.addTaskAssignee = "Test User2"
	return task012;
};

taskInformation.prototype.task013Entry = function() {
	return [ "addTaskSummary", "addTaskAssignee" ];
};

taskInformation.prototype.task013 = function() {
	var task013 = new taskData();
	task013.addTaskSummary = "Task 013";
	task013.taskStatus = "in progress";
	task013.addTaskAssignee = "Test User2"
	return task013;
};

taskInformation.prototype.task014Entry = function() {
	return [ "addTaskSummary", "addTaskAssignee" ];
};

taskInformation.prototype.task014 = function() {
	var task014 = new taskData();
	task014.addTaskSummary = "Task 014";
	task014.taskStatus = "in progress";
	task014.addTaskAssignee = "Test User2"
	return task014;
};

taskInformation.prototype.task015Entry = function() {
	return [ "addTaskSummary", "addTaskAssignee" ];
};

taskInformation.prototype.task015 = function() {
	var task015 = new taskData();
	task015.addTaskSummary = "Task 015";
	task015.taskStatus = "in progress";
	task015.addTaskAssignee = "Test User2";
	return task015;
};

exports.taskInformation = new taskInformation();