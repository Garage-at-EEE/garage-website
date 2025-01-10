
var DATABASE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1-Z_b7VH6jR1735fo_ycGdxpocVlJRQrWt9dt9KQxFSE/edit?usp=sharing";
var SHEET_ID = '1GByi8TGI7ftY78vV6j7eNjWqSpG930aotvBeyQZigqA';
var SHEET_NAME = 'Purchase Logs';
var INVENTORY_SHEET_NAME = 'Inventory List';

var CREDIT_COLUMN = 'B';
var USER_ID_COLUMN = 'C';
var PURCHASE_AMOUNT_COLUMN = 'G';

var purchaseSheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
var inventorySheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(INVENTORY_SHEET_NAME);
var Position_Points_Lookup = SpreadsheetApp.openByUrl(DATABASE_SHEET_URL).getSheetByName("Position Points💯").getRange('B2:C').getValues();
var Position_List = Position_Points_Lookup.map(x => x[0].toUpperCase());
var databaseSheet = SpreadsheetApp.openByUrl(DATABASE_SHEET_URL).getSheetByName("Current🚀");

var CURRENT_DB_MAP = {
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
  New_Event_Details: {
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




function doPost(e) {

  try {

    var requestData = JSON.parse(e.postData.contents);

    Logger.log(requestData);


    var accessObj = validateCredentials(requestData.matric, requestData.passcode);
    var returnObj = {};

    if (accessObj['status'] == "ACCESS GRANTED") {

      var lifetimeCredits = getLifetimeInnocredits(accessObj['matric_row']);
      var totalSpending = getTotalSpendingForUser(requestData.matric);
      var remainingBalance = getRemainingBalance(lifetimeCredits, totalSpending);



      if (requestData.type == "purchase") {

        var totalItemsInnocredits = 0;

        for (var i = 0; i < requestData.item.length; i++) {
          var currentItem = requestData.item[i];
          var innocreditPrice = getInnocreditPrice(currentItem.itemName);

          if (innocreditPrice == null) {
            returnObj.status = "ITEM NOT FOUND";
            returnObj.info = {
              message: `A requested item ${itemName} was not found.`
            };
            totalItemsInnocredits = null;
            break;
          }

          totalItemsInnocredits = totalItemsInnocredits + innocreditPrice * currentItem.quantity;


        }


        if (totalItemsInnocredits !== null) {

          if (totalItemsInnocredits <= remainingBalance) {

            var purchaseLogArray = []

            for (var i = 0; i < requestData.item.length; i++) {
              var currentItem = requestData.item[i];
              var innocreditPrice = getInnocreditPrice(currentItem.itemName);
              var purchaseCost = innocreditPrice * currentItem.quantity

              var purchaseLog = {
                timestamp: new Date(),
                name: accessObj['name'],
                matricNumber: requestData.matric,
                itemName: currentItem.itemName,
                quantity: currentItem.quantity,
                innocreditPrice: innocreditPrice,
                totalInnocredit: purchaseCost,
                startingInnocredit: remainingBalance,
                finalInnocredit: remainingBalance - purchaseCost
              };

              addPurchaseLog(purchaseLog);
              purchaseLogArray.push(purchaseLog);

              remainingBalance = remainingBalance - purchaseCost

            }


            returnObj.status = "PURCHASE SUCCESSFUL";
            returnObj.info = purchaseLogArray;




          } else {
            returnObj.status = "INSUFFICIENT CREDITS";
            returnObj.info = {
              message: "You do not have enough credits to make this purchase."
            };
          }

        }
      }


      else if (requestData.type == "userdata") {
        returnObj.status = "DATA RETRIEVAL SUCCESSFUL";
        returnObj.info = {
          name: accessObj['name'],
          matricNumber: requestData.matric,
          innocreditPrice: innocreditPrice,
          lifetimeCredits: lifetimeCredits,
          totalSpending: totalSpending,
          currentInnocredit: remainingBalance,
        };
      }


    } else {
      returnObj.status = "ACCESS DENIED";
      returnObj.info = {
        message: accessObj.description
      };
    }

    return ContentService.createTextOutput(JSON.stringify(returnObj)).setMimeType(ContentService.MimeType.JSON)



  }

  catch (e) {

    Logger.log(e);

    return ContentService.createTextOutput(JSON.stringify({ status: "ERROR", info: { message: `Unkown error occured on the server: ${e}` } })).setMimeType(ContentService.MimeType.JSON);
  }

}


function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify(getAllInventoryItems())).setMimeType(ContentService.MimeType.JSON)
}



function getInnocreditPrice(itemName) {
  var itemData = inventorySheet.getRange("A2:E" + inventorySheet.getLastRow()).getValues();
  for (var i = 0; i < itemData.length; i++) {
    if (itemData[i][0] === itemName) {
      return itemData[i][4]; // Column D (4th column) contains Innocredit Price
    }
  }
  return null; // If item not found
}


function getAllInventoryItems() {

  var itemData = inventorySheet.getRange("A2:E" + inventorySheet.getLastRow()).getValues();
  var inventoryItems = [];

  for (var i = 0; i < itemData.length; i++) {
    var item = {
      itemName: itemData[i][0], // Column A: Item
      description: itemData[i][1], // Column B: Description
      image: GET_DRIVE_ID_VIEW_LINK(itemData[i][2]), // Column C: Image
      inventory: itemData[i][3], // Column D: Inventory
      innocreditPrice: itemData[i][4] // Column E: Innocredit Price
    };
    inventoryItems.push(item);
  }

  return inventoryItems;
}




function addPurchaseLog(purchaseLog) {
  var lastRow = purchaseSheet.getLastRow();
  var newRow = [purchaseLog.timestamp, purchaseLog.name, purchaseLog.matricNumber, purchaseLog.itemName, purchaseLog.quantity, purchaseLog.innocreditPrice, purchaseLog.totalInnocredit, purchaseLog.startingInnocredit, purchaseLog.finalInnocredit];

  purchaseSheet.getRange(lastRow + 1, 1, 1, newRow.length).setValues([newRow]);

  // // Copy formula from the row above if there's a formula
  // var aboveRowRange = purchaseSheet.getRange(lastRow, 1, 1, purchaseSheet.getLastColumn());
  // var aboveRowFormula = aboveRowRange.getFormulas();

  // if (aboveRowFormula[0][0]) {
  //   var newRange = purchaseSheet.getRange(lastRow + 1, 1, 1, purchaseSheet.getLastColumn());
  //   aboveRowRange.copyTo(newRange, SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  // }
}


function resetTotalSpending() {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  var range = sheet.getRange(PURCHASE_AMOUNT_COLUMN + '2:' + PURCHASE_AMOUNT_COLUMN);
  range.clearContent();
}



function getTotalSpendingForUser(MATRIC_NUMBER) {
  var userIDs = purchaseSheet.getRange(USER_ID_COLUMN + '2:' + USER_ID_COLUMN).getValues();
  var spendingAmounts = purchaseSheet.getRange(PURCHASE_AMOUNT_COLUMN + '2:' + PURCHASE_AMOUNT_COLUMN).getValues();

  // Find all the rows that match the provided userID
  var matchedRows = userIDs.reduce(function (matched, user, index) {
    if (user[0] === MATRIC_NUMBER) {
      matched.push(spendingAmounts[index][0]);
    }
    return matched;
  }, []);

  // Calculate the total spending from matched rows
  var totalSpending = matchedRows.reduce(function (total, amount) {
    return total + parseFloat(amount);
  }, 0);

  return totalSpending;
}

function getRemainingBalance(TOTAL_CREDITS, TOTAL_SPENDING) {
  var remainingBalance = TOTAL_CREDITS - TOTAL_SPENDING;
  return remainingBalance;
}




function mainApp(MATRIC_INPUT, PASSCODE_INPUT) {

  var accessObj = validateCredentials(MATRIC_INPUT, PASSCODE_INPUT);

  if (accessObj['status'] == "ACCESS GRANTED") {
    accessObj['lifetime_credits'] = getLifetimeInnocredits(accessObj['matric_row'])

    accessObj['total_spending'] = getTotalSpendingForUser(MATRIC_INPUT)

    accessObj['remainingBalance'] = getRemainingBalance(accessObj['lifetime_credits'], accessObj['total_spending'])

  }

  return accessObj
}



function validateCredentials(MATRIC_INPUT, PASSCODE_INPUT) {
  var return_obj = {
  };
  if (PASSCODE_INPUT == undefined) {
    PASSCODE_INPUT = "";
  }

  else {
    PASSCODE_INPUT = PASSCODE_INPUT.toString();
  }

  if (MATRIC_INPUT == "") {
    // return HtmlService.createHtmlOutput("<h1>No Matric Number Indicated</h1>");
    return_obj['status'] = "ERROR"
    return_obj['description'] = "No matric number provided"
  }


  var MATRIC_ROW_IN_DATABASE = _MATRIC_ROW_HUNTING_(MATRIC_INPUT);
  if (MATRIC_ROW_IN_DATABASE == -1) {
    return_obj['status'] = "ERROR"
    return_obj['description'] = "Not a member"
  }

  else {
    var NAME = databaseSheet.getRange(MATRIC_ROW_IN_DATABASE, CURRENT_DB_MAP.Name).getValue();
    var PORTFOLIO = databaseSheet.getRange(MATRIC_ROW_IN_DATABASE, CURRENT_DB_MAP.Category).getValue();
    var PORTFOLIO_REMARK = databaseSheet.getRange(MATRIC_ROW_IN_DATABASE, CURRENT_DB_MAP.Portfolio_Remark).getValue();

    var BIRTHDAY = databaseSheet.getRange(MATRIC_ROW_IN_DATABASE, CURRENT_DB_MAP.BirthDay).getValue();
    var BIRTHMONTH = databaseSheet.getRange(MATRIC_ROW_IN_DATABASE, CURRENT_DB_MAP.BirthMonth).getValue();


    var REMARKS = databaseSheet.getRange(MATRIC_ROW_IN_DATABASE, CURRENT_DB_MAP.Remark).getValue();

    var PASSCODE = BIRTHDAY.toString().padStart(2, "0") + BIRTHMONTH.toString().padStart(2, "0");

    return_obj['name'] = NAME;
    return_obj['portfolio'] = PORTFOLIO + ", " + PORTFOLIO_REMARK

    if (PASSCODE_INPUT == "") {
      return_obj['status'] = "ACCESS DENIED"
      return_obj['description'] = "No passcode provided"

    }

    else if (PASSCODE_INPUT != PASSCODE) {
      return_obj['status'] = "ACCESS DENIED"
      return_obj['description'] = "Wrong passcode"
    }

    else if (PASSCODE_INPUT == PASSCODE) {
      return_obj['status'] = "ACCESS GRANTED"
      return_obj['matric_row'] = MATRIC_ROW_IN_DATABASE
    }
  }

  return return_obj;

}


function getLifetimeInnocredits(MATRIC_ROW_IN_DATABASE) {
  //EVENT CELL DETAILS
  var event_column = CURRENT_DB_MAP.New_Event_Details.COLUMN;
  var event_name_row = CURRENT_DB_MAP.New_Event_Details.ROW.Event_Name;

  var total_points = 0;

  while (_INFORMATION_RETREIVING_(event_name_row, event_column) != "") {
    if (_INFORMATION_RETREIVING_(MATRIC_ROW_IN_DATABASE, event_column) != "") {
      var event_position = _INFORMATION_RETREIVING_(MATRIC_ROW_IN_DATABASE, event_column);

      //GETS THE POINT FOR THE POSITION IN EVENT
      var event_point = GET_POINTS_LOOKUP(event_position);
      total_points += event_point;

    }
    event_column++;
  }

  return total_points;
}

function GET_DRIVE_ID_VIEW_LINK(Url) {
  if (!Url) return null;
  // Url = "https://drive.google.com/file/d/106LuNU14sY4rL5sn7eYl0cbJLlE9dUu3/view?usp=drive_link"; //TEST URL
  var expression = Url.match(/[-\w]{25,}/);
  var fileid = expression[0];
  // console.log(expression);
  const imageUrl = `https://drive.google.com/uc?export=view&id=${fileid}`;
  const compressedURL = `https://lh3.googleusercontent.com/u/0/d/${fileid}`
    //=w500-iv1
    ;
  return { download_url: imageUrl, preview_url: compressedURL };

}


function GET_POINTS_LOOKUP(search_value) {

  var index = Position_List.indexOf(search_value.toUpperCase());

  if (index === -1) {
    Logger.log('Position value not found');
    return 0;
  } else {

    var found_value = Position_Points_Lookup[index][1];
    return found_value;
  }
}

function _MATRIC_ROW_HUNTING_(matric) {
  //check whether the given matric is present in the database
  //return the row if present
  //return -1 if doesn't exist

  var MATRIC_MODIFIED = matric.toUpperCase().trim();
  var ActiveSheet_matric_column = CURRENT_DB_MAP.Matric_Number.COLUMN; // MATRIC COLUMN
  var ActiveSheet_matric_row = CURRENT_DB_MAP.Matric_Number.ROW; // MATRIC COLUMN
  var ActiveSheet_matric_end_row = databaseSheet.getLastRow() + 1; // MATRIC LAST ROW
  var searchResults = databaseSheet.getRange(ActiveSheet_matric_row, ActiveSheet_matric_column, ActiveSheet_matric_end_row - ActiveSheet_matric_row).createTextFinder(MATRIC_MODIFIED).matchEntireCell(true).matchCase(false).findAll(); // Gets keyword and searches all cells for occurences

  if (searchResults[0] == null) {
    return -1;
  }
  else {
    return searchResults[0].getRow();
  }
}

function _INFORMATION_RETREIVING_(from_row, from_column, upper = 0, toString = 0) {
  // mode is the function targeted sheet

  var result = databaseSheet.getRange(from_row, from_column).getValue();

  if (upper == 1) result = result.toUpperCase();

  if (toString == 1) result = result.toString();

  try {
    result.trim();
  }
  catch {

  }
  return result;
}


function test() {
  Logger.log(doGet().getContent())
  Logger.log(doPost({ postData: { contents: JSON.stringify({ matric: "U2020912L", passcode: "2901", type: "purchase", item: [{ itemName: "Shirts", quantity: 2 }, { itemName: "Stickers", quantity: 4  }] }) } }).getContent())

  // console.log(doPost({ postData: { contents: JSON.stringify({ matric: "U2020912L", passcode: "2901", type: "userdata" }) } }).getContent())
}
