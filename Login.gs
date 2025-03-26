const DATABASE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1-Z_b7VH6jR1735fo_ycGdxpocVlJRQrWt9dt9KQxFSE/edit?usp=sharing";

const databaseSheet = SpreadsheetApp.openByUrl(DATABASE_SHEET_URL).getSheetByName("Current🚀");

const CURRENT_DB_MAP = {
  VIP_Alumni: 2,
  Name: 3,
  Matric_Number: {
    COLUMN: 4,
    ROW: 8,
  },
  Gender: 5,
  Course: 6,
  Course_Year: 7,
  Category: 8,
  Portfolio_Remark: 9,
  Garage_Access: 10,
  BirthDay: 11,
  BirthMonth: 12,
  NTU_Email: 13,
  Gmail: 14,
  Phone_Number: 15,
  Telegram_Handle: 16,
  Public_Address: 17,
  Remark: 18,
  Feedback: 19,
  Certification: 20,
  New_Event_Details: { //This entry seems out of place, maybe transfer to another sheet?
    COLUMN: 27,
    ROW: {
      Event_Name: 1,
      Event_Date: 2,
      Event_Description: 3,
      NFT_Name: 4,
      NFT_Desc: 5,
      NFT_Badge: 6
    }
  },
}

function _MATRIC_ROW_HUNTING_(matric) {
  //check whether the given matric is present in the database
  //return the row if present
  //return -1 if doesn't exist

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

function validateCredentials(MATRIC_INPUT, PASSCODE_INPUT) {
  let return_obj = {
    'name':'',
    'portfolio':'',
    'status':'',
    'description':'',
    'matric_row':''
  };

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




