import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  @Input() public description: string = "";
  @Input() public state: string = "";

  @Output() EditItemEvent = new EventEmitter();
  
  public date: Date = new Date();
  
  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    // console.log(this.description);
    // console.log(this.state);
    this.EditItemEvent.emit({
      "description": this.description,
      "state": this.state,
      "date": new Date(Date.now())
    })
  }
}
