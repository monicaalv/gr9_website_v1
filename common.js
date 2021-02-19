document.querySelector(".icon").addEventListener("click", burgerMenu);

function burgerMenu() {
    var x = document.querySelector("#navigation");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
