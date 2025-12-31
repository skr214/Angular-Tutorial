import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterByEmailPipe } from '../../custom-pipes/filter-by-email-pipe.pipe';
import { DataBaseService } from '../../services/data-serveice/data-base.service';

declare var bootstrap: any;

@Component({
  selector: 'app-active-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FilterByEmailPipe, FormsModule],
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss']
})
export class ActiveUsersComponent implements OnInit {
  searchEmail: string = '';
  selectedUser: any = null;
  isModalOpen: boolean = false;
  updateForm!: FormGroup;
  users: any[] = [];

  @ViewChild('updateUserModal') updateUserModal!: ElementRef;

  constructor(private dbService: DataBaseService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dbService.getUsers().subscribe(users => {
      this.users = users;
    });

    // ✅ initialize empty form to avoid undefined error
    this.updateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      username: [''],
      accountType: [''],
      gender: ['male'],
      password: [''],
      confirmPassword: [''],
    });
  }

  selectUser(user: any) {
    this.selectedUser = user;
  }

  openUpdateModal(user: any) {
    console.log('Opening modal for user:', user);
    this.isModalOpen = true;

    // ✅ patch values instead of recreating the form
    this.updateForm.patchValue(user);
  }

  closeModal() {
    console.log('Closing modal' + this.updateUserModal);

    const modal = bootstrap.Modal.getInstance(this.updateUserModal.nativeElement);
    modal.hide();
    this.isModalOpen = false;
  }

  saveUser() {
    if (this.updateForm.valid) {

      const updatedUser = { ...this.updateForm.value, id: this.selectedUser.id };
      const index = this.users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
        this.selectedUser = updatedUser;
        this.dbService.updateUser(updatedUser).subscribe(() => {
          console.log('User updated successfully in the database');
        });
      }
      this.closeModal();
    }
  }

  deleteUser(user: any) {
    if (confirm(`Are you sure you want to delete ${user.firstName}?`)) {
      this.users = this.users.filter(u => u.id !== user.id);
      this.selectedUser = null;
      this.dbService.deleteUser(user.id).subscribe(() => {
        console.log('User deleted successfully from the database');
      });
    }
  }
}

