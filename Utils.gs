function processMultiLineString (str) {
  // Splits the string into an array and removes white spaces
  return str.split('\n').map(item => item.trim())
}

function processUrl(str) {
  // parses the gdrive url seperated by ', '  and returns an arr
  return str.split(', ').map(item => item.trim())
}

function processGDriveLinks(str, cover = false) {
  // This function parses the gdrive url separated by ', ' extracts the file ID and returns an array
  // containing the compressed URL of each individual photo
  const urls = str.split(', ').map(item => {
    const url = item.trim();
    // Regex matching to extract the File ID from both types of URLs, ?id= or file/d/
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    
    // Check if a match was found
    if (match && match[1]) {
      const fileID = match[1];
      // Return the compressed URL
      return `https://lh3.googleusercontent.com/u/0/d/${fileID}`;
    } else {
      console.log("No file ID found in the URL:", url);
      return null;
    }
  });
  if (cover) {
    return urls[0];
  }
  return urls.filter(url => url !== null); // This filters out any null values if no ID was found
}

function retriveDataFromCache(fields, sheetName) {
  
}