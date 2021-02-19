 const urlParams = new URLSearchParams(window.location.search);
 const id = urlParams.get("id");

 const medieurl = "https://tema7-2253.restdb.io/rest/media/";
 let vaerker;
 const myHeaders = {

     "x-apikey": "602f8fa45ad3610fb5bb63c9"
 }

 console.log("ID", id);
 document.addEventListener("DOMContentLoaded", loadJSON);

 async function loadJSON() {
     const JSONData = await fetch(`https://tema7-2253.restdb.io/rest/lysfestival/${id}`, {
         headers: myHeaders
     });
     vaerker = await JSONData.json();
     console.log("vaerker", vaerker);
     visVaerker();
 }


 function visVaerker() {
     console.log("vis værker");


     document.querySelector(".billede").src = medieurl + vaerker.billede;
     document.querySelector(".billede").alt = `Billede af ${vaerker.navn}`;
     document.querySelector(".navn").textContent = vaerker.navn;


     document.querySelector("button").addEventListener("click", tilbageTilForside);


 }




 function tilbageTilForside() {
     history.back();
 }
