//firstImg.className = "active";
const imagesList = document.querySelectorAll(".images img"); 
// querySelectorAll récupère TOUS les éléments de la page qui correspondent au sélecteur css fourni en paramètre
// ici : toutes les balises <img/> situées dans la div qui a pour classe "images" 
const nextImgIsActiveBtn = document.querySelector("#next-img-is-active-btn");
// querySelector fait pareil que querySelectorAll sauf que ça ne récupère que le PREMIER élément
// de la page qui correspond au sélecteur css fourni en paramètre
let activeImgIndex = -1;
// dans un tableau l'index du premier élément est 0
// console.log(imagesList[1]); // deuxième élément de la liste d'images (son index est 1).

 function selectNextImgInList() {
    if(activeImgIndex > -1) { // si c'est la première fois qu'on clique sur le bouton, il n'y a pas d'image précédente dans la liste
        imagesList[activeImgIndex].className = ""; // on retire la class "active" de l'image précédente 
    }
    if(activeImgIndex >= imagesList.length -1) { // si on est arrivé à la dernière image de la liste...
        activeImgIndex = 0;// ... alors, on repart sur la première image
    } else {
        activeImgIndex = activeImgIndex + 1; // sinon, on ajoute +1 a la valeur de l'index de l'image qu'on veut rendre active
    }
    imagesList[activeImgIndex].className = "active"; // on ajoute la class "active" à l'image suivante dans la liste
}
// nextImgIsActiveBtn.onclick = selectNextImgInList;
// on rattache un évènement "click" au bouton de la page
// en d'autres termes, chaque fois que ce bouton est cliqué, le code de la fonction nommée "selectNextImgInList" s'éxécute
 

const interval = setInterval(function() {
    selectNextImgInList(); // le code de la fonction selectNextImgInList est éxécuté toutes les 400 millisecondes (0.4secondes) 
}, 400);

const audioTrack = new Audio('./audio/say_the_word_on_beat.mp3');
// création d'un élément Audio
audioTrack.play();
// utilisation de la méthode "play" pour jouer le son dans la page
 