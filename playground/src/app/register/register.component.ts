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
address = [
  {label: 'Primary Residence', value: 'Primary Residence'},
  {label: 'Permenant Residence', value: 'Permenant Residence'},
  {label: 'Future Residence', value: 'Future Residence'}
];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: null,
      email : null,
      password: [null, Validators.required],
      sendCatalog: true,
      address: ['']
    })
  }
  clicked() {

    /* setValue Method to use the set Values of all form Controls */
    /* this.registerFormGroup.setValue({
      firstName: 'Rushil',
      lastName: 'Patel',
      email: 'rushilnpa',
      sendCatalog: false
    }) 
    /*

    /* patchValue to set Value for any one formControl */ 
    this.registerFormGroup.patchValue({
      firstName: 'Sepu'
    })

   const x =  this.registerFormGroup.get('password');
   console.log('x', x)
  }

}
