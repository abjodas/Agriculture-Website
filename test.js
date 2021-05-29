

let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name:'Tomato',
        tag: 'tomato',
        price: '18',
        inCart: 0
    },
    {
        name:'Pepper',
        tag: 'ppr',
        price: '17',
        inCart: 0
    },
    {
        name:'Cucumber',
        tag: 'ccbr',
        price: '16',
        inCart: 0
    },
    {
        name:'Corn',
        tag: 'corn',
        price: '20',
        inCart: 0
    },
];

for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
    
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector('.cart span').textContent=productNumbers+1;
    }
    else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent= 1;

    }
    setItems(product);

}
function setItems(product){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if(cartItems != null)
    {
        if(cartItems[product.tag]==undefined)
        {
            cartItems={
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart+=1;
    }
    else{
        product.inCart = 1;
    
        cartItems = {
            [product.tag]:product
        }
    }
    
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product){
    console.log("product price is",product.price);
    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);
    if(cartCost){
        localStorage.setItem("totalCost", cartCost + parseInt(product.price));
    }
    else{
        localStorage.setItem("totalCost",parseInt(product.price));
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem("totalCost");
    let productContainer = document.querySelector(".products");
    console.log(cartItems);
    if(cartItems && productContainer )
    {
         
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            if(item.inCart>0){
            productContainer.innerHTML += `
            <div class="product product-${item.name}">
                <div class="close-${item.name}"><ion-icon name="close-circle"></ion-icon></div>
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price product-${item.name}">$${item.price}.00</div>
            <div class="quantity product-${item.name}">
                <div class="icon-${item.name}-left"><ion-icon name="arrow-dropleft-circle"></ion-icon></div>
                <span>${item.inCart}</span><div class="icon-${item.name}-right"><ion-icon name="arrow-dropright-circle"></ion-icon></div>
            </div>
            <div class="total product-${item.name}">
            $${item.inCart*item.price}.00
            </div>  
            `
            }
            
        });
        productContainer.innerHTML+=`   
            <div class="basketTotalContainer">
            <span class="basketTotalTitle">Basket Total</span>
            <span class="basketTotal">
            $${cartCost}.00
            </span>
            </div>
            `;
    }
}


function changeCartNumber(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem("totalCost");
    
    let productContainer = document.querySelector(".products");
    if(cartItems && productContainer)
    {
        let closeButtons = document.querySelectorAll(".product .close-Tomato");
        let cartArrows = document.querySelectorAll(".quantity .icon-Tomato-right");
        console.log(cartArrows[0])
        cartArrows[0].addEventListener('click',()=>{
            changeInCart();
            cartItems = localStorage.getItem("productsInCart");
            cartItems = JSON.parse(cartItems);
            let obj2 = document.querySelectorAll(".total.product-Tomato");
            obj2[0].innerHTML = `$${cartItems['tomato'].inCart*cartItems['tomato'].price}.00`;
            let abc= document.querySelectorAll(".quantity.product-Tomato span");
            abc[0].innerHTML = cartItems['tomato'].inCart
            
        })
        closeButtons[0].addEventListener('click',()=>{
            let obj=document.querySelectorAll(".product-Tomato");
            for(i=0;i<4;i++)
            {
                obj[i].remove();
            }
            
            console.log("removed");
            let inCartItems = cartItems['tomato'].inCart;
            let cartItemsPres = localStorage.getItem("cartNumbers");
            localStorage.setItem("cartNumbers",cartItemsPres-inCartItems);
            onLoadCartNumbers();
            cartItems['tomato'].inCart=0;
            localStorage.setItem("productsInCart", JSON.stringify(cartItems));

        })
    }
}
function changeInCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let prevCart = cartItems['tomato'].inCart;
    cartItems['tomato'].inCart+=1;
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    let inCartItems = cartItems['tomato'].inCart;
    let cartItemsPres = parseInt(localStorage.getItem("cartNumbers"));
    let number = inCartItems - prevCart;
    localStorage.setItem("cartNumbers",number+cartItemsPres);
    document.querySelector(".cart span").textContent = number+cartItemsPres;
}
onLoadCartNumbers();
displayCart();
changeCartNumber();