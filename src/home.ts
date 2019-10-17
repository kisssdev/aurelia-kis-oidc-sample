import { autoinject } from 'aurelia-framework';
import { Connection } from 'aurelia-kis-oidc';
import { Service } from 'service';

@autoinject
export class Home {
  result: string;
  tokenExpired: boolean = false;
  tokenExpiresIn: number = 5 *60;
  callInProgress: boolean;
  interval: any;

  constructor(public connection: Connection, private service: Service) {}

  activate() {
    this.refreshInfo();
    this.interval = setInterval(() => {this.refreshInfo()}, 1000);
  }

  deactivate() {
    clearInterval(this.interval);
  }

  refreshInfo() {
    this.tokenExpired = !this.connection.hasValidAccessToken;
    this.tokenExpiresIn = this.connection.expiresIn;
  }

  async getAzureTime() {
    this.callInProgress = true;
    this.result = null;
    return this.service
      .getAzureTime()
      .then(result => {
        const { date } = result;
        this.result = date;
      })
      .finally(() => (this.callInProgress = false));
  }
}
