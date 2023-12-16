import {getAuth , createUserWithEmailAndPassword ,
    signInWithEmailAndPassword , onAuthStateChanged , signOut } from 'firebase/auth';
    
import {getDataForm} from './extensions.js'

const loginForm = document.getElementById("loginForm");


export const authenticationHandle = (firebaseApp) => {

    const authentication = getAuth(firebaseApp);

    authenticationRegister(authentication);
    authenticationLogin(authentication);
    authenticationLogout(authentication);

    //fire when authentication state changed (observation).


    onAuthStateChanged( authentication , (user) => { //observation

        //check if user is login already

        if(user){ //user already login

            document.getElementById("profileContainer").innerHTML = 
            `
            
                <div class="dropdown-center">
                    <a href="javascript:;" class="text-decoration-none profile-Dropdown"  data-bs-toggle="dropdown" aria-expanded="false">
                        <span id="profileUsername" class="text-danger">${user.email}</span>
                        <img src="source/images/avatar.png" class="rounded-circle img-thumbnail" width="40" alt="avatar" height="40">
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a id="logoutBtn" class="dropdown-item logout-Btn" href="javascript:;">Logout</a></li>
                    </ul>
                <div>
            
            `

        }
        else
        { //user not login
            document.getElementById("profileContainer").innerHTML = "";
        }

    });

};


const authenticationLogin = (authentication) => {

    document.getElementById("loginBtn").addEventListener("click" , async function(event){

        event.preventDefault();

        let userObject = getDataForm(loginForm);

        try {
            const credential = await signInWithEmailAndPassword(authentication , userObject.email , userObject.password);
        }
        catch(error) 
        {

            console.log(error);

        }

    });

}


const authenticationRegister = (authentication) => {

    document.getElementById("registerBtn").addEventListener("click" , async function(event){

        event.preventDefault();

        let userObject = getDataForm(loginForm);

        //validation
        try {
            const credential = await createUserWithEmailAndPassword(authentication , userObject.email , userObject.password);
        }
        catch(error) {
            console.log(error);
        }
    });

}


const authenticationLogout = (authentication) => {

    document.addEventListener("click" , async function(event) {

        if(event.target.classList.contains("logout-Btn")) {
            
            try {
                await signOut(authentication);
            }
            catch(error){
                console.log(error);
            }   


        }

    });

};











