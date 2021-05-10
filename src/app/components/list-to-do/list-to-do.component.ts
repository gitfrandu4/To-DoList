import { Component, OnInit } from '@angular/core';

import { Item } from 'src/app/models/item';

import * as data from 'src/assets/items.json' ;

@Component({
  selector: 'app-list-to-do',
  templateUrl: './list-to-do.component.html',
  styleUrls: ['./list-to-do.component.css']
})

export class ListToDoComponent implements OnInit {

  public showDone: boolean = true;
  public showInProgress: boolean = true;
  public showUndone: boolean = true;

  filter: 'all' | 'active' | 'done' | 'undone' | 'state' = "done";
  
  public allItems: Array<Item> = [];
  
  constructor() { 
    this.allItems = [
      new Item('Comer', 'done'),
      new Item('Terminar proyecto DAW'),
      new Item('Descansar', 'active'),
      new Item('Cumplir meta de GoodReads', 'undone'),
    ];

    this.allItems = this.allItems.concat(this.getItemJsonContent());
  }

  ngOnInit(): void {
  }

  // ngDoCheck(): void {
  //   alert("");
  // }

  get items() {
    return this.allItems;
  }

  addItem(description: string) {
    this.allItems.unshift(
      new Item(description, 'undone'),
    );
  }

  getItemJsonContent(): Array<Item>{
    return (data as any).Item; // aqui obtenemos el array de elementos de la propiedad Menu
  }

  applyFilters(evento: any){
    if(evento.hasOwnProperty('doneFilter'))
      this.showDone = evento.doneFilter;

    if(evento.hasOwnProperty('undoneFilter'))
      this.showUndone = evento.undoneFilter;

    if(evento.hasOwnProperty('inProgressFilter'))
      this.showInProgress = evento.inProgressFilter;
  }
}
