function getFacilitiesLinks() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Facilities Links') // access the specififed spreadsheet and the sheet tab
  const dataRange = sheet.getDataRange() // Get range of cells that contain Data
  const values = dataRange.getValues() // Retrives the values from dataRange  
  const jsonData = []

  for (let i = 1; i < values.length; i++) {
    jsonData.push({
      label: values[i][0],
      link: values[i][1],
    })
  }

  return jsonData;
}

function getFacilitiesInfo(fields, index) {
  // This function Retrives the data within the google sheet and formats it into a Json 
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Facilities') // access the specififed spreadsheet and the sheet tab
  const dataRange = sheet.getDataRange() // Get range of cells that contain Data
  const values = dataRange.getValues() // Retrives the values from dataRange  

  const jsonData = []
  

  if (!isNaN(index)) {
    if (index < 0 || index >= values.length - 2) throw new Error("Index value is out of range");
    const row = values[index + 2];
    let facilitiesData = {
      name: row[0],
      description: row[1],
      coverPic: processGDriveLinks(row[2], true),
      label: row[3],
      link: row[4],
    };
    
    // Filter Data by input fields
    if (fields && fields.length > 0) {
      facilitiesData = fields.reduce((obj, field) => {
        if (facilitiesData[field] !== undefined) {
          obj[field] = facilitiesData[field];
        }
        return obj;
      }, {});
    }

    return facilitiesData;

  } else {
    // Start at i = 2 to skip the headers and cover pic
    for (let i = 2; i < values.length; i++) {
      const row = values[i]; // Data is iterated row by row
      let facilitiesData = {
        name: row[0],
        description: row[1],
        coverPic: processGDriveLinks(row[2], true),
        label: row[3],
        link: row[4],
      };
    
      // Filter Data by input fields
      if (fields && fields.length > 0) {
        facilitiesData = fields.reduce((obj, field) => {
          if (facilitiesData[field] !== undefined) {
            obj[field] = facilitiesData[field];
          }
          return obj;
        }, {});
      }
      
      jsonData.push(facilitiesData);
    }
    if (fields && fields.length > 0) {
      return jsonData;
    }

    return {
      coverPic: processGDriveLinks(values[1][1], true),
      facilities: jsonData,
      others: getFacilitiesLinks(),
    }
  }
}


function getFacilitiesRequest(fields, index) {
  // This func handles get requests and returns the data as a json
  try {
    const teamData = getFacilitiesInfo(fields, index)
    const jsonString = JSON.stringify(teamData)
    return ContentService.createTextOutput(jsonString).setMimeType(ContentService.MimeType.JSON) // Setting MimeType to JSON allows frontend to know format of data to be received
  } catch (error) {
    console.log(error)
    return ContentService.createTextOutput(JSON.stringify({ error: error.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
