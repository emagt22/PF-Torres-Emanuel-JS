function renderProductos(){
    let prod = cargarCarritoLocalStorage();
    let contenido ="";    
    if(cantidadTotalProd() > 0){
            contenido += `<table class="table">
                <tr>
                <td colspan="4">&nbsp;</td>
                <td class="text-end"><button type="button" class="btn btn-outline-secondary" alt="Limpiar Carrito" title="Limpiar Carrito" onclick="vaciarCarrito();">Reset</button></td>         
                </tr>`;
            prod.forEach(producto => {
                contenido += `<tr>
                <td><img src="${producto.imagen}" alt="${producto.nombre}" width="30"></td>
                <td class="align-middle">${producto.nombre}</td>
                <td class="align-middle"><b>$${producto.precio.toFixed(2)} x ${producto.cantidad}</b></td>
                <td class="align-middle"><b>$${(producto.precio * producto.cantidad).toFixed(2)}</b></td>
                <td class="align-middle text-end"><img src="./images/trash3.svg" alt="Eliminar Producto" title="Eliminar Producto" width="20" onclick="eliminarProd(${producto.id});"></td>
                </tr>`;
            });
            contenido += `<tr>
            <td>&nbsp;</td>
            <td colspan="2">Saldo Total</td>
            <td><b>$${sumaTotalProd().toFixed(2)}</b></td>    
            <td>&nbsp;</td>
            </tr>
            </table>`;
        }
        else{
            contenido = ` <div class="alert alert-danger text-center" role="alert ">
            NO SE CARGARON PRODUCTOS AL CARRITO !!!
          </div>`;
        }
        document.getElementById("contenido").innerHTML = contenido; 
    };

renderProductos();
renderBotonCarrito();