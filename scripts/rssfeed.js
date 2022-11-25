const RSS_URL = `https://anchor.fm/s/bc823c98/podcast/rss`;


function loadRSS(url){
    fetch(url)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => { 
        const items = data.querySelectorAll("item");
        let html = ``;
       var i=0;
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
            
            i+=1;
            html += `
            <div class="avsnitt content postcontent" id="avsnitt`+i+`" style='background-color:#121212; '>
            
       
           <div style='width:100%; float:left; background-color:#121212; border-radius:12px;'>
           <div class=closebutton style='position:fixed; top:10px; right:15px; border-radius:25px; width:25px;height:25px; font-weight:bold; padding-top:1px; padding-left:7px; background-color:red' id=closebutton`+i+` onclick=closeepisodeinfo(`+i+`)>
           X
           </div>
           <h2 style='text-align:center'>Poddavsnitt: S`+rdyseason+`E`+rdyepisode+`</h2> 
            <div class=poddimage style='text-align:center;'>
            <img style='border-radius:12px;height:200px !important;width:200px !important' src='`+rdyimage+`' >
           </div>
           <div class='poddnewsright'>
           <div class=poddimagemobil style='text-align:center;'>
           <img style='border-radius:12px;height:200px !important;width:200px !important' src='`+rdyimage+`' >
          </div>
           <h3 style='color:white; padding-right:25px; padding-left:25px;'>`+title+`</h3>
           <br>    
           <audio controls>
           <source src="`+rdylink+`" type="audio/mpeg">
           </audio>

           </div>
           </div>

           <div class="showepisodeinfomobile" id=showepisodebutton`+i+`  onclick=showavsnitt(`+i+`)>
            Visa avsnittsbeskrivning
           </div>
           
           <div class=description id=description`+i+` style='float:left; width:100%; padding:20px;'>
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

function showavsnitt(i) {
document.getElementById("avsnitt"+i).classList.add("shownews")
document.getElementById("closebutton"+i).style.display="block"

document.getElementById("description"+i).style.display="block"
document.getElementById("showepisodebutton"+i).style.display="none"



}


function closeepisodeinfo(i){
    document.getElementById("avsnitt"+i).classList.remove("shownews")
document.getElementById("closebutton"+i).style.display="none"

document.getElementById("description"+i).style.display="none"
document.getElementById("showepisodebutton"+i).style.display="block"




}

document.addEventListener("DOMContentLoaded", function(event){
    loadRSS(RSS_URL)
});


/* <iframe src="https://anchor.fm/framtidensbolag/embed/episodes/7---Tnk-stort-och-stt-en-timer-e1r4ijk/a-a8tkr4q" 
height="102px" width="400px" frameborder="0" scrolling="no"></iframe> */