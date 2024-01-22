import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { getSingleProductById } from "../../../products/assets/js/product";
import { firestore } from "../../../../main";

const collectionReference = collection(firestore , "Reviews");


//handle messages review


//get all messages from firebase
export const getMessages = () => {

    //const productDocumentReference = doc(firestore , "messages");

    onSnapshot(collectionReference , (snapshot) => {

        const messages = [];

        snapshot.docs.forEach((doc) => {

            messages.push({id: doc.id , ...doc.data()});

        });


        document.querySelector(".message-count").innerHTML = messages.length;

        //any request get all messages and clear dataTable and add each messages to dataTable.

        const AvailableMessages = messages.filter((message) => {return message.Status});
        generateMessagesDatatable(AvailableMessages);

    });

}


//setup messages in Datatables
const generateMessagesDatatable = (messages) => {

    
    document.getElementById("reviewsDataContainer").innerHTML = "";


    $(".datatables-reviews-basic").DataTable().clear().draw();

    messages.forEach(async(message) => {
        
        const product = await getSingleProductById(message.ProductId); 

        const messageObj = {...message , Product:product };

        console.log(messageObj);

        $(".datatables-reviews-basic").DataTable().row.add(messageObj).draw();
        
    });

}

//get single mesasge by id
export const getSingleMessageById = async (id) => {
    const documentationReference = doc(firestore , "Reviews" , id);

    const documentSnapshot = await getDoc(documentationReference);

    const message = {...documentSnapshot.data()}

    return message;
}