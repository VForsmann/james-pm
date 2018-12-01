import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from './project';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  /**
   * Returns all projects of a user
   * @param userId of user
   */
  async GETProjectsForUserId(userId: number): Promise<any> {
  }

  /**
   * Creates a new project in airtable
   * @param project for airtable
   */
  async POSTProject(project: Partial<Project>) {
  }

  /**
   * Deletes a given project from airtable
   * @param project to delete
   */
  async DELETEProject(project: Partial<Project>) {
  }

  /**
   * Updates a given project in airtable
   * @param project to update
   */
  async UPDATEProject(project: Partial<Project>) {
  }

  /**
   * Helper function
   * Builds a project object to send it to airtable
   * @param project with data for airtable
   */
  private buildPostProjectObject(project: Partial<Project>) {
  }

  /**
   * Helper function
   * Builds a project object to update project in airtable
   * @param project with updated data for airtable
   */
  private buildPatchProjectObject(project: Partial<Project>) {
  }
}
