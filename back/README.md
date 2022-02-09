
# Area BACKEND (API - Server)

This program is used to make a link between 3 parts:
 - Database ([MongoDB](https://cloud.mongodb.com))
 - Front-End (Web or App)
 - Services ([facebook](https://www.facebook.com/), [spotify](https://open.spotify.com/), ...)
## Run Locally

### Install dependencies with npm

```bash
  $ npm install
```

You will need to have node/npm installed first, if not, go [node](https://nodejs.org/en/download/).

### Start the server

```bash
  $ npm run start
```

View the website at: http://localhost:8080
## API Routes

## Authenticate

```http
  POST /auth/signup/:service
  POST /auth/login/:service
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `service` | `string` | ***Required**. The service to signup [google, area, facebook] |
| `code`    | `string` | ***Optional**. Code given by the authorization code flow (oauth2). [facebook, google]  |
| `redirect_uri` | `string` | ***Optional**. Redirect URI used to get the 'code'. [facebook, google]|

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | ***Optional**. Email to signup [area] |
| `password`    | `string` | ***Optional**. Password to signup. [area]  |
| `confirmPassword` | `string` | ***Optional**. Confirmed password. [area] !(only when signup)|

** Required but can be in the query or in url request. ( "/link/google" or "/link?service=google" )

** Optional: must be in the request if service specified is in '[]'.

The response from this request, if successful, will be JSON of the following format:

```
{
    "access_token": Your access_token,
    "refresh_token": Your refresh_token,
    "expires_in": Unix Epoch Seconds,
    "token_type": "Bearer"
}
```

## Token

Refresh the access_token of AREA account.

```http
  GET /token/refresh
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `refresh_token` | `string` | **Required**. The refresh_token given when signup or login |

The response from this request, if successful, will be JSON of the following format:

```
{
    "access_token": Your new access_token,
    "refresh_token": Your refresh_token,
    "expires_in": Unix Epoch Seconds,
    "token_type": "Bearer"
}
```

Verify if the given access_token still available.

```http
  GET /token/verify
```
| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. The access_token given when signup or login. (ex: "Bearer Your access_token") |

## Link

Link new service to an existing account.

```http
  GET /link/:service
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. The access_token given when signup or login. (ex: "Bearer Your access_token") |

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `service` | `string` | **Required**. The service to link. [google, spotify, facebook, microsoft] |
| `code`    | `string` | **Required**. Code given by the authorization code flow (oauth2). |
| `redirect_uri` | `string` | **Required**. Redirect URI used to get the 'code'.|

** Required but can be in the query or in url request. ( "/link/google" or "/link?service=google" )