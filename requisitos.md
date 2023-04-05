### API

### MODELO DE PRODUCTOS

-Recuperamos todos los productos - GET/api/products

         PRUEBAS:
        - Que la URL funcione(que el status sea 200)
        - Que la respuesta sea en formato JSON
        - Que la respuesta sea un array con productos

- Recuperamos un unico producto
  -GET /api/products/IDPRODUCTO(findById)

-Creamos un producto
-POST /api/products
-En el body de la peticion recibimos todos los datos del nuevo producto

        PRUEBAS:
        - Que la URL funcione y nos devuelva un JSON
        - Que la respuesta disponga de la propiedad _id
        - Que la respuesta tenga los mismos datos que yo inserto

-Editamos un producto

- PUT /api/products/PRODUCTID
- En el body recibimos todos los datos a editar

        PRUEBAS:
        - Que la URL funcione y nos devuelva un JSON
        - Comprobar que en la respuesta se ven reflejados los cambios

-Borramos un producto
-DELETE /api/products/PRODUCTID
PRUEBAS: - Que la URL funcione y nos devuelva un JSON - Comprobar si el producto se ha borrado de la base de datos

-Recuperar una lista de productos por precio - GET /api/products/price/PRICE

-Recuperar una lista de productos por departamento - GET /api/products/department/DEPARTAMENTO

-Colocar como NO DISPONIBLLES a todos aquellos productos que esten dusponibles y su stock sea menos de 10
-PUT /api/products/stock

### MODELO DE USUARIOS

- URL para registrar usuarios
  -POST /api/users/register - Dentro del body recibimos todos los datos del usuario - Insertamos un documento nuevo por cada peticion(create)
