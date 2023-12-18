import {getAuth , createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
import { getFormData } from "../../../shared/extensions";
import { app } from "../../../../main";


//constants

const loginForm = document.getElementById("loginForm");

const authetication = getAuth(app);


//handle authenticationRegister
export const authenticationRegister = async () => { //login user

    const currentObject = getFormData(loginForm);

    const validationResult = validationLogin(currentObject);

    if(validationResult.isValid){


        try{
            const credential = await createUserWithEmailAndPassword(authetication , currentObject.email , currentObject.password)
            window.location.assign("http://localhost:5173/adminPanel/authentication/login");
        }
        catch(error)
        {
            document.getElementById("errorSpan").textContent = error;
        }

    }
    else
    {
        document.getElementById("errorSpan").textContent = validationResult.messageError
    }
}


//handle authenticationLogin

export const authenticationLogin = async () => { //login user


    const currentObject = getFormData(loginForm);

    const validationResult = validationLogin(currentObject);

    if(validationResult.isValid){


        try{
            const credential = await signInWithEmailAndPassword(authetication , currentObject.email , currentObject.password)
            window.location.assign("http://localhost:5173/adminPanel/dashboard/home");
        }
        catch(error)
        {
            document.getElementById("errorSpan").textContent = error;
        }

    }
    else
    {
        document.getElementById("errorSpan").textContent = validationResult.messageError
    }
}


const validationLogin = (data) => {

    const validationResult = new Object();
    validationResult.isValid = false;
    validationResult.messageError = "";

    if(data.email == "" || data.email == undefined) {
        validationResult.messageError = "email must be required";
    }
    else if(data.password == "" || data.password == undefined) {
        validationResult.messageError = "password must be required";
    }
    else
    {
        validationResult.isValid = true;
        validationResult.messageError = "";
    }


    return validationResult


}





