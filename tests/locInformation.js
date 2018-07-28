var locInformation = function(){
};

var phraseGen = require('../pages/phraseGen.js').phraseGen;
var spectrum_tasks_page = require('../pages/spectrum_tasks_page.js').spectrum_tasks_page;

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function locData(name, type, description,location,child){
    this.name = name;
    this.type = type;
    this.description = description;
    this.location = location;
    this.child = child;
};

function cloneLoc(obj){
    return new locData(obj["name"],obj["type"],obj["description"],obj["location"],obj["child"])
};

locInformation.prototype.cloneALoc = function(obj){
    return cloneLoc(obj)
};

locInformation.prototype.editLoc = function(obj,value){
    var editLoc = cloneLoc(obj);
    for (var count = 0; count < value.length; count++) {
        if(value[count]==="name"||value[count]==="type"){
            editLoc[value[count]] = phraseGen.randomLabel()+getRandomIntInclusive(1,10)
        }else if(value[count]==="description"){
            editLoc[value[count]] = phraseGen.randomPhrase()
        }else if(value[count]==="reading"){
            editLoc[value[count]] = [phraseGen.randomLabel()+getRandomIntInclusive(1,10),
                "Status","On/Off"]
        } else {
            editLoc["location"] = value[count]
        }
    }
    return editLoc;
}

locInformation.prototype.testLoc = function(loc){
    var data = new locData(
        phraseGen.randomLabel()+getRandomIntInclusive(1,10),
        phraseGen.randomLabel()+getRandomIntInclusive(1,10),
        phraseGen.randomPhrase(),
        loc
    )
    data.reading = [phraseGen.randomLabel()+getRandomIntInclusive(1,10),"Value","0-10"];
    return data;
};


exports.locInformation = new locInformation();
