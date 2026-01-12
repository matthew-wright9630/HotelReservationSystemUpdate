import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataPassService } from '../services/data-pass-service';
import { HttpService } from '../services/http-service';
import { RoomDescription } from '../models/room-description/room-description';

@Component({
  selector: 'app-employee-edit-room-component',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-edit-room-component.html',
  styleUrl: './employee-edit-room-component.css',
})
export class EmployeeEditRoomComponent {
  private router = inject(Router);
  editRoomForm: FormGroup;

  options = ['Option A', 'Option B', 'Option C'];
  houseColorOptions = ['Griffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];

  roomDescriptionOptions: RoomDescription[] = [];

  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.editRoomForm = this.fb.group({
      roomRadio: new FormControl('', [Validators.required]),
      editTypeRadio: new FormControl('', [Validators.required]),
      bedStyleControl: new FormControl(''),
      // numberOfBedsControl: new FormControl(0),
      adaCompliantControl: new FormControl(false),
      isSmokingControl: new FormControl(false),
      // roomImageControl: new FormControl(''),
      maxOccupancyControl: new FormControl(0),
      priceControl: new FormControl(0),
      roomColorControl: new FormControl(''),
      selectedRoomDescription: new FormControl(RoomDescription),
    });

    this.updateRoomDescriptionOptions();
  }

  get roomRadio() {
    return this.editRoomForm.get('roomRadio');
  }

  get editTypeRadio() {
    return this.editRoomForm.get('editTypeRadio');
  }

  get selectedOption() {
    return this.editRoomForm.get('selectedOption');
  }

  updateRoomDescriptionOptions(): void {
    this.httpService.getAllRoomDescriptions().subscribe((data) => {
      if (data.body === null) {
        return;
      }
      data.body.map((description) => {
        this.roomDescriptionOptions.push(description);
      });
    });
  }

  ngOnInit() {
    this.editRoomForm.get('selectedRoomDescription')?.valueChanges.subscribe((selectedOption) => {
      this.onRoomDescriptionChange(selectedOption);
    });
    this.editRoomForm.get('roomRadio')?.valueChanges.subscribe((value) => {
      this.updateValidatorsForRoomType(value);
    });
  }

  updateValidatorsForRoomType(value: string): void {
    if (value === 'Room') {
      this.editRoomForm.get('bedStyleControl')?.clearValidators();
      this.editRoomForm.get('maxOccupancyControl')?.clearValidators();
      this.editRoomForm.get('priceControl')?.clearValidators();
      this.editRoomForm.get('roomColorControl')?.clearValidators();
    } else {
      this.editRoomForm.get('bedStyleControl')?.setValidators([Validators.required]);
      this.editRoomForm.get('maxOccupancyControl')?.setValidators([Validators.required]);
      this.editRoomForm.get('priceControl')?.setValidators([Validators.required]);
      this.editRoomForm.get('roomColorControl')?.setValidators([Validators.required]);
    }

    this.editRoomForm.get('bedStyleControl')?.updateValueAndValidity();
  }

  onRoomDescriptionChange(selectedOption: RoomDescription) {
    this.editRoomForm.patchValue({
      bedStyleControl: selectedOption.bedStyle,
      roomColorControl: selectedOption.roomColor,
      adaCompliantControl: selectedOption.adaCompliant,
      isSmokingControl: selectedOption.isSmoking,
      maxOccupancyControl: selectedOption.maxOccupancy,
      priceControl: selectedOption.price,
    });
  }

  editFormSubmit(): void {
    console.log('I am submitted!');
  }
}
