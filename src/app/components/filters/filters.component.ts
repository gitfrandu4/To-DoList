import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent implements OnInit {

  public color: ThemePalette = 'accent';
  public checked: boolean = true;
  public disabled: boolean = false;
  
  // Lo utilizamos para crear un evento que pase datos desde el componente hijo al padre
  @Output() CambioEstadoFiltroEvent = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  changeUndoneFilter(evento: MatSlideToggleChange){
    // alert(evento.checked);
    this.CambioEstadoFiltroEvent.emit({
      "undoneFilter": evento.checked,
    })
  }

  changeDoneFilter(evento: MatSlideToggleChange){
    // alert(checked);
    this.CambioEstadoFiltroEvent.emit({
      "doneFilter": evento.checked,
    })
  }

  changeInProgressFilter(evento: MatSlideToggleChange){
    // alert(checked);
    this.CambioEstadoFiltroEvent.emit({
      "inProgressFilter": evento.checked,
    })
  }
}
