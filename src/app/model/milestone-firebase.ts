import { firestore } from 'firebase';

export interface MilestoneFirebase {
    description: string;
    done: firestore.Timestamp;
    name: string;
}
