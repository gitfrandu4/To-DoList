import { Component } from '@angular/core';

import { Item } from './models/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  public title: String = 'ToDoListApp';
  public allItems: Array<Item> = [];

  filter: 'all' | 'active' | 'done' | 'undone' | 'state' = "undone";

  constructor(){
    this.allItems = [
      new Item('eat', 'done'),
      new Item('DAW project'),
      new Item('sleep', 'active'),
      new Item('play', 'undone'),
    ];
  }

  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    } else if(this.filter === 'state') {
      return this.allItems.filter(item => item.state === 'done');
    } else if(this.filter === 'undone') {
      return this.allItems.filter(item => item.state === 'undone');
    } else{
      return this.allItems.filter(item => item.state === 'active');
    }
    // return this.allItems.filter(item => this.filter === 'state' ? item.state : !item.state);
  }

  addItem(description: String) {
    this.allItems.unshift(
      new Item(description, 'undone'),
    );
  }

}