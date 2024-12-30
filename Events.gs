function getEventsInfo(fields, index) {
  // This function Retrives the data within the google sheet and formats it into a Json 
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Events') // access the specififed spreadsheet and the sheet tab
  const dataRange = sheet.getDataRange() // Get range of cells that contain Data
  const values = dataRange.getValues() // Retrives the values from dataRange  
  const jsonData = []
  
  if (!isNaN(index)) {
    if (index < 0 || index >= values.length - 1) throw new Error("Index value is out of range");
    const row = values[index + 1];
    let eventsData = {
      name: row[0],
      tagline: row[1],
      description: row[2],
      coverPic: processGDriveLinks(row[3], true), 
      photos: processGDriveLinks(row[4]), 
      link: row[5],
    };

    if (fields && fields.length > 0) {
      eventsData = fields.reduce((obj, field) => {
        if (eventsData[field] !== undefined) {
          obj[field] = eventsData[field];
        }
        return obj;
      }, {});
    }
    return eventsData;
  } else {
    // Start at i = 1 to skip the headers
    for (let i = 1; i < values.length; i++) {
      const row = values[i]; // data is iterated row by row
      let eventsData = {
        name: row[0],
        tagline: row[1],
        description: row[2],
        coverPic: processGDriveLinks(row[3], true), 
        photos: processGDriveLinks(row[4]), 
        link: row[5],
      };

      if (fields && fields.length > 0) {
        eventsData = fields.reduce((obj, field) => {
          if (eventsData[field] !== undefined) {
            obj[field] = eventsData[field];
          }
          return obj;
        }, {});
      }
    
      jsonData.push(eventsData);
    }

    return jsonData;
  }
}

function getEventsRequest(fields, index) {
  // This func handles get requests and returns the data as a json
  try {
    const eventsData = getEventsInfo(fields, index)
    const jsonString = JSON.stringify(eventsData)
    return ContentService.createTextOutput(jsonString).setMimeType(ContentService.MimeType.JSON) // Setting MimeType to JSON allows frontend to know format of data to be received
  } catch (error) {
    console.log(error)
    return ContentService.createTextOutput(JSON.stringify({ error: error.message })).setMimeType(ContentService.MimeType.JSON);
  }
}