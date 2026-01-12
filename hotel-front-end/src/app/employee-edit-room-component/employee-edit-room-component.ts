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

  roomDescriptionOptions: RoomDescription[] = [];

  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.editRoomForm = this.fb.group({
      roomRadio: new FormControl('', [Validators.required]),
      editTypeRadio: new FormControl('', [Validators.required]),
      bedStyleControl: new FormControl('', [Validators.required]),
      // numberOfBedsControl: new FormControl(0, [Validators.required]),
      adaCompliantControl: new FormControl(false, [Validators.required]),
      isSmokingControl: new FormControl(false, [Validators.required]),
      roomImageControl: new FormControl('', [Validators.required]),
      maxOccupancyControl: new FormControl(0, [Validators.required]),
      priceControl: new FormControl(0, [Validators.required]),
      roomColorControl: new FormControl('', [Validators.required]),
      selectedRoomDescription: new FormControl(RoomDescription, [Validators.required]),
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
        console.log(description);
        this.roomDescriptionOptions.push(description);
      });
    });
  }

  ngOnInit() {
    this.editRoomForm.get('selectedRoomDescription')?.valueChanges.subscribe((selectedOption) => {
      this.onRoomDescriptionChange(selectedOption);
    });
  }

  onRoomDescriptionChange(selectedOption: RoomDescription) {
    console.log('Selected room description:', selectedOption, selectedOption.bedStyle);
    this.editRoomForm.patchValue({
      bedStyleControl: selectedOption.bedStyle,
      adaCompliantControl: selectedOption.adaCompliant,
      isSmokingControl: selectedOption.isSmoking,
      maxOccupancyControl: selectedOption.maxOccupancy,
      priceControl: selectedOption.price,
    });
  }
}
