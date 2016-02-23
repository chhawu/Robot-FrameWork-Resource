// FET Version 1.1
//Separator for splitting commands
var SEPARATOR = "  ";
var Header="";

//Mapping for Selenium Commands -> Selenium Robot Keywords
var KEYWORDS = {
  assertConfirmation: "Alert Should Be Present",
  assertElementPresent: "Page Should Contain Element",
  assertTable: "Element Should Contain",
  assertText: "Element Should Contain",
  assertTitle: "Title Should Be",
  assertValue: "Element Should Contain",
  assertVisible: "Page Should Contain Element",
  click: "Click Element",
  clickAndWait: "Click Element",
  close: "Close Browser",
  doubleClick: "Double Click Element",
  doubleClickAndWait: "Double Click Element",
  goBack: "Go Back",
  goBackAndWait: "Go Back",
  open: "open browser",
  runScript: "Execute Javascript",
  runScriptAndWait: "Execute Javascript",
  select: "Select From List",
  selectAndWait: "Select From List",
  setSpeed: "Set Selenium Timeout",
  setSpeedAndWait: "Set Selenium Timeout",
  type: "Input Text",
  verifyAlert: "Alert Should Be Present",
  verifyElementPresent: "Page Should Contain Element",
  verifyTable: "Element Should Contain",
  verifyText: "Element Should Contain",
  verifyTitle: "Title Should Be",
  verifyValue: "Element Should Contain",
  verifyVisible: "Page Should Contain Element",
  waitForElementPresent: "Page Should Contain Element",
  waitForTable: "Element Should Contain",
  waitForText: "Element Should Contain",
  waitForTitle: "Title Should Be",
  waitForValue: "Element Should Contain",
  waitForVisible: "Page Should Contain Element"
};

//converts the test case respectively the single command into the target format
function formatCommands(testCase,commands) {
  var result = Header;
  for (var i = 0; i < commands.length; i++) {
    var command = commands[i];
    if (command.type == 'command') {
      var keyword = KEYWORDS[command.command];
      if(keyword == null){
          keyword = "Call Selenium Api  " + command.command;
      }
          var target = command.target.replace(/id1111=/, '');
          if (keyword == 'open browser'){
               var target = testCase.getBaseURL()+command.target + '    gc';
          }
      result += "\t" + keyword + SEPARATOR + target + SEPARATOR + command.value + "\n";
      keyword = null;
    }
  }
  return result;
}

//takes the source of the recorded test case and maps it on a test case object
function parse(testCase, source) {
  var doc = source;
  var commands = [];
  while (doc.length > 0) {
    var line = /(.*)(\r\n|[\r\n])?/.exec(doc);
    var array = line[1].split(SEPARATOR);
    if (array.length >= 3) {
      var command = new Command();
      command.command = array[0];
      command.target = array[1];
      command.value = array[2];
      commands.push(command);
    }
    doc = doc.substr(line[0].length);
  }
  testCase.setCommands(commands);
}

//delegate to the formatCommands-method
function format(testCase, name) {
  buildHeader(testCase);
  return formatCommands(testCase,testCase.commands);
}

//build header
function buildHeader(testCase){
  Header="*** Settings ***\n"+
                   "Library           Selenium2Library\n\n"+
                   "*** Test Cases ***\n\n"+
                   testCase.getTitle()+"\n"+
                   "\tset selenium speed    0.5\n";  
}
