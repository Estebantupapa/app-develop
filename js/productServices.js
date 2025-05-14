function products(){
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de Productos</h5>'
    const REQRES_ENDPOINT = 'https://reqres.in/api/products?page=1'

    fetch(REQRES_ENDPOINT, {
      method: 'GET' , 
      headers: {
        'Content-type' : 'application/json',
        'x-api-key': 'reqres-free-v1'
      } 
    })
    .then((response) =>{
        return response.json().then(
            data =>{
                return{
                    status: response.status,
                    info: data
                }
            }
        )
    })

    .then((result) =>{
        console.log('resultado' , result)
        if(result.status === 200){
            let listProducts = `
            <table class="table">
            <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre Producto</th>
            <th scope="col">year</th>
            <th scope="col">Pantone Value</th>
            </tr>
            </thead>
            <tbody>
            `
            result.info.data.forEach(element => {
                listProducts = listProducts + `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.year}</td>
                    <td><input type= 'color' value = '${element.color}'</td>
                </tr>
                `
            });
            listProducts = listProducts + `
              </tbody>
            </table>
            `
            document.getElementById('info').innerHTML = listProducts
        }else{
            document.getElementById('info').innerHTML = 'No existen usuarios'
        }
    })
    document.getElementById('info').innerHTML = '<h1>Lista de Productos</h1>'
}