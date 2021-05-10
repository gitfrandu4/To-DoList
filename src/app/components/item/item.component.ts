import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {

  @Input() item: Item = new Item("", "undone");
  @Input() index: number = 0;

  public color: ThemePalette = 'warn';
  public checked: boolean = this.item.state=="active" ? true : false;
  public disabled: boolean = false;

  public showEditTask: boolean = false;

  constructor() { 
    this.checked = this.item.state=="active" ? true : false;
  }

  ngOnInit(): void {
    this.checked = this.item.state=="active" ? true : false;
  }

  deleteTask(){
    this.item.state = "deleted";
  }

  editTask(event: any){
    this.item.state = event.state;
    this.item.date = event.date;
    this.item.description = event.description;

    this.showEditTask = false;
  }

  completeTask(){
    this.item.state = "done";
  }

  changeState(evento: MatSlideToggleChange){
    this.item.state = evento.checked ? "active" : "undone";
  }
}
