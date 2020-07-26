import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required]],
      email : [null, [Validators.required]],
      password: [null, [Validators.required]],
      sendCatalog: true,
      address: [null]
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

  sliderOnChange(event) {
    console.log('Slider Changed', event);
    const addressControl = this.registerFormGroup.get('address');
    if(event.checked) {
      addressControl.setValidators(Validators.required);
    } else {
      addressControl.clearValidators();
    }
    addressControl.updateValueAndValidity();
  }

}
