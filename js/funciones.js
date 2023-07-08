function guardarProductosLocalStorage(){
    localStorage.setItem("productos", JSON.stringify(productos));
}

function cargarProductosLocalStorage(){
    return JSON.parse(localStorage.getItem("productos"));
}

function guardarCarritoLocalStorage(carrito){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarritoLocalStorage(){
    return JSON.parse(localStorage.getItem("carrito")) || [];
}


function buscarProd(id){
    const productos = cargarProductosLocalStorage();
    return productos.find(item => item.id === id);
}

function agregarProd(id) {
    const carrito = cargarCarritoLocalStorage();
    if(estaEnCarrito(id)){
        let pos = carrito.findIndex(item => item.id === id);
        carrito[pos].cantidad += 1;
    }
    else {
        const producto = buscarProd(id);
        producto.cantidad = 1;
        carrito.push(producto);
    }
    guardarCarritoLocalStorage(carrito);
    renderBotonCarrito();
}

function eliminarProd(id) {
    const carrito = cargarCarritoLocalStorage();
    let pos = carrito.findIndex(item => item.id === id);
    if(carrito[pos].cantidad > 1){
        carrito[pos].cantidad-=1;
    }
    else{
        carrito.splice(pos ,1);
    }
    guardarCarritoLocalStorage(carrito);
    renderBotonCarrito();
    renderProductos();
}

function vaciarCarrito(){
    localStorage.removeItem("carrito");
    renderBotonCarrito();
    renderProductos();
}
    
function cantidadTotalProd() {
    const carrito = cargarCarritoLocalStorage();
    return carrito.reduce((acum, item) => acum += item.cantidad, 0);
}

function estaEnCarrito(id){
    const carrito = cargarCarritoLocalStorage();
    return carrito.some(item => item.id === id);
}

function sumaTotalProd() {
    const carrito = cargarCarritoLocalStorage();
    return carrito.reduce((acumulador, item) => acumulador += item.precio*item.cantidad, 0);
}

function verProd(id){
    const producto = buscarProd(id);
    localStorage.setItem("producto", JSON.stringify(producto));
}

function renderBotonCarrito() {
    let botonCarr = document.getElementById("botonCarr");
    let contenido = `<button type="button" class="btn bg-light position-relative">
    <img src="./images/cart4.svg" alt="Carrito" width="30">
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${cantidadTotalProd()}
    </span>
    </button>`;
    botonCarr.innerHTML = contenido;    
}

function filtrarProd(){
        let prod = cargarProductosLocalStorage();
        let textBusqueda = document.getElementById("textBusq").value;
        let contenido = "";
        
        prod = textBusqueda ? prod.filter(item => item.nombre.toUpperCase().includes(textBusqueda.toUpperCase())) : prod;
    
    
        if(prod.length > 0){
            prod.forEach(producto => {
                contenido += 
                `<div class="col-md-3 mb-4">
                    <div class="card">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h2 class="text-center">${producto.nombre}</h2>
                            <ul >
                                <li class="card-text text-danger"><b>Precio: $${producto.precio}</b></li>
                                <li class="card-text" >Categoria: ${producto.categoria}</li>
                            </ul>
                            <a href="./verproductos.html" onClick="verProd(${producto.id})"; class="text-decoration-none">
                                <button class="btn btn-primary" onclick="verProd(${producto.id});">Ver Producto</button>
                            </a>                      
                        </div>
                    </div>
                </div>`; 
            });
        }
        else{
            contenido = ` <div class="alert alert-danger text-center" role="alert ">
            NO SE ENCONTRO LA BUSQUEDA DEL PRODUCTO !!!
          </div>`;
        }
        document.getElementById("contenido").innerHTML = contenido; 
};

function filtrarProdConCheckbox(){
    let prod = cargarProductosLocalStorage();
    let check1 = document.getElementById("check1");
    let check2 = document.getElementById("check2");
    let check3 = document.getElementById("check3");
    let check4 = document.getElementById("check4");
    let contenido = "";

    prod = prod.filter(item => (check1.checked && item.categoria == check1.value) || (check2.checked && item.categoria == check2.value) || (check3.checked && item.categoria == check3.value) || (check4.checked && item.categoria == check4.value) );

    if(prod.length > 0){
        prod.forEach(producto => {
            contenido += 
            `<div class="col-md-3 mb-4">
                <div class="card">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h2 class="text-center">${producto.nombre}</h2>
                        <ul >
                            <li class="card-text text-danger"><b>Precio: $${producto.precio}</b></li>
                            <li class="card-text" >Categoria: ${producto.categoria}</li>
                        </ul>
                        <a href="./verproductos.html" onClick="verProd(${producto.id})"; class="text-decoration-none">
                            <button class="btn btn-primary" onclick="verProd(${producto.id});">Ver Producto</button>
                        </a>                      
                    </div>
                </div>
            </div>`; 
        });
        document.getElementById("contenido").innerHTML = contenido; 
    }
    else{
        renderProductos();
    }
};