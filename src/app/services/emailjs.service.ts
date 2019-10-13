import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

declare var emailjs: any;

@Injectable({
  providedIn: 'root'
})
export class EmailjsService {

  emailJSConfig: EmailJSConfig;

  constructor(
    private afStore: AngularFirestore
  ) { }

  getEmailJSConfig(): Observable<EmailJSConfig>{
    return this.afStore.doc<EmailJSConfig>('/personalDetails/emailJSConfig')
      .valueChanges()
      .pipe(take(1));
  }

  send(data: {fromName: string, fromEmail: string, subject: string, message: string}): Promise<any>{
    return this.getEmailJSConfig().toPromise().then(emailJSConfig => {
      return emailjs.send(emailJSConfig.serviceId, emailJSConfig.contactTemplateId, data, emailJSConfig.userId);
    });
  }
}

interface EmailJSConfig{
  userId: string;
  serviceId: string;
  contactTemplateId: string;
}