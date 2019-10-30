import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailjsService } from 'src/app/services/emailjs.service';

@Component({
  selector: 'contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {

  @Input() showHeader: boolean = true;

  contactMe: FormGroup;
  isSubmissionInitiated = false;
  contactStatus: 'not-initiated'|'successful'|'unsuccessful' = 'not-initiated';

  constructor(
    private emailjsService: EmailjsService
  ) {
    this.contactMe = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      subject: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
  }

  trimInput(controlName){
    let control = this.contactMe.get(controlName);
    if (control.value){
      control.setValue(control.value.trim());
    }
  }

  send(){

    if (this.contactMe.invalid) return;
    this.contactMe.disable();

    this.emailjsService.send({
      fromEmail: this.contactMe.get('email').value,
      fromName: this.contactMe.get('name').value,
      subject: this.contactMe.get('subject').value,
      message: this.contactMe.get('message').value
    }).then((response) => {
      this.contactStatus = "successful";
    }, (error) => {
      this.contactStatus = "unsuccessful";
    });
  }
}
