import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataForm!: FormGroup;
  formData: any = {};
  size:string='';
  option:any='';


  constructor(private fb: FormBuilder, private zone: NgZone) {
    this.dataForm= new FormGroup({
      id: new FormControl('', Validators.required),
        restId: new FormControl('', Validators.required),
        cId: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        image: new FormControl('', Validators.required),
        details: new FormControl('', Validators.required),
        Price: new FormControl('', Validators.required),
    })
  }

  public file: File | null = null;

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      foods: this.fb.array([this.createForm()]),
    });
    }

    createForm(): FormGroup {
      return this.fb.group({
        id: ['', Validators.required],
        restId: ['', Validators.required],
        cId: ['', Validators.required],
        name: ['', Validators.required],
        image: ['', Validators.required],
        details: ['', Validators.required],
        Price: ['', Validators.required],
      });
    }
    

  onSubmit() {
    console.log('Form submitted:', this.dataForm.value);
  }

  addForm() {
    const controls = this.dataForm.get('foods') as FormArray;
    controls.push(this.createForm());
  }

  onFileChange(event: any) {

    const file = event.target.files?.[0];
    this.file = file;

  }

  get getFoodsControls() {
    return (this.dataForm.get('foods') as FormArray)?.controls as FormGroup[] || [];
  }

  isPopupVisible = false;

  openPopup(): void {
    this.isPopupVisible = true;
  }

  closePopup(): void {
    this.isPopupVisible = false;
  } 

  handleFormData(formData: any) {
    this.formData = formData;
  }
}