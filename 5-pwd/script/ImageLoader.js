"Use strict";
var ImageLoader = function () {
    ImageLoader.prototype.getThumbPics();
};

// Ajaxanrop som kommer att returnera JSON-sträng med tumnagelbilder 
ImageLoader.prototype.getThumbPics = function () {
    // Sätter timer på ajaxanropet, en animerad gif-bild visas om anropet 
    //till servern drar ut på tiden
    $(document).ready(function () {
        setTimeout(function () { $('#ajaxloader').show(); }, 300);
        $.ajax({
            url: "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/"
        }).done(function (data) {
            $('#ajaxloader').hide();
            var thumbs = $.parseJSON(data);
            ImageLoader.prototype.renderThumbs(thumbs);
        }).fail(function (jqXHR, textStatus) {
            console.log("Läsfel, status: " + textStatus);
        }); 
    });
};
		
ImageLoader.prototype.renderThumbs = function (thumbs) {
    var thumbDiv, thumb, a, i, contentDiv = document.querySelector(".galleryMain"), size = setSize(thumbs), url;

    for (i = 0; i < thumbs.length; ++i) {
        // Skapar boxar till tumnaglarna    
        thumbDiv = document.createElement("div");
        thumbDiv.className = "thumbdiv";
        thumbDiv.style.width = size.width + "px";
        thumbDiv.style.height = size.height + "px";
        

        url.src = thumbs[i].URL;
    
        // Skapar tumnagelbilder
        thumb = document.createElement("img");
        a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("id", i);
        thumb.src = thumbs[i].thumbURL;
        a.appendChild(thumb);
        thumbDiv.appendChild(a);
        contentDiv.appendChild(thumbDiv);

        setBackground(url.src);
    }
    function setBackground(i) {
        a.onclick=function() {
            document.getElementById("container").style.backgroundImage = 'url('+i+')';
        };
    }

    // Tar fram tumnagelns bredd och höjd
    function setSize(thumbs) {
        var width = 0, height = 0, t;
        
        for (t in thumbs) {
            if (thumbs[t].thumbWidth > width) {
                width = thumbs[t].thumbWidth;
            }
            if (thumbs[t].thumbHeight > height) {
                height = thumbs[t].thumbHeight;
            }
        } return {
            width: width,
            height: height
        };
    }
};