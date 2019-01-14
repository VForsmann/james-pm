import * as firebase from 'firebase';

export interface Sprint {
    id?: string;
    project: any;
    start_date: any;
    state: string;
}
