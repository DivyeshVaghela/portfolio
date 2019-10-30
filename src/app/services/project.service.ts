import { Injectable } from '@angular/core';
import { Project } from '../models/Project.model';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects: Project[];

  constructor(
    private afStore: AngularFirestore
  ) { }

  list(reverse: boolean = false, limit?: number): Observable<Project[]>{
    return this.afStore.collection<Project>(
      '/projects',
      ref => {
        let query = ref.orderBy('sequenceNo', reverse == null || reverse ? 'desc':'asc');
        if (limit) query = query.limit(limit);
        return query;
      }
      ).valueChanges({idField: 'id'});
  }

  get(projectId: string): Observable<Project>{
    return this.afStore.doc<Project>(`/projects/${projectId}`).valueChanges()
  }


}
