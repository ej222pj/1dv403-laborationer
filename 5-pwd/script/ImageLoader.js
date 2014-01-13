"Use strict";
var ImageLoader = function () {
    getpicsFromServer();
};

// Ajaxanrop som kommer att returnera JSON-sträng med info 
var getpicsFromServer = function () {
    // Sätter timer på ajaxanropet, en animerad gif-bild visas om anropet till servern drar ut på tiden
    $(document).ready(function () {
        var removeTimeout = setTimeout(function () { $('#ajaxloader').show(); }, 300);//Sätter timern efter 300Ms
        $.ajax({//Skickar urlen
            url: "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/"
        }).done(function (data) {
            clearTimeout(removeTimeout);//Tar bort timouten om laddningen går snabbare
            $('#ajaxloader').hide();//Gömmer laddningsgifen när anropet är klart
            var info = $.parseJSON(data); //Tar JSON strängen och "översätter" den till JavaScript kod
            renderPics(info);
        }).fail(function (jqXHR, textStatus) {
            console.log("Läsfel, status: " + textStatus);
        }); 
    });
};
		
var renderPics = function (info) {
    var thumbDiv, thumb, a, i, contentDiv = document.querySelector(".galleryMain"), size = setSize(info), url;

    for (i = 0; i < info.length; ++i) {
        // Skapar boxar till tumnaglarna    
        thumbDiv = document.createElement("div");
        thumbDiv.className = "thumbdiv";
        thumbDiv.style.width = size.width + "px";
        thumbDiv.style.height = size.height + "px";
        
        url = document.createElement("img");
        url.src = info[i].URL;
    
        // Skapar tumnagelbilder
        thumb = document.createElement("img");
        a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("id", i);
        thumb.src = info[i].thumbURL;
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