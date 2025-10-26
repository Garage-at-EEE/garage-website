# Garage Website Contact Us Functionality Documentation

## Contact Us Flow
### User input
1. User fills in required fields
   * first name, last name, email, phone, category, message
2. User optionally upload files via `FileUploader` component
3. Selected files are passed from `FileUploader` to parent component `ContactUs` via `onFilesReady` property
### Form submission
3. Once User clicks Send Message button, Client validates all required fields are filled
> If any are missing --> displays error and stops
4. Each selected file is encoded to base64 using `FileReader`and data stored in `filesPayload` array with `{ filename, fileContent }`
5. Final payload constructed by combining `formData` and `filesPayload` into one object and converted to string using JSON.stringify
6. Client sends simple POST request via `axios` to Server using custom header: `Content-Type: text/plain;charset=utf-8` (to bypass CORS preflight request)
### Backend processing
7. Accepts and validates JSON data via POST request
8. Decodes uploaded files (in base64) and saves them to [Google Drive Folder](https://drive.google.com/drive/folders/1MAe1zz19Gj3F4GAtXVwRZL4V_MWLmLiT)
9. Logs form data in [Google Sheet](https://docs.google.com/spreadsheets/d/1h-9btaZ74P3qCZm4_U0VTkjPEeGkO2WiiZHqp_x0PPo/edit?gid=2111003984#gid=2111003984)
10. Sends confirmation and notification emails to User and Admin
11. Returns JSON response indicating success/failure to Client
### Frontend response handling
> If success --> Client resets form, file uploader and shows success message

> If failure --> Client logs error and shows failure message


## Key Components

| Component Name                        | Component Path                                |
| ------------------------------------- | --------------------------------------------- |
| [`ContactUs`](#ContactUs)                 | `src\routes\contactUs\ContactUs.jsx`                   |
| [`FileUploader`](#FileUploader)   | `src\components\FileUploader.jsx`                |
| [`GoogleMapComponent`](#GoogleMapComponent)   | `src\components\GoogleMap\GoogleMapComponent.jsx` |

---

### `ContactUs`

Route Component to Contact Us page, accessible through /contact-us


#### Post Request Format
In case of any changes in backend, keep in mind request in this format\
axios.post(url, data, config) follows:
|  Parameter | Detail |
| ---------- | ------ | 
| `url`      | `UPLOAD_URL` |
| `data`     | `payload` |
| `config`   | `headers` = {"Content-Type": "text/plain;charset=utf-8"} |

### `FileUploader`
Passes selected files to `ContactUs` via `onFilesReady` prop (aliased as `handleFilesReady`)

#### `onFilesReady`
Triggered in two places inside `FileUploader`
1. When files are selected in `onDrop` callback
2. When a file is removed in `handleRemoveFile`

#### `handleFilesReady`
Callback function defined in `ContactUs`
```jsx
<FileUploader onFilesReady={handleFilesReady} />
```
`ContactUs` (parent) passes `handleFilesReady` function into `FileUploader` (child) under `onFilesReady` as a prop. `FileUploader` calls `onFilesReady` when a file is selected/removed, sending uploaded files back to `ContactUs`

#### `GoogleMapComponent`
Renders custom-styled Google Map centered at *Garage@EEE, NTU*, using `@vis.gl/react-google-maps` package

> `MAP_ID` and `REACT_APP_GOOGLE_MAP_API_KEY` are generated in Google Maps Platform

>  To use the API when first clone the repo, duplicate `.env_sample` and rename it to `.env`, then paste the API key found in the AppScript ScriptProperties under `GOOGLE_MAPS_API_KEY` to replace `YOUR_API_KEY_HERE`.
