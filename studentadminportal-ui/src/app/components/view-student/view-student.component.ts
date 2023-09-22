import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IGenderUI } from 'src/app/models/ui-models/igenderui.model';
import { IStudentUI } from 'src/app/models/ui-models/istudentui.model';
import { GenderService } from 'src/app/services/gender.service';
import { StudentService } from 'src/app/services/student.service';

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
  private getallStudentByIdSubscribe?: Subscription;
  private getallGenderSubscribe?: Subscription;
  private paramSubscription?: Subscription;
  private editStudentSubscription?: Subscription;
  private studentId: string | null | undefined;
  public student: IStudentUI = {} as IStudentUI;
  public gender: IGenderUI[] = {} as IGenderUI[];
  //public gender?: IGenderUI[];
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
      this.getallStudentByIdSubscribe = this.studentService
        .getStudentById(this.studentId)
        .subscribe({
          next: (response) => {
            this.student = response;
          },
        });
    } 
  }

  private getAllGenders():void{
        this.getallGenderSubscribe=this.genderService.getAllGenders()
        .subscribe({
          next:(response)=>{
           this.gender=response;
          }
        })
  }

  public onFormSubmit():void{
    this.editStudentSubscription=this.studentService.updateStudent(this.student.id,this.student)
    .subscribe({
      next:(respnse)=>{
        //Show a notification
        this.snackbar.open('Student updated successfully',undefined,{
          duration:2000
        });
        setTimeout(() => {
          this.router.navigateByUrl('/students').then();
        }, 5000);
      },
      error:(error)=>{

      }
    })

  }

  ngOnDestroy(): void {
    this.getallStudentByIdSubscribe?.unsubscribe();
    this.getallGenderSubscribe?.unsubscribe();
    this.paramSubscription?.unsubscribe();
    this.editStudentSubscription?.unsubscribe();
  }
}
