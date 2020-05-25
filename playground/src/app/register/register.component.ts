import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

registerFormGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerFormGroup = this.fb.group({
      firstName: ['']
    })
  }

}
