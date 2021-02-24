 const urlParams = new URLSearchParams(window.location.search);
 const id = urlParams.get("id");
 /*let longitute = 0;
let lattitute = 0;*/

 //Konstant som har url til vores fotos
 const medieurl = "https://tema7-2253.restdb.io/media/";
 //Konstant  som har api-key
 let vaerker;
 const myHeaders = {

     "x-apikey": "602f8fa45ad3610fb5bb63c9"
 }

 console.log("ID", id);
 document.addEventListener("DOMContentLoaded", loadJSON);

 //konstant JSONData skal hente oplysningerne fra restdb
 async function loadJSON() {
     const JSONData = await fetch(`https://tema7-2253.restdb.io/rest/lysfestival/${id}`, {
         headers: myHeaders
     });
     vaerker = await JSONData.json();
     /* longitute = 12.587376838067657;
 lattitute = 55.67621767537181;*/
     console.log("vaerker", vaerker);
     visVaerker();
 }

 ///linker til DOM///
 function visVaerker() {
     console.log("vis værker");

/*indsætter indhold fra restdb*/
     document.querySelector(".billede").src = medieurl + vaerker.billede;
     document.querySelector(".billede").alt = `Billede af ${vaerker.navn}`;
     document.querySelector(".navn").textContent = vaerker.navn;
     document.querySelector(".kunstner").textContent = vaerker.kunstner;
     /*    document.querySelector(".nationalitet").textContent = vaerker.nationalitet;*/
     document.querySelector(".lokation").textContent = vaerker.lokation;
     document.querySelector(".beskrivelse").textContent = vaerker.beskrivelse;

     //tilbageknap//
     document.querySelector("button").addEventListener("click", tilbageTilForside);


 }




 //map// lånt kode


 // Initialize and add the map
 function initMap() {
     console.log("vis kort");
     // The location of cph
     const cph = {
         lat: 55.685965534649206,
         lng: 12.566129411343242
     };
     // The map, centered at cph
     const map = new google.maps.Map(document.getElementById("googleMap"), {
         zoom: 4,
         center: cph,
     });
     // The marker, positioned at cph
     const marker = new google.maps.Marker({
         position: cph,
         map: map,
     });
 }




 function tilbageTilForside() {
     history.back();
 }
