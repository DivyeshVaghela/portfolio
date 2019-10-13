import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';

import { TimelineItem } from '../models/TimelineItem.model';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private timeline: TimelineItem[];
  //  = [
  //   {
  //     id: 1,
  //     title: 'BScIT',
  //     from: 'Shipra College of Computer Science and Technology',
  //     location: 'Rajkot, Gujarat',
  //     category: 'education',
  //     startYear: 2014,
  //     endYear: 2017
  //   },
  //   {
  //     id: 2,
  //     title: 'Jr. Developer',
  //     from: 'Generation Software Solution (GSS)',
  //     location: 'Rajkot, Gujarat',
  //     category: 'profession',
  //     startYear: 2017,
  //     startMonth: 'Jan',
  //     endYear: 2017,
  //     endMonth: 'July'
  //   },
  //   {
  //     id: 3,
  //     title: 'Programmer',
  //     from: 'Tata Consultancy Services (TCS)',
  //     location: 'Chennai, Tamil Nadu and Mumbai, Maharashtra',
  //     category: 'profession',
  //     startYear: 2017,
  //     startMonth: 'Aug',
  //     endYear: 2018,
  //     endMonth: 'July'
  //   },
  //   {
  //     id: 4,
  //     title: 'MSc (IT and CA)',
  //     from: 'Shree H N Shukla College of Computer Science and Management',
  //     location: 'Rajkot, Gujarat',
  //     category: 'education',
  //     startYear: 2018
  //   }
  // ]

  constructor(
    private afStore: AngularFirestore
  ) { }

  list(reverse: boolean = true): Observable<TimelineItem[]>{
    return this.afStore.collection<TimelineItem>(
      '/timeline', 
      ref => ref.orderBy('sequenceNo', reverse ? 'desc':'asc')
      ).valueChanges();
    // return of(reverse ? this.timeline.reverse() : this.timeline);
  }

}
