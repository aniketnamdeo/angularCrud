import { Component } from '@angular/core';
import { CommonService } from './common.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularCrud';
  serviceType='';
  allUser: any;
  isEdit=false;
  userAuth=false;
  confPass='';
  currentUser:any;
  userObj={
    name:'',
    mobile:'',
    email:'',
    password:'',
    id:''
  }
  constructor(private commonService:CommonService,
    public modalService: NgbModal) {}

  ngOnInit() {
    this.getLatestUser();
  }
  addUser(formObj: any) {
    this.commonService.createUser(formObj).subscribe((response) => {
      console.log("user Has been added");
      this.getLatestUser();
    });
    this.userObj.name=''
    this.userObj.mobile=''
    this.userObj.email=''
    this.userObj.password=''
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
  handleDelete(content: any,user: any){
    this.serviceType='delete';
    this.currentUser=user;
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title",centered:true })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  deleteUser() {
    if(this.currentUser.password == this.confPass) {
      this.commonService.deleteUser(this.currentUser).subscribe(() => {
      this.getLatestUser();
    })
    this.modalService.dismissAll();
    this.confPass='';
    this.currentUser = {};
  } else { 
    this.confPass='';
    window.alert("Incorrect Password! Please try again");
  }
  
  }
  handleUpdate(content: any){
    this.serviceType='update';
    this.currentUser=this.userObj;
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title",centered:true })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  updateUser() {
    if(this.currentUser.password == this.confPass) {
      this.commonService.updateUser(this.currentUser).subscribe(() => {
        this.getLatestUser();
      });
      this.modalService.dismissAll();
      this.confPass='';
      this.isEdit = !this.isEdit;
      this.userObj.name='';
      this.userObj.mobile='';
      this.userObj.email='';
      this.userObj.password='';
      this.currentUser = {};
  } else { 
    this.confPass='';
    window.alert("Incorrect Password! Please try again");
  }
   
  }
  
}
