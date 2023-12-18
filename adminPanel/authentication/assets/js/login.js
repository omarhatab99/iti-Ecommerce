
//imports
import { authenticationLogin } from "./authenticationModule";


const authenticationLoginHandle = () => {
    
    login();

};


const login = () => {

    document.getElementById("loginBtn").addEventListener("click" , async (event) => {

        event.preventDefault();

        await authenticationLogin();

    });

}



//call authenticationLoginHandle.

authenticationLoginHandle();