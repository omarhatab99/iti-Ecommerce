import {collection , addDoc , onSnapshot, Timestamp , doc , deleteDoc , getDoc, updateDoc} from 'firebase/firestore';
import {getDataForm , setDataForm , confirmMessage} from './extensions.js';
import moment from 'moment/moment.js';


const productForm = document.getElementById("productForm");


export const productsHandle = (firestore) => {

    const collectionReference = collection(firestore , "Products");
    
    createProduct(collectionReference);
    updateProduct(firestore);
    deleteProduct(firestore);

    //fire when Products collection state changed (observation).
    onSnapshot(collectionReference , (snapshot) => {

        const products = [];

        snapshot.docs.forEach((doc) => {

            let productObject = {...doc.data() , id: doc.id};
            products.push(productObject);

        });



        getProducts(products);

        
    });

}

const createProduct = (collectionReference) => {

    document.getElementById("productBtn").addEventListener("click" , async function(event) {

        event.preventDefault();

        const productObject = getDataForm(productForm);

        console.log(productObject);

        try {
            await addDoc(collectionReference , productObject);
        }
        catch(error) {

            console.log(error);

        }

    });

}

const getProducts = (data) => {

    document.getElementById("products").innerHTML = "";

    let productsCartona = "";

    data.forEach((element) => {
        productsCartona += 
        `
        <div class="col-md-4 col-lg-3 col-6">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${element.ProductName}</h6>
                    <p class="card-text">${element.Category}</p>
                    <p class="card-text">${moment(element.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <p class="card-text">${moment(element.lastUpdatedAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <div class="card-text">${element.description}</div>
                    <div class="actions">
                        <button class="btn btn-danger deleteProduct btn-sm"  data-id=${element.id}>Delete</button>
                        <button class="btn btn-warning updateProduct btn-sm"  data-id=${element.id}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
        
        `
    });


    document.getElementById("products").innerHTML = productsCartona;

}


const deleteProduct = (firestore) => {

    document.addEventListener("click" , async function(event) {

        if(event.target.classList.contains("deleteProduct")){
            const productId = event.target.dataset.id;
            const productDocumentReference = doc(firestore , "Products" , productId);


            try {

                confirmMessage("are you sure you want delete this product..!!")
                .then(async (resolvedData) => {
                    if(resolvedData.isConfirmed) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your record has been deleted.",
                            icon: "success"
                        });

                        await deleteDoc(productDocumentReference);

                    }
                });
            }
            catch(error) {
    
                console.log(error);
    
            }

        }




    });

}


const updateProduct = (firestore) => {

    let productId = "";

    document.addEventListener("click" , async function(event){
        if(event.target.classList.contains("updateProduct")) {
            
            productId = event.target.dataset.id;
            const productDocumentReference = doc(firestore , "Products" , productId);

            const productObject = await getDoc(productDocumentReference);
            const productObjectData = productObject.data(); 

            console.log(productObjectData);

            setDataForm(productForm , productObjectData);

        }

        if(event.target.classList.contains("edit-Btn")) {

            const updatedProduct = getDataForm(productForm);
            updatedProduct.lastUpdatedAt = `${new Date()}`;

            const productDocumentReference = doc(firestore , "Products" , productId);

            try {
                await updateDoc(productDocumentReference , updatedProduct);
            }
            catch(error) {
                console.log(error)
            }

        }
    }) ;

}

