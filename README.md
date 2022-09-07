# CHALLENGE

Este proyecto fue iniciado con [Create React App](https://github.com/facebook/create-react-app).

## Scripts disponibles

En el directorio del proyecto, ejecutar:

### `npm start`

Ejecuta la aplicación en el modo de desarrollo.\
Abrir [http://localhost:3000](http://localhost:3000) para verlo en su navegador.
La página se volverá a cargar cuando se realicen cambios.\
También se podrá ver si hay errores en la consola.

***

 ### Sobre el proyecto:

Este es un proyecto creado integramente con React.js. Es totalmente resposive y simula ser una pasarla de pagos que toma datos de la API 'blockchain' para calcular el precio del producto (que es originalmente en dolares), en BTC. Tambien cuenta con un formulario de pago que requiere el numero de tarjeta de credito, la fecha de vencimiento y el codigo de seguridad y todos deben ser a su vez validos para poder ser aceptado el pago.
El diseño del proyecto fue basado en este [Figma](https://www.figma.com/file/6BTEAzFqDi4KTVLHrFN6Ji/Checkout-Page-(Community)?node-id=2%3A2).

***

## Dependencias

Para realizar el proyecto se utilizaron las siguientes dependencias:
* `creditcard.js:` Posee funciones que validan la tarjeta de credito, validan el codigo se seguridad y la fecha de vencimiento y obtienen la compañia segun el numero de la tarjeta.
* `reactstrap:` Basada en boostrap,para poder usar algunos de sus componentes.
* `sweetalert2:` Utilizado para incluir alertas en la aplicion (alternativas a los alerts de javascript)
* `react-input-mask:` Input masking component for React. Made with attention to UX.
* `react-router-dom:` Utilizado para implementar rutas dinamicas en la aplicacion web.
* `react-icons:` Utilizado para incluir iconos.
* `reduxjs/toolkit:` Utilizado como una herramienta para escribir de manera estandar la logica de redux.
* `react-redux:` Le permite a los componentes de react leer data del store de redux y depachar acciones al store para actualizar esa data.
* `axios:` Cliente http basado en promesas para js.
* `redux-thunk:` Para comunicarse de manera asíncrona con una API externa y, así, recuperar o guardar datos. Redux Thunk facilita el envío de acciones que siguen el ciclo de vida de una solicitud a una API externa.
* `json-server:` Nos permite implementar un API REST. Para correr el servidor ejecutar en el directorio del proyecto: `npm run server`

***

## Componentes

* **Background:**
  * **Div:** Componente utilizado para el estilo del fondo de la aplicacion (franja amarilla del fondo del div).
* **Buttons:**
  * **Button:** Componente creado para poder proceder a la compra. El mismo recibe un id. Al hacer click en el nos lleva a la pagina de checkout y despacha en la accion el id.
  * **ButonClose:** Componente creado para poder salir de la pagina de checkout y dirigirnos a la pagina anterior donde se encuentra el boton de compra.
* **Carousel:** Este componente es solo un div que recibe las propiedades imagenes y nombre del producto. Muestra las tres imagenes en un carousel y el nombre es utilizada como el 'alt' de esas imagenes.
* **Payform:** Se compone de un formulario con tres campos: numero de la tarjeta, fecha de vencimiento, y codigo de seguridad y un boton para confirmar la compra.Se utilizo la libreria creditcard.js para poder validar que los tres campos sean correctos(correspondan a una tarjeta de credito valida) y que solo sean tarjetas ***Visa***, ***Mastercard***, ***Diners*** o ***American Express***.Al mismo tiempo, una vez ingresado el numero de la tarjeta, cambia el logo universal que es encuentra en el input y cambia segun la compañia de la tareta.Tambien se utilizo la libreria 'react-input-mask' para poder aplicarle marcaras a los inputs. Al validar la compra, se crea una 'orden', en la que se guardan la fecha actual,el nombre, id  y precio del producto (en dolares y en btc), el numero de la tarjeta y la compañia.Esta orden se guarda en el archivo *db.json* y se guarda en la ruta  *http://localhost:3002/orders* mediante un post.Al mismo tiempo, al ser validada la compra se dispara un sweet alert y a los cinco segundos nos redirige a la pagina de compras. 
* **Price:** Componente que muestra el nombre del producto, la descripción y el precio en dolares y en BTC, el cual es actualizcado cada 5 segundos.
* **Screens:**
  * **Checkout:** Componente que se encuentra en la ruta **'/checkout'**. El mismo renderiza los componentes *Div*, *CloseButton*, *Payform* y *Price* y les provee las props requeridas buscando el estado del producto seleccionado. Si no hay ningun producto seleccionado, y queremos entrar a la ruta de '/checkout' el componente renderiza los componentes *Div*, *CloseButton* y un div con el texto de que no hay ningun producto agregado. 
  * **Purchase:** Componente que se encuentra en la ruta **'/'**. El mismo renderiza los componentes *Div* y *Button*. Le provee el id requerido por Button de manera harcodeada (en este caso, 1).

  ***Se configuro tambien que en el caso de ingresar a cualquier otra pagina se muestre en pantalla el texto 'NOT FOUND 404'***

***

## Funciones del reducer:
El ***priceReducer*** realiza el llamado a la api de *blockchain* y lo gaurda en el estado. De esta manera podemos realizar llamados a la app desde todo el store segun la necesitemos.
El ***productsReeducer*** posee un estado cuyo valor inicial de productos son los productos (provenientes de el archivo que se encuentra en 'Data/Products.js' el cual contiene un arreglo de objetos con las propiedades *id*, *name*, *description*, *price* e *img*) y un valor inicial par el producto seleccionado que es un objeto vacio.
En sus reducers tenemos la funcion ***setProductSelected*** el cual toma el valor inicial de los productos y recibe por payload un id y filtra entre los productos aquel producto que coincida con el id recibido. Una vez hecho esto, el estado del producto seleccionado cambia y pasa a ser ese producto filtrado.
Esta función la usamos en el boton, en el cual despachamos el id del producto, y nos redirige a checkout en donde el componente busca el estado del producto seleccionado y puede setear las props en los demas componentes. 