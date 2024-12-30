function doGet(e) {
  // Specify which sheet information is being retrived
  const requestType = e.parameter.type;
  const index = e.parameter.index;
  let number = parseInt(index); //paseInt(undefined) also = NaN

  const jwt_token = e.parameter.token;

  if (index !== undefined && number === NaN) {
    return ContentService.createTextOutput(JSON.stringify({errors: "Please specify a valid index"})).setMimeType(ContentService.MimeType.JSON);
  }

  // Check the fields param for specific columns the user wants from the sheet data
  const fields = e.parameter.fields ? e.parameter.fields.split(',') : []
  switch (requestType){
    case "projectInfo":
      return getProjectInfoRequest(fields, number)

    case "ambassadors":
      return getAmbassadorsRequest(fields, number)

    case "events":
      return getEventsRequest(fields, number)

    case "home":
      return getHomeRequest(fields)
      
    case "facilities":
      return getFacilitiesRequest(fields, number)

    case "newsletter":
      return getNewsletterRequest(fields)

    case "database": {
      try {
        parseJwt(jwt_token); //Checks JWT token in Token.gs, throws Exception if invalid or missing
      }
      catch (error) {
        return ContentService.createTextOutput(JSON.stringify({error: "Invalid token"})).setMimeType(ContentService.MimeType.JSON);
      }
      return ContentService.createTextOutput(JSON.stringify({error: "Success!"})).setMimeType(ContentService.MimeType.JSON);
      //TODO: getDatabaseRequest(fields)
    }

    default:
      return ContentService.createTextOutput(JSON.stringify({error: "Please specify a valid type."})).setMimeType(ContentService.MimeType.JSON);
  }
}


function doPost(e) {
  try {
    var requestData = JSON.parse(e.postData.contents);
    var requestType = requestData.type;

    Logger.log(requestData);

    var accessObj = validateCredentials(requestData.matric, requestData.passcode);
    var returnObj = {};

    if (accessObj['status'] == "ACCESS GRANTED") {
      switch(requestType) {

        case "userdata": {
          returnObj.status = "DATA RETRIEVAL SUCCESSFUL";
          returnObj.info = {
            name: accessObj['name'],
            matricNumber: requestData.matric, 
          };
          returnObj.token = generateAccessToken(returnObj.info);
          Logger.log(returnObj.token);
          break;
        }
        
        case "purchase": { 
          // TODO: When garage_shop is in dev
          break;
        }
        
      }
    }

    // ELSE Case for when accessObj.status is not "ACCESS GRANTED"
    else {
      returnObj.status = "ACCESS DENIED";
      returnObj.info = {
        message: accessObj.description
      };
    }
    return ContentService.createTextOutput(JSON.stringify(returnObj)).setMimeType(ContentService.MimeType.JSON)
  }

  catch (error) {

    Logger.log(error);

    return ContentService.createTextOutput(JSON.stringify({ status: "ERROR", info: { message: `Unknown error occured on the server: ${error}` } })).setMimeType(ContentService.MimeType.JSON);
  }

}

// curl -L "https://script.google.com/macros/s/AKfycbzR8ioltXGXS2F84jVOnU0DXr03002VrV0VrD27EPAK5mh3mWvUOn7vjhR0viJBw9Fc/exec?type=projectInfo&fields=teamName,teamMembers"

// curl -L "https://script.google.com/macros/s/AKfycbzR8ioltXGXS2F84jVOnU0DXr03002VrV0VrD27EPAK5mh3mWvUOn7vjhR0viJBw9Fc/exec?type=ambassadors"

// curl "https://script.google.com/macros/s/AKfycbzR8ioltXGXS2F84jVOnU0DXr03002VrV0VrD27EPAK5mh3mWvUOn7vjhR0viJBw9Fc/exec?type=events"


// https://script.google.com/macros/s/AKfycbycxqMKX5C1B7xxv_x14qhwuNv4gpUI9Jq6LjYJ1l2k/dev/exec?type=ambassadors

// https://script.google.com/macros/s/AKfycbycxqMKX5C1B7xxv_x14qhwuNv4gpUI9Jq6LjYJ1l2k/dev/exec?type=projectInfo&fields=teamName,description
