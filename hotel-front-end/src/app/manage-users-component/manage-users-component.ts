import { Component, signal, ViewChild, TemplateRef } from '@angular/core';
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
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-manage-users-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
  ],
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

  // variables needed for the search feature.
  searchControl = new FormControl('');
  search = toSignal(this.searchControl.valueChanges, { initialValue: '' });
  filteredUsers = signal<User[]>([]);

  @ViewChild('editUserDialog') editUserDialog!: TemplateRef<any>;
  @ViewChild('deleteConfirmationDialog') deleteConfirmationDialog!: TemplateRef<any>;
  @ViewChild('reactivationConfirmationDialog') reactivationConfirmationDialog!: TemplateRef<any>;
  @ViewChild('confirmationDialog') confirmationDialog!: TemplateRef<any>;
  @ViewChild('successDialog') successDialog!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private dataPass: DataPassService,
    public dialog: MatDialog,
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
        this.filteredUsers.set(data);
      }
    });
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((value) => this.applyFilter(value ?? ''));
  }

  // Applys filtering to the user table.
  applyFilter(query: string) {
    // If the query is null, removes the filter and applys the full user list.
    if (query === null) {
      this.filteredUsers.set(this.users());
    }
    const queryString = query.toLowerCase();

    const userList = this.users();

    const results = userList.filter((user) => {
      const phone = user.phoneNumber.toString();

      // If the query is "deactivated" or "active", returns the appropriate users.
      if (queryString === 'deactivated') {
        return user.deleted;
      }

      if (queryString === 'active') {
        return !user.deleted;
      }

      // Checks the search against each of the fields and returns any rows that match the provided query.
      return (
        user.firstName.toLowerCase().includes(queryString) ||
        user.lastName.toLowerCase().includes(queryString) ||
        user.email.toLowerCase().includes(queryString) ||
        user.role.toLowerCase().includes(queryString) ||
        user.address?.toLowerCase().includes(queryString) ||
        phone.includes(queryString) ||
        phone.endsWith(queryString)
      );
    });
    this.filteredUsers.set(results);
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
    this.dialog.open(this.editUserDialog, {
      width: '100%',
      panelClass: 'custom-dialog',
      autoFocus: false,
      restoreFocus: false,
    });
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

  // Methods used to open/close the edit user modal are now handled by MatDialog

  // Methods used to open/close the delete confirmation modal
  showDeleteConfirmation = false;

  openDeleteConfirmation(user: User) {
    this.editType.set('delete');
    this.selectedUser.set(user);
    this.dialog.open(this.deleteConfirmationDialog, {
      width: '400px',
      panelClass: 'custom-dialog',
      autoFocus: false,
      restoreFocus: false,
    });
  }

  confirmDeleteSubmit() {
    this.dialog.closeAll();
    this.editUserFormSubmit();
  }

  cancelDelete() {
    this.dialog.closeAll();
  }

  // Methods used to open/close the reactivation confirmation modal
  showReactivationConfirmation = false;

  openReactivationConfirmation(user: User) {
    this.editType.set('reactivate');
    this.selectedUser.set(user);
    this.dialog.open(this.reactivationConfirmationDialog, {
      width: '400px',
      panelClass: 'custom-dialog',
      autoFocus: false,
      restoreFocus: false,
    });
  }

  confirmReactivationSubmit() {
    this.dialog.closeAll();
    this.editUserFormSubmit();
  }

  cancelReactivation() {
    this.dialog.closeAll();
  }

  // Methods used to open/close the confirmation modal
  showConfirmation = false;

  openConfirmationModal() {
    this.dialog.open(this.confirmationDialog, {
      width: '400px',
      panelClass: 'custom-dialog',
      autoFocus: false,
      restoreFocus: false,
    });
  }

  confirmSubmit() {
    this.dialog.closeAll();
    this.editUserFormSubmit();
  }

  cancelSubmit() {
    this.dialog.closeAll();
  }

  // Methods used to open/close the success modal

  showSuccessMessage = false;

  openSuccessModal() {
    this.dialog.open(this.successDialog, {
      width: '400px',
      panelClass: 'custom-dialog',
      autoFocus: false,
      restoreFocus: false,
    });
  }

  closeSuccessModal() {
    this.dialog.closeAll();
  }

  editUserFormSubmit(): void {
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
          this.selectedUser().deleted,
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
          false,
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
          false,
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
          false,
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
