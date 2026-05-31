# Tinkering Folder Documentation

## Table of Contents
1. API Integration
2. Editing Guide
3. Notes and Future Improvements

## API Integration
Refer to the APIDocumentation.md for the full explanation of the API integration with Google Sheets through Apps Script.
In summary,
1. Data is fetched from Google sheets with API, through the link after deployment in Apps Script - can be found in 'Constants.js'.
2. Under API.gs, there is a need to add a case, linking the Tinkering.gs file on Apps Script.
     case "tinkering":
      return getTinkeringRequest(fields, number)

    This is how the code below fetches the data from the google sheet, which consists of rows and columns.
    ```
    const TinkeringProjects = () => {
        const { data, isLoading } = useFetch({
            url: API_DOMAIN + "?type=tinkering",
        });
     ```
     Since there are multiple rows, there is a need to index it to call the right row, unless there is a for loop to iterate through.
     (For e.g, calling all images for carousel, or all FAQs for FAQ Accordions)

## Editing Guide
1.  Links and multilines are processed through functions (can be found within AppsScript), where multilines are returned as array.
    Different styles can be applied.

    However, the function only recognizes the next line as a new line, so if there is a need for different styles, it has to strictly be
    done in google sheet's cell with Alt+Enter once. (E.g array[0] is the first line, array[1] is the second line, and different styles
    can be applied to each line)

2.  Adding new columns in the google sheet needs to be reflected and matched accordingly in the tinkering.gs fie in Apps Script to show.
3.  If there is no link placed in the tinkering project's registration link column, the button on the webpage will be disabled.

## Notes and Future Improvements
1.  The tinkering page is not fully responsive, and the layout may look different on different dimensions.
2.  The images under Tinkering projects sharing session are hard-coded in a way for the layout to stay that way. 
    Some 3 images layout look weird in tablet dimension.
3.  Current dropdown on Navbar is through hashlink, smooth scrolling within React.
    When navigating from a different page, the scroll may misfire and not reach the section or overshoot it as the page may not be
    fully loaded yet at the time of the command to scroll

***Responsiveness and scrolling can be further improved
