"use strict";
(function () {
    var showGalleryImg = document.querySelector(".bottomMenu");
    
    var galleryLink = document.createElement("a");
    var galleryImg = document.createElement("img");
        
    galleryLink.setAttribute("href", "#");
    galleryImg.setAttribute("src", "pics/icon_sm_img.png");
    galleryImg.setAttribute("class", "menuPicGallery");
    
    
    showGalleryImg.appendChild(galleryLink);
    galleryLink.appendChild(galleryImg)
}());