const imagePaths = ["belier", "dembele", "tele", "ukulele", "ble"];
const imageCtnrs = document.querySelectorAll(".images-row > div");
let imagesList = []; 
const levelSection = document.querySelector("#level-section");
let levelNbr;
let imagesAnimationInterval;
let levelsInterval;
// querySelectorAll récupère TOUS les éléments de la page qui correspondent au sélecteur css fourni en paramètre
// ici : toutes les balises <img/> situées dans la div qui a pour classe "images" 
// querySelector fait pareil que querySelectorAll sauf que ça ne récupère que le PREMIER élément
// de la page qui correspond au sélecteur css fourni en paramètre

function setRandomImagePath(img) {
    const randomIndex = Math.floor(Math.random() * imagePaths.length); // formule pour obtenir un nombre aléatoire entre 0 et la longueur du tableau "imagesPath"
    const randomImageName = imagePaths[randomIndex]; // un nom d'image aléatoire dans ce même tableau
    img.src = "./images/level_1/" + randomImageName + ".webp"; // par exemple : "./images/level_1/belier.webp"
    img.alt = randomImageName;
}

function initLevelTopCountDisplay() {
    levelSection.innerHTML = `
        <h2 class="animated-level-appearance"><span id="level-nbr">1</span> / 5</h2>
    `;
    levelNbr = document.querySelector("#level-nbr");
}

function initImagesAnimationForLevel() {
    imageCtnrs.forEach((div, index) => {
        setTimeout(function() {
            const img = document.createElement("img");
            setRandomImagePath(img);
            img.className = "animated-img-appearance";
            div.appendChild(img);
            imagesList.push(img);
        },index*100);
    });
}

function resetDisplay() {
    imageCtnrs.forEach((div, index) => {
        div.innerHTML = "";
    });
    imagesList.splice(0, 8);
    levelSection.innerHTML = "";
}

function createRandomImagesList() {
    imagesList.forEach(img => {
        setRandomImagePath(img);
    });
}

function animate8images(generateNewRandomList, nextLevel) {
    let activeImgIndex = -1; // on initialise l'index de l'image à animer
    imagesAnimationInterval = setInterval(function() {  // le code à l'intérieur de ce bloc s'éxécute toutes les 0.32 secondes          
        const previousImage = imagesList[activeImgIndex]; // on définit l'image dont on veut supprimer la classe "active"
        if(activeImgIndex < 7) { // tant que ça fait moins de 8 fois, on "active" chaque image une par une
            if(previousImage) {
                previousImage.className = ""; // on supprime la classe "active" de l'image précédente, s'il y en a une (si l'index est plus grand que -1)
            }
            activeImgIndex++; // on augmente de 1, l'index de l'image à rendre active
            imagesList[activeImgIndex].className = "active"; // on active donc cette image
        } else {  // si les 8 images ont déjà été activiée l'une après l'autre
            previousImage.className = ""; // on désactive la dernière image de la liste qui avait été avctivée dans l'interval précédent
            if(generateNewRandomList) { // arrivé à la fin du niveau, si ce n'est pas le dernier niveau...
                createRandomImagesList(); // ...on génère unenouvelle liste d'images aléatoires pour le prochain niveau
                levelNbr.innerText = nextLevel; // on update également le numéro du prochain niveau
            }
            if(nextLevel > 5) { // si le dernier niveau a été joué
                stopGame();// alors on fait cesser l'éxécution de ce bloc d'instructions par intervals.
            } else {
                clearInterval(imagesAnimationInterval);
            }
        }
    }, 320);
}

function newGame() {
    createRandomImagesList(); // ...on génère une nouvelle liste d'images aléatoires pour le prochain niveau
    initLevelTopCountDisplay();
    initImagesAnimationForLevel();

    setTimeout(function() { // on ajoute un temps de latence de 150ms avant de lancer la musique
        audioTrack.play();
        // utilisation de la méthode "play" pour jouer le son dans la page
    }, 150);

    let currentLevel = 0; // on initialise le niveau actuel à 0 (il y a 5 niveaux successifs)
    levelsInterval = setInterval(function() { // les 8 images seront animées tour à tour toutes les 5250 millièmes de secondes
        currentLevel++; // à actualise le niveau (de 1 à 5)
        const shouldGenerateNewRandomImagesListForNextLevel = currentLevel < 5; // ce paramètre a un nom très long qui peut servir de commentaire !
        animate8images(shouldGenerateNewRandomImagesListForNextLevel, currentLevel+1); 
        // on exécute le bloc de code qui anime les 8 images que l'on a encapsulé dans une fonction définie plus haut
    }, 5250); // l'interval le plus précis entre les séquences d'animation semble être de 5 secondes 25 centièmes
}

function stopGame() {
    audioTrack.pause();
    audioTrack.currentTime = 0;
    resetDisplay();
    clearInterval(imagesAnimationInterval);
    clearInterval(levelsInterval);
    playBtn.innerText = "Nouvelle partie";
}

const audioTrack = new Audio('./audio/say_the_word_on_beat.mp3');
// création d'un élément Audio

const playBtn = document.querySelector("#play-btn");
// récupération du bouton pour démarrer la partie

playBtn.onclick = function() {
    if(playBtn.innerText === "Jouer" || playBtn.innerText === "Nouvelle partie") {
        playBtn.innerText = "Arrêter";
        newGame();
    } else {
        stopGame();
    }

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