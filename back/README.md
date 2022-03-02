
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
| `platform` | `string` | ***Optional**. What platform used to auth (web, ios, android), by default web. [facebook, google]|

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

### Refresh the access_token of AREA account.

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

### Verify if the given access_token still available.

```http
  GET /token/verify
```
| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. The access_token given when signup or login. (ex: "Bearer Your access_token") |

## Link

### Link new service to an existing account.

```http
  POST /link/:service
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. The access_token given when signup or login. (ex: "Bearer Your access_token") |

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `service` | `string` | ***Required**. The service to link. [google, spotify, facebook, microsoft] |
| `code`    | `string` | **Required**. Code given by the authorization code flow (oauth2). |
| `platform` | `string` | **Optional**. What platform used to auth (web, ios, android), by default web.|

** Required but can be in the query or in url request. ( "/link/google" or "/link?service=google" )

## User

### Get information about connected user.

```http
  GET /user
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. The access_token given when signup or login. (ex: "Bearer Your access_token") |

The response from this request, if successful, will be JSON of the following format:

```
{
    "email": Your email,
    "email_verified": Boolean True/False if email is verified,
    "linked_services": Array of linked service name
}
```

## AREA

### Get information about an area.

```http
  GET /area
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. The access_token given when signup or login. (ex: "Bearer Your access_token") |

The response from this request, if successful, will be JSON of the following format:

```
{
    "items": Your number of area,
    "data": Array of area
}
```

### Create an area.

```http
  POST /area
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. The access_token given when signup or login. (ex: "Bearer Your access_token") |

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Optional**. Title you want to give to new area. (byt default it would be 'action title' and 'reaction title' ) |
| `description`    | `string` | **Optional**. Description you want to give to new area. |
| `action` | `Object` | **Required**. The config of action who trigger the new area (see an example below).|
| `reaction` | `Object` | **Required**. The reaction's config of the new area (see an example below).|

The body from this request, will be JSON of the following format:

```
{
    "title": A title for the area,
    "description": Simple description,
    "action": {
        "service": needed service to run this action,
        "tag": tag of this action,
        "config": Object that contain all config the action need to run (can be null),
    },
    "reaction": {
        "service": needed service to run this reaction,
        "tag": tag of this reaction,
        "config": Object that contain all config the action need to run (can be null),
    }
}
```

### Delete an area.

```http
  DELETE /area/:id
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. The access_token given when signup or login. (ex: "Bearer Your access_token") |

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. ID of area to delete. |

** Required but can be in the query or in url request. ( "/delete/08a78c28" or "/delete?id=08a78c28" )

## Service

### Get all service

```http
  GET /service/:mode
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Optional**. The access_token given when signup or login. (ex: "Bearer Your access_token"), must be given if mode not in 'offline' |

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `mode` | `string` | **Optional**. How to see the service information (offline or not). |
| `platform` | `string` | **Optional**. What platform to get information about the link (web, ios, android), by default web. |

The response from this request, if successful, will be JSON of the following format:

```
[
  {
        "tags": Array of tag ('auth', 'link', 'action', 'reaction')
        "name": Name of the service
        "link": Object that contain all information to auth or link account (depend of selected platform),
        "actions": Array of action,
        "reactions": Array of reaction
    },
    ...
]
```