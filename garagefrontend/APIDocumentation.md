# Garage Website API Documentation

Garage uses Google Sheets for the database of the website, along with Apps Script to do some processing. The database can be found [here](https://docs.google.com/spreadsheets/d/1rWDvldXmyz687YoeeJD5V0Wt3bRS1YD7wMGzBBwjiUo/edit?gid=516508848#gid=516508848).

API Endpoint: [src/utils/Constants.js](./src/utils/Constants.js)

## Parameters

| Parameter name      | Required |
| ------------------- | -------- |
| [`type`](#type)     | `True`   |
| [`fields`](#fields) | `False`  |
| [`index`](#index)   | `False`  |
| [`token`](#token)   | `True` for Protected Routes  |

To specify the parameters, append them to the end of the endpoint after a `?` character. For example to specify a `type` of `projectInfo` and `fields` of `teamName` and `description`, you will have to append

```
?type=projectInfo&fields=teamName,description
```

### `type`

#### Parameters

| Value         | Description                                             |
| ------------- | ------------------------------------------------------- |
| `home`        | Gets the data needed for the home page of the website   |
| `projectInfo` | Gets the data related to Garage projects                |
| `ambassadors` | Gets the data related to Garage's ambassador portfolios |
| `events`      | Gets the data related to events hosted by Garage        |
| `facilities`  | Gets the facilities present in Garage                   |
| `newsletter`  | Gets the newsletters published by Garage                |
| `assignedProjectInfo` | Gets the data related to Garage assigned projects                |
| `tinkering` | Gets the data related to Tinkering projects                |

### `fields`

API will only return data for fields specified. If no fields are specifed, all fields will be fetched.

| Type        | Fields            | Description                                                                | Field Type                                                                                                         |
| ----------- | ----------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| home        | `title`           | Title displayed on the homepage                                            | `string`                                                                                                           |
|             | `bannerImage`     | URL for the banner image displayed on the homepage                         | `string`                                                                                                           |
|             | `about`           | Text for the about section of the homepage                                 | `string`                                                                                                           |
|             | `objective`       | Text for the objective section of the homepage                             | `string`                                                                                                           |
|             | `ambassadors`     | Text introducing the ambassadors on the homepage                           | `string`                                                                                                           |
|             | `innovators`      | Text introducing the innovators on the homepage                            | `string`                                                                                                           |
|             | `innovatorsImage` | URL for the image for the innovators section                               | `string`                                                                                                           |
|             | `recruitment`     | Call to action text for the recruitment of innovators to Innovators' Track | `string`                                                                                                           |
|             | `registerLink`    | Link to register for Innovators' Track                                     | `string` \| `undefined`                                                                                            |
|             | `tinkering `      | Text for the section on Tinkering Projects within Garage                   | `string`                                                                                                           |
|             | `tinkeringImage` | URLs for the images of for Tinkering Projects                               | `string`                                                                                                         |
|             | `tinkeringRecruitment` | Text for the section on Tinkering Projects Recruitment                | `string`                                                                                                           |
|             | `facilities`      | Text for the section on the facilities within Garage                       | `string`                                                                                                           |
|             | `facilitiesImage` | URLs for the images of the facilities                                      | `string[]`                                                                                                         |
|             | `newsletter`      | Text for the section on Garage's newsletter                                | `string`                                                                                                           |
| projectInfo | `name`            | Name of the project/team                                                   | `string`                                                                                                           |
|             | `teamMembers`     | Members who are part of the project                                        | `string[]`                                                                                                         |
|             | `contactInfo`     | Instagram/Telegram handle of person to contact                             | `string`                                                                                                           |
|             | `event`           | What event this project was part of. E.g. Escendo, Innovators' Track       | `string`                                                                                                           |
|             | `tagline`         | Short description of the project                                           | `string`                                                                                                           |
|             | `description`     | Description of the project                                                 | Markdown formatted `string`                                                                                        |
|             | `coverPic`        | URL for the banner image of the project                                    | `string`                                                                                                           |
|             | `photos`          | URLs for the images of the project                                         | `string[]`                                                                                                         |
| ambassadors | `name`            | Name of the portfolio                                                      | `string`                                                                                                           |
|             | `description`     | Description of what the portfolio does                                     | Markdown formatted `string`                                                                                        |
|             | `homeImage`       | URL for image to be displayed on the photo cards for the homepage          | `string`                                                                                                           |
|             | `coverPic`        | URL for the banner image of the portfolio                                  | `string`                                                                                                           |
|             | `photos`          | URLs for the images of the portfolio                                       | `string[]`                                                                                                         |
| events      | `name`            | Name of the event                                                          | `string`                                                                                                           |
|             | `tagline`         | Short description of the event                                             | `string`                                                                                                           |
|             | `description`     | Description of the event                                                   | Markdown formatted `string`                                                                                        |
|             | `coverPic`        | URL for the banner image of the event                                      | `string`                                                                                                           |
|             | `photos`          | URLs for the images of the event                                           | `string[]`                                                                                                         |
|             | `links`           | Link to the event's Instagram                                              | `string` \| `undefined`                                                                                            |
| facilities  | `coverPic`        | URL for the banner image displayed on the facilities page                  | `string`                                                                                                           |
|             | `facilities`      | Array containing data for each facility                                    | `{name: string, description: string, coverPic: string, label: string \| undefined, link: stringn \| undefined }[]` |
|             | `others`          | Array containing other links                                               | `{label: string, link: string}[]`                                                                                  |
| newsletter  | `name`            | Title of the newsletter                                                    | `string`                                                                                                           |
|             | `date`            | Date of when the newsletter was published                                  | `string`                                                                                                           |
|             | `link`            | URL that links to the newsletter                                           | `string`                                                                                                           |
|             | `image`           | URL for the image of the newsletter                                        | `string`                                                                                                           |
| assignedProjectInfo | `name`         | Name of the project/team | `string` |
|                     | `description`  | Description of the project | Markdown formatted `string` |
|                     | `coverPic`     | URL for the banner image of the project | `string` |
|                     | `recruitment`  | Recruitment requirements and expectations of the project | `Object:{team_opening: string, looking_for: string, what_you_do: string}` |
|                     | `isRecruiting`  | Boolean based on whether project is recruiting or not | `string` (Y or N) |
| tinkering   | `title`           | Title displayed on the Tinkering homepage                                  | `string`                                                                                                           |
|             | `bannerImage`     | URL for the banner image displayed on Tinkering homepage                   | `string`                                                                                                           |
|             | `introduction`    | Text for the intro section of the homepage                                 | `string`                                                                                                           |
|             | `howToJoin`       | Text for the application section for Tinkering projects                    | `string[]`                                                                                                           |
|             | `registrationLink`| Link to register for Tinkering projects                                    | `string` \| `undefined`                                                                                                           |
|             | `garageAssigned`  | Text introducing the Garage Assigned projects                              | `string[]`                                                                                                           |
|             | `garageAssignedImages` | URL for the images for each of the Garage Assigned projects           | `string`                                                                                                           |
|             | `garageAssignedNames`  | Project names for each of the Garage Assigned projects                | `string`                                                                                                           |
|             | `supportImages`   | URL for the images for each of the support images                          | `string`                                                                                           |
|             | `supportImageTitles`   | Title for the images for each of the support images                   | `string`                                                                                                           |
|             | `supportImageDescriptions` | Description for the images for each of the support images         | `string`                                                                                                         |
|             | `tinkererNightImage`   | URL for the images for each of Tinkerer Night images                  | `string` 
|             | `tinkererNightDescription` | Text for information regarding Tinkerer Night                     | `string[]`                                                                                                           |
|             | `tinkererProjectDescription`    | Text introducing Tinkerer Night Projects                     | `string[]`                                                                                                           |
|             | `tinkererProjectImages`  | URL for the images for each of Tinkerer Project images              | `string`                                                                                                           |
|             | `tinkererProjectDescriptions`| Description for the images for each of the support images       | `string`
|             | `faq`             | Frequently asked questions for Tinkering Projects                          | `string`                                                                                                           |
|             | `answers`         | Answers to each FAQ for Tinkering Projects                                 | `string[]`

### `index`

Specify the index of data you want to fetch. This corresponds to the row index + 2 (accounting for header and starting index) in the Google Sheets.

### `token`

JSON Web Token to be sent back to AppScript backend for validation on Protected Get Requests. Stored on frontend in src/contexts/AuthProvider under 'token'.
