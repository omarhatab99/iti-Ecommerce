import { onAuthStateChanged , getAuth , signOut} from "firebase/auth";
import { app } from "../../../../main";

//constants

//handle dashboard methods
const authentication = getAuth(app);

const createProductHandle = () => {

    //handle authentication logout.
    authenticationLogout();

    //check if user in authentication login.
    onAuthStateChanged(authentication , (user) => {

        console.log(user);
        if(user){

            //handle loading
            document.body.onload = function(){
                document.querySelector(".overlay-loading").style.display = "none";
            }

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
        else
        {
            location.assign("/adminPanel/authentication/login");
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




const darkMode = document.querySelectorAll(".dark-mode span");


//check dark mode
if(localStorage.getItem("mode")) {
    if(localStorage.getItem("mode") === "dark")
    {
        document.body.classList.add("dark-mode-variables")
        darkMode.forEach((btn) => btn.classList.remove("active"));
        darkMode[1].classList.add("active");
        document.querySelector(".dropdown-menu").classList.add("dropdown-menu-dark");
    }
}


//change mode color 
darkMode.forEach((btn) => {
    btn.addEventListener("click" , function(){
        darkMode.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        if(this.dataset.mode === "light") {
            document.body.classList.remove("dark-mode-variables");
            document.querySelector(".dropdown-menu").classList.remove("dropdown-menu-dark");
            localStorage.setItem("mode" , "light");
        }
        else {
            document.body.classList.add("dark-mode-variables");
            document.querySelector(".dropdown-menu").classList.add("dropdown-menu-dark");
            localStorage.setItem("mode" , "dark");
        } 
    });
})



createProductHandle();
