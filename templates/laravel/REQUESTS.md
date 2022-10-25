# Mobile Api Requests

## Base Url

URL: `https://apps.mentoor.io/happiness/base/api`

## Headers

To generate Bearer token (as guest)

`POST /login`

$apiKey

- ios: `GTR5R43EW2QSDFRKOPEWQDKWOPFEGTREKWQOPDSKFGRE`
- android: `SQWADFRGTEWDESDFDGHRT4REDCSFDGRTERWEDSCQ`

HEADERS:

- os: `android` | `ios`
- Authorization: `key $apiKey`
- `POST /login`
  - phoneNumber
  - phoneNumberCountryCode
  - password
  - accountType: `therapist` | `relative` | `patient`
- `POST /logout`
- POST `/forget-password`
  - phoneNumber
  - phoneNumberCountryCode
  - password
  - accountType: `therapist` | `relative` | `patient`
- POST `/verify-code`
  - phoneNumber
  - phoneNumberCountryCode
  - code
  - password
  - accountType: `therapist` | `relative` | `patient`
- POST `/reset-password`
  - code
  - password
  - password_confirmation
- GET `/sessions`
  - queryParams
    - month: integer
  - year: integer
  - response: records[]
    - id
    - startDate
    - endDate
    - therapist
    - patient
    - relative
    - duration: (in minutes)
    - status: `notStarted` | `active` | `completed` | `canceled` | `paused`
    - type
      - name
    - room
      - name
      - floor
- GET `/sessions/:id`
  - id
  - startDate
  - endDate
  - therapist
  - patient
  - relative
  - duration: (in minutes)
  - status: `notStarted` | `active` | `completed` | `canceled` | `paused`
  - type
    - name
  - room
    - name
    - floor
- POST `/sessions/:id/update-status/:status`
- GET /notifications
  - id
  - title
  - icon
  - type
- DELETE /notifications/:id
- GET `/me`
  - id
  - name
  - image
  - phoneNumber
  - phoneNumberCountryCode
  - birthDate
  - alternativePhoneNumber
  - alternativePhoneNumberCountryCode
- PUT `/me`
  - name
  - image
  - phoneNumber
  - phoneNumberCountryCode
  - birthDate: dd-mm-YYYY
  - alternativePhoneNumber
  - alternativePhoneNumberCountryCode
  - password
  - newPassword
  - password_confirmation
- pushNotifications
  - title
  - body
  - extra
    - type
    - session
      - id
- notifications topics
  - title
  - body
