# Garage Website Login Functionality Documentation

**Login Flow:**
1. Client tries to access private route and is redirected to login (`<PrivateRoute />` => `<Login />`)
2. Client fills login info and sends POST request to Server (`<Login />`)
3. Server receives POST request
4. Server verifies credentials with DB
5. Server sends response back
> If credentials correct => JWT generated from data => JWT included in response back
6. Client receives response from Server (`<Login />`)
7. Client saves response in React Context (`<Login />` => `<AuthProvider />`)


## Key Components

| Component Name                        | Component Path                                |
| ------------------------------------- | --------------------------------------------- |
| [`<Login />`](#Login)                 | `src\routes\login\Login.js`                   |
| [`<AuthProvider />`](#AuthProvider)   | `src\contexts\AuthProvider.js`                |
| [`<PrivateRoute />`](#PrivateRoute)   | `src\components\PrivateRoute\PrivateRoute.js` |

---

### `Login`

Route Component to login page, accessable through /login or redirect from PrivateRoute\
Should only be used on App.js with Routes and Route, no props/children to be added

#### Post Request Format
Incase of any changes in backend, keep in mind request in this format\
axios.post(url, data, config) follows:
|  Parameter | Detail |
| ---------- | ------ | 
| `url`      | `API_DOMAIN` |
| `data`     | `matric` = `matricNumber` |
|            | `passcode` = `passCode` |
|            | `type` = "userdata" |
| `config`   | `redirect` = "follow" |
|            | `mode` = "cors" |
|            | `method` = "POST" |
|            | `headers` = {"Content-Type": "text/plain;charset=utf-8"} |

#### Login Response Format
Response sent by back end should follow these parameters\
response.data follows:
|  Parameter           | Success Response            | Failure Response |
| -------------------- | --------------------------- | ---------------- |
| response.data.status | "DATA RETRIEVAL SUCCESSFUL" | "ACCESS DENIED"  |
| response.data.info   | `name`: Name of user        | `message`: error message |
|                      | `matricNumber`: Matric used to login           | 
| response.data.token  | JWT Token generated         | NIL |

---

### `AuthProvider`

Context component provides data (context) to any children wrapped in it\
Main body of `<App>` is wrapped with `<AuthProvider>`, theres is no need to wrap any other component with `<AuthProvider>`

#### Accessing Auth Data
Step 1: import { useAuth } from "src/contexts/AuthProvider"; \
Step 2: Assign a `variable` to useAuth() \
e.g.

    const auth = useAuth();
    console.log(auth.name); //Prints current user to console

or 

    const { matric, name, token, loginAction, logoutAction } = useAuth();
    console.log(name); //Prints current user to console

#### Sending GET Request for Protected Data (Database/Shop)
Using `useFetch` hook, use url: API_DOMAIN + "?type=...&token=" + token (acquired from above)
    
---

### `PrivateRoute`

| Props | Description |
| ------ | ------ |
| `children` | Destination route component (e.g `<Database />`, see App.js for example) |
| `loginPageTitle` | Heading/Title login page will display above form (set to `Member Login` now)|
| `loginRedirect` | URL of destination route component that login will redirect to after success |

---