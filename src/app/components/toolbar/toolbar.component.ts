import { Component, OnInit } from '@angular/core';
import { OrdenToDoListService } from '../../services/orden-to-do-list.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public title: String = 'To-Do List';
  
  /**
   * Constructor del componente ToolbarComponent: Contiene el "header" de la app,
   * botón de "share" y opciones para ordenar el contenido de la To-Do List.
   * 
   * @param order Instancia del servicio OrdenToDoListService al que vamos a modificar
   * el valor que indica el tipo de orden aplicado en la lista de tareas. 
   */
  constructor(private order: OrdenToDoListService) { 

   }

  ngOnInit(): void {
  }

  // Utiliza el método newOrder del servicio OrdenToDoListService instanciado pasándole
  // por parámetro el tipo de orden deseado a aplicar.  
  applyRule(newOrder: "desc" |"date" | "state"){
    this.order.newOrder(newOrder);
  }
}
