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
  public checked: boolean;
  public disabled: boolean = false;
  public expand: boolean = false;

  public showEditTask: boolean = false;

  /**
   * Constructor del componente ItemComponent
   */
  constructor() { 
    this.checked = this.item.state=="active" ? true : false;
  }

  // Este hook inicializa el componente una vez recibidas las propiedades de entrada
  ngOnInit(): void {
    this.checked = this.item.state=="active" ? true : false;
  }
  
  // Marca el estado de la tarea como "deleted"
  deleteTask(){
    this.item.state = "deleted";
  }

  // Marca el estado de la tarea como "deleted"
  completeTask(){
    this.item.state = "done";
  }
  
  // Modifica el estado de la tarea entre "active" y "undone"
  changeState(evento: MatSlideToggleChange){
    this.item.state = evento.checked ? "active" : "undone";
  }

  // Asigna nuevos valores a los atributos de las tareas cuando se modifican
  editTask(event: any){
    this.item.state = event.state;
    this.item.date = event.date;
    this.item.description = event.description;

    this.showEditTask = false;
  }

  // Muestra/Oculta las opciones (completar, editar, ...) para cada tarea
  expandOptions(){
    this.expand = !this.expand;
  }
}
