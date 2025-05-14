# Tinkering Folder Documentation

## Table of Contents
1. [Overview]
2. [Usage]
3. [API Integration]
4. [Editing Guide]
5. [Notes and Future Improvements]

## Overview
This documentation focuses on the "tinkering" folder under the `routes` directory. It consists of the js and css file.
Under the Garage website, there is a tinkering section consisting of a button leading to the tinkering project page.

Updating of information in the home page should be done from the home tab in the google sheet (including the sections).
Updating of information in the tinkering page should be done from the tinkering tab in the google sheet.
The Garage Assigned projects page is then accessible from the tinkering page.

## Usage
The "tinkering" folder contains route definitions and middleware for handling tinkering-related requests. To use it:
1. Ensure the folder is properly imported and registered in the main application file
    (e.g., `src\app.js` and for routing of navbar, under 'src\components\header\Header.jsx').
2.  Under the navbar, a new component under header (DropdownMenu) was utilized for the dropdown within the Recruitment tab.
    It navigates to the ids, as long as they are assigned ids correctly within each section
    (E.g <section id='tinkering'>, <div id='ambassadors'>).


## API Integration
Refer to the APIDocumentation.md for the full explanation of the API integration with Google Sheets through Apps Script.
In summary,
1. Data is fetched from Google sheets with API, through the link after deployment in Apps Script - can be found in 'Constants.js'.
2. Under API.gs, there is a need to add a case, linking the Tinkering.gs file on Apps Script.
     case "tinkering":
      return getTinkeringRequest(fields, number)

    This is how the code below fetches the data from the google sheet, which consists of rows and columns.
    <!-- 
    const TinkeringProjects = () => {
        const { data, isLoading } = useFetch({
            url: API_DOMAIN + "?type=tinkering",
        });
     -->
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
3.  Current dropdown on Navbar is through hashlink, smooth scrolling within React.
    When navigating from a different page, the scroll may misfire and not reach the section or overshoot it as the page may not be
    fully loaded yet at the time of the command to scroll

--> Responsiveness and scrolling can be further improved