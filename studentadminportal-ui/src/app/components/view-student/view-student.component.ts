import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IStudentUI } from 'src/app/models/ui-models/istudentui.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit, OnDestroy {
  private studentService: StudentService = inject(StudentService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private getallStudentByIdSubscribe?: Subscription;
  private paramSubscription?: Subscription;
  private studentId:string | null | undefined;
  public student:IStudentUI={} as IStudentUI;
  ngOnInit(): void {
   this.paramSubscription= this.route.paramMap.subscribe({
      next: (params) => {
       this.studentId= params.get('studentId');
       if(this.studentId){
       this.getallStudentByIdSubscribe= this.studentService.getStudentById(this.studentId)
        .subscribe({
          next:(response)=>{
            this.student=response;
          }
        })
       }
      },
    });
    
  }

  ngOnDestroy(): void {
    this.getallStudentByIdSubscribe?.unsubscribe();
    this.paramSubscription?.unsubscribe();
  }
}
