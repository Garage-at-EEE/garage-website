function getProjectInfo(fields, index) {
  // This function Retrives the data within the google sheet and formats it into a Json 
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Project Info') // access the specififed spreadsheet and the sheet tab
  const dataRange = sheet.getDataRange() // Get range of cells that contain Data
  const values = dataRange.getValues() // Retrives the values from dataRange  
  const jsonData = []
  

  if (!isNaN(index)) {
    if (index < 0 || index >= values.length - 1) throw new Error("Index value is out of range");
    const row = values[index + 1];
    let teamData = {
      name: row[0],
      teamMembers: processMultiLineString(row[1]),
      contactInfo: row[2],
      event: row[3], 
      tagline: row[4],
      description: row[5],
      coverPic: processGDriveLinks(row[6], true),
      photos: processGDriveLinks(row[7]),
    };
    
    // Filter Data by input fields
    if (fields && fields.length > 0) {
      teamData = fields.reduce((obj, field) => {
        if (teamData[field] !== undefined) {
          obj[field] = teamData[field];
        }
        return obj;
      }, {});
    }

    return teamData;
  } else {
    // Start at i = 1 to skip the headers
    for (let i = 1; i < values.length; i++) {
      const row = values[i]; // Data is iterated row by row
      let teamData = {
        name: row[0],
        teamMembers: processMultiLineString(row[1]),
        contactInfo: row[2],
        event: row[3], 
        tagline: row[4],
        description: row[5],
        coverPic: processGDriveLinks(row[6], true),
        photos: processGDriveLinks(row[7]),
      };
    
      // Filter Data by input fields
      if (fields && fields.length > 0) {
        teamData = fields.reduce((obj, field) => {
          if (teamData[field] !== undefined) {
            obj[field] = teamData[field];
          }
          return obj;
        }, {});
      }
      
      jsonData.push(teamData);
    }

    return jsonData;
  }
}

function getProjectInfoRequest(fields, index) {
  // This func handles get requests and returns the data as a json
  try {
    const teamData = getProjectInfo(fields, index)
    const jsonString = JSON.stringify(teamData)
    return ContentService.createTextOutput(jsonString).setMimeType(ContentService.MimeType.JSON) // Setting MimeType to JSON allows frontend to know format of data to be received
  } catch (error) {
    console.log(error)
    return ContentService.createTextOutput(JSON.stringify({ error: error.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
