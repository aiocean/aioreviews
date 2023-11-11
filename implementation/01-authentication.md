# Authentication

## Overview

Shopify session tokens provide a secure and stateless way to manage authentication for embedded apps. These tokens are short-lived, carrying the user's access credentials, and can be used to authenticate subsequent requests.

## How to Obtain a Session Token

Session tokens are obtained through the Shopify App Bridge. The App Bridge provides a `getSessionToken` method, which can be used to retrieve the current session token.

```javascript
import createApp from "@shopify/app-bridge";
import { getSessionToken } from "@shopify/app-bridge/utilities";

const app = createApp({
  apiKey: "12345",
});
```

## Using the Session Token

Once you have a session token, you can use it to authenticate your requests. Include it in the `Authorization` header of your HTTP requests.

```javascript
fetch('/some/endpoint', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});
```

## Verifying the Session Token on the Server

Once the server receives a request with a session token, it needs to verify the token to ensure it's valid and from a trusted source. This involves decoding the JWT token and validating its signature and payload.

Here's a basic example of how you can do this in Go using the `jwt-go` library:

```go
package main

import (
 "fmt"
 "github.com/dgrijalva/jwt-go"
 "net/http"
 "strings"
 "time"
)

func verifyToken(w http.ResponseWriter, r *http.Request) {
 authHeader := r.Header.Get("Authorization")
 bearerToken := strings.Split(authHeader, " ")

 if len(bearerToken) != 2 {
  http.Error(w, "Invalid token", http.StatusUnauthorized)
  return
 }

 token, err := jwt.Parse(bearerToken[1], func(token *jwt.Token) (interface{}, error) {
  if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
   return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
  }
  return []byte("your_secret_key"), nil
 })

 if err != nil {
  http.Error(w, "Invalid token", http.StatusUnauthorized)
  return
 }

 if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
  // Verify the exp value
  expTime := time.Unix(int64(claims["exp"].(float64)), 0)
  if !expTime.After(time.Now()) {
    http.Error(w, "Token expired", http.StatusUnauthorized)
    return
  }

  // Verify the nbf value
  nbfTime := time.Unix(int64(claims["nbf"].(float64)), 0)
  if !nbfTime.Before(time.Now()) {
    http.Error(w, "Token not valid yet", http.StatusUnauthorized)
    return
  }

  // Verify the iss and dest fields
  iss := claims["iss"].(string)
  dest := claims["dest"].(string)
  if iss != dest {
    http.Error(w, "Issuer and destination do not match", http.StatusUnauthorized)
    return
  }

  // Verify the aud value
  aud := claims["aud"].(string)
  if aud != "your_client_id" {
    http.Error(w, "Audience does not match client ID", http.StatusUnauthorized)
    return
  }

  // Extract the sub value
  sub := claims["sub"].(string)
  fmt.Println("User ID:", sub)
 } else {
  http.Error(w, "Invalid token", http.StatusUnauthorized)
  return
 }
}
```

In this example, the verifyToken function checks if a token is provided in the Authorization header of the request. If a token is provided, it uses jwt.Parse to decode the token and validate its signature. It then verifies the exp, nbf, iss, dest, and aud fields in the payload. If the token is valid, it prints the user ID (sub field).

Please note that you need to replace "your_secret_key" and "your_client_id" with your actual secret key and client ID.

## More Information

For more detailed information, refer to the [official Shopify documentation](https://shopify.dev/docs/api/usage/authentication) and [session token](https://shopify.dev/docs/apps/auth/oauth/session-tokens/getting-started).
