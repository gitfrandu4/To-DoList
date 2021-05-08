# Comenzando nuestra aplicación To-Do en Angular

## Estructura de nuestra aplicación To-Do

De la misma manera que una aplicación básica, las aplicaciones hechas en Angular tienen un fichero `index.html`. 

En la etiqueta `<body>` de `index.html` se incluye en Angular un elemento especial -`<app-root>` para insertar el componente principal, la cual también puede incluir a su vez otros componentes. Generalmente no es necesario modificar el `index.html`, en su lugar nos centramos en trabajar con las areas específicas de nuestra aplicacción, los componentes. 

### Organizando nuestra aplicación mediante componentes

Los componentes son los bloques centrales con los que construimos nuestras aplicaciones en Angular. Nuestra aplicación To-Do tendrá dos componentes, un componente base para la aplicación en sí y otro componente para manejar los ítems de la To-Do List. 

Cada componente se compone de una clase TypeScript, HTML y CSS. TypeScript se _[transpila](https://stackoverflow.com/questions/44931479/compiling-vs-transpiling)_ en código JavaScript, es decir, aunque nuestra aplicación finalmente resulta en JavaScript plano podemos utilizar a conveniencia las características extendidas que nos ofrece la sintaxis de TypeScript. 

### Modificando dinámicamente el UI mediante `*ngIf` y `ngFor`

A lo largo del desarrollo de la aplicación utilizaremos directivas de Angular que nos permiten alterar dinámicamente la estructura del DOM. Una **directiva** es un comando que podemos usar en el código HTML al cual afectan los cambios en nuestra aplicación. 

La primera directiva que emplearemos será el <u>iterador de Angular</u>, **`*ngFor`**. `*ngFor` permite crear dinámicamente elementos en el DOM a partir de elementos en un array. 

La segunda directiva que emplearemos será **`*ngIf`**. Podemos utilizar esta directiva para añadir o eliminar elementos del DOM basándonos en una condición. 

### Compartiendo datos entre componentes. 

Nuestra aplicación permitirá a los componentes compartir información. Para añadir nuevos elementos a la to-do list, el componente principal tiene que enviar un nuevo item al segundo componente. Este segundo componente gestiona los elementos y es el responsable de editarlos (_editing_), marcarlos como terminados (_done_) o eliminarlos (_deleting_).

Esta tarea de compartir datos entre componentes de Angular se lleva a cabo con los decoradores especiales llamados **`@Input()`** y **`@Output()`**, que permiten elevar un evento desde un componente de manera que el otro componente se entere que hay información disponible. 

## Definiendo los Item de la To-Do list

En el directorio `app`, creamos un nuevo fichero `item.ts` con el contenido siguiente:

```TypeScript
export interface Item {
    description: String;
    date: Date;
    state: String;
}
```

La `interface Item` define un modelo del objeto `Item` de manera que nuestra aplicación entienda que es un `item`. Para nuestra aplicación To-Do, un `item` es un objeto con una descripción, un estado (`done`, `undone`, `in-progress`) y una fecha de creación. 

## Lógica para `AppComponent`

Ahora que nuestra aplicación conoce que es un `item`, podemos definir algunos añadiéndolos al fichero TypeScript, `app.component.ts`. Reemplazamos el contenido en este fichero con el siguiente código:

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'todo';

  filter: 'all' | 'active' | 'done' = 'all';

  allItems = [
    { description: 'eat', done: true },
    { description: 'sleep', done: false },
    { description: 'play', done: false },
    { description: 'laugh', done: false },
  ];

  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter(item => this.filter === 'done' ? item.done : !item.done);
  }

}
```

La primera línea de JavaScript es un import `import { Component } from '@angular/core';` que importa Angular. El decorador `@Component()` especifica metadatos sobre `AppComponent`. Los metadatos por defecto son:

* `selector`: Indica el nombre del selector CSS que utilizamos en el _template_ para iniciar el componente. Aquí utilizamos `app-root`. En el fichero `index.html`, dentro de la etiqueta `body`, Angular CLI añade `<app-root></app-root>` cuando genera nuestra aplicación. Podemos usar todos 
los selectores de componentes de la misma manera añadiéndolos a los templates HTML. 

* `templateURL`: especifica el fichero HTML asociado al componente. En este caso, `'./app.component.html`.

* `styleUrls`: Proporciona la ubicación y el nombre del fichero que incluye los estilos que vamos a aplicar a nuestro componente. 

La propiedad `filter` es de tipo `union`, que significa que `filter` puede tener los valores especificados (`all `, `active`, `done`). Con el tipo `union`, si cometemos un error tipográfico cuando asignamos el valor a la propiedad `filter`, TypeScript nos avisará, pudiéndo así detectar antes el error. Posteriormente utilizaremos esta propiedad para filtrar los elementos de la To-Do list. 

El array `allItems` contiene los elementos de la To-Do List y su estado. 

El getter, `get items()`, devuelve los elementos de `allItems` si el `filter` es igual a `all`. En otro caso, `get items` devuelve los elementos marcados como `done` o dependiendo de como el usuario filtre en la vista. El getter también establece el nombre del array como `items`. 

## Añadiendo HTML al template de AppComponent

Para ver la lista de elementos en el navegador editamos el fichero `app.component.html` con el siguiente contenido:

```TypeScript
<div class="main">
  <h1>My To Do List</h1>
  <h2>What would you like to do today?</h2>

  <ul>
    <li *ngFor="let item of items">{{item.description}}</li>
  </ul>
</div>
```

La etiquete `<li>` contiene la directiva `*ngFor`, una directiva de Angular que itera sobre los elementos del array `items`. Para cada elemento, `*ngFor` crea un nuevo `<li>`. Las llaves dobles contienen la instrucción `item.description` para poblar cada `<li>` con el contenido del texto de descripción de cada elemento. 

## Añadiendo elementos a la lista

Nuestra aplicación To-Do list necesita una manera de añadir elementos.

En `app.component.ts` añadimos el siguiente método:

```TypeScript
addItem(description) {
  this.allItems.unshift({
    description,
    done: false
  });
}
```

El método `addItem()` recibe un elemento que el usuario le proporciona y lo añade al vector de tareas cuando el usuario clickea sobre el botón **Añdir**. `addItem()` utiliza el método `unshift()` para añadir el nuevo elemento al comienzo del array (_the top of the list_). Alternativamente podríamos usar `push()`, que añade el nuevo elemento al final del array. 

Para utilizar este nuevo método, editamos el template HTML de nuestro `AppComponent`:

```HTML
<label for="addItemInput">What would you like to do today?</label>

<input
  #newItem
  placeholder="add an item"
  (keyup.enter)="addItem(newItem.value); newItem.value = ''"
  class="lg-text-input"
  id="addItemInput"
/>

<button class="btn-primary" (click)="addItem(newItem.value)">Add</button>
```

Cuando el usuario describe una nueva tarea y presiona **Añadir**, el método `addItem()` añade el elemento al array de `items` y además se resetea el valor del `<input>` a una string vacío. 