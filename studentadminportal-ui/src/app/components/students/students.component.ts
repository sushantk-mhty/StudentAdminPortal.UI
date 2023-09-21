import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { IStudentUI } from 'src/app/models/ui-models/istudentui.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit, OnDestroy {
  private studentService: StudentService = inject(StudentService);
  private getallStudentSubscribe?: Subscription;
  students?: IStudentUI[];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'email',
    'mobile',
    'gender',
  ];
  dataSource: MatTableDataSource<IStudentUI> =
    new MatTableDataSource<IStudentUI>();
  @ViewChild(MatPaginator) matPaginator?: MatPaginator;
  @ViewChild(MatSort) matSort?: MatSort;
  filterString:string='';
  ngOnInit(): void {
    this.getAllStudent();
  }

  private getAllStudent(): void {
    this.studentService.getAllStudents().subscribe({
      next: (response) => {
        this.students = response;
        this.dataSource = new MatTableDataSource<IStudentUI>(this.students);
        this.tablePaginator();
        this.tableSort();
      },
      error: () => {},
    });
  }
  private tablePaginator(): void {
    if (this.matPaginator) this.dataSource.paginator = this.matPaginator;
  }
  private tableSort(): void {
    if (this.matSort) this.dataSource.sort = this.matSort;
  }
  public filterStudent(){
    this.dataSource.filter=this.filterString.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.getallStudentSubscribe?.unsubscribe();
  }
}
