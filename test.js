let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name:'Tomato',
        tag: 'tomato',
        price: '15',
        inCart: 0
    },
    {
        name:'Pepper',
        tag: 'ppr',
        price: '15',
        inCart: 0
    },
    {
        name:'Cucumber',
        tag: 'ccbr',
        price: '15',
        inCart: 0
    },
    {
        name:'Corn',
        tag: 'corn',
        price: '15',
        inCart: 0
    },
];

for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers();
    })
    
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }
}

function cartNumbers(){
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

}
onLoadCartNumbers();