import { firestore } from 'firebase';

export interface Milestone {
    description: string;
    done: firestore.Timestamp;
    name: string;
}
