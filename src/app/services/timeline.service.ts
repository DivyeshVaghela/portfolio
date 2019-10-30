import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';

import { TimelineItem } from '../models/TimelineItem.model';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private timeline: TimelineItem[];

  constructor(
    private afStore: AngularFirestore
  ) { }

  list(reverse: boolean = true): Observable<TimelineItem[]>{
    return this.afStore.collection<TimelineItem>(
      '/timeline', 
      ref => ref.orderBy('sequenceNo', reverse ? 'desc':'asc')
      ).valueChanges();
  }

}
