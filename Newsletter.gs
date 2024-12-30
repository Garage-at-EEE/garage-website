function getNewsletterInfo(fields) {
  // This function Retrives the data within the google sheet and formats it into a Json 
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Newsletter') // access the specififed spreadsheet and the sheet tab
  const dataRange = sheet.getDataRange() // Get range of cells that contain Data
  const values = dataRange.getValues() // Retrives the values from dataRange
  const jsonData = []

  // Reverse order to get the newsletter from most recent
  for (let i = values.length - 1; i > 0; i--) {
    const row = values[i]; // Data is iterated row by row
    let newsletterData = {
      name: row[0],
      date: row[1],
      link: row[2],
      image: processGDriveLinks(row[2], true)
    };

    // Filter Data by input fields
    if (fields && fields.length > 0) {
      homeData = fields.reduce((obj, field) => {
        if (homeData[field] !== undefined) {
          obj[field] = homeData[field];
        }
        return obj;
      }, {});
    }

    jsonData.push(newsletterData);
  }

  return jsonData;
}

function getNewsletterRequest(fields) {
  // This func handles get requests and returns the data as a json
  try {
    const homeData = getNewsletterInfo(fields)
    const jsonString = JSON.stringify(homeData)
    return ContentService.createTextOutput(jsonString).setMimeType(ContentService.MimeType.JSON) // Setting MimeType to JSON allows frontend to know format of data to be received
  } catch (error) {
    console.log(error)
    return ContentService.createTextOutput(JSON.stringify({ error: error.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
