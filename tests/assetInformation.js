var assetInformation = function(){
};

var phraseGen = require('../pages/phraseGen.js').phraseGen;
var spectrum_tasks_page = require('../pages/spectrum_tasks_page.js').spectrum_tasks_page;


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var days = 30;
var days2 = 30;

function assetData(name, type, description, status,notes,serialNumber,vendor,vendorContactName,
                   vendorContactPhone,purchasePrice,lifespan,warrantyContactName,
                   warrantyContactPhone,purchaseDate,purchaseDateDisplay,warrantyExpirationDate,
                   warrantyExpirationDateDisplay,Manufacturer,Model,location,reading){
    this.name = name;
    this.type = type;
    this.description = description;
    this.status = status;
    this.notes = notes;
    this.serialNumber = serialNumber;
    this.vendor = vendor;
    this.vendorContactName = vendorContactName;
    this.vendorContactPhone = vendorContactPhone;
    this.purchasePrice = purchasePrice;
    this.lifespan = lifespan;
    this.warrantyContactName = warrantyContactName;
    this.warrantyContactPhone = warrantyContactPhone;
    this.purchaseDate = purchaseDate;
    this.purchaseDateDisplay = purchaseDateDisplay;
    this.warrantyExpirationDate = warrantyExpirationDate;
    this.warrantyExpirationDateDisplay = warrantyExpirationDateDisplay;
    this.Manufacturer = Manufacturer;
    this.Model = Model;
    this.location = location;
    this.reading = reading;
};

function cloneAsset(obj){
    return new assetData(obj["name"],obj["type"],obj["description"],obj["status"],obj["notes"],
    obj["serialNumber"],obj["vendor"],obj["vendorContactName"],obj["vendorContactPhone"],
    obj["purchasePrice"],obj["lifespan"],obj["warrantyContactName"],obj["warrantyContactPhone"],
    obj["purchaseDate"],obj["purchaseDateDisplay"],obj["warrantyExpirationDate"],
        obj["warrantyExpirationDateDisplay"],obj["Manufacturer"],obj["Model"],obj["location"],
        obj["reading"])
};

assetInformation.prototype.cloneAnAsset = function(obj){
    return cloneAsset(obj)
};

assetInformation.prototype.editAsset = function(obj,value){
    var editAsset = cloneAsset(obj);
    for (var count = 0; count < value.length; count++) {
        if(value[count]==="name"||value[count]==="type"){
            editAsset[value[count]] = phraseGen.randomLabel()+getRandomIntInclusive(1,10)
        }else if(value[count]==="description"){
            editAsset[value[count]] = phraseGen.randomPhrase()
        }else if(value[count]==="reading"){
            editAsset[value[count]] = [phraseGen.randomLabel()+getRandomIntInclusive(1,10),
                "Status","On/Off"]
        } else {
            editAsset["status"] = value[count]
        }
    }
    return editAsset;
}

assetInformation.prototype.testAsset = function(status,loc){
    var asset = new assetData(
        phraseGen.randomLabel()+getRandomIntInclusive(1,10),
        phraseGen.randomLabel()+getRandomIntInclusive(1,10),
        phraseGen.randomPhrase(),
        status,
        phraseGen.randomPhrase(),
        phraseGen.randomInt(15),
        phraseGen.randomPhrase(),
        phraseGen.randomName(),
    "214"+phraseGen.randomInt(7),
        phraseGen.randomInt(6),
        phraseGen.randomInt(3),
        phraseGen.randomName(),
    "214"+phraseGen.randomInt(7),
        days,
        spectrum_tasks_page.commentDate(days, false),
        days2,
        spectrum_tasks_page.commentDate(days2, false),
        phraseGen.randomLabel()+getRandomIntInclusive(1,10),
        phraseGen.randomLabel()+getRandomIntInclusive(1,10),
        loc,
        [phraseGen.randomLabel()+getRandomIntInclusive(1,10),"Value","0-10"]
    )
    return asset
};


exports.assetInformation = new assetInformation();
