var datePicker = function() {
};
var basePage = require('./page.js').page;
var locatorMap = new Map();
 locatorMap.set("datePickerParent", by.xpath("//div[@class='datepicker']"));
locatorMap.set("datePickerNextMonth", by.xpath(".//a[contains(@class,'next')]"));
locatorMap.set("datePickerCurrentMonth", by.xpath(".//span[@class='datepicker__current-month']"));
locatorMap.set("datePickerCustom", by.xpath(".//div[@class='datepicker__custom']"));
locatorMap.set("datePickerNow", by.xpath(".//div[contains(@class,'now')]"));
locatorMap.set("datePickerToday", by.xpath(".//div[contains(@class,'today')]"));
locatorMap.set("datePickerTomorrow", by.xpath(".//div[contains(@class,'tomorrow')]"));
locatorMap.set("1", by.xpath(".//div[contains(@class,'datepicker__day')] [.='1']"));
locatorMap.set("2", by.xpath(".//div[contains(@class,'datepicker__day')] [.='2']"));
locatorMap.set("3", by.xpath(".//div[contains(@class,'datepicker__day')] [.='3']"));
locatorMap.set("4", by.xpath(".//div[contains(@class,'datepicker__day')] [.='4']"));
locatorMap.set("5", by.xpath(".//div[contains(@class,'datepicker__day')] [.='5']"));
locatorMap.set("6", by.xpath(".//div[contains(@class,'datepicker__day')] [.='6']"));
locatorMap.set("7", by.xpath(".//div[contains(@class,'datepicker__day')] [.='7']"));
locatorMap.set("8", by.xpath(".//div[contains(@class,'datepicker__day')] [.='8']"));
locatorMap.set("9", by.xpath(".//div[contains(@class,'datepicker__day')] [.='9']"));
locatorMap.set("10", by.xpath(".//div[contains(@class,'datepicker__day')] [.='10']"));
locatorMap.set("11", by.xpath(".//div[contains(@class,'datepicker__day')] [.='11']"));
locatorMap.set("12", by.xpath(".//div[contains(@class,'datepicker__day')] [.='12']"));
locatorMap.set("13", by.xpath(".//div[contains(@class,'datepicker__day')] [.='13']"));
locatorMap.set("14", by.xpath(".//div[contains(@class,'datepicker__day')] [.='14']"));
locatorMap.set("15", by.xpath(".//div[contains(@class,'datepicker__day')] [.='15']"));
locatorMap.set("16", by.xpath(".//div[contains(@class,'datepicker__day')] [.='16']"));
locatorMap.set("17", by.xpath(".//div[contains(@class,'datepicker__day')] [.='17']"));
locatorMap.set("18", by.xpath(".//div[contains(@class,'datepicker__day')] [.='18']"));
locatorMap.set("19", by.xpath(".//div[contains(@class,'datepicker__day')] [.='19']"));
locatorMap.set("20", by.xpath(".//div[contains(@class,'datepicker__day')] [.='20']"));
locatorMap.set("21", by.xpath(".//div[contains(@class,'datepicker__day')] [.='21']"));
locatorMap.set("22", by.xpath(".//div[contains(@class,'datepicker__day')] [.='22']"));
locatorMap.set("23", by.xpath(".//div[contains(@class,'datepicker__day')] [.='23']"));
locatorMap.set("24", by.xpath(".//div[contains(@class,'datepicker__day')] [.='24']"));
locatorMap.set("25", by.xpath(".//div[contains(@class,'datepicker__day')] [.='25']"));
locatorMap.set("26", by.xpath(".//div[contains(@class,'datepicker__day')] [.='26']"));
locatorMap.set("27", by.xpath(".//div[contains(@class,'datepicker__day')] [.='27']"));
locatorMap.set("28", by.xpath(".//div[contains(@class,'datepicker__day')] [.='28']"));
locatorMap.set("29", by.xpath(".//div[contains(@class,'datepicker__day')] [.='29']"));
locatorMap.set("30", by.xpath(".//div[contains(@class,'datepicker__day')] [.='30']"));
locatorMap.set("31", by.xpath(".//div[contains(@class,'datepicker__day')] [.='31']"));

var MonthMap = new Map();
MonthMap.set("January", "01");
MonthMap.set("February", "02");
MonthMap.set("March", "03");
MonthMap.set("April", "04");
MonthMap.set("May", "05");
MonthMap.set("June", "06");
MonthMap.set("July", "07");
MonthMap.set("August", "08");
MonthMap.set("September", "09");
MonthMap.set("October", "10");
MonthMap.set("November", "11");
MonthMap.set("December", "12");
MonthMap.set("Jan", "01");
MonthMap.set("Feb", "02");
MonthMap.set("Mar", "03");
MonthMap.set("Apr", "04");
MonthMap.set("May", "05");
MonthMap.set("Jun", "06");
MonthMap.set("Jul", "07");
MonthMap.set("Aug", "08");
MonthMap.set("Sep", "09");
MonthMap.set("Oct", "10");
MonthMap.set("Nov", "11");
MonthMap.set("Dec", "12");
MonthMap.set("01","January");
MonthMap.set("02","February");
MonthMap.set("03","March");
MonthMap.set("04","April");
MonthMap.set("05","May");
MonthMap.set("06", "June");
MonthMap.set("07","July");
MonthMap.set("08","August");
MonthMap.set("09","September");
MonthMap.set("10","October");
MonthMap.set("11","November");
MonthMap.set("12","December");

flow = protractor.promise.controlFlow();
function waitOne() {
	return protractor.promise.delayed(1500);
}

function sleep() {
	flow.execute(waitOne);
};

var wait = basePage.globalWait();

var waitThenClick = function(element){
	return basePage.waitThenClick(element);
};


datePicker.prototype.testDate = function(value) {
	var testday = tomorrow + value;
	if (testday < 10) {
		displayTomorrow = '0' + testday
	}
	var testDate = mm + '/' + displayTomorrow + '/' + yyyy;
	return testDate.toString()
};

/**
 * elements
 */
var datPickerParent = function() {
	return element(by.xpath("//div[@class='datepicker']"));
};

var currentDateElement = function() {
	return datPickerParent().element(locatorMap.get("datePickerCurrentMonth"));
};

var nextMonthElement = function() {
	return datPickerParent().element(by.xpath(".//a[contains(@class,'next')]"))
};

var nowTodayTmrw = function(value) {
	return datPickerParent().element(by.xpath(".//div[@class='datepicker__custom']")).element(
			locatorMap.get(value));
};

/**
 * actions
 */
var clickNow = function() {
    basePage.waitThenClick(nowTodayTmrw("datePickerNow"),"date picker now button");
};

var clickToday = function() {
    basePage.waitThenClick(nowTodayTmrw("datePickerToday"),"date picker today button");
};

var clickTomorrow = function() {
    basePage.waitThenClick(nowTodayTmrw("datePickerTomorrow"),"date picker tomorrow button");
};

var checkMonth = function(month, day) {
    return browser.wait(protractor.ExpectedConditions.presenceOf(currentDateElement()), wait)
           .then(
               function(){
                   currentDateElement().getText().then(function(text) {
                       var splitDate = text.split(' ');
                       var splitDatNumber = MonthMap.get(splitDate[0]);
                       if (splitDatNumber != month) {
                           clickNextMonth(month, day);
                       } else {
                           clickDay(day);
                       }
                   }, function(err) {
                       throw err;
                   });
               },function(err){
                   throw err;
               }
           )
};

var clickDay = function(day) {
	if (day >= 25) {
		waitThenClick(element.all(locatorMap.get(day.toString())).last());
	} else {
		waitThenClick(element.all(locatorMap.get(day.toString())).first());
	}
};

var clickNextMonth = function(month, day) {
	waitThenClick(nextMonthElement()).then(
		function() {
			checkMonth(month, day);
		},function(err) {
			throw err;
		});
};

var testDate = function(daystoadd) {
	var days = daystoadd;
	var date = new Date();
	date.setDate(date.getDate() + parseInt(days));
	var dateArray = date.toString().split(' ');
	var mm = MonthMap.get(dateArray[1]).toString();
	var dd = dateArray[2].toString();
	var yyyy = dateArray[3];
	return [ mm, dd, yyyy ];
}
function parseDate(daystoadd, stripZero) {
    var date = testDate(daystoadd);
    var mm;
    var dd = date[1];
    var yyyy = date[2];
    if (stripZero == true) {
        mm = date[0].replace(/^(0+)/g, '');
    } else {
        mm = date[0];
    }
    return {mm: mm, dd: dd, yyyy: yyyy};
}
/**
 * services
 */
datePicker.prototype.displayDate = function(daystoadd, stripZero) {
    var __ret = parseDate(daystoadd, stripZero);
    return __ret.yyyy+"-"+__ret.mm+"-"+__ret.dd;
};

datePicker.prototype.distributeDate = function(daystoadd, stripZero) {
    var __ret = parseDate(daystoadd, stripZero);
    return __ret.yyyy+"-"+__ret.mm;
};


datePicker.prototype.roundDate = function(daystoadd){
	var date = testDate(daystoadd);
	var mm = MonthMap.get(date[0]);
	var dd = date[1].replace(/^(0+)/g, '');;
	var yyyy = date[2];
	return mm + " " + dd + " " + yyyy;
};

datePicker.prototype.commentDate = function(daystoadd, stripZero){
    var __ret = parseDate(daystoadd, stripZero);
	return __ret.mm + "/" + __ret.dd + "/" + __ret.yyyy;
};

datePicker.prototype.blockTaskDate = function (daystoadd) {
	var date = testDate(daystoadd);
	var mm = MonthMap.get(date[0]);
	var dd = date[1].replace(/^(0+)/g, '');
	return dd+' '+mm;
}

datePicker.prototype.useDatePicker = function(daystoadd) {
	var date = testDate(daystoadd);
	var mm = date[0];
	var dd = date[1].replace(/^(0+)/g, '');
	return checkMonth(mm, dd);
};

datePicker.prototype.useNow = function() {
	clickNow();
};

datePicker.prototype.useToday = function() {
	clickToday();
};

datePicker.prototype.useTmrw = function() {
	clickTomorrow();
};

exports.datePicker = new datePicker();