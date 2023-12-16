const darkMode = document.querySelectorAll(".dark-mode span");
const sideMenuToggleBtn = document.getElementById("menu");
const sideMenu = document.querySelector("aside");


//check dark mode
if(localStorage.getItem("mode")) {
    if(localStorage.getItem("mode") === "dark")
    {
        document.body.classList.add("dark-mode-variables")
        darkMode.forEach((btn) => btn.classList.remove("active"));
        darkMode[1].classList.add("active");
        document.querySelector(".dropdown-menu").classList.add("dropdown-menu-dark");
    }
}


//change mode color 
darkMode.forEach((btn) => {
    btn.addEventListener("click" , function(){
        darkMode.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        if(this.dataset.mode === "light") {
            document.body.classList.remove("dark-mode-variables");
            document.querySelector(".dropdown-menu").classList.remove("dropdown-menu-dark");
            localStorage.setItem("mode" , "light");
        }
        else {
            document.body.classList.add("dark-mode-variables");
            document.querySelector(".dropdown-menu").classList.add("dropdown-menu-dark");
            localStorage.setItem("mode" , "dark");
        } 
    });
})

//toggle side menu open and collapse
sideMenuToggleBtn.addEventListener("click" , function() {
    sideMenu.classList.toggle("open");
});
