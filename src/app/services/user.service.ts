import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  createUser(id: string, user: User) {
    delete user.password;
    return this.db.collection('users').doc(id).set(user);
  }

  deleteUser(id: string) {
    return this.db.collection('users').doc(id).delete();
  }

  updateUser(id: string, user: User) {
    delete user.password;
    return this.db.collection('users').doc(id).update(user);
  }
}
