const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// Unsplash API
const initialCount = 6;
const continiousCount = 30;
const apiKey = 'Bf2BMh4hvbY2FOIjDhwqNQ_qa8ilFbTZJxqzGXguDWo';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function newCount(){
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${continiousCount}`;
}

function imageLoaded(){
   
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        newCount()
        
    }
    
};

function displayPhotos(){
    imagesLoaded = 0;
    
    totalImages = photosArray.length;
// Create a for each element for each objects in the the photo array.

photosArray.forEach((photo) => {
//Each object will be  assigned to the "Photos" variable 
    
//1. Create <a> to connect unsplash link
const item = document.createElement('a');
//  connect unsplash link, set attribute
item.setAttribute('href', photo.links.html);
// set attribute to open a new page
item.setAttribute('target', '_blank');
// Create image element
const img = document.createElement("img");
img.setAttribute('src', photo.urls.regular );
img.setAttribute('alt', photo.alt_description );
img.setAttribute('title', photo.alt_description )
//Event listener, check when each has finshed loading.
img.addEventListener('load', imageLoaded);
// Put the <img> inside the <a> tag and the <a> inside the imageContainer
item.appendChild(img);
imageContainer.appendChild(item);

})
}
;
async function getPhotos(){
     try{
        const response = await fetch(apiUrl);
     photosArray = await response.json();
     console.log(photosArray);
     displayPhotos();
     
     }
     catch(error){

     }
}
window.addEventListener('scroll' , ()=>{
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;;
    getPhotos()
   }
})

// On load

getPhotos()