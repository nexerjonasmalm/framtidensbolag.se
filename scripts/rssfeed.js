const RSS_URL = `https://anchor.fm/s/bc823c98/podcast/rss`;


function loadRSS(url){
    fetch(url)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => { 
        const items = data.querySelectorAll("item");
        let html = ``;
      
        items.forEach(el => {
            const link = el.querySelectorAll("enclosure");
            var rdylink =link[0].getAttribute("url");
            const image = el.querySelectorAll("image");
            var rdyimage = image[0].getAttribute("href");
            var title= el.querySelector("title").innerHTML;
            title = title.replace("<![CDATA[", "").replace("]]>", "");
            var description= el.querySelector("description").innerHTML;
            description = description.replace("<![CDATA[", "").replace("]]>", "");
            
            const season = el.querySelectorAll("season");
            var rdyseason = season[0].innerHTML;
            const episode = el.querySelectorAll("episode");
            var rdyepisode = episode[0].innerHTML;
            
        
            html += `
            <div class="avsnitt content postcontent" style=''>
            
        <h2>Poddavsnitt: S`+rdyseason+`E`+rdyepisode+`</h2> 
           <div style='width:100%; padding:15px; float:left; background-color:#121212; border-radius:25px;'>
            <div class=poddimage>
            <img style='border-radius:25px;height:200px !important;width:200px !important' src='`+rdyimage+`' >
           </div>
           <div class='poddnewsright'>
           <div class=poddimagemobil style='text-align:center;'>
           <img style='border-radius:25px;height:200px !important;width:200px !important' src='`+rdyimage+`' >
          </div>
           <h3 style='color:white;'>`+title+`</h3>
           <br>    
           <audio controls>
           <source src="`+rdylink+`" type="audio/mpeg">
           </audio>
           </div>
           </div>
           
           <div style='float:left; width:100%; padding:20px;'>
           `+
           description
            +`
           
            </div>
            </div>
          ` 
           
        });
       // console.log(html)

        document.getElementById("rss").innerHTML=html
    });
 
    

}

document.addEventListener("DOMContentLoaded", function(event){
    loadRSS(RSS_URL)
});


/* <iframe src="https://anchor.fm/framtidensbolag/embed/episodes/7---Tnk-stort-och-stt-en-timer-e1r4ijk/a-a8tkr4q" 
height="102px" width="400px" frameborder="0" scrolling="no"></iframe> */