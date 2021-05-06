import { Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @ViewChild('messageForm') messageForm:NgForm;
  @Input() messages:Message[];
  @Input() username:string;
  messageContent:string;
  loading = false;
  message1:Message;

  
    constructor(public messageService:MessageService) { }
  
    ngOnInit(): void {

    }

    sendMessage(){
      this.loading=true;
      this.messageService.sendMessage(this.username, this.messageContent).then(()=>{
          this.messageForm.reset();
      }).finally(()=>this.loading=false);

    }
  
}
