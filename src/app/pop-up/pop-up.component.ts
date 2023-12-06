import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

interface AddMoreItem {
  name: string;
  price: string;
}

interface MainForm {
  type: string;
  options: string;
  addMore: AddMoreItem[];
}

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

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formData = this.fb.group({
    wholeForm: this.fb.array([this.wholeForm()])
    });
  }

  addMore(): void {
    const control = this.formData.get('addMore') as FormArray;
    control.push(
      this.fb.group({
        name: '',
        price: '',
      } as AddMoreItem)
    );
  }
  
  onCloseClick(): void {
    this.isOpen = false;
    this.closePopup.emit();
  }
  createForm() {
    return this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  wholeForm():FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      options: ['choose', Validators.required],
      addMore: this.fb.array([
        this.createForm(),
      ]),
    })
  }


  getAddMoreControls(): FormGroup[] {
    const addMoreArray = this.formData.get('addMore') as FormArray;
    return addMoreArray.controls.map((control) => control as FormGroup);
  }
  
  onSubmit() {
    console.log('Form Data:', this.formData.value);
  }
}