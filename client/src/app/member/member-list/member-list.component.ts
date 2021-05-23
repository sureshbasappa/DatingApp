import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members:Member[];
  pagination:Pagination;
  userParams:UserParams;
  user:User;
  genderList=[{value:'male', display:'males'}, {value: 'female', display:'females'}];

  constructor(private memberservce:MembersService) { 
    this.userParams=this.memberservce.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberservce.setUSerParams(this.userParams);
    this.memberservce.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters(){
    this.userParams=this.memberservce.restUserParams();
    this.loadMembers();
  }


   pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.memberservce.setUSerParams(this.userParams);
    this.loadMembers();
  }



}
