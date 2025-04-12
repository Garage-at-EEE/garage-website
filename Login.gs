// UNIT TEST: test for getCURRENT_DB_MAP() function
function testScriptPropDBMAP() {
  const CURRENT_DB_MAP = getCURRENT_DB_MAP();
  const testPassed = (
    CURRENT_DB_MAP.Matric_Number.ROW === 8 && 
    CURRENT_DB_MAP.New_Event_Details.ROW.NFT_Badge === 6
    );
  console.log("Test Passed? ", testPassed);
  return testPassed;
}

// UNIT TEST: test for validateCredentials() function
function testValidation() {
  const functionResult1 = validateCredentials("U12345678G","1911",true);
  const functionResult2 = validateCredentials("U12345328G","1321",true);
  const testResult = (
    functionResult1.status==='ACCESS GRANTED' && 
    functionResult2.status==='ERROR'
    );
  console.log("Test Passed? ",testResult);
  return testResult;
}

// Helper Function to get CURRENT_DB_MAP (object) from ScriptProperties
function getCURRENT_DB_MAP() {
  const DBMAP_SCRIPTPROP = PropertiesService.getScriptProperties().getProperty('GARAGE_MEMBER_DB_MAP');
  const CURRENT_DB_MAP = eval("("+ DBMAP_SCRIPTPROP +")");
  return CURRENT_DB_MAP;
}

// MAIN Function for Login.gs
function validateCredentials(MATRIC_INPUT, PASSCODE_INPUT, TEST = false) {

  let DATABASE_SHEET_URL; // use sheet url based on testing or not
  if (!TEST) { // REAL DATABASE SHEET (NO ACCESS FOR NON-GARAGE)
    DATABASE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1-Z_b7VH6jR1735fo_ycGdxpocVlJRQrWt9dt9KQxFSE/edit?usp=sharing";
  } else { // TESTING DATABASE SHEET FOR testValidation function
    DATABASE_SHEET_URL = "https://docs.google.com/spreadsheets/d/14q40oie2lpdHAqlHiVP1EySWnEvbnia_dXZLWMRsXUE/edit?usp=sharing";
  }
  
  const databaseSheet = SpreadsheetApp.openByUrl(DATABASE_SHEET_URL).getSheetByName("Current🚀");
  const CURRENT_DB_MAP = getCURRENT_DB_MAP(); // GARAGE_MEMBER_SHEET_DB_MAP stored in ScriptProperties (hidden)

  const _MATRIC_ROW_HUNTING_ = (matric) => {
    // Helper function to check whether the given matric is present in the database
    // Input: matric number (string)
    // Output: row number (int) if found, -1 if not found

    const MATRIC_MODIFIED = matric.toUpperCase().trim();
    const ActiveSheet_matric_column = CURRENT_DB_MAP.Matric_Number.COLUMN; // MATRIC COLUMN
    const ActiveSheet_matric_row = CURRENT_DB_MAP.Matric_Number.ROW; // MATRIC COLUMN
    const ActiveSheet_matric_end_row = databaseSheet.getLastRow() + 1; // MATRIC LAST ROW
    const searchResults = databaseSheet.getRange(
      ActiveSheet_matric_row, 
      ActiveSheet_matric_column, 
      ActiveSheet_matric_end_row - ActiveSheet_matric_row,
      1
    ).createTextFinder(MATRIC_MODIFIED)
    .matchEntireCell(true)
    .matchCase(false)
    .findAll(); // Gets keyword and searches all cells for occurences

    if (searchResults[0] == null) {
      return -1;
    }
    else {
      return searchResults[0].getRow();
    }
  }

  let return_obj = {
    'name':'',
    'portfolio':'',
    'status':'',
    'description':'',
    'matric_row':''
  };

  // EDGE CASES
  if (MATRIC_INPUT == "") {
    return_obj['status'] = "ERROR"
    return_obj['description'] = "No matric number provided"
    return return_obj
  }

  if (PASSCODE_INPUT == undefined) {
    PASSCODE_INPUT = "";
  } else {
    PASSCODE_INPUT = PASSCODE_INPUT.toString();
  }

  if (PASSCODE_INPUT == "") {
    return_obj['status'] = "ERROR"
    return_obj['description'] = "No passcode provided"
    return return_obj
  }

  // MAIN CASES
  const MATRIC_ROW_IN_DATABASE = _MATRIC_ROW_HUNTING_(MATRIC_INPUT);
  if (MATRIC_ROW_IN_DATABASE == -1) {
    return_obj['status'] = "ERROR"
    return_obj['description'] = "Not a member"
    return return_obj
  }

  //Case when matric & pass != '' and matric inside DB
  const NAME = databaseSheet.getRange(MATRIC_ROW_IN_DATABASE, CURRENT_DB_MAP.Name).getValue();
  const PORTFOLIO = databaseSheet.getRange(MATRIC_ROW_IN_DATABASE, CURRENT_DB_MAP.Category).getValue();
  const PORTFOLIO_REMARK = databaseSheet.getRange(MATRIC_ROW_IN_DATABASE, CURRENT_DB_MAP.Portfolio_Remark).getValue();

  let BIRTHDAY = databaseSheet.getRange(MATRIC_ROW_IN_DATABASE, CURRENT_DB_MAP.BirthDay).getValue();
  let BIRTHMONTH = databaseSheet.getRange(MATRIC_ROW_IN_DATABASE, CURRENT_DB_MAP.BirthMonth).getValue();

  // padStart for single digits > '3' => '03'
  const PASSCODE = BIRTHDAY.toString().padStart(2, "0") + BIRTHMONTH.toString().padStart(2, "0");

  return_obj['name'] = NAME;
  return_obj['portfolio'] = PORTFOLIO + ", " + PORTFOLIO_REMARK

  if (PASSCODE_INPUT != PASSCODE) {
    return_obj['status'] = "ACCESS DENIED"
    return_obj['description'] = "Wrong passcode"
  } 
  
  else if (PASSCODE_INPUT == PASSCODE) {
    return_obj['status'] = "ACCESS GRANTED"
    return_obj['matric_row'] = MATRIC_ROW_IN_DATABASE
  }

  return return_obj;
}
