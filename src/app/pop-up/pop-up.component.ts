import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  formData!: FormGroup;

  @Output() closePopup = new EventEmitter<void>();
  @Output() formDataSubmitted = new EventEmitter<any>();
  @Input() prodname = '';
  options: string[] = ['single value select', 'multiple select'];

  constructor(private fb: FormBuilder) {
    this.formData=this.fb.group({
      thisInput: this.fb.array([])

    })
  }

  get dynamicFieldControls() {
    return (this.formData.get('sizes') as FormArray);
  }


  ngOnInit(): void {
    this.formData = this.fb.group({
      addMoreValues: this.fb.array([this.createGroupForm()]),
      sizes: this.fb.array([this.createSizeControl()]),
    });
  }

  createSizeControl() {
    return this.fb.control('', Validators.required);
  }

  get sizeControls() {
    return (this.formData.get('sizes') as FormArray);
  }

  onCloseClick(): void {
    this.closePopup.emit();
  }

  get formGroupsControl() {
    return (this.formData.get('addMoreValues') as FormArray)?.controls as FormGroup[] || [];
  }

  createGroupForm(): FormGroup {
    return this.fb.group({
      size: ['', Validators.required],
      Options: ['', Validators.required],
    });
  }

  createDynamicField() {
    return this.fb.control('', Validators.required);
  }

  addForm() {
    const formGroupsArray = this.formData.get('addMoreValues') as FormArray;
    formGroupsArray.push(this.createGroupForm());
  }

  onSubmit() {
    this.formDataSubmitted.emit(this.formData.value);
    this.closePopup.emit();

  }

  addField(){
    this.dynamicFieldControls.push(this.createDynamicField());
  }
}
