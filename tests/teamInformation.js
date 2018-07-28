var teamInformation = function() {
};

var phraseGen = require('../pages/phraseGen.js').phraseGen;

function teamData(teamName, description, membersNumber, sitesNumber, members, sites, enabled) {
	this.teamName = teamName;
	this.description = description;
	this.membersNumber = membersNumber;
	this.sitesNumber = sitesNumber;
	this.members = members;
	this.sites = sites;
	this.enabled = enabled;
};

teamInformation.prototype.tt001 = function() {
	var tt001 = new teamData();
	tt001.teamName = "team 1";
	tt001.description = "does the work assigned to team 1";
	tt001.membersNumber = "2";
	tt001.sitesNumber = "2";
	tt001.members = [ "Test User1", "Test User2" ];
	tt001.sites = [ "site 1", "site 2" ];
	tt001.enabled = "Team Enabled";
	return tt001;
};

teamInformation.prototype.tt003 = function() {
	var tt001 = new teamData();
	tt001.teamName = "team 3";
	tt001.description = "does the work assigned to team 3";
	tt001.membersNumber = "2";
	tt001.sitesNumber = "2";
	tt001.members = [ "Test User1", "Test User2" ];
	tt001.sites = [ "site 3" ];
	tt001.enabled = "Team Enabled";
	return tt001;
};

teamInformation.prototype.newTeam = function(teamName, description, membersNumber,
											 sitesNumber, members, sites, enabled){
	return new teamData(teamName, description, membersNumber, sitesNumber, members, sites, enabled);
};

exports.teamInformation = new teamInformation();