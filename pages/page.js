var page = function() {
};

var flow = protractor.promise.controlFlow();
function waitOne() {
    return protractor.promise.delayed(500);
}

function sleep() {
    flow.execute(waitOne);
};

var wait = 30000;
var altWait = 60000;

var chkElementPresent = function(locator) {
	browser.driver.wait(function() {
		return browser.driver.isElementPresent(locator);
	});
};

page.prototype.interstitial = function () {
    return  element(by.xpath("//g[@class='counterclockwise']"));
};


page.prototype.textCheck = function(element, string) {
	expect(element.getText()).toEqual(string);
};

page.prototype.displayCheck = function(element, display) {
	expect(element.isDisplayed()).toBe(display);
};

page.prototype.findElement = function(parent, child) {
	return browser.driver.findElement(parent).findElement(child);
};

page.prototype.findElements = function(parent, child) {
	return browser.driver.findElement(parent).findElements(child);
};

var toastMain = function () {
    return element(by.xpath("//div[@class='sysmsgwrap']"))
};

page.prototype.toastMsg = function (value) {
    return toastMain().element(by.xpath(".//*[contains(text(),'"+value+"')]"));
};

page.prototype.closeToastMsg = function() {
    return toastMain().element(by.xpath(".//div[@class='sysmsg-content-close']"))
};

page.prototype.closeModal = function (value,cancelElement) {
    var self = this;
    return browser.wait(protractor.ExpectedConditions.presenceOf(self.toastMsg(value)), wait).then(
        function () {
            // self.waitThenClick(self.closeToastMsg(),"toast msg")
        },function (err) {
            var error = err;
            cancelElement.isPresent().then(function (isVisible) {
                if (isVisible) {
                    self.waitThenClick(cancelElement,'cancel element').then(
                        function () {
                            throw new Error("toast msg containing "+value+" not found and could not make" +
                                " it passed the modal: "+error.stack+"\n -----------");
                        })
                }else{
                    throw new Error("toast msg containing "+value+" not found: "+error.stack+"\n" +
                        " -----------");
                }
            })
        })
}


page.prototype.dynamicSendKeysLoop = function(parent, child, value, msg) {
    msg = msg || "task label field"
    var toUse = element(parent).element(child);
    var self = this;
    self.waitThenClick(toUse, msg).then(
		function(){
			for (var count = 0; count < value.length; count++) {
				browser.actions().sendKeys(value[count], protractor.Key.ENTER).perform();
				sleep();
			}
		},function(err){
			throw err;
		}
	)
};

var waitUntilReady = function (elm) {
    browser.wait(function () {
        return elm.isPresent();
    },10000);
    browser.wait(function () {
        return elm.isDisplayed();
    },10000);
};

page.prototype.interstitialWait = function (element) {
    return browser.wait(function() {
        return element.isPresent().then(function(present) {
            return !present;
        })
    });
}

page.prototype.waitThenClick = function(element, msg){
    msg = msg || "element";
	return browser.wait(protractor.ExpectedConditions.elementToBeClickable(element), wait).then(
		function() {
			browser.actions().mouseMove(element).click().perform();
		},function(err){
            browser.wait(protractor.ExpectedConditions.presenceOf(element), wait).then(
                function () {
                    browser.actions().mouseMove(element).click().perform()
                },function (err) {
                    throw new Error(msg+" not found: "+err.stack+"\n -----------");
                })
		})
};

page.prototype.checkForElement = function (element,msg,expected) {
    msg = msg || "element";
        return browser.wait(protractor.ExpectedConditions.elementToBeClickable(element), wait).then(
            function () {
                if (typeof expected != 'undefined'){
                    throw new Error(msg+" found");
                }
            },function (err) {
                if(typeof expected === 'undefined'){
                    throw new Error(msg+" not found: "+err.stack+"\n -----------");
                }
            });
};

page.prototype.clickThenSendKeys = function(element,value1,value2,msg){
    msg = msg || "field";
	return browser.wait(protractor.ExpectedConditions.elementToBeClickable(element), wait).then(
		function () {
			browser.actions().mouseMove(element).click().perform().then(
				function(){
					browser.actions().mouseMove(element).sendKeys(value1 , value2).perform()
				},function (err) {
					throw err;
				})
		},function (err) {
            throw new Error(msg+" not found: "+err.stack+"\n -----------");
		})
};

var clearTextField = function (elem, length) {
    length = length || 50;
    var backspaceSeries = '';
    for (var i = 0; i < length; i++) {
        backspaceSeries += protractor.Key.BACK_SPACE;
    }
    return elem.sendKeys(backspaceSeries);
}

page.prototype.clickAndClear = function (element,tab) {
    return browser.wait(protractor.ExpectedConditions.presenceOf(element), wait).then(
        function () {
            browser.actions().mouseMove(element).click().perform().then(
                function(){
                    for(var i = 0; i < 15; i++){
                        sleep();
                        element.sendKeys(protractor.Key.ARROW_RIGHT);
                    }
                    for(var i = 0; i < 15; i++){
                        sleep();
                        element.sendKeys(protractor.Key.BACK_SPACE);
                    }
                    if(typeof tab==='undefined'){
                        sleep();
                        element.sendKeys(protractor.Key.TAB);
                    }
                },function (err) {
                    throw err;
                })
        },function (err) {
            throw err;
        })
};

page.prototype.clickClearThenSendKeys = function(element,value1,value2,msg){
    msg = msg || "field";
    return browser.wait(protractor.ExpectedConditions.presenceOf(element), wait).then(
        function () {
            browser.actions().mouseMove(element).click().perform().then(
                function(){
                    element.clear().then(
                        function () {
                            element.sendKeys(value1,value2);
                        },function (err) {
                            throw err;
                        })
                },function (err) {
                    throw err;
                })
        },function (err) {
            throw new Error(msg+" not found: "+err.stack+"\n -----------");
        })
};

var typeEachCharacter = function (element,value1) {
    for(var i = 0; i < value1.length; i++){
        sleep();
        element.sendKeys(value1.charAt(i));
    }
};

page.prototype.typeEachCharacter = function (element, value,msg) {
    msg = msg || "field";
    return browser.wait(protractor.ExpectedConditions.presenceOf(element), wait).then(
        function () {
            browser.actions().mouseMove(element).click().perform().then(
                function(){
                    typeEachCharacter(element,value);
                },function (err) {
                    throw err;
                })
        },function (err) {
            throw new Error(msg+" not found: "+err.stack+"\n -----------");
        })
};


var backSpace = function (element,value) {
    return browser.wait(protractor.ExpectedConditions.presenceOf(element), wait).then(
        function () {
            browser.actions().mouseMove(element).click().perform().then(
                function(){
                    for(var i = 0; i < value.length; i++){
                        sleep();
                        element.sendKeys(protractor.Key.BACK_SPACE);
                    }
                },function (err) {
                    throw err;
                })
        },function (err) {
            throw err
        })
};

page.prototype.backSpaceThenSendKeys = function (element,value1,value2) {
    return backSpace(element,value1).then(
        function () {
            typeEachCharacter(element,value2)
        },function (err) {
            throw err;
        })
}


page.prototype.dynamicMenuContent = function(value){
	return element(by.xpath(".//div[@class='Select-menu-outer']"))
		.element(by.xpath("./descendant::*[.='"+value+"'][1]"));
};

page.prototype.isElementPresent = function (element,boolean) {
	return expect(element.isPresent()).toBe(boolean);
};

page.prototype.isMenuContentPresent = function (element,value,boolean) {
    var self = this;
    return self.waitThenClick(element).then(
        function () {
            for (var count = 0; count < value.length; count++) {
                expect(self.dynamicMenuContent(value[count]).isPresent()).toBe(boolean);
            }
        },function (err) {
            throw err;
        })
}

page.prototype.globalWait = function(){
    return wait;
};

page.prototype.altWait = function(){
    return altWait;
};

exports.page = new page();