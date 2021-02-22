  const header = document.querySelector("#section h2");
  const medieurl = "https://tema7-2253.restdb.io/media/";
  const myHeaders = {
      'x-apikey': "602f8fa45ad3610fb5bb63c9"
  };

  document.addEventListener("DOMContentLoaded", start)
  let vaerker;
  let filter = "alle";


  // første funktion der kaldes efter DOM er loaded
  function start() {
      const filterKnapper = document.querySelectorAll("nav button");
      filterKnapper.forEach(knap => knap.addEventListener("click", filtrerVaerker));
      loadJSON();
  }


  function filtrerVaerker() {
      filter = this.dataset.lokation;

      document.querySelector(".valgt").classList.remove("valgt");
      this.classList.add("valgt");

      visVaerker();
      header.textContent = this.textContent;
  }

  async function loadJSON() {
      const JSONData = await fetch("https://tema7-2253.restdb.io/rest/lysfestival", {
          headers: myHeaders
      });
      vaerker = await JSONData.json();
      console.log("vaerker", vaerker);
      visVaerker();
  }

  function visVaerker() {
      const dest = document.querySelector("#liste");
      const template = document.querySelector("template").content;

      dest.textContent = "";

      vaerker.forEach(vaerker => {

          if (filter == vaerker.lokation || filter == "alle") {

              const klon = template.cloneNode(true);

              klon.querySelector(".billede").src = medieurl + vaerker.billede;
              klon.querySelector(".billede").alt = `Billede af ${vaerker.navn}`;
              klon.querySelector(".navn").textContent = vaerker.navn;
              klon.querySelector(".kunstner").textContent = vaerker.kunstner;

              klon.querySelector(".vaerk").addEventListener("click", () => visDetaljer(vaerker));

              dest.appendChild(klon);
          }
      })
  }

  function visDetaljer(hvilken) {
      location.href = `singleview.html?id=${hvilken._id}`;
  }
