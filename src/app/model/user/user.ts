import { Model } from '../model';
import { Router } from '@angular/router';

export class User {
  userService = this.model.userService;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  rId: string;

  constructor(public model: Model, public router: Router) { }

  /**
   * Sets the general User Data for a Promise which contains a User in result.records[0]
   * @param userData Promise which contains userData
   */
  async setUser(userData: Promise<any>, errorCallback: Function) {
    await userData
      .then(result => {
        this.setUserData(result.records[0]);
      })
      .catch(error => {
        errorCallback(error);
      });
  }

  /**
   * Is called by setUser and sets the general Data
   * @param record0 is the first entry of the resultset containing in the Promise
   */
  setUserData(record0: any) {
    this.rId = record0['id'];
    const user = record0.fields;
    this.email = user['Email'];
    this.firstname = user['Firstname'];
    this.id = user['ID'];
    this.lastname = user['Lastname'];
  }

  async login(email: string, password: string) {
  }

  update(callback: Function) {
    callback(this);
  }

  async create(callback: Function) {
    callback(this);
    await this.model.userService.signUp(this);
  }

  delete(callback: Function) {
    callback(this);
  }
}
