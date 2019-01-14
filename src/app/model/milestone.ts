import { firestore } from 'firebase';

interface Milestone {
  id?: string;
  name: string;
  description: string;
}

export interface MilestoneFirebase extends Milestone {
  done: firestore.Timestamp;
}

export interface MilestoneAngular extends Milestone {
  done: Date;
}
