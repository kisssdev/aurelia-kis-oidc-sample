import { HttpClient } from "aurelia-fetch-client";
import { autoinject } from "aurelia-framework";

@autoinject
export class Service {

  constructor(private client: HttpClient) {}

  getAzureTime() {
    return this.client
      .fetch('https://kisss-sample-api.azurewebsites.net/api/time')
      .then(response => response.json());
  }
}
