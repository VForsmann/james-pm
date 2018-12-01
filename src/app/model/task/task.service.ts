import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) { }

  /**
   * Returns all tasks of a given project id
   * @param projectId of project
   */
  async GETTasksForProjectId(projectId: Number): Promise<any> {
  }

  /**
   * Creates a new task in airtable
   * @param task for airtable
   */
  async POSTTask(task: Partial<Task>): Promise<any> {
  }

  /**
   * Deletes a given task from airtable
   * @param task to delete
   */
  async DELETETask(task: Partial<Task>): Promise<any> {
  }

  /**
   * Updates a user in airtable
   * @param task with updated data
   */
  async UPDATETask(task: Partial<Task>): Promise<any> {
  }

  /**
   * Helper function
   * Returns a mapped task object for airtable
   * @param task to map for airtable
   */
  private buildPostTaskObject(task: Partial<Task>) {
  }

  /**
   * Helper function
   * Returns a task object for updating task in airtable
   * @param task with updated data for airtable
   */
  private buildPatchTaskObject(task: Partial<Task>) {
  }
}
