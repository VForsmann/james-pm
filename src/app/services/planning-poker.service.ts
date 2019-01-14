import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReferenceService } from './reference.service';

@Injectable({
  providedIn: 'root'
})
export class PlanningPokerService {
  constructor(
    private db: AngularFirestore,
    private referenceService: ReferenceService
  ) {}

  addPlanningPoker(entity) {
    return this.db.collection('planning_poker').add(entity);
  }

  checkPlanningPoker(backlog, user) {
    return this.db
      .collection('planning_poker', ref =>
        ref.where('user', '==', user).where('backlog', '==', backlog)
      )
      .valueChanges();
  }

  getPlanningPoker(backlog, user) {
    return this.db
      .collection('planning_poker', ref =>
        ref.where('user', '==', user).where('backlog', '==', backlog)
      )
      .snapshotChanges();
  }

  getPlanningPokerForId(ppId) {
    return this.db
      .collection('planning_poker').doc(ppId).valueChanges();
  }

  updatePlanningPoker(pp) {
    this.db.collection('planning_poker').doc(pp.id).update(pp);
  }

  getPlanningPokerForBacklogRef(backlogRef) {
    return this.db.collection('planning_poker', ref => ref.where('backlog', '==', backlogRef)).valueChanges();
  }
}
