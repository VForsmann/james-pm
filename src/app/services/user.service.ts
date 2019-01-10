import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  createUser(id: string, user: User) {
    delete user.password;
    return this.db
      .collection('users')
      .doc(id)
      .set(user);
  }

  deleteUser(id: string) {
    return this.db
      .collection('users')
      .doc(id)
      .delete();
  }

  updateUser(id: string, user: User) {
    delete user.password;
    return this.db
      .collection('users')
      .doc(id)
      .update(user);
  }

  getUserWithProject(projectRef): Observable<[]> {
    return Observable.create(observer => {
      this.db
        .collection('user_projects', ref =>
          ref.where('project', '==', projectRef)
        )
        .snapshotChanges()
        .subscribe(users_data => {
          const users_list = [];
          let userId;
          users_data.map(actions => {
            const roleRef = actions.payload.doc.data()['role'];
            const userRef = actions.payload.doc.data()['user'];
            this.db
              .collection('roles')
              .doc(roleRef['id'])
              .valueChanges()
              .subscribe(role_data => {
                if (role_data['role'] === 'developer') {
                  const user = this.db
                    .collection('users')
                    .doc(userRef['id'])
                    .snapshotChanges();
                  const subs = user.subscribe(user_data => {
                    const update_user = users_list.map(us => us.id);
                    if (user_data) {
                      userId = user_data.payload.id;
                      const usr = user_data.payload.data();
                      usr['id'] = userId;
                      if (update_user.indexOf(userId) !== -1) {
                        users_list[update_user.indexOf(userId)] = user_data;
                      } else {
                        users_list.push(usr);
                      }
                    } else {
                      users_list.splice(update_user.indexOf(userId), 1);
                      subs.unsubscribe();
                    }
                    observer.next(users_list);
                  });
                }
              });
          });
        });
    });
  }
}
