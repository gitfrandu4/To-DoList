import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdenToDoListService } from '../../services/orden-to-do-list.service';

import { Item } from 'src/app/models/item';

import * as data from 'src/assets/items.json' ;

@Component({
  selector: 'app-list-to-do',
  templateUrl: './list-to-do.component.html',
  styleUrls: ['./list-to-do.component.css']
})

export class ListToDoComponent implements OnInit {

  // Variables para filtrar las tareas por estado
  public showDone: boolean = false;
  public showInProgress: boolean = true;
  public showUndone: boolean = true;
  
  // Array que contiene todas las tareas de la To-Do List
  public allItems: Array<Item> = [];
  
  /**
   * Constructor del componente ListToDoComponent. Este componente carga las tareas y aplica
   * una serie de filtros en la vista. 
   * @param _snackBar Instancia del componente MatSnackBar. Muestra un mensaje temporal
   * cuando añadimos una nueva tarea.
   * @param order Instancia del servicio OrdenToDoListService. Se utilizará para 
   * modificar el orden en que se muestran las tareas
   */
  constructor(private _snackBar: MatSnackBar,
              private order: OrdenToDoListService) { 
    // Añadimos nuevos elementos a la To-Do List desde el constructor
      this.allItems = [
      new Item('CMS: Aprender fundamentos Wordpress', 'active'),
      new Item('CMS: Aprender fundamentos Joomla', 'undone'),
      new Item('B1 Curse: Redacción sobre un personaje histórico', 'undone'),
    ];
    
    // Concatenamos los elementos con los definidos en el fichero JSON
    this.allItems = this.allItems.concat(this.getItemJsonContent());
    
  }

  ngOnInit(): void {
  }

  // Este hook se llama para detectar y actuar sobre los cambios que Angular no va a detectar
  // por si mismo. En este caso se utiliza para detectar cambios en el criterio de ordenación
  // de los elementos.
  ngDoCheck(): void {
    this.sortList();
  }

  // Devuelve todas las tareas
  get items() {
    return this.allItems;
  }

  // Añade una nueva tarea
  addItem(description: string) {
    if (description != ""){
      this.allItems.unshift(
        new Item(description, 'undone'),
      );
      this._snackBar.open("¡Nueva tarea añadida a la lista!", "Cerrar", {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
    }
  }

  // Aqui obtenemos las tareas definidas en el fichero JSON. Importado en data 
  getItemJsonContent(): Array<Item>{
    return (data as any).Item; 
  }

  // Aplica filtrado por estados de los eventos
  applyFilters(evento: any){
    if(evento.hasOwnProperty('doneFilter'))
      this.showDone = evento.doneFilter;

    if(evento.hasOwnProperty('undoneFilter'))
      this.showUndone = evento.undoneFilter;

    if(evento.hasOwnProperty('inProgressFilter'))
      this.showInProgress = evento.inProgressFilter;
  }

  // Ordena las tareas en función de: Descripción || Fecha || Estado
  sortList(){
    switch(this.order.order){
      // Descripción
      case "desc": {
        this.allItems = this.allItems.sort(function (a, b) {
          if (a.description > b.description) {
            return 1;
          }
          if (a.description < b.description) {
            return -1;
          }
          return 0; // a must be equal to b
        });
        break;
      }

      // Estado
      case "state": {
        this.allItems = this.allItems.sort(function (a, b) {
          if (a.state > b.state) {
            return 1;
          }
          if (a.state < b.state) {
            return -1;
          }
          return 0; // a must be equal to b
        });
        break;
      }

      // Fecha
      case "date": {
        this.allItems = this.allItems.sort(function (a, b) {
          var a_date = new Date (a.date);
          var b_date = new Date (b.date);
          if (a_date.getTime() > b_date.getTime()) {
            return 1;
          }
          if (a_date.getTime() < b_date.getTime()) {
            return -1;
          }
          return 0;
        });
        break;
      }
    }
  }
}
