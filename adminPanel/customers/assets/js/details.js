import { getSingleCustomerById } from "./customers";
import moment from 'moment';


let params = new URLSearchParams(location.search);
const id = params.get('id');


const detailsCustomerHandle = () => {
    displayCustomerDetails();
}


const displayCustomerDetails = async () => {

    const customer = await getSingleCustomerById(id);


if(customer.ProfileImage.imageUrl)
    {
        document.querySelector(".card-img img").src = customer.ProfileImage[0].url;
    }
    else
    {
        document.querySelector(".card-img img").src = "assets/images/avatar.png";
    }

    document.querySelector(".profile-username").textContent = customer.Username;

    document.querySelector(".right-username").textContent = customer.Username;
    document.querySelector(".right-email").textContent = customer.Email;

    document.querySelector(".right-createdAt").textContent = moment(customer.CreateAt).format('MMMM Do YYYY');
    
    if(customer.LastUpdatedAt){
        document.querySelector(".right-lastUpdated").textContent = moment(customer.LastUpdatedAt).format('MMMM Do YYYY');
    }
    else
    {
        document.querySelector(".right-lastUpdated").textContent = "no update yet";
    }

    document.querySelector(".right-role").textContent = customer.Role;



    let totalSum = 0;
    customer.HistorySales.forEach((salesItem) => {
        if(salesItem.HasDiscount) {
            totalSum += getPriceAfterDiscount(salesItem.Price , salesItem.DiscountVal) * parseInt(salesItem.quantityOrder);
        }
        else
        {
            totalSum +=  parseInt(salesItem.Price) * parseInt(salesItem.quantityOrder);
        }
    });

    totalSum = Math.round(totalSum);
    document.querySelector(".right-Payment").textContent = totalSum+".00"+"EPG";

    let historySalesCartona = "";

    
    //handle history Sales Table
    customer.HistorySales.forEach(salesItem => {
        

        historySalesCartona += `
        

        <tr>
            <td>
                <a href="/ecommerce/productDetails/productDetails?id=${salesItem.id}" title=${salesItem.Name}>${salesItem.Name.substring(0 , 30)}</a>
            </td>
            <td>${salesItem.Price}.00EPG</td>
            <td>
                <span class="item-number">${salesItem.quantityOrder}</span>
            </td>
            <td>
                <span class="sum-total">
                    ${salesItem.HasDiscount ? getPriceAfterDiscount(salesItem.Price , salesItem.DiscountVal) * parseInt(salesItem.quantityOrder) : parseInt(salesItem.Price) * parseInt(salesItem.quantityOrder)}.00EPG
                </span>
            </td>
        </tr>


        `



    });

    document.querySelector(".hsitorySales-container").innerHTML =  historySalesCartona;


}

//handle price after discount
const getPriceAfterDiscount = (productPrice , disValue) => {
    let discountValue = parseInt(disValue);
    let discountValuePercentage = (discountValue / 100);
    let discountValueAfterSale = (discountValuePercentage * productPrice);
    let currentPriceAfterDiscount = (productPrice - discountValueAfterSale);
    productPrice = currentPriceAfterDiscount;
    return productPrice;
}



detailsCustomerHandle();