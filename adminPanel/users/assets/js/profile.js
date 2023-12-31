//imports
import moment from 'moment';
import { getFormData } from '../../../shared/extensions';
import { getSingleUserById, updateUserHandle } from './users';
import { authenticationValidation } from '../../../authentication/assets/js/authenticationModule';
import { doc, onSnapshot} from 'firebase/firestore';
import { firestore } from '../../../../main';


let params = new URLSearchParams(location.search);
const id = params.get('id');


//constants
const updateUserForm = document.getElementById("updateUserForm");


const profileHandle = () => {
    getCurrentUser();
    updateUserProfile();
}

//get user
const getCurrentUser = async() => {

    const documentationReference = doc(firestore , "Users" , id);

    onSnapshot(documentationReference , (snapshot) => {


        const user = snapshot.data()

        

        if(user.ProfileImage)
        {
            document.querySelector(".card-img img").src = user.ProfileImage.imageUrl;
        }
        else
        {
            document.querySelector(".card-img img").src = "assets/images/avatar.png";
        }

        document.querySelector(".right-username").textContent = user.Username;
        document.querySelector(".right-email").textContent = user.Email;
        if(user.Phone){
            document.querySelector(".right-phone").textContent = user.Phone;
        }
        else
        {
            document.querySelector(".right-phone").textContent = "xxxxxxxxxxxx";
        }

        document.querySelector(".right-createdAt").textContent = moment(user.CreateAt).format('MMMM Do YYYY');
        
        if(user.LastUpdatedAt){
            document.querySelector(".right-lastUpdated").textContent = moment(user.LastUpdatedAt).format('MMMM Do YYYY');
        }
        else
        {
            document.querySelector(".right-lastUpdated").textContent = "no update yet";
        }

        document.querySelector(".right-role").textContent = user.Role;

        //form
        document.getElementById("username").value = user.Username;

        document.getElementById("userEmail").value = user.Email;

        document.getElementById("phone").value = user.Phone;

    });



}

const updateUserProfile = () => {

    document.getElementById("updateUserBtn").addEventListener("click" , async (event) => {

        event.preventDefault();

        //get form data
        const currentObject = getFormData(updateUserForm);
        //validation 
        const validationResult = authenticationValidation(currentObject , "Update");

        if(validationResult.isValid) {

            delete currentObject.CreateAt;
            currentObject.LastUpdatedAt = `${new Date()}`;

            document.getElementById("updateUserBtn").classList.add("disabled");

            document.getElementById("updateUserBtn").innerHTML = 
            `
                <div class="spinner-border text-light me-1" role="status" style="width:15px; height: 15px">
                    <span class="visually-hidden">Loading...</span>
                </div>
                Looding..
    
            `

            //if data is valid send it
            updateUserHandle(currentObject , id)
            .then((data) => {

                if(data.done){

                    document.getElementById("updateUserBtn").classList.remove("disabled");

                    document.getElementById("updateUserBtn").innerHTML = 
                    `
                        Save changes
            
                    `

                    document.getElementById("updateUserValidationSpan").textContent = "";

                }

                document.getElementById("profileCover").value = "";

            })
            .catch((data) => {

                document.getElementById("updateUserBtn").classList.remove("disabled");

                document.getElementById("updateUserBtn").innerHTML = 
                `
                    Save changes
        
                `

                document.getElementById("updateUserValidationSpan").textContent = data.err;
            });
        }
        else
        {
            document.getElementById("updateUserValidationSpan").textContent = validationResult.messageError;
        }
    });

}

profileHandle();