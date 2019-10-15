# aurelia-kis-oidc plugin demo

- This is an __aurelia application__ with OpenID Connect authentication (implicit flow) that calls an OAuth2 (bearer token) protected web api.
- The OpenID Connect and OAuth2 authentication is provided by the [aurelia-kis-oidc](https://github.com/kisssdev/aurelia-kis-oidc) plugin.
- The Identity Provider is [Microsoft Azure Active Directory B2C](https://azure.microsoft.com/en-us/services/active-directory-b2c/). It has been configured to use either Google or Microsoft as social login providers. You will have to sign in with your Microsoft or your Google account.
- For the purpose of the demo, the __access token validity__ is set to __5 mn__ (rather than 1 hour by default) and the __session duration__ is set to __15 mn__ (rather than 1 day).
- When the access token is expired but the session is still valid, the plugin _will transparently try a silent login_.
- When the access token and the session are expired, the plugin will _prompt the user to sign-in again_.

## Run the application

1. Clone this repo.

1. Install the dependencies.

   ```bash
   npm install
   ```

1. Run the application.

   ```bash
   npx au run
   ```

## See it in action

If you prefer, you can this see this application in live [here](https://aureliakisoidc.z16.web.core.windows.net/).
