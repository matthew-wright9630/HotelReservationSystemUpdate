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

  // Options for the house colors.
  houseColorOptions = ['Griffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];

  // List of room descriptions that can be selected.
  roomDescriptionOptions: RoomDescription[] = [];

  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.editRoomForm = this.fb.group({
      roomRadio: new FormControl('', [Validators.required]),
      editTypeRadio: new FormControl('', [Validators.required]),
      bedStyleControl: new FormControl(''),
      adaCompliantControl: new FormControl(false),
      isSmokingControl: new FormControl(false),
      maxOccupancyControl: new FormControl(0),
      priceControl: new FormControl(0),
      roomColorControl: new FormControl(''),
      selectedRoomDescription: new FormControl(RoomDescription),
    });

    this.updateRoomDescriptionOptions();
  }

  // Get statements for the form fields.

  get roomRadio() {
    return this.editRoomForm.get('roomRadio');
  }

  get editTypeRadio() {
    return this.editRoomForm.get('editTypeRadio');
  }

  get selectedOption() {
    return this.editRoomForm.get('selectedOption');
  }

  get bedStyleControl() {
    return this.editRoomForm.get('bedStyleControl');
  }

  get adaCompliantControl() {
    return this.editRoomForm.get('adaCompliantControl');
  }

  get isSmokingControl() {
    return this.editRoomForm.get('isSmokingControl');
  }

  get maxOccupancyControl() {
    return this.editRoomForm.get('maxOccupancyControl');
  }

  get priceControl() {
    return this.editRoomForm.get('priceControl');
  }

  get roomColorControl() {
    return this.editRoomForm.get('roomColorControl');
  }

  get selectedRoomDescription() {
    return this.editRoomForm.get('selectedRoomDescription');
  }

  // Gets the list of room descriptions from the server and pushes it to roomDescriptionOptions
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

  // Controls what happens when specific fields are updated on the edit form.
  ngOnInit() {
    this.editRoomForm.get('selectedRoomDescription')?.valueChanges.subscribe((selectedOption) => {
      this.onRoomDescriptionChange(selectedOption);
    });
    this.editRoomForm.get('roomRadio')?.valueChanges.subscribe((value) => {
      this.updateValidatorsForRoomType(value);
    });
  }

  // Sets or clears validators depending on whether a room or room type is being updated.
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

  // Patches the values into the editRoomForm so it is usable elsewhere in the code.
  onRoomDescriptionChange(selectedOption: RoomDescription) {
    console.log(selectedOption.adaCompliant, typeof selectedOption.isSmoking);
    this.editRoomForm.patchValue({
      bedStyleControl: selectedOption.bedStyle,
      roomColorControl: selectedOption.roomColor,
      adaCompliantControl: !!selectedOption.adaCompliant,
      isSmokingControl: !!selectedOption.isSmoking,
      maxOccupancyControl: selectedOption.maxOccupancy,
      priceControl: selectedOption.price,
    });
  }

  // Looks at roomRadio and editTypeRadio to determine which type of request to send to the server.
  editRoomFormSubmit(): void {
    if (this.roomRadio?.value === 'Room') {
      switch (this.editTypeRadio?.value) {
        case 'Create': {
          console.log(this.roomRadio?.value, ' ', this.editTypeRadio?.value);
          break;
        }
        case 'Edit': {
          console.log(this.roomRadio?.value, ' ', this.editTypeRadio?.value);
          break;
        }
        case 'Delete': {
          console.log(this.roomRadio?.value, ' ', this.editTypeRadio?.value);
          break;
        }
      }
    } else {
      switch (this.editTypeRadio?.value) {
        case 'Create': {
          const roomImagePath = `assets/${this.roomColorControl?.value.toLowerCase()}_room.png`;
          const roomDescription: RoomDescription = new RoomDescription(
            0,
            this.bedStyleControl?.value,
            this.adaCompliantControl?.value,
            this.isSmokingControl?.value,
            roomImagePath,
            this.maxOccupancyControl?.value,
            this.priceControl?.value,
            true,
            this.roomColorControl?.value
          );
          this.httpService.createRoomDescription(roomDescription).subscribe({
            next: (res) => console.log('Created:', res),
            error: (err) => console.error(err),
          });
          break;
        }
        case 'Edit': {
          const roomImagePath = `assets/${this.roomColorControl?.value.toLowerCase()}_room.png`;
          const roomDescription: RoomDescription = new RoomDescription(
            this.selectedRoomDescription?.value.id,
            this.bedStyleControl?.value,
            this.adaCompliantControl?.value,
            this.isSmokingControl?.value,
            roomImagePath,
            this.maxOccupancyControl?.value,
            this.priceControl?.value,
            true,
            this.roomColorControl?.value
          );
          console.log(roomDescription);
          break;
        }
        case 'Delete': {
          console.log(this.roomRadio?.value, ' ', this.editTypeRadio?.value);
          break;
        }
      }
    }
  }
}
