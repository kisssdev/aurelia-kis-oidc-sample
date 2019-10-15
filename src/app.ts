import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RouterConfiguration, Router } from 'aurelia-router';
import { OpenidRouting, Oauth2Interceptor } from 'aurelia-kis-oidc';
import { Log } from 'oidc-client';

@autoinject
export class App {
  router: Router;

  constructor(private openidRouting: OpenidRouting, private client: HttpClient, private authInterceptor: Oauth2Interceptor) {
    this.configureHttpClient(client, authInterceptor);
  }

  configureRouter(configuration: RouterConfiguration, router: Router){
    configuration.options.pushState = true;
    configuration.options.root = '/';
    configuration.map({route:'', name: 'home', moduleId: 'home'})
    this.openidRouting.configureRouter(configuration);
  }

  configureHttpClient(client: HttpClient, authInterceptor: Oauth2Interceptor) {
    Log.level = 4;
    Log.logger = console;
    return client.configure(config => {
      config
        .withDefaults({
          headers: {
            'Access-Control-Allow-Credentials': 'true',
            'Accept': 'application/json'
          },
          credentials: 'include',
          mode: 'cors'
        })
        .rejectErrorResponses()
        .withInterceptor(authInterceptor);
    });
  }
}
