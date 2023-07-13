# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body

```json
{
   "username" : "pzn",
   "password" : "rahasia",
   "name"     : "Nayandra"
}
```

Respond Body Success

```json
{
   "data" : {
      "username" : "pzn",
      "name"     : "Nayandra"
   }
}
```

Respond Body Success

```json
{
   "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body

```json
{
   "username" : "pzn",
   "password" : "rahasia"
}
```

Respond Body Success

```json
{
   "data" : {
      "token" : "unique-token"
   }
}
```

Respond Body Failed

```json
{
   "errors" : "username or password wrong"
}
```
## Update User API

Endpoint : PATCH /api/users/current

Header
- Authorization : token

Request Body

```json
{
   "name" : "nayandra kastoro", // OPTIONAL
   "password" : "rahasia123" // OPTIONAL
}
```

Respond Body Success
```json
{
   "data" : {
      "username" : "pzn",
      "name" : "nayandra kastoro"
   }
}
```

Respond Body Failed
```json
{
   "errors" : "name length min 3"
}
```
## Get User API

Endpoint : GET /api/users/current

Header
- Authorization : token

Response Body Success
```json
{
   "data" : {
      "username" : "pzn",
      "name"     : "nayandra kastoro"
   }
}
```

Respond Body Failed
```json
{
   "errors" : "Unauthorize"
}
```
## Logout User API

Endpoint : DELETE /api/users/logout

Header
- Authorization : token

Respond Body Success
```json
{
   "data" : "OK"
}
```

Respond Body Failed
```json
{
   "errors" : "Unauthorize"
}
```