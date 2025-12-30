import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  ownerId = '';
  hostelId = '';
  userId = localStorage.getItem('userId') || '';

  message = '';
  messages:any[] = [];

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {
    this.ownerId = this.route.snapshot.paramMap.get('ownerId') || '';
    this.hostelId = this.route.snapshot.paramMap.get('hostelId') || '';
    this.userId = this.route.snapshot.paramMap.get('userId') || '';
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.chatService.getMessages(this.userId, this.ownerId, this.hostelId)
    .subscribe((res:any)=>{
      this.messages = res.messages;
    });
  }

  sendMessage() {
    if(!this.message.trim()) return;

    const data = {
      ownerId: this.ownerId,
      userId: this.userId,
      hostelId: this.hostelId,
      message: this.message,
      senderType: 'owner'
    };

    this.chatService.sendMessage(data).subscribe(()=>{
      this.message = '';
      this.loadMessages();
    });
  }

}
