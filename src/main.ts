import { Aurelia, PLATFORM } from 'aurelia-framework';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { WebStorageStateStore } from 'oidc-client';
import environment from './environment';
import { PluginConfiguration } from 'aurelia-kis-oidc';
import * as iziToastNamespace from 'izitoast';
const iziToast: any = iziToastNamespace.default || iziToastNamespace;
iziToast.settings({
  animateInside: false,
  timeout: 100000,
  theme: 'dark',
  resetOnHover: true,
  position: 'center',
  transitionIn: 'fadeIn',
  layout: 2
});

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin(PLATFORM.moduleName('aurelia-kis-oidc'), () => configureOpenidPlugin(aurelia));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');
  aurelia.start().then(() => aurelia.setRoot());
}

function configureOpenidPlugin(aurelia: Aurelia): PluginConfiguration {
  const webSiteUrl = 'http://localhost:5000';
  return {
    userIdClaimSelector: profile => (profile != null && profile.emails != null && profile.emails.length > 0) ? profile.emails[0] : profile.name,
    reconnectPrompt: loginFunc =>
      iziToast.show({
        title: 'Session expired',
        message: 'Please reconnect',
        buttons: [[`<button>Reconnect</button>`, (instance, toast) => loginFunc(), true]]
      }),
    userManagerSettings: {
      // Azure B2C
      authority: 'https://kisssb2c.b2clogin.com/tfp/kisssb2c.onmicrosoft.com/b2c_1_aurelia_kis_oidc_sample/v2.0',
      client_id: '8f76ed56-b4dc-4244-a3f5-5683d800d4a3',
      accessTokenExpiringNotificationTime: 60,
      automaticSilentRenew: false,
      checkSessionInterval: 30000,
      filterProtocolClaims: false,
      loadUserInfo: false,
      post_logout_redirect_uri: `${webSiteUrl}/signout-oidc`,
      redirect_uri: `${webSiteUrl}/signin-oidc`,
      response_type: 'id_token token',
      scope: 'https://kisssb2c.onmicrosoft.com/aurelia-kis-oidc-sample/user_impersonation openid',
      silentRequestTimeout: 20000,
      silent_redirect_uri: `${webSiteUrl}/signin-oidc`,
      userStore: new WebStorageStateStore({
        prefix: 'oidc',
        store: window.localStorage
      })
    }
  };
}
