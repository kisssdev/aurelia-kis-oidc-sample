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

1. Configure the OpenID Connect parameters.

   OpenID configuration parameters are stored in the `configureOpenidPlugin` function of the [main.ts](./src/main.ts). You need to configure at least:

   - the `authority` url of your identity provider,
   - the `client_id` of your application,
   - the `scope` in case your are calling a protected web api.

1. Run the application.

   ```bash
   npx au run
   ```

## See it in action

If you want to check the behavior of the application, you can see it in action [here](https://aureliakisoidc.z16.web.core.windows.net/).
