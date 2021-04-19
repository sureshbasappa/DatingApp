
import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
messages:Message[];
pagination:Pagination;
continer ='Unread';
pageNumber = 1;
pageSize = 5;


  constructor(private messageService:MessageService) { }

  ngOnInit(): void {
    this.loadMessage();
  }

  loadMessage(){
    this.messageService.getMessage(this.pageNumber,this.pageSize, this.continer).subscribe(Response=>{
      this.messages=Response.result;
      this.pagination=Response.pagination;
    })
  }

  pageChanged(event:any){
    this.pageNumber= event.page;
    this.loadMessage();
  }

}
