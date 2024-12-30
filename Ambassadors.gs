function getAmbassadorsInfo(fields, index) {
  // This function Retrives the data within the google sheet and formats it into a Json 
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Ambassadors') // access the specififed spreadsheet and the sheet tab
  const dataRange = sheet.getDataRange() // Get range of cells that contain Data
  const values = dataRange.getValues() // Retrives the values from dataRange  
  const jsonData = []
  
  if (!isNaN(index)) {
    if (index < 0 || index >= values.length - 1) throw new Error("Index value is out of range");
    const row = values[index + 1];
    let ambassadorsData = {
      name: row[0],
      description: row[1],
      homeImage: processGDriveLinks(row[2], true),
      coverPic: processGDriveLinks(row[3], true), 
      photos: processGDriveLinks(row[4]), 
    };

    if (fields && fields.length > 0) {
      ambassadorsData = fields.reduce((obj, field) => {
        if (ambassadorsData[field] !== undefined) {
          obj[field] = ambassadorsData[field];
        }
        return obj;
      }, {});
    }
    return ambassadorsData;
  } else {
    // Start at i = 1 to skip the headers
    for (let i = 1; i < values.length; i++) {
      const row = values[i]; // data is iterated row by row
      let ambassadorsData = {
        name: row[0],
        description: row[1],
        homeImage: processGDriveLinks(row[2], true),
        coverPic: processGDriveLinks(row[3], true), 
        photos: processGDriveLinks(row[4]), 
      };

      if (fields && fields.length > 0) {
        ambassadorsData = fields.reduce((obj, field) => {
          if (ambassadorsData[field] !== undefined) {
            obj[field] = ambassadorsData[field];
          }
          return obj;
        }, {});
      }
    
      jsonData.push(ambassadorsData);
    }

    return jsonData;
  }
}

function getAmbassadorsRequest(fields, index) {
  // This func handles get requests and returns the data as a json
  try {
    const ambassadorsData = getAmbassadorsInfo(fields, index)
    const jsonString = JSON.stringify(ambassadorsData)
    return ContentService.createTextOutput(jsonString).setMimeType(ContentService.MimeType.JSON) // Setting MimeType to JSON allows frontend to know format of data to be received
  } catch (error) {
    console.log(error)
    return ContentService.createTextOutput(JSON.stringify({ error: error.message })).setMimeType(ContentService.MimeType.JSON);
  }
}