import { Component, signal } from '@angular/core';
import { HttpService } from '../services/http-service';
import { DataPassService } from '../services/data-pass-service';
import { User } from '../models/user/user';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-users-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manage-users-component.html',
  styleUrl: './manage-users-component.css',
})
export class ManageUsersComponent {
  editUserForm: FormGroup;

  // Current option for user roles.
  roleOptions: string[] = ['guest', 'admin', 'manager'];

  // Signal to select what values should be displayed in the edit modal.
  selectedUser = signal<User>(new User(0, '', '', '', '', '', '', 0, false, false));

  // Signal for an array of users
  users = signal<User[]>([]);

  // Signal for determing what type of submission the editForm should do.
  editType = signal<string>('edit');

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private dataPass: DataPassService
  ) {
    this.editUserForm = this.fb.group({
      firstNameControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(2),
      ]),
      lastNameControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(2),
      ]),
      middleNameControl: new FormControl(''),
      roleControl: new FormControl('', [Validators.required]),
      homeAddressControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(2),
      ]),
      phoneNumberControl: new FormControl(0, [
        Validators.required,
        // Enforces that it must be a 10 digit number.
        Validators.pattern('^[0-9]{10}$'),
      ]),
      emailControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(2),
      ]),
      onboardingControl: new FormControl(false),
    });
    this.getAllUsers();
  }

  getAllUsers() {
    this.httpService.getAllUsers().subscribe((data) => {
      if (data) {
        this.users.set(data);
        console.log(this.users);
      }
    });
  }

  // Opens the edit modal.
  // If the user is "null", it creates a blank form. If it is populated, then it will pre-populate the form fields.
  openEditModal(user: User | null) {
    if (user) {
      this.selectedUser.set(user);
      this.editUserForm.patchValue({
        firstNameControl: user.firstName,
        middleNameControl: user.middleName,
        lastNameControl: user.lastName,
        homeAddressControl: user.address,
        phoneNumberControl: user.phoneNumber,
        roleControl: user.role,
        emailControl: user.email,
      });
      this.editType.set('edit');
    } else {
      this.selectedUser.set(new User(0, '', '', '', '', '', '', 0, false, false));
      this.editUserForm.patchValue({
        firstNameControl: '',
        middleNameControl: '',
        lastNameControl: '',
        homeAddressControl: '',
        phoneNumberControl: 0,
        roleControl: '',
        emailControl: '',
      });
      this.editType.set('create');
    }
    this.showEditModal = true;
  }

  // Get methods for all the form fields.

  get firstNameControl() {
    return this.editUserForm.get('firstNameControl');
  }

  get lastNameControl() {
    return this.editUserForm.get('lastNameControl');
  }

  get middleNameControl() {
    return this.editUserForm.get('middleNameControl');
  }

  get homeAddressControl() {
    return this.editUserForm.get('homeAddressControl');
  }

  get phoneNumberControl() {
    return this.editUserForm.get('phoneNumberControl');
  }

  get onboardingControl() {
    return this.editUserForm.get('onboardingControl');
  }

  get roleControl() {
    return this.editUserForm.get('roleControl');
  }

  get emailControl() {
    return this.editUserForm.get('emailControl');
  }

  // Methods used to open/close the edit user modal.
  showEditModal = false;

  dispalyEditModal() {
    this.showEditModal = false;
  }

  cancelEditModal() {
    this.showEditModal = false;
  }

  // Methods used to open/close the delete confirmation modal
  showDeleteConfirmation = false;

  openDeleteConfirmation(user: User) {
    this.showDeleteConfirmation = true;
    this.editType.set('delete');
    this.selectedUser.set(user);
  }

  confirmDeleteSubmit() {
    this.showDeleteConfirmation = false;
    this.editUserFormSubmit();
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
  }

  // Methods used to open/close the reactivation confirmation modal
  showReactivationConfirmation = false;

  openReactivationConfirmation(user: User) {
    this.showReactivationConfirmation = true;
    this.editType.set('reactivate');
    this.selectedUser.set(user);
  }

  confirmReactivationSubmit() {
    this.showReactivationConfirmation = false;
    this.editUserFormSubmit();
  }

  cancelReactivation() {
    this.showReactivationConfirmation = false;
  }

  // Methods used to open/close the confirmation modal
  showConfirmation = false;

  openConfirmationModal() {
    this.showConfirmation = true;
  }

  confirmSubmit() {
    this.showConfirmation = false;
    this.editUserFormSubmit();
  }

  cancelSubmit() {
    this.showConfirmation = false;
  }

  // Methods used to open/close the success modal

  showSuccessMessage = false;

  openSuccessModal() {
    this.showSuccessMessage = true;
  }

  closeSuccessModal() {
    this.showSuccessMessage = false;
    this.showEditModal = false;
  }

  editUserFormSubmit(): void {
    console.log(this.editType());
    if (this.editType() === 'edit') {
      // If the submission type is edit, hits this endpoint and updates the user
      if (this.selectedUser() && this.selectedUser().id != null) {
        const updatedUser = new User(
          this.selectedUser().id,
          this.roleControl?.value,
          this.emailControl?.value,
          this.firstNameControl?.value,
          this.middleNameControl?.value,
          this.lastNameControl?.value,
          this.homeAddressControl?.value,
          this.phoneNumberControl?.value,
          this.selectedUser().onboardingComplete,
          this.selectedUser().deleted
        );
        this.httpService.updateProfile(updatedUser).subscribe({
          next: () => {
            this.openSuccessModal();
            this.getAllUsers();
          },
          error: (err) => console.error(err),
        });
      }
    } else if (this.editType() === 'create') {
      // If the submission type is create, hits this endpoint and creates a new user.
      // Sends a request dependent on the role (guest, manager, employee).
      if (this.roleControl?.value === 'manager') {
        const createdUser = new User(
          0,
          this.roleControl?.value,
          this.emailControl?.value,
          this.firstNameControl?.value,
          this.middleNameControl?.value,
          this.lastNameControl?.value,
          this.homeAddressControl?.value,
          this.phoneNumberControl?.value,
          true,
          false
        );
        this.httpService.createManager(createdUser).subscribe({
          next: () => {
            this.openSuccessModal();
            this.getAllUsers();
          },
          error: (err) => console.error(err),
        });
      } else if (this.roleControl?.value === 'admin') {
        const createdUser = new User(
          0,
          this.roleControl?.value,
          this.emailControl?.value,
          this.firstNameControl?.value,
          this.middleNameControl?.value,
          this.lastNameControl?.value,
          this.homeAddressControl?.value,
          this.phoneNumberControl?.value,
          true,
          false
        );
        this.httpService.createAdmin(createdUser).subscribe({
          next: () => {
            this.openSuccessModal();
            this.getAllUsers();
          },
          error: (err) => console.error(err),
        });
      } else {
        const createdUser = new User(
          0,
          this.roleControl?.value,
          this.emailControl?.value,
          this.firstNameControl?.value,
          this.middleNameControl?.value,
          this.lastNameControl?.value,
          this.homeAddressControl?.value,
          this.phoneNumberControl?.value,
          true,
          false
        );
        this.httpService.createGuest(createdUser).subscribe({
          next: () => {
            this.openSuccessModal();
            this.getAllUsers();
          },
          error: (err) => console.error(err),
        });
      }
    }
    // If editType is delete, it will send a delete (deactivation) request to the server.
    else if (this.editType() === 'delete') {
      this.httpService.deactivateUser(this.selectedUser().id).subscribe({
        next: () => {
          this.openSuccessModal();
          this.getAllUsers();
        },
        error: (err) => console.error(err),
      });
    } else if (this.editType() === 'reactivate') {
      this.httpService.reactivateUser(this.selectedUser().id).subscribe({
        next: () => {
          this.openSuccessModal();
          this.getAllUsers();
        },
        error: (err) => console.error(err),
      });
    }
  }
}
