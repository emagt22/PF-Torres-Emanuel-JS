function renderProducto(){
    const producto = JSON.parse(localStorage.getItem("producto"));
    let contenido =
    `<div class="col-md-4 offset-md-2">
        <img src="${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
    </div>
    <div class="col-md-4">
        <h2>${producto.nombre}</h2>
        <p class=" text-danger"><b>Precio: $${producto.precio}</b></p>
        <p>Categoria: ${producto.categoria}</p>
        <button class="btn btn-primary" onclick="agregarProd(${producto.id});">Sumar Carrito + </button>
    </div>`; 

    document.getElementById("contenido").innerHTML = contenido; 
}

renderProducto();
renderBotonCarrito();