//firstImg.className = "active";
const imagesList = document.querySelectorAll(".images img"); 
// querySelectorAll récupère TOUS les éléments de la page qui correspondent au sélecteur css fourni en paramètre
// ici : toutes les balises <img/> situées dans la div qui a pour classe "images" 
// querySelector fait pareil que querySelectorAll sauf que ça ne récupère que le PREMIER élément
// de la page qui correspond au sélecteur css fourni en paramètre

// let activeImgIndex = -1;
// dans un tableau l'index du premier élément est 0
// console.log(imagesList[1]); // deuxième élément de la liste d'images (son index est 1)
//  function selectNextImgInList() {
//     if(activeImgIndex > -1) { // si c'est la première fois qu'on clique sur le bouton, il n'y a pas d'image précédente dans la liste
//         imagesList[activeImgIndex].className = ""; // on retire la class "active" de l'image précédente 
//     }
//     if(activeImgIndex >= imagesList.length -1) { // si on est arrivé à la dernière image de la liste...
//        activeImgIndex = -1; // ... alors, on repart sur la première image
//     } else {
//         activeImgIndex = activeImgIndex + 1; // sinon, on ajoute +1 a la valeur de l'index de l'image qu'on veut rendre active
//     }
//     imagesList[activeImgIndex].className = "active"; // on ajoute la class "active" à l'image suivante dans la liste
// }

const audioTrack = new Audio('./audio/say_the_word_on_beat.mp3');
// création d'un élément Audio

const playBtn = document.querySelector("#play-btn");
// récupération du bouton pour démarrer la partie

playBtn.onclick = function() {
    audioTrack.play();
    // utilisation de la méthode "play" pour jouer le son dans la page
 
    setTimeout(function() { // setTimeout permet d'éxécuter du code avec un temps de latence : ici, 6000 millisecondes (6 secondes)
        let activeImgIndex = -1; // on initialise l'index de l'image à animer
        const interval = setInterval(function() {  // le code à l'intérieur de ce bloc s'éxécute toutes les 0.32 secondes          
            const previousImage = imagesList[activeImgIndex]; // on définit l'image dont on veut supprimer la classe "active"
            if(activeImgIndex < 7) { // tant que ça fait moins de 8 fois, on "active" chaque image une par une
                if(previousImage) {
                    previousImage.className = ""; // on supprime la classe "active" de l'image précédente, s'il y en a une (si l'index est plus grand que -1)
                }
                activeImgIndex++; // on augmente de 1, l'index de l'image à rendre active
                imagesList[activeImgIndex].className = "active"; // on active donc cette image
            } else {  // si les 8 images ont déjà été activiée l'une après l'autre
                previousImage.className = ""; // on désactive la dernière image de la liste qui avait été avctivée dans l'interval précédent
                clearInterval(interval); // "clearInterval" permet de terminer l'éxécution du code par interval (sinon il s'éxécute à l'infini) 
            }
        }, 320);
    }, 6000);
    
}
// on rattache un évènement "click" au bouton "Jouer" de la page


/********************************* TESTS ***********************************************/

// const nextImgIsActiveBtn = document.querySelector("#next-img-is-active-btn");
// nextImgIsActiveBtn.onclick = selectNextImgInList;
// on rattache un évènement "click" au bouton de la page
// en d'autres termes, chaque fois que ce bouton est cliqué, le code de la fonction nommée "selectNextImgInList" s'éxécute
 

// const getTimingToStart = document.querySelector("#get-timing-to-start");
// récupération du bouton de test qui permettra d'afficher le timing de la musique au moment du click
// getTimingToStart.onclick = function() {
//  console.log(audioTrack.currentTime); //6.5, 11.5, 16.9, 22.2, 22.45
//  on mesure les 5 instants à partir desquels lancer l'animation successive des images
// }