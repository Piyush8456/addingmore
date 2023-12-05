// type: ['', Validators.required],
// select: ['Choose', Validators.required],
// addMore: this.fb.array([this.createForm()]),

import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  title = 'add More Value';
  @Input() isOpen = false;
  formData!: FormGroup;
  @Output() closePopup = new EventEmitter<void>();
  dialogWidth: string = '400px';
  items!: FormArray;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formData = this.fb.group({
      addForms : new FormArray([this.createItem()])
    });
  }

  onCloseClick(): void {
    this.isOpen = false;
    this.closePopup.emit();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  get getFoodsControls() {
    return (this.formData.get('addMore') as FormArray)?.controls as FormGroup[] || [];
  }

  addMore() {
    const controls = this.formData.get('addMore') as FormArray;
    controls.push(this.createForm());
  }
  createItem(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      select: ['Choose', Validators.required],
      addMore: this.fb.array([this.createForm()]),
    })
  }

  get addFormsArray(): FormArray | null {
    return this.formData.get('addForms') as FormArray | null;
  }
  
  get getFormsControls(): AbstractControl[] {
    const addFormsArray = this.addFormsArray;
    return addFormsArray ? addFormsArray.controls : [];
  }
  

  addWholeNew(){
    this.items = this.formData.get('addForms') as FormArray;
    this.items.push(this.createItem());
  }

  onSubmit() {
    console.log('Form Data:', this.formData.value);
  }
}
