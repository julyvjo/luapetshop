// Responsive front-end
const VW_LIMIT = 1400;

let btnInstitucional = document.getElementById("btn-institucional");
let btnCarrera = document.getElementById("btn-carrera");
let btnNovedades = document.getElementById("btn-novedades");
let btnTop = document.getElementById("btn-back-to-top");

window.onload = ()=>{
    AOS.init();
    responsiveSection();
}

window.onresize = responsiveSection;

window.onscroll = function () {
    scrollFunction();
};
  
function scrollFunction() {
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if ((document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) && vw > VW_LIMIT) {
        btnTop.style.display = "block";
    } else {
        btnTop.style.display = "none";
    }
}

btnTop.addEventListener("click", () => {
    document.body.scrollTop = 360;
    document.documentElement.scrollTop = 360;
});

btnInstitucional.addEventListener("click",()=>{
    document.body.scrollTop = 2550;
    document.documentElement.scrollTop = 2550;
});

btnCarrera.addEventListener("click",()=>{
    document.body.scrollTop = 850;
    document.documentElement.scrollTop = 850;
})

btnNovedades.addEventListener("click",()=>{
    document.body.scrollTop = 1920;
    document.documentElement.scrollTop = 1920;
})

function responsiveSection(){
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let sectionCarrera = document.getElementById("section-carrera");
    let sectionProyectos = document.getElementById("section-proyectos");
    let btnsCarrera = document.getElementById("btns-carrera");
    let logo = document.getElementById("logo-institucion");
    let section_img = document.getElementsByClassName("section-img");
    let btn_back_to_top = document.getElementById("btn-back-to-top");

    if(vw < VW_LIMIT){
        btn_back_to_top.style.display = "none";

        logo.style.display = "none";

        sectionCarrera.classList.remove("col-8");
        sectionCarrera.classList.add("col-12");
        
        btnsCarrera.classList.remove("text-start");
        btnsCarrera.classList.add("text-center");
        
        sectionProyectos.classList.remove("col-6");
        sectionProyectos.classList.add("col-12");


        for (var i = 0; i < section_img.length; i++) {
            section_img[i].style.display = "none";
            section_img[i].classList.remove("col-4");
        }
    }
    else{
        if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400){
            btn_back_to_top.style.display = "block";
        }

        logo.style.display = "block";

        sectionCarrera.classList.add("col-8");
        sectionCarrera.classList.remove("col-12");
        
        btnsCarrera.classList.add("text-start");
        btnsCarrera.classList.remove("text-center");
        
        sectionProyectos.classList.add("col-6");
        sectionProyectos.classList.remove("col-12");

        for (var i = 0; i < section_img.length; i++) {
            section_img[i].style.display = "block";
            section_img[i].classList.add("col-4");
        }
    }
}