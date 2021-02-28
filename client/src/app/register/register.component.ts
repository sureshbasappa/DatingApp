import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { error } from 'protractor';
import { AccountService } from '../_services/account.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  @Output() cancelRegiser=new EventEmitter();
model:any={};
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.registor(this.model).subscribe(Response=>{
      console.log(Response);
      this.cancel();
    },error=> console.log(error));
  }

  cancel(){
    this.cancelRegiser.emit('');
  }

}
