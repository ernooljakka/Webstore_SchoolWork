/**
 * TODO: 8.4 Register new user
 *       - Handle registration form submission
 *       - Prevent registration when password and passwordConfirmation do not match
 *       - Use createNotification() function from utils.js to show user messages of
 *       - error conditions and successful registration
 *       - Reset the form back to empty after successful registration
 *       - Use postOrPutJSON() function from utils.js to send your data back to server
 */



const handleRegister=(event) => {

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password1 = document.getElementById('password').value;
    let password2 = document.getElementById('passwordConfirmation').value;

    if(password1 !== password2) {
        createNotification('Passwords don\'t match', 'notifications-container', false);
        return;
    }
    else {
        
        let newUser = {'name': name, 'email': email, 'password': password1};
        postOrPutJSON('http://localhost:3000/api/register', 'post', newUser).then(x=>{
            event.target.reset();
            createNotification('New user registered succesfully', 'notifications-container', true);
        }).catch(error => createNotification(error, 'notifications-container', false));
            
        
        return;
    }


}

addEventListener('submit', handleRegister);