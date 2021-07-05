/**
* PHP Email Form Validation - v3.1
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/

let secret = 0
document.getElementsByClassName("php-email-form")[0].addEventListener("submit", function(event){
  document = event.target;
  event.preventDefault()
});
const submitForm = async () =>{

      
      document.querySelector('.loading').classList.add('d-block');
      document.querySelector('.error-message').classList.remove('d-block');
      document.querySelector('.sent-message').classList.remove('d-block');

    
     await getSecret()
      let name = document.querySelector('.name').value
      let email = document.querySelector('.emailIDUser').value
      let subject = document.querySelector('.subject').value
      let message = document.querySelector('.message').value

      let formData = {name,email,subject,message,secret}

     
        php_email_form_submit( formData);
        // console.log(name,email,subject,message,secret)









  }
  const  php_email_form_submit = async  (  formData)=> {
    await fetch('https://mailer-jade.vercel.app/api/mail', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
                'Accept': 'application/json'
      },
    })
    .then(response => {
      if( response.ok ) {
        return response.text()
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
      }
    })
    .then(data => {
      document.querySelector('.loading').classList.remove('d-block');
      
      if (data.trim() == '{"msg":"message sent"}') {
        document.querySelector('.sent-message').classList.add('d-block');
        // document.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' ); 
      }
    })
    .catch((error) => {
      displayError(document, error);
    });
  }

  const getSecret = async  ( )=> {

    
    await fetch('https://mailer-jade.vercel.app/api', {
      method: 'GET',
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(async response => {
      if( response.ok ) {
        secret = JSON.parse( await response.text()).msg
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
      }
    })}








  function displayError(document, error) {
    document.querySelector('.loading').classList.remove('d-block');
    document.querySelector('.error-message').innerHTML = error;
    document.querySelector('.error-message').classList.add('d-block');
  }


