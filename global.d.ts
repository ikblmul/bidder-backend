[
  {
    operationName: "LoginMutationV2",
    variables: {
      input: {
        grant_type: "ZXh0ZW5zaW9uTzNX",
        social_type: "7",
        access_token:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4MzNlOGE3ZmUzZmU0Yjg3ODk0ODIxOWExNjg0YWZhMzczY2E4NmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjkyMDkyNTE4MTgyLXJqZ2gwYmphNnE0MWRsbHBxMmRwdG4xMzRjbWhpdjloLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjkyMDkyNTE4MTgyLXJqZ2gwYmphNnE0MWRsbHBxMmRwdG4xMzRjbWhpdjloLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwMzE1MzA1OTM0NjM1NDc1MTY2IiwiZW1haWwiOiJpa2JsbXVsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiUUFDMXhrZXljb0RZS05DcFItSkVQZyIsIm5iZiI6MTY5OTcxNTU4MSwibmFtZSI6Ik11bHlhZGkgTXVsIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tJbHRUVXRVNnV0dzFWdThOZ3AyWDZxOE9aNXp3VjY2cWNKMEtieHc1LUNXaz1zOTYtYyIsImdpdmVuX25hbWUiOiJNdWx5YWRpIiwiZmFtaWx5X25hbWUiOiJNdWwiLCJsb2NhbGUiOiJlbi1HQiIsImlhdCI6MTY5OTcxNTg4MSwiZXhwIjoxNjk5NzE5NDgxLCJqdGkiOiJjNjNhMjA3ZjcyYzQ0ZjE2NTcxMzY5YzZmYzFjMjgwNmVhMWM1NjE1In0.i37twciovX3QfzX42V-_mox5ZkljKOIJPexami3aFpvYg9jml2IYhHaZm_6dxjY7isvmGs7pJ1ROLoznuY9DDiIeUNb5vZbYp5Uyrhs6tjXrtCbBYcbbtOUWkrrHZYMYC9sB14qVBgsDVRe_NbPj0dkGTGkExXHH6RhUNYkXBeLVQUiBX9EdYJX-Eo8WAlt7_Ck8t1gYSAJTHCIADPfR9-Wtv8zS1nEWvB1Mr20wXfvAahjQSKvMUzH0eC0B36xyy7n5n3N9cT01MnodRoKTfSmR5cJdSx4buAs5Zu0zXvNJMjEyDXW1tIRe-pWU_uielTyHjgTfWivfjhAMAeim-Q",
        supported: "true",
        cotp_ld: "https://www.tokopedia.com/after_sq?ld=%2F&fromWidget=1&via=google",
        fpt: "a73824ed07d2673d8a90fee83212a0cd",
      },
    },
    query:
      "mutation LoginMutationV2($input: TokenRequestV2!) {\n  login_token: web_token_v2(input: $input) {\n    access_token\n    refresh_token\n    token_type\n    sid\n    acc_sid\n    errors {\n      name\n      message\n      __typename\n    }\n    popup_error {\n      header\n      body\n      action\n      __typename\n    }\n    sq_check\n    cotp_url\n    uid\n    action\n    event_code\n    expires_in\n    __typename\n  }\n}\n",
  },
];
