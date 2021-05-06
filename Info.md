# Angular info

Información sobre Angular. 

Fuentes:

* https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Angular_getting_started

## Prerequisitos

* **Node.js**

Versión utilizada:

```bash
node -v
v14.15.4
```

* **npm package manager**

```bash
npm -v
7.10.0
```

## Set up

Instalación de Angular CLI para ejecutar comandos en la terminal (generating, building, testing and deploying Angular applications):

```bash
npm install -g @angular/cli
```

Creamos una nueva aplicación en Angular llamada `ToDoListApp`:

```bash
ng new ToDoListApp
```

Para ejecutar la aplicación:

```bash
ng serve
```

## Familiarizándonos con nuestra aplicación Angular

En `src/app`:

1. `app.module.ts`: Aquí especificamos los archivos que utiliza nuestra aplicación. Se comporta como el eje central para el resto de los ficheros de nuestra aplicación. 

2. `app.component.ts`: También conocida como clase, contiene la lógica para la página principal de nuestra aplicación. 

3. `app.component.html`: Contiene el HTML para `AppComponent`. El contenido de este fichero es conocido tambien como _template_. El _template_ determina la vista que veremos en el navegador. 

4. `app.component.css`: Contiene los estilos para `AppComponent`.

Un component en Angular se compone de tres partes principales - el _template_, los estilos, y la clase (_class_). Por ejemplo, `app.component.ts`, `app.component.html` y `app.component.css` componen juntos el componente **`AppComponent`**. Esta estructura separa la lógica, la vista y los estilos de cara a que la aplicación sea más mantenible y escalable. 

Angular CLI también genera un fichero para testing, `app.component.spec.ts`. Que no vamos a utilizar y por ello lo hemos eliminado. 

## La estructura de una aplicación Angular

Angular está construido con TypeScript. TypeScript es un _superset_ de JavaScript, por tanto el código JavaScript es válido en TypeScript. TypeScript ofrece una sintaxis más concisa que JavaScript, lo cual permite a este ser una mejor herramienta para la creación de código mantenible y con menos bugs. 

Los **`Componets`** son los bloques sobre los que se construyen las aplicaciones Angular. Un componente incluye una clase en TypeScript que incluye un **decorador**: `@Component()`, un _template_ HTML y los estilos. 

### **The Class**

La clase es donde ponemos la lógica que nuestro componente necesita. El código puede incluir funciones, event listeners y referencias a services, por nombrar algunos. La class es un fichero con un nombre como `feature.component.ts`, donde `feature` es el nombre de nuestro componente. Asó, podemos tener ficheros como `header.component.ts`, `signup.component.ts` o `feed.component.ts`. Creamos un componente con el decorador `@Component()` que tiene un metadato que indica a Angular donde encontrar el HTML y el CSS. Un componente típico:

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-item',
    // the following metadata specifies the location of the other parts of the component
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent {
// your code goes here
}
```

Este componente se llama `ItemComponent`, y su **selector** es `app-item`. Podemos utilizar el selector como una etiqueta HTML convencional empleandola en _templates_. Cuando un selector se utiliza en un _template_, el navegador renderiza el _template_ del componente. 

El modelo de componentes de Angular ofrece una fuerte encapsulación y una estructura intuitiva para nuestras aplicaciones. Los componentes también permiten hacer unit test más facilmente en nuestra aplicación y mejorar la legilibilidad de nuestro código. 

### The HTML template

Cada componente tiene un _template_ HTML que declara como se renderiza el componente. Podemos definir este template _inline_ o mediante el path del fichero que lo contiene.

Para referirnos a un fichero externo que contiene el HTML usamos la propiedad `templateUrl`:

```TypeScript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
}
```

Para declarar _inline HTML_, usamos la propiedad `template` y escribimos el HTML:

```TypeScript
@Component({
  selector: 'app-root',
  template: `<h1>Hi!</h1>`,
})

export class AppComponent {
}
```

Angular extiende HTML con sintaxis adicional que nos permite insertar valores dinámicamente en nuestro componente. Angular automáticamente actualiza el DOM renderizado cuando el estado de nuestro componente cambia. Un uso de esa funcionalidad es la de inserción de dinámica de texto, por ejemplo:

```html
<h1>{{ title }}</h1>
```

La estructura `{{  }}` indica a Angular que debe interpolar su contenido. El valor de `title` viene del componente de la clase:

```TypeScript
import { Component } from '@angular/core';

@Component ({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'To do application';
}
```

Cuando la aplicación carga el componente y su _template_, en el navegador se mostrará:

```TypeScript
<h1>To do application</h1>
```

### Styles

Un componente puede heredar _global styles_ del archivo `styles.css` y aumentar o sobreescribir este con sus propios estilos. Podemos escribir estilos para un componente en concreto directamente en el decorador `@Component()` o especificar el path al archivo con el CSS.

Para incluir los estilos directamente en el decorador del componente, usamos la propiedad `styles`:

```TypeScript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['h1 { color: red; }']
})
```

Normalmente los estilos irán en un fichero aparte que especificaremos utilizando la propiedad `styleUrl`:

```TypeScript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
```

Con estilos específicos para cada componente podemos organizar mejor nuestro CSS de manera que sea mantenible y portable más facilmente. 
