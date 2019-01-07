const hello = document.getElementById("destination");

function greeting() {
  alert("HONG KONG!");
  destination.textContent = "";
}

hello.addEventListener("click",greeting);

"use strict";

(function(){
  let xhr = new XMLHttpRequest();

  let queryBox = document.getElementById("wikiQuery");
  let searchForm = document.getElementById("searchForm");
  let demoJSON = document.getElementById("demo");

  // constructs the base for the request url
  let baseURL = "https://en.wikipedia.org/w/api.php? \
                format=json& \
                action=query& \
                generator=search& \
                gsrnamespace=0& \
                gsrlimit=10& \
                prop=info|extracts|langlinks|pageimages& \
                inprop=url& \
                exintro& \
                explaintext& \
                exsentences=1& \
                exlimit=max& \
                llprop=url& \
                lllimit=max& \
                piprop=thumbnail|name& \
                origin=*& \
                gsrsearch=";


  function gatherData(data) {
    let theData = "";
    let langLinks = "";
    let img = "<img>";
    const languages = ["en", "de", "zh", "fr", "es", "ja", "ar", "ko", "el"];
    let k;
    let key;
    for(key in data.query.pages) {
      let tmp = data.query.pages[key];
      if (tmp.thumbnail) {
        img = `<img src="${tmp.thumbnail.source}" alt="${tmp.title}"> `;
      }
      let title = `<strong><a href="${tmp.fullurl}">${tmp.title}</a></strong>`;
      let extract = `<span class="txt">${tmp.extract}</span>`;
      let langLinks = "";
      for (k in tmp.langlinks) {
        if (languages.includes(tmp.langlinks[k].lang)) {
          langLinks += `<a href=${tmp.langlinks[k].url}>${tmp.langlinks[k].lang}</a> `;
        }
      }
      theData += `<li>${img} ${title} ${extract} <span class="langs">${langLinks}</span></li>`;
    }
    demoJSON.innerHTML = theData;
  }
  searchForm.addEventListener("submit", function(ev){
    let wiki = baseURL + queryBox.value;
    xhr.open("GET", wiki, true);
    xhr.setRequestHeader('Api-User-Agent', 'Example/1.0');
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        gatherData(response);
      }
    };
    queryBox.value = "";
    ev.preventDefault();
  }, false);

}());
