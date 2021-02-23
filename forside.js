  const header = document.querySelector("#section h2");
  //Konstant som har url til vores fotos
  const medieurl = "https://tema7-2253.restdb.io/media/";
  //Konstant  som har api-key
  const myHeaders = {
      'x-apikey': "602f8fa45ad3610fb5bb63c9"
  };

  //sætter at når dokumentet er loaded skal man gå til funktionen start
  document.addEventListener("DOMContentLoaded", start)
  //variabel som hedder værker
  let vaerker;
  //variabel som hedder filter som er lig med "alle"
  let filter = "alle";


  // første funktion der kaldes efter DOM er loaded
  function start() {
      //konstant filterKnapper som er nav knapperne
      const filterKnapper = document.querySelectorAll("nav button");
      //når man trykker på et værk kommer man til funktionen filtrerVærker
      filterKnapper.forEach(knap => knap.addEventListener("click", filtrerVaerker));
      //starter funktionen loadJSON
      loadJSON();
  }


  function filtrerVaerker() {
      //filtrerer udfra lokation
      filter = this.dataset.lokation;

      //vælger div'en valgt og fjerner klassen valgt
      document.querySelector(".valgt").classList.remove("valgt");
      //den man trykker på tilføjes klassen valgt
      this.classList.add("valgt");

      visVaerker();
      header.textContent = this.textContent;
  }

  async function loadJSON() {
      //konstant JSONData skal hente oplysningerne fra restdb
      const JSONData = await fetch("https://tema7-2253.restdb.io/rest/lysfestival", {
          headers: myHeaders
      });
      vaerker = await JSONData.json();
      console.log("vaerker", vaerker);
      //starter funktionen visVaerker
      visVaerker();
  }

  function visVaerker() {
      //konstant dest som er id'et liste på html
      const dest = document.querySelector("#liste");
      //kontant template som er template på html
      const template = document.querySelector("template").content;

      dest.textContent = "";

      //for hvert værk
      vaerker.forEach(vaerker => {
          //hvis filter er lig med den lokation der er trykket på eller hvis filter er lig med alle
          if (filter == vaerker.lokation || filter == "alle") {

              //konstant klon som indsætter indhold fra restdb
              const klon = template.cloneNode(true);

              klon.querySelector(".billede").src = medieurl + vaerker.billede;
              klon.querySelector(".billede").alt = `Billede af ${vaerker.navn}`;
              klon.querySelector(".navn").textContent = vaerker.navn;
              klon.querySelector(".kunstner").textContent = vaerker.kunstner;

              //sætter click eventlistener på .vaerk som skal gå til visDetaljer
              klon.querySelector(".vaerk").addEventListener("click", () => visDetaljer(vaerker));
              //indsætter klonerne på liste
              dest.appendChild(klon);
          }
      })
  }

  function visDetaljer(hvilken) {
      //sætter lokationen til den man har trykket på
      location.href = `singleview.html?id=${hvilken._id}`;
  }
