const socket = io();


let addProduct = document.querySelector('#formProducts'),
    delProduct = document.querySelector('#formDelProducts'),
    containerProducts = document.querySelector('.contenedorProductos');


console.log(addProduct);
console.log(delProduct);


addProduct.addEventListener('submit', (e) => {
    e.preventDefault(); 

  
    const data = {
        title: document.querySelector('#titulo').value.trim(),
        description: document.querySelector('#descripcion').value.trim(),
        code: document.querySelector('#code').value.trim(),
        price: document.querySelector('#precio').value.trim(),
        status: document.querySelector('#status').value === "true",  
        stock: document.querySelector('#stock').value.trim(),
        category: document.querySelector('#categoria').value.trim(),
        thumbnails: document.querySelector('#imagenes').value.split(",").map(url => url.trim()) 
    };


    socket.emit('addProduct', data);

    
    addProduct.reset();
});


delProduct.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const id = parseInt(document.querySelector('#id').value);  
    if (id <= 0) {
        
        return Swal.fire({
            position: "top-end",
            icon: "error",
            title: "ID no válido",
            showConfirmButton: false,
            timer: 1500
        });
    }
    
    console.log('ID enviado:', id);
    socket.emit('delProduct', id); 

    
    delProduct.reset();
});


const renderProducts = (productos) => {
    containerProducts.innerHTML = ''; 

    productos.forEach(product => {
        
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const imgContain = document.createElement('div');
        imgContain.classList.add('imgContain');
        
        const img = document.createElement('img');
        img.src = product.thumbnails[0]; 
        img.alt = product.title;
        imgContain.appendChild(img);

       
        const descripcionDiv = document.createElement('div');
        descripcionDiv.classList.add('descripcion');
        
        const title = document.createElement('h3');
        title.classList.add('productTitle');
        title.textContent = product.title;

        const descripcionesDiv = document.createElement('div');
        descripcionesDiv.classList.add('descripciones');

        
        const fields = [
            { label: 'Descripción:', value: product.description, class: 'des' },
            { label: 'Categoría:', value: product.category, class: 'categoria' },
            { label: 'Código:', value: product.code, class: 'code' },
            { label: 'ID:', value: product.id, class: 'id' },
            { label: 'Precio:', value: product.price, class: 'price' },
            { label: 'Estado:', value: product.status ? 'Activo' : 'Inactivo', class: 'status' },
            { label: 'Stock:', value: product.stock, class: 'stock' }
        ];

      
        fields.forEach(field => {
            const descriptionDiv = document.createElement('div');
            descriptionDiv.classList.add('description', field.class);

            const label = document.createElement('small');
            label.textContent = field.label;

            const value = document.createElement('p');
            field.class === 'status' && (value.style.color = field.value === 'Activo' ? 'green' : 'red');
            value.textContent = field.value;

            descriptionDiv.appendChild(label);
            descriptionDiv.appendChild(value);
            descripcionesDiv.appendChild(descriptionDiv);
        });

        descripcionDiv.appendChild(title);
        descripcionDiv.appendChild(descripcionesDiv);
        productDiv.appendChild(imgContain);
        productDiv.appendChild(descripcionDiv);

       
        containerProducts.appendChild(productDiv);
    });
};


socket.emit('getProducts');


socket.on('error', (error) => {
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500
    });
});


socket.on('message', (message) => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
});


socket.on('productoAñadido', () => {
    socket.emit('getProducts');
});


socket.on('products', (products) => {
    renderProducts(products);
});

socket.on('eliminado', (id) => {
    socket.emit('getProducts');
    Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        text: `El producto con ID ${id} fue eliminado correctamente`,
        timer: 2000,
        showConfirmButton: false,
        position: 'top-end'
    });
});


socket.on('errorDel', (errorMsg) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMsg,
        timer: 2000,
        showConfirmButton: false,
        position: 'top-end'
    });
});


socket.on('notFound', (errorMsg) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMsg,
        timer: 2000,
        showConfirmButton: false,
        position: 'top-end'
    });
});