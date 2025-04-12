function getAssignedProjectInfo(fields, index) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tinkering Assigned Project') // access the specififed spreadsheet and the sheet tab
  const dataRange = sheet.getDataRange() // Get range of cells that contain Data
  const values = dataRange.getValues() // Retrives the values from dataRange  
  
  if (!isNaN(index)) { // If index is specified, get and return data at that index row
    if (index < 0 || index >= values.length - 1) throw new Error("Index value is out of range");
    return getDataFromRow(fields, index+1); // index is 0-indexed but values is 1-indexed
  
  } else { // If index is not specified, get and return all data from each row
    const allRowData = [] 
    // Start at i = 1 to skip the headers
    for (let i = 1; i < values.length; i++) {
      rowData = getDataFromRow(fields, i);
      allRowData.push(rowData);
    }
    return allRowData;
  }
  
  // Helper function to get a single row of data from the google sheet
  // Input: fields - array of strings that specify the fields to be returned
  //        rowIndex - integer that specifies the row number to be returned
  // Output: object containing the specified fields from the row
  function getDataFromRow(fields, rowIndex) {
    const column = values[rowIndex]; 
    let projectData = {
      name: column[0],
      contactInfo: column[1],
      coverPic: processGDriveLinks(column[2], true),
      tagline: column[3],
      description: column[4],
      recruitment: column[5],
      isRecruiting: column[6],
      registerLink: column[7],
    };
    console.log("Project Data: ", projectData);
    
    // Filter Data by get input fields
    if (fields && fields.length > 0) {
      projectData = fields.reduce((obj, field) => {
          if (projectData[field] !== undefined) {
            obj[field] = projectData[field];
          }
          return obj;
        }, {}
      );
    }
    return projectData;
  }
}

function getAssignedProjectInfoRequest(fields, index) {
  // This func handles get requests and returns the data as a json
  try {
    const teamData = getAssignedProjectInfo(fields, index)
    console.log("Data retrieved")
    const jsonString = JSON.stringify(teamData)
    console.log("Data converted to json")
    return ContentService.createTextOutput(jsonString).setMimeType(ContentService.MimeType.JSON) // Setting MimeType to JSON allows frontend to know format of data to be received
  } catch (error) {
    console.log(error)
    return ContentService.createTextOutput(JSON.stringify({ error: error.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
