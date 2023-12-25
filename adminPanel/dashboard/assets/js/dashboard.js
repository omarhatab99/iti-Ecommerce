import { onAuthStateChanged , getAuth , signOut} from "firebase/auth";
import {createCategory, getCategories , getSingleCategoriesById, toggleStatusCategory, updateCategory } from "../../../categories/assets/js/categories";
import { confirmationAlert } from "../../../shared/extensions";
import Swal from "sweetalert2";
import { app } from "../../../../main";

//constants
let updated = false;

//handle dashboard methods
const authentication = getAuth(app);
const modelForm = document.getElementById("modalForm");

const dashboardHandle = () => {

    //check authentication login
    authenticationLogout();

    //check if user in authentication login.
    onAuthStateChanged(authentication , (user) => {

        console.log(user);
        if(user){

            //handle loading
            document.querySelector(".overlay-loading").style.display = "none";

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


    //categories
    getCategories();
    toggleStateCategoryHandle();
    showCategoryModal();
    saveCategoryHandle(modelForm);
}



document.body.onmouseover

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




//handle categories.

const showCategoryModal = () => {

    document.addEventListener("click" , async (event) => {

        if(event.target.classList.contains("js-create-category-btn"))
        {

            document.getElementById("previewImg").src = "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";


            const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));

            myModal.show();

            document.getElementById("exampleModalLabel").textContent = "Create new category";

            document.getElementById("categoryName").value = "";

            document.getElementById("categoryImage").value = "";
            
            document.getElementById("validationSpan").textContent = "";


            document.getElementById("submitBtn").textContent = "Save";

            document.getElementById("submitBtn").classList.replace("btn-warning" , "btn-primary");

            updated = false;

        }


        
        if(event.target.classList.contains("js-update-category-btn"))
        {

            document.getElementById("previewImg").src = "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";

            //get updated object
            const updatedCategory = await getSingleCategoriesById(event.target.dataset.id);


            document.getElementById("previewImg").src = updatedCategory.Image[0].url;


            const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));

            myModal.show();
            
            document.getElementById("validationSpan").textContent = "";


            document.getElementById("categoryName").value = updatedCategory.Name;
            document.getElementById("categoryId").value = event.target.dataset.id;


            document.getElementById("exampleModalLabel").textContent = `Edit ${updatedCategory.Name} category`;

            document.getElementById("submitBtn").textContent = "Edit";

            document.getElementById("submitBtn").classList.replace("btn-primary" , "btn-warning");




            updated = true;

        }




    });

    
}



const saveCategoryHandle = (form) => {
    document.getElementById("submitBtn").addEventListener("click" , async (event) => {



        //check update or create
        if(updated == false) { //create
            console.log("created");

            createCategory(form).then((result) => {


                if(result.done == true)
                {

                    document.getElementById("submitBtn").classList.remove("disabled");
    
                    document.getElementById("submitBtn").innerHTML = 
                    `
        
                        Save
        
                    `

                    $('#exampleModal').modal('hide');
        
                    form.reset();

                }


            })
            .catch((result) => {

                document.getElementById("validationSpan").textContent = result.err;
    
            });
        }
        else
        { //update
            console.log("updated")
            //get categoryId from hidden input.
            const categoryId = document.getElementById("categoryId").value;

            updateCategory(form , categoryId).then((result) => {
    
                if(result.done == true) {

                    document.getElementById("validationSpan").textContent = "";

                    document.getElementById("submitBtn").classList.remove("disabled");
    
                    document.getElementById("submitBtn").innerHTML = 
                    `
        
                        Save
        
                    `

                    $('#exampleModal').modal('hide');
        
                    form.reset();

                    updated = false;

                }
            }
            
        )
        .catch((result) => {

            document.getElementById("validationSpan").textContent = result.err;

        });

        }



    });
}


const toggleStateCategoryHandle = () => {

    document.addEventListener("click" , (event) => {



        if(event.target.classList.contains("js-toggle-category-btn")) {
            var targetRaw = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement; 

            confirmationAlert("Are you sure want toggle this item").then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Successfully!",
                        text: "Your file has been changed.",
                        icon: "success"
                    }).then(async () => {
                        
                        targetRaw.classList.add("animate__animated" , "animate__shakeX");

                        await toggleStatusCategory(event.target.dataset.id);
                    })
                }
            });

        }

    });

}


dashboardHandle();

