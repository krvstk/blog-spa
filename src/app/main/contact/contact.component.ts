import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';

import { SnackBarService } from '@core/services/snack-bar.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private snackBarService: SnackBarService,
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      subject: ['', [Validators.required]],
      text: ['', [Validators.required]],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  onSubmit(formDirective: FormGroupDirective): void {
    const firestoreDocName = this.contactForm.value.subject
      .replace(/[^A-Za-z0-9\s]/g, '')
      .replace(/\s\s+/g, ' ')
      .trim()
      .toLowerCase()
      .split(' ')
      .join('-');

    this.contactForm.value.dateCreated = new Date();
    this.firestore.collection('feedback').doc(firestoreDocName).set(this.contactForm.value)
      .then(
        () => {
          this.snackBarService.open(
            `Message with subject <${this.contactForm.value.subject}> is sent.
                     Feedback will be dispatched if asked. Thank you`,
            'OK',
            'SUCCESS'
          );
          formDirective.resetForm();
          this.contactForm.reset();
        })
      .catch(
        (error: Error) => {
          this.snackBarService.open(error.message, 'OK', 'FAIL');
        });
  }
}
