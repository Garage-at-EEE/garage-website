function getHomeInfo(fields) {
  // This function Retrives the data within the google sheet and formats it into a Json 
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Home') // access the specififed spreadsheet and the sheet tab
  const dataRange = sheet.getDataRange() // Get range of cells that contain Data
  const values = dataRange.getValues() // Retrives the values from dataRange
  let data = {}

  // Start at i = 1 to skip the headers
  for (let i = 1; i < values.length; i++) {
    const row = values[i]; // Data is iterated row by row
    let homeData = {
      title: row[0],
      bannerImage: processGDriveLinks(row[1], true),
      about: row[2],
      objective: row[3],
      ambassadors: row[4], 
      innovators: row[5],
      innovatorsImage: processGDriveLinks(row[6], true),
      recruitment: row[7],
      registerLink: row[8],
      facilities: row[9],
      facilitiesImage: processGDriveLinks(row[10]),
      newsletter: row[11],
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

    data = homeData
  }

  return data;
}

function getHomeRequest(fields) {
  // This func handles get requests and returns the data as a json
  try {
    const homeData = getHomeInfo(fields)
    const jsonString = JSON.stringify(homeData)
    return ContentService.createTextOutput(jsonString).setMimeType(ContentService.MimeType.JSON) // Setting MimeType to JSON allows frontend to know format of data to be received
  } catch (error) {
    console.log(error)
    return ContentService.createTextOutput(JSON.stringify({ error: error.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
