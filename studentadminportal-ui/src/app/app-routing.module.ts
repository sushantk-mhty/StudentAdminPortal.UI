import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './components/students/students.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';

const routes: Routes = [
  {
    path:'',
    component:StudentsComponent
  },
  {
    path:'students',
    component:StudentsComponent
  },
  {
    path:'students/:studentId',
    component:ViewStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
