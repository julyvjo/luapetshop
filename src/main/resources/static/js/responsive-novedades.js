const VW_LIMIT = 1000;

window.onload = responsiveSection;
window.onresize = responsiveSection;

function responsiveSection(){
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let desc_novedad = document.getElementsByClassName("desc-novedad");
    let img_novedad = document.getElementsByClassName("img-novedad");
    let titulo_novedad = document.getElementsByClassName("titulo-novedad");

    if(vw < VW_LIMIT){

        console.log(desc_novedad)

        for (let i = 0; i < desc_novedad.length; i++) {
            desc_novedad[i].style.display = "none";
            desc_novedad[i].classList.remove("col-8");
        }

        for (let i = 0; i < titulo_novedad.length; i++) {
            titulo_novedad[i].style.display = "block";
        }

        for (let i = 0; i < img_novedad.length; i++) {
            img_novedad[i].classList.remove("col-4");
            img_novedad[i].classList.add("col-12");
            img_novedad[i].classList.add("responsive-novedad");
        }
    }
    else{

        for (let i = 0; i < img_novedad.length; i++) {
            img_novedad[i].classList.add("col-4");
            img_novedad[i].classList.remove("col-12");
            img_novedad[i].classList.remove("responsive-novedad");
        }

        for (let i = 0; i < desc_novedad.length; i++) {
            desc_novedad[i].style.display = "block";
            desc_novedad[i].classList.add("col-8");
        }

        for (let i = 0; i < titulo_novedad.length; i++) {
            titulo_novedad[i].style.display = "none";
        }

    }
}