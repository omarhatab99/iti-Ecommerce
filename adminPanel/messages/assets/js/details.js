import { getSingleProductById } from "../../../products/assets/js/product";
import { calculateRating } from "../../../shared/extensions";
import { getSingleMessageById } from "./messages";
import moment from "moment";


let params = new URLSearchParams(location.search);
const id = params.get('id');


const handleMessageDetails = () => {
    displayTargetMessage();
}

//get single product and display it
const displayTargetMessage = async() => {
    const message = await getSingleMessageById(id);
    const product = await getSingleProductById(message.ProductId);

    console.log(product.Images[0].url)

    document.getElementById("profileCoverPreview").src = product.Images[0].url;

    //handle product information
    document.querySelector(".product-name").textContent = product.Name.substring(0 , 15) + "...";
    document.querySelector(".product-category").textContent = product.Category;
    document.querySelector(".product-brand").textContent = product.Brand;
    document.querySelector(".product-category").textContent = product.Color;

        //handle rating stars...
        let numOfStars = calculateRating(parseInt(product.Rating));
        document.querySelector(".rating").innerHTML = "";

        let stars = ""; 
    
        for (let index = 0; index < 5; index++) {
    
            if(numOfStars.numberOfFillStarsFloor != 0) {
                stars += `<img src="/images/Filled_star.png" class="raiting" alt="raiting">`;
                numOfStars.numberOfFillStarsFloor--;
            }
            else
            {
                stars += `<img src="/images/empty_star.png" class="raiting" alt="raiting">`;
            }
        };

    document.querySelector(".rating").innerHTML = stars;

        //handle Quantity value
    document.querySelector(".right-quantity").textContent = product.Quantity;

    //handle createAt time
    document.querySelector(".right-createdAt").textContent = moment(product.CreateAt).format('MMMM Do YYYY, h:mm:ss a');

    //handle last Updated time
    document.querySelector(".right-lastUpdated").textContent = (product.LastUpdatedAt) ? moment(product.LastUpdatedAt).format('MMMM Do YYYY, h:mm:ss a') : "No Updated Yet";
    
    //handle no of purchasing value
    document.querySelector(".right-Purchasing").textContent = product.numberOfPurchasing;
    document.querySelector(".product-price").textContent = product.Price + ".00" + "EPG";


    document.querySelector(".message-content").textContent = message.Message;
    document.querySelector(".customer-username").textContent = message.Username;
    document.querySelector(".customer-email").textContent = message.Email;

    let customerRatingStars = ""; 
    
    for (let index = 0; index < 5; index++) {

        if(message.RatingValue != 0) {
            customerRatingStars += `<img src="/images/Filled_star.png" class="raiting" alt="raiting">`;
            message.RatingValue--;
        }
        else
        {
            customerRatingStars += `<img src="/images/empty_star.png" class="raiting" alt="raiting">`;
        }
    };

    document.querySelector(".customer-rating").innerHTML = customerRatingStars;


    document.querySelector(".message-sended-at").textContent = moment(message.CreatedAt).format('MMMM Do YYYY, h:mm:ss a');


}


handleMessageDetails();