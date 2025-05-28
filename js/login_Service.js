document.getElementById('loginform').addEventListener('submit',function(e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    login(email, password)
});


 function login(email, password){
  localStorage.removeItem('token')
    let message = ''
    let alerType = ''
    const REQRES_ENDPOINT = 'https://reqres.in/api/login'

    fetch(REQRES_ENDPOINT, {
      method: 'POST' , 
      headers: {
        'Content-type' : 'application/json',
        'x-api-key': 'reqres-free-v1'
      } , 
      body: JSON.stringify({email, password})
    })

    .then((response)  =>{
      if(response.status === 200){
        alerType = 'success'
      message = 'inicio de sesion exitoso'
      alertBuilder(alerType, message)
      response.json().then((data) =>{
        localStorage.setItem('token' , data.token)
      })
      setTimeout(() => {
        location.href = 'admin/dashboard.html'
      }, 2000) //2000 ms = 2 segs
      
      }else{
        alerType = 'danger'
        message = 'Datos incorrectos, revisalo'
        alertBuilder(alerType, message)
      }
      console.log('respuesta del servicio' , response)
    })

    .catch((error) =>{
      alerType = 'danger'
      message = 'Se ha generado un error'
      console.log('error en el servicio' , error)
    })


 }

 function alertBuilder(alerType, message){
  const alert = `<div class="alert alert-${alerType} alert-dismissible fade show" role="alert">
   ${message}
   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
 </div>`;
   document.getElementById('mensaje').innerHTML = alert; 
 }