
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPsUITtXpxpKjDGloq_mq7yuLBKE2CQFA",
    authDomain: "coding---jsi07---4.firebaseapp.com",
    databaseURL: "https://coding---jsi07---4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "coding---jsi07---4",
    storageBucket: "coding---jsi07---4.firebasestorage.app",
    messagingSenderId: "913704979992",
    appId: "1:913704979992:web:fbe63a35d1ab0b6198fd6d",
    measurementId: "G-FTYC1561YV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

var products = []

function readData() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `products_list`)).then((data) => {
        if (data.exists()) {
            products = data.val()

            var divProducts = document.getElementById("products")

            for (let index = 0; index < products.length; index++) {
                var div = document.createElement("div")
                // Thuộc tính read-only từ danh sách class của var
                div.classList.add("card")

                var div1 = document.createElement("div")
                div1.classList.add("image-container")
                var img = document.createElement("img")
                // Sửa đổi giá trị của thuộc tính
                img.setAttribute("src", products[index].image)
                div1.appendChild(img)

                var div2 = document.createElement("div")
                div2.classList.add("container")
                var h5 = document.createElement("h5")
                h5.classList.add("products-name")
                // Hiện lên HTML  
                h5.innerHTML = products[index].name
                var h6 = document.createElement("h6")
                h6.innerHTML = "Price: " + products[index].price

                var btn = document.createElement("button")
                btn.setAttribute("value", index)
                btn.setAttribute("onclick", `addToCart(${index})`)
                btn.innerHTML = "Add to cart"

                div2.appendChild(h5)
                div2.appendChild(h6)
                div2.appendChild(btn)

                div.appendChild(div1)
                div.appendChild(div2)
                divProducts.appendChild(div)

            }
            // console.log(data.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

readData()

var btnSearch = document.getElementById("btnSearch")
btnSearch.addEventListener("click", ()=> {
    var infoSearch = document.getElementById("infoSearch").value
    var arrSearch = [] 
    // arrSearch = products.filter(el => infoSearch.indexOf(el.name));

    for (let index = 0; index < products.length; index++) 
    {
        console.log("Roast".trim().indexOf(`Roast `.trim()))
        if (products[index].name.trim().indexOf(infoSearch.trim()) > -1) {
            arrSearch.push(products[index])
        }
    }

    if (arrSearch.length == 0){
        // hien thi khong co san pham
    }

   var divProducts = document.getElementById("products")
    divProducts.innerHTML = ""

    for (let index = 0; index < arrSearch.length; index++) {
        console.log(arrSearch[index])

        var div = document.createElement("div")
        // Thuộc tính read-only từ danh sách class của var
        div.classList.add("card")

        var div1 = document.createElement("div")
        div1.classList.add("image-container")
        var img = document.createElement("img")
        // Sửa đổi giá trị của thuộc tính
        img.setAttribute("src", arrSearch[index].image)
        div1.appendChild(img)

        var div2 = document.createElement("div")
        div2.classList.add("container")
        var h5 = document.createElement("h5")
        h5.classList.add("products-name")
        // Hiện lên HTML  
        h5.innerHTML = arrSearch[index].name
        var h6 = document.createElement("h6")
        h6.innerHTML = "Price: " + arrSearch[index].price

        var btn = document.createElement("button")
        btn.setAttribute("value", index)
        btn.setAttribute("onclick", `addToCart(${index})`)
        btn.innerHTML = "Add to cart"

        div2.appendChild(h5)
        div2.appendChild(h6)
        div2.appendChild(btn)

        div.appendChild(div1)
        div.appendChild(div2)
        divProducts.appendChild(div)

    }
})


// let products =
//     [
//         {
//             name: "Espresso Roast Whole Bean",
//             price: "$16.0",
//             image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQhzj9WQPpnQYv9XoIBmpC9a2Lae7Ki2djlZub9tXz1wkC5vDx1mOddaHegHEyxHRIWTPfTlFLL11muo4Aw0YsrvP3YgtDBq0Q16maYjMdG&usqp=CAE"
//         },

//         {
//             name: "Pike Place Medium Roast",
//             price: "$18.0",
//             image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSbXy5mzbfWEQu-O1W1UJPPXWbryN4V_G9iwuxYJdmLayCkMCOp7_JgsTmAJJMSlZWUl_E_diFcAK_FXDeIfAPNHSSV4ggnXstxOQOTKPM&usqp=CAE"
//         },

//         {
//             name: "Varanda Ground Coffee",
//             price: "$22.0",
//             image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTEBcMk40lcinwKe8QYWxZPKGjMU92cUJBUCX2yLpkoK6Qdd66Ai20cq7gDGzXB4TDzF9BUMT7jK1opRUbzb4i9m5V4rvyIi-mxtaoQOtozEPq9wuDuvpk0Pw&usqp=CAE"
//         },

//         {
//             name: "Mocha Chilled Coffee Drink",
//             price: "$6.0",
//             image: "https://www.allrecipes.com/thmb/fMIOjYoPQ3mer9TT6A9iOdyVWzg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4557977-a0564bd3b3f347549eb579002e81726c.jpg"
//         },

//         {
//             name: "Select Arabica M'JA",
//             price: "$15.0",
//             image: "https://cdn.statically.io/img/salt.tikicdn.com/f=auto,q=100,w=320,h=320/cache/550x550/ts/product/9c/28/07/1e0c75c1f032672c6fe8b7836815e38a.jpg"
//         },

//         {
//             name: "Nescafe Red Cup Instant",
//             price: "$16.0",
//             image: "https://www.luluhypermarket.com/medias/sys_master/images/images/h48/h42/9122499624990/Nescafe-Red-Mug-Instant-Coffee-200g-938-000001.jpg"
//         },

//         {
//             name: "Organic Coffee Shampoo",
//             price: "$20.0",
//             image: "https://medias.watsons.com.my/publishing/WTCMY-71384-front-thumbnail.jpg?version=1718368810"
//         },

//         {
//             name: "Glace Coffee Espresso",
//             price: "$3.0",
//             image: "https://png.pngtree.com/png-vector/20240130/ourlarge/pngtree-glace-coffee-drinks-espresso-plus-ice-cream-on-top-png-image_11519122.png"
//         },

//         {
//             name: "Caramel Frappuccino",
//             price: "$3.5",
//             image: "https://cdnimg.webstaurantstore.com/images/products/large/498941/1879170.jpg"
//         },

//         {
//             name: "Homemade Caffe Latte",
//             price: "$2.5",
//             image: "https://cdn7.kiwilimonrecipes.com/recetaimagen/36986/640x640/46349.jpg.webp"
//         },

//         {
//             name: "Homemade Macchiato",
//             price: "$3.0",
//             image: "https://cdn7.kiwilimon.com/recetaimagen/36988/640x640/46353.jpg.webp"
//         },

//         {
//             name: "Coffee Ice Cream Frappe",
//             price: "$3.0",
//             image: "https://www.thehungrybites.com/wp-content/uploads/2023/06/coffee-ice-cream-frappe-frappuccino-feat-500x500.jpg"
//         },
//     ]

// function SaveData() {
//     const db = getDatabase();
//     set(ref(db, 'products_list'), products);
// }

// SaveData()