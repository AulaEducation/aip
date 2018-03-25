# AIP API

The AIP has a REST API that is JSON based.

## Endpoints

### `GET` /health _unencrypted_
Health ping endpoint, can be pinged to know if the service is alive and responding

**Response**:
200:
```
OK
```

---

### `POST` /identity _encrypted_
Identity request endpoint, can be used to request a user identity.

**Request**:
```json
{
  "id": userID (string)
}
```
!> Requests should be encrypted. An encrypted body (with the shared RSA keys) should be sent with `mime-type: text/plain`


**Responses**:

401:
```
unauth
```

403:
```
forbidden
```

200:
```json
{
  "authorized": true/false (boolean)
}
```

!> 200 Responses will be encrypted with the shared RSA keys
