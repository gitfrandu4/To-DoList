import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OrdenToDoListService {

  // Orden a aplicar en la lista de tareas
  public order: "desc" |"date" | "state";
  
  /**
   * Constructor del servicio OrdenToDoListService. Inicializa la
   * propiedad "order". 
   */
  constructor() { 
    this.order = "desc";
   }
  
   // Función del servicio que modifica la propiedad order
   public newOrder(newOrder: "desc" |"date" | "state"){
      this.order = newOrder;
   }
}
