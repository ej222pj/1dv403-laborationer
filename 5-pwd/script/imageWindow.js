"use strict";
(function () {
    var continer = document.querySelector("#container");
    var showGalleryImg = document.querySelector(".bottomMenu");
    
    var galleryLink = document.createElement("a");
    var galleryImg = document.createElement("img");
    
    galleryLink.setAttribute("href", "#");
    galleryImg.setAttribute("src", "pics/icon_sm_img.png");
    galleryImg.setAttribute("class", "menuPicGallery");
    
    showGalleryImg.appendChild(galleryLink);
    galleryLink.appendChild(galleryImg);
    

    var createGalleryPopup = function (){
            var div0 = document.createElement("div"),
            headerDiv = document.createElement("div"),
            mainDiv = document.createElement("div"),
            footerDiv = document.createElement("div"),
            imgDiv = document.createElement("div"),
            mainLink = document.createElement("a"),
            mainImg = document.createElement("img"),
            p = document.createElement("p"),
            headerInfo = document.createTextNode("Gallery"),
            close = document.createElement("div"),
            closeLink = document.createElement("a"),
            ajaxLoader = document.createElement("img");
            
            close.setAttribute("class", "closeGallery");
            div0.setAttribute("class", "galleryContainer");
            headerDiv.setAttribute("class", "galleryHeader");
            mainDiv.setAttribute("class", "galleryMain");
            footerDiv.setAttribute("class", "galleryFooter");
            imgDiv.setAttribute("class", "headerInfo");
            mainLink.setAttribute("href", "#");
            mainImg.setAttribute("src", "pics/icon_sm_img.png");
            mainImg.setAttribute("class", "galleryHeaderPic");
            closeLink.setAttribute("href", "#");
            close.innerHTML += "X";
            ajaxLoader.setAttribute("id", "ajaxloader");
            ajaxLoader.setAttribute("src", "pics/ajax-loader.gif");
            
            closeLink.appendChild(close);
            p.appendChild(headerInfo);
            mainLink.appendChild(mainImg);
            imgDiv.appendChild(mainLink);
            imgDiv.appendChild(p);
            imgDiv.appendChild(closeLink);
            headerDiv.appendChild(imgDiv);
            footerDiv.appendChild(ajaxLoader);
            div0.appendChild(headerDiv);
            div0.appendChild(mainDiv);
            div0.appendChild(footerDiv);
            continer.appendChild(div0);
            
            closeLink.addEventListener("click", function(e){
            e = e || window.event;
            e.preventDefault();
            
            removeGalleryPopup();
        }, false);
    };

    var removeGalleryPopup = function (){
        var div0 = document.querySelector(".galleryContainer");
        
        continer.removeChild(div0);
        galleryLink.onclick = function(e){
            e = e || window.event;
            e.preventDefault();
        
            createGalleryPopup();
            new ImageLoader();
            galleryLink.setAttribute ("onclick", null);
        };
    };
    /*galleryLink.addEventListener("click", function(e){
        e = e || window.event;
        e.preventDefault();
            
        createGalleryPopup();
        new ImageLoader();
        galleryLink.setAttribute ("onclick", null);
    
    },false);*/
    galleryLink.onclick = function(e){
        e = e || window.event;
        e.preventDefault();
        
        createGalleryPopup();
        new ImageLoader();
        galleryLink.setAttribute ("onclick", null);
        };

}());