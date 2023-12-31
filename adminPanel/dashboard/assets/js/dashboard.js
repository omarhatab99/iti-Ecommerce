import { onAuthStateChanged , getAuth , signOut} from "firebase/auth";
import {createCategory, getCategories , getSingleCategoriesById, toggleStatusCategory, updateCategory } from "../../../categories/assets/js/categories";
import { confirmationAlert } from "../../../shared/extensions";
import Swal from "sweetalert2";
import { app} from "../../../../main";
import { deleteProduct, getAllProducts, toggleStatusProduct } from "../../../products/assets/js/product";
import { createUserHandle, getAllUser, getSingleUserById } from "../../../users/assets/js/users";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

//constants
let updated = false;

//handle dashboard methods
const authentication = getAuth(app);
const modelForm = document.getElementById("modalForm");
const userForm = document.getElementById("userForm");
const firestore = getFirestore();



const dashboardHandle = () => {

    //check authentication login
    authenticationLogout();

    //check if user in authentication login.
    onAuthStateChanged(authentication , (user) => {


        if(user){

            //handle loading
            document.querySelector(".overlay-loading").style.display = "none";

            //user
            const documentationReference = doc(firestore , "Users" , user.uid);
            onSnapshot(documentationReference , (snapshot) => {

                const data = snapshot.data();

                document.querySelector(".dropdown").innerHTML = 
                `
                <a class="text-decoration-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="profile-info d-flex justify-content-center align-items-center">
                        <div class="info text-dark px-3">
                            <p class="pb-0 mb-0">Hey, <b>${data.Username}</b></p>
                            <small>${data.Role.toLowerCase()}</small>
                        </div>
                        <div class="profile-photo d-flex align-items-center">
                            <img width="40" height="40" src="${!data.ProfileImage.imageUrl ? '../dashboard/assets/images/avatar.png' : data.ProfileImage.imageUrl}">
                        </div>
                    </div>
                </a>
                <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/adminPanel/users/profile?id=${user.uid}">Profile</a></li>
                <li><a class="dropdown-item" href="/adminPanel/users/changeEmail?id=${user.uid}">Change Email</a></li>
                <li><a class="dropdown-item" href="/adminPanel/users/changePassword?id=${user.uid}">Change Password</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item logout-btn" href="javascript:;">Logout</a></li>
                </ul>
    
                
                `
            });
        }
        else
        {
            location.assign("/adminPanel/authentication/login");
        }
        
    });

    //users
    getAllUser();
    showUsersModal();
    createUser();
    //categories
    getCategories();
    toggleStateCategoryHandle();
    showCategoryModal();
    saveCategoryHandle(modelForm);

    //products
    getAllProducts();
    toggleStateProductHandle();
    deleteProductHandle();

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

            confirmationAlert("Are you sure want toggle this item" , "toggle").then((result) => {
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

//handle products

const toggleStateProductHandle = () => {

    document.addEventListener("click" , (event) => {



        if(event.target.classList.contains("js-toggle-product-btn")) {
            var targetRaw = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement; 

            confirmationAlert("Are you sure want toggle this item" , "toggle").then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Successfully!",
                        text: "Your file has been changed.",
                        icon: "success"
                    }).then(async () => {
                        
                        targetRaw.classList.add("animate__animated" , "animate__shakeX");

                        await toggleStatusProduct(event.target.dataset.id);
                    })
                }
            });

        }

    });

}



const deleteProductHandle = () => {

    document.addEventListener("click" , (event) => {



        if(event.target.classList.contains("js-delete-product-btn")) {
            var targetRaw = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement; 
            confirmationAlert("Are you sure want delete this item" , "delete").then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Successfully!",
                        text: "Your file has been changed.",
                        icon: "success"
                    }).then(async () => {
                        await deleteProduct(event.target.dataset.id);
                    })
                }
            });

        }

    });

}


//handle users
const showUsersModal = () => {

    document.addEventListener("click" , async (event) => {

        if(event.target.classList.contains("js-create-user-btn"))
        {

            const myModal = new bootstrap.Modal(document.getElementById('usersModal'));

            myModal.show();

            document.getElementById("userTitle").textContent = "Create new User";

            document.getElementById("userEmail").value = "";

            document.getElementById("userPassword").value = "";
            
            document.getElementById("validationUserSpan").textContent = "";


            document.getElementById("submitUserBtn").textContent = "Save";

            document.getElementById("submitUserBtn").classList.replace("btn-warning" , "btn-primary");

        }


        
        if(event.target.classList.contains("js-update-user-btn"))
        {

            //get updated object
            const updatedUser = await getSingleUserById(event.target.dataset.id);

            console.log(updatedUser)

            const myModal = new bootstrap.Modal(document.getElementById('usersModal'));

            myModal.show();
            
            document.getElementById("validationUserSpan").textContent = "";


            document.getElementById("userEmail").value = updatedUser.Email;
            document.getElementById("userId").value = event.target.dataset.id;

            document.getElementById("userTitle").textContent = `Edit ${updatedUser.Username} User`;

            document.getElementById("submitUserBtn").textContent = "Edit";

            document.getElementById("submitUserBtn").classList.replace("btn-primary" , "btn-warning");




            userUpdate = true;

        }

    });

}

//handle createUser for create user by admin
const createUser = () => {
    document.getElementById("submitUserBtn").addEventListener("click" , () => {

        createUserHandle(userForm).then((data) => {
            
            if(data.done){
                    document.getElementById("submitUserBtn").classList.remove("disabled");

                    document.getElementById("submitUserBtn").innerHTML = 
                    `
                        Save
        
                    `

                    $('#usersModal').modal('hide');
        
                    userForm.reset();


                }
                
            })
            .catch((data) => {
                document.getElementById("submitUserBtn").classList.remove("disabled");

                document.getElementById("submitUserBtn").innerHTML = 
                `
                    Save
    
                `

                document.getElementById("validationUserSpan").textContent = data.err;

            });

    });
}



dashboardHandle();

