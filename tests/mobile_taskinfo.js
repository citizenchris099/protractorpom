/**
 * Created by chrismanning on 3/1/17.
 */
var mobile_tasninfo = function () {
};
var phraseGen = require('../pages/phraseGen.js').phraseGen;

function mobileTaskData(taskSummary,taskDescription,siteToTest,team,user) {
    this.taskSummary = taskSummary;
    this.taskDescription = taskDescription;
    this.siteToTest = siteToTest;
    this.team = team;
    this.user = user;
};

mobile_tasninfo.prototype.mobileTaskDataInfo = function (siteToTest,team,user) {
    return new mobileTaskData(phraseGen.randomPhrase(), phraseGen.randomPhrase(),
        siteToTest,team,user);
};

exports.mobile_tasninfo = new mobile_tasninfo();