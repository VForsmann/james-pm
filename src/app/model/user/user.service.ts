import { Injectable } from '@angular/core';
import { throwError as _throw } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Me } from './me';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAuthenticated = false;

  constructor(private http: HttpClient) { }

  /**
   * Returns the user by id
   * @param userId of user
   */
  async GETUserForId(userId: number) {
  }

  /**
   * Returns all users who are in the given string array
   * @param ids of users
   */
  async GETUsersForIds() {
  }

  /**
   * Returns all users who have access to the given project
   * @param project of users
   */
  async GETUsersForProjectId(project: any): Promise<any> {
  }

  async GETCreationUserForProjectId(project: any): Promise<any> {
  }

  /**
   * Returns user if data is correct and he is existing, or empty array.
   * @param email of user
   * @param password of user
   */
  async login(email: string, password: string) {
  }

  /**
   * Returns a user by its giving email, if he exists.
   * @param email of user
   * @param password of user
   */
  async getUserByMail(email: string) {
  }

  /**
   * Sends a user object to airtable to signup user
   * @param user who wants to sign up
   */
  async signUp(user: Partial<User>) {
  }

  /**
   * Updates a user in airtable
   * @param user with updated data
   */
  async updateUser(user: Partial<User>) {
  }

  /**
   * Helper Function
   * Returns a object for posting new user object to airtable
   * @param user with information
   */
  private buildUserObject(user: Partial<Me>) {
  }
}
