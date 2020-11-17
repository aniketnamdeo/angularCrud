import { Component } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularCrud';
  allUser: any;
  isEdit=false;
  userObj={
    name:'',
    mobile:'',
    email:'',
    password:'',
    id:''
  }
  constructor(private commonService:CommonService) {}

  ngOnInit() {
    this.getLatestUser();
  }
  addUser(formObj: any) {
    this.commonService.createUser(formObj).subscribe((response) => {
      console.log("user Has been added");
      this.getLatestUser();
    })
  }

  getLatestUser() {
    this.commonService.getAllUser().subscribe((response)  => {
      this.allUser = response;
    })
  }

  editUser(user: any) {
    this.isEdit=true;
    this.userObj=user;
  }

  deleteUser(user: any) {
    this.commonService.deleteUser(user).subscribe(() => {
      this.getLatestUser();
    })
  }

  updateUser() {
    this.isEdit = !this.isEdit;
    this.commonService.updateUser(this.userObj).subscribe(() => {
      this.getLatestUser();
    });
    this.userObj.name=''
    this.userObj.mobile=''
    this.userObj.email=''
    this.userObj.password=''
  }

}
