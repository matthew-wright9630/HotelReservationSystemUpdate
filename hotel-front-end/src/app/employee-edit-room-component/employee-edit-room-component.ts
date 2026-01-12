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
import { Room } from '../models/room/room';

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
  roomOptions: Room[] = [];

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
      selectedRoomDescription: new FormControl<RoomDescription | null>(null),
      selectedRoom: new FormControl<Room | null>(null),
    });

    this.updateRoomDescriptionOptions();
    this.updateRoomOptions();
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

  get selectedRoom() {
    return this.editRoomForm.get('selectedRoom');
  }

  // Gets the list of room descriptions from the server and pushes it to roomDescriptionOptions
  updateRoomDescriptionOptions(): void {
    this.roomDescriptionOptions = [];
    this.httpService.getAllRoomDescriptions().subscribe((data) => {
      if (!data.body) return;

      this.roomDescriptionOptions = data.body.filter((room) => !room.deleted);
    });
  }

  // Gets the list of rooms from the server and pushes it to roomOptions
  updateRoomOptions(): void {
    this.roomOptions = [];
    this.httpService.getAllRooms().subscribe((data) => {
      if (!data.body) return;

      this.roomOptions = data.body.filter((room) => !room.deleted);
    });
  }

  // Controls what happens when specific fields are updated on the edit form.
  ngOnInit() {
    this.editRoomForm.get('selectedRoomDescription')?.valueChanges.subscribe((selectedOption) => {
      this.onRoomDescriptionChange(selectedOption);
    });
    this.editRoomForm.get('roomRadio')?.valueChanges.subscribe((value) => {
      this.updateValidatorsForRoomType(value);
      this.resetRoomDescriptionFields();
    });
    this.editRoomForm.get('selectedRoom')?.valueChanges.subscribe((selectedOption) => {
      console.log(selectedOption);
      this.onRoomChange(selectedOption.roomDescription);
    });
  }

  // Sets or clears validators depending on whether a room or room type is being updated.
  updateValidatorsForRoomType(value: string): void {
    if (value === 'Room') {
      // Clear all validators from room description
      this.editRoomForm.get('bedStyleControl')?.clearValidators();
      this.editRoomForm.get('maxOccupancyControl')?.clearValidators();
      this.editRoomForm.get('priceControl')?.clearValidators();
      this.editRoomForm.get('roomColorControl')?.clearValidators();

      // Disable non-editable fields.
      this.editRoomForm.get('bedStyleControl')?.disable();
      this.editRoomForm.get('maxOccupancyControl')?.disable();
      this.editRoomForm.get('priceControl')?.disable();
      this.editRoomForm.get('roomColorControl')?.disable();
      this.editRoomForm.get('adaCompliantControl')?.disable();
      this.editRoomForm.get('isSmokingControl')?.disable();
    } else {
      this.editRoomForm.get('bedStyleControl')?.setValidators([Validators.required]);
      this.editRoomForm.get('maxOccupancyControl')?.setValidators([Validators.required]);
      this.editRoomForm.get('priceControl')?.setValidators([Validators.required]);
      this.editRoomForm.get('roomColorControl')?.setValidators([Validators.required]);

      // Enable editable fields for Room Description
      this.editRoomForm.get('bedStyleControl')?.enable();
      this.editRoomForm.get('maxOccupancyControl')?.enable();
      this.editRoomForm.get('priceControl')?.enable();
      this.editRoomForm.get('roomColorControl')?.enable();
      this.editRoomForm.get('adaCompliantControl')?.enable();
      this.editRoomForm.get('isSmokingControl')?.enable();
    }

    this.editRoomForm.get('bedStyleControl')?.updateValueAndValidity();
  }

  // Patches the values into the editRoomForm so it is usable elsewhere in the code.
  onRoomDescriptionChange(selectedOption: RoomDescription) {
    if (selectedOption !== null) {
      this.editRoomForm.patchValue({
        bedStyleControl: selectedOption.bedStyle,
        roomColorControl: selectedOption.roomColor,
        adaCompliantControl: !!selectedOption.adaCompliant,
        isSmokingControl: !!selectedOption.isSmoking,
        maxOccupancyControl: selectedOption.maxOccupancy,
        priceControl: selectedOption.price,
      });
    }
  }

  // When the selectedRoom is changed, the selectedRoomDescription is updated automatically.
  onRoomChange(roomDescription: RoomDescription) {
    this.editRoomForm.patchValue({
      selectedRoomDescription: roomDescription,
    });
  }

  compareDescriptions = (a: RoomDescription, b: RoomDescription) => a && b && a.id === b.id;

  // Resets all the fields when called.
  resetRoomDescriptionFields(): void {
    this.editRoomForm.patchValue({
      selectedRoomDescription: null,
      bedStyleControl: '',
      roomColorControl: '',
      adaCompliantControl: false,
      isSmokingControl: false,
      maxOccupancyControl: 0,
      priceControl: 0,
      editTypeRadio: '',
    });
  }

  // Looks at roomRadio and editTypeRadio to determine which type of request to send to the server.
  editRoomFormSubmit(): void {
    if (this.roomRadio?.value === 'Room') {
      switch (this.editTypeRadio?.value) {
        case 'Create': {
          const room: Room = new Room(0, this.selectedRoomDescription?.value, false);
          console.log(room);
          this.httpService.createRoom(room).subscribe({
            next: (res) => {
              console.log('Created:', res);
              this.updateRoomOptions();
              this.resetRoomDescriptionFields();
            },
            error: (err) => console.error(err),
          });
          break;
        }
        case 'Edit': {
          const room: Room = new Room(0, this.selectedRoomDescription?.value.id, false);
          this.httpService.updateRoom(room).subscribe({
            next: (res) => {
              console.log('Updated:', res);
              this.updateRoomOptions();
              this.resetRoomDescriptionFields();
            },
            error: (err) => console.error(err),
          });
          break;
        }
        case 'Delete': {
          const room: Room = new Room(
            this.selectedRoom?.value.id,
            this.selectedRoomDescription?.value.id,
            true
          );
          console.log(room);
          this.httpService.deleteRoom(room.id).subscribe({
            next: () => {
              console.log('Deleted Successfully!');
              this.updateRoomOptions();
              this.resetRoomDescriptionFields();
            },
            error: (err) => console.error(err),
          });
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
            this.roomColorControl?.value,
            false
          );
          this.httpService.createRoomDescription(roomDescription).subscribe({
            next: (res) => {
              console.log('Created:', res);
              this.updateRoomDescriptionOptions();
              this.resetRoomDescriptionFields();
            },
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
            this.roomColorControl?.value,
            false
          );
          this.httpService.updateRoomDescription(roomDescription).subscribe({
            next: (res) => {
              console.log('Updated:', res);
              this.updateRoomDescriptionOptions();
              this.resetRoomDescriptionFields();
            },
            error: (err) => console.error(err),
          });
          break;
        }
        case 'Delete': {
          this.httpService.deleteRoomDescription(this.selectedRoomDescription?.value.id).subscribe({
            next: () => {
              console.log('Deleted Successfully!');
              this.updateRoomDescriptionOptions();
              this.resetRoomDescriptionFields();
            },
            error: (err) => console.error(err),
          });
          break;
        }
      }
    }
  }
}
