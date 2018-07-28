var procRoundInformation = function(){
};

var phraseGen = require('../pages/phraseGen.js').phraseGen;
var datePicker = require('../pages/datePicker.js').datePicker;

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var days = 4;
var perform = ["Hourly","Daily","Weekly","Bi-Weekly","Monthly","Quarterly","Semi-Annually",
    "Annually"];
var every = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var units = ["Minute(s)","Hour(s)","Day(s)","Week(s)","Month(s)"];
var minUnits = ["00","15","30","45"];
var periodUnits = ["AM","PM"]

function procRoundData(name, duration,landS,perform,every,startingOn,team,within,units,
                       time){
    this.name = name;
    this.duration = duration;
    this.landS = landS;
    this.perform = perform;
    this.every = every;
    this.startingOn = startingOn;
    this.team = team;
    this.within = within;
    this.units = units;
    this.time = time;
};

function cloneProcRound(obj){
    return new procRoundData(obj["name"],obj["duration"],obj["landS"],obj["perform"],
        obj["every"],obj["startingOn"],obj["team"],obj["within"],
        obj["units"],obj["hour"],obj["min"],obj["amPm"],obj["stepDescription"],obj["locAsset"])
};

procRoundInformation.prototype.cloneAProcRound = function(obj){
    return cloneProcRound(obj)
};

procRoundInformation.prototype.editProcRound = function(obj,value){
    var editProcRound = cloneProcRound(obj);
    for (var count = 0; count < value.length; count++) {
        if(value[count]==="name"||value[count]==="type"){
            editProcRound[value[count]] = phraseGen.randomLabel()+getRandomIntInclusive(1,10)
        }else if(value[count]==="description"){
            editProcRound[value[count]] = phraseGen.randomPhrase()
        }else {
            editProcRound["status"] = value[count]
        }
    }
    return editProcRound;
}

procRoundInformation.prototype.testProcRound = function(frequency, landS,assignee, locAsset,fixedTime){
    var round = new procRoundData(
        phraseGen.randomLabel()+getRandomIntInclusive(1,10),
        getRandomIntInclusive(1,10).toString(),
        landS,
        perform[frequency],
        every[getRandomIntInclusive(0,7)],
        days,
        assignee,
        getRandomIntInclusive(1,10).toString().trim(),
        units[getRandomIntInclusive(0,4)],
        [getRandomIntInclusive(1,12).toString().trim(), minUnits[getRandomIntInclusive(0,3)],
        periodUnits[getRandomIntInclusive(0,1)]]
    )
    round.steps = [["1",phraseGen.randomPhrase(),locAsset["name"],locAsset["reading"][0],
        round["landS"]]]
    round.everyInput = getRandomIntInclusive(2,6).toString();
    round.rowName = round["perform"]+"-"+round["name"];
    if(round["units"]==="Minute(s)"){
        round.durationDetail = round["within"]+" "+"mins"
    }else{
        round.durationDetail = round["within"]+" "+round["units"]
                .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
                .replace(/[A-Z]/g,"$&").toLowerCase();
    }
	if (typeof fixedTime != 'undefined'){
		round.time = ["1","00","PM"];
		round.time2 = ["6","00","PM"];
	}else {
		round.time2 = [getRandomIntInclusive(1,12).toString().trim(), minUnits[getRandomIntInclusive(0,3)],
			periodUnits[getRandomIntInclusive(0,1)]]
    }
    round.durationDetail2 = round.duration+" min"
    round.displayTime = round["time"][0]+":"+round["time"][1]+" "+round["time"][2];
    round.displayDate = datePicker.roundDate(round["startingOn"])

    return round;
};


exports.procRoundInformation = new procRoundInformation();
