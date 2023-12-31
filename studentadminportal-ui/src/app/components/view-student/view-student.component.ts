import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IGenderUI } from 'src/app/models/ui-models/igenderui.model';
import { IStudentUI } from 'src/app/models/ui-models/istudentui.model';
import { GenderService } from 'src/app/services/gender.service';
import { StudentService } from 'src/app/services/student.service';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit, OnDestroy {
  private studentService: StudentService = inject(StudentService);
  private genderService: GenderService = inject(GenderService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private snackbar: MatSnackBar = inject(MatSnackBar);
  private dialogService: DialogService = inject(DialogService);
  private getallStudentByIdSubscribe?: Subscription;
  private getallGenderSubscribe?: Subscription;
  private createStudentSubscribe?: Subscription;
  private paramSubscription?: Subscription;
  private editStudentSubscription?: Subscription;
  private removeStudentSubscription?: Subscription;
  private dialogSubscription?: Subscription;
  private uploadImageSubscribe?: Subscription;
  private studentId: string | null | undefined;
  //public student: IStudentUI = {} as IStudentUI;
  private file?: File;
  student: IStudentUI = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: '',
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: '',
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: '',
    },
  };
  public gender?: IGenderUI[];
  isNewStudent: boolean = false;
  header: string = '';
  displayProfileImageUrl: string = '';
  @ViewChild('studentDetailsForm') studentDetailsForm?:NgForm;
  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.studentId = params.get('studentId');
        this.getAllStudents();
        this.getAllGenders();
      },
    });
  }

  private getAllStudents(): void {
    if (this.studentId) {
      //If the route contains the "Create"
      if (this.studentId.toLowerCase() === 'Create'.toLowerCase()) {
        //--> new Student functionality
        this.isNewStudent = true;
        this.header = 'Create New Student';
        this.setImage();
      } else {
        //-->Existing Student functionality
        this.isNewStudent = false;
        this.header = 'Update Student';
        this.getallStudentByIdSubscribe = this.studentService
          .getStudentById(this.studentId)
          .subscribe({
            next: (response) => {
              this.student = response;
              this.setImage();
            },
            error: (error) => {
              this.setImage();
            },
          });
      }
    }
  }

  private getAllGenders(): void {
    this.getallGenderSubscribe = this.genderService.getAllGenders().subscribe({
      next: (response) => {
        this.gender = response;
      },
    });
  }

  public onFormSubmit(): void {
    this.editStudentSubscription = this.studentService
      .updateStudent(this.student.id, this.student)
      .subscribe({
        next: (response) => {
          //Show a notification
          this.snackbar.open('Student updated successfully', undefined, {
            duration: 2000,
          });
          setTimeout(() => {
            this.router.navigateByUrl('/students').then();
          }, 5000);
        },
        error: (error) => {},
      });
  }

  public onRecordRemove(): void {
    this.dialogSubscription = this.dialogService
      .openConfirmDialog('Are you sure to remove this record?')
      .afterClosed()
      .subscribe({
        next: (res) => {
          if (res) {
            this.removeStudentSubscription = this.studentService
              .deleteStudent(this.student.id)
              .subscribe({
                next: (resp) => {
                  this.snackbar.open(
                    'Student deleted successfully',
                    undefined,
                    {
                      duration: 2000,
                    }
                  );
                  setTimeout(() => {
                    this.router.navigateByUrl('/students').then();
                  }, 2000);
                },
              });
          }
        },
      });
  }
  onCreateSubmit(): void {
    if(this.studentDetailsForm?.form.valid){
      //Submit form data to api
      this.createStudentSubscribe = this.studentService
      .createStudent(this.student)
      .subscribe({
        next: (response) => {
          this.snackbar.open('Student Created successfully', undefined, {
            duration: 2000,
          });
          setTimeout(() => {
            this.router.navigateByUrl(`students/${response.id}`).then();
          }, 5000);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
   
  }
  private setImage(): void {
    if (this.student.profileImageUrl) {
      //Fetch the Image by Url
      this.displayProfileImageUrl = this.studentService.getImagePath(
        this.student.profileImageUrl
      );
    } else {
      //display Default
      this.displayProfileImageUrl = '/../assets/shaifer-user.jpg';
    }
  }
  public onUploadImage(event: Event): void {
    if(this.studentDetailsForm?.form.valid){
      if (this.studentId) {
        const element = event.currentTarget as HTMLInputElement;
        this.file = element.files?.[0];
        if (this.file) {
          this.uploadImageSubscribe = this.studentService
            .uploadImage(this.student.id, this.file)
            .subscribe({
              next: (resp) => {
                this.student.profileImageUrl = resp;
                this.setImage();
              },
              error: (error) => {
                this.snackbar.open(
                  'Profile Image has been updated successfully',
                  undefined,
                  {
                    duration: 2000,
                  }
                );
                setTimeout(() => {
                  let currentUrl = this.router.url;
                  this.router
                    .navigateByUrl('/', { skipLocationChange: true })
                    .then(() => {
                      this.router.navigate([currentUrl]);
                    });
                }, 1000);
              },
            });
        }
      }
    }
   
  }

  ngOnDestroy(): void {
    this.getallStudentByIdSubscribe?.unsubscribe();
    this.getallGenderSubscribe?.unsubscribe();
    this.paramSubscription?.unsubscribe();
    this.editStudentSubscription?.unsubscribe();
    this.removeStudentSubscription?.unsubscribe();
    this.dialogSubscription?.unsubscribe();
    this.createStudentSubscribe?.unsubscribe();
    this.uploadImageSubscribe?.unsubscribe();
  }
}
