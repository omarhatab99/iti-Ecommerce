import { onAuthStateChanged , getAuth , signOut} from "firebase/auth";
import { app } from "../../../../main";
//check authentication login

const authentication = getAuth(app);


//handle dashboard methods

const dashboardHandle = () => {

    authenticationLogout();

    //check if user in authentication login.
    onAuthStateChanged(authentication , (user) => {

        console.log(user);
        if(user){

            document.querySelector(".dropdown").innerHTML = 
            `
            
            <a class="text-decoration-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div class="profile-info d-flex justify-content-center align-items-center">
                    <div class="info text-dark px-3">
                        <p class="pb-0 mb-0">Hey, <b>${user.email}</b></p>
                        <small>Admin</small>
                    </div>
                    <div class="profile-photo d-flex align-items-center">
                        <img class="img-thumbnail rounded-circle" width="45" height="45" src="assets/images/avatar.png">
                    </div>
                </div>
            </a>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item logout-btn" href="javascript:;">Logout</a></li>
            </ul>

            
            `

        }

    });
}





const authenticationLogout = () => {

    document.addEventListener("click" , async (event) => {

        if(event.target.classList.contains("logout-btn")) {

            console.log("logout");

            try {

                await signOut(authentication);
                location.assign("http://localhost:5173/adminPanel/authentication/login");

            }
            catch(error) {

                console.log(error);

            }

        }

    });

}





let cartona = "";

for (let index = 0; index < 20; index++) {
    
    cartona += 
    `
    <tr>
        <td>Iphone X Max</td>
        <td>Electric</td>
        <td>50000$</td>
        <td>50</td>
        <td>
            <button class="btn btn-warning btn-sm me-2">Edit</button>
            <button class="btn btn-danger btn-sm">Delete</button>
        </td>
    </tr>
    
    `
    
}


document.querySelector("tbody").innerHTML = cartona;

const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));


document.getElementById("hamada").addEventListener("click" ,  () => {

    document.getElementById("exampleModalLabel").textContent = "Create new category";






    myModal.show();

    console.log(myModal);

});





dashboardHandle();