// Utiliser le mode strict pour appliquer des règles de syntaxe plus strictes
"use strict";

// Déclarer les éléments HTML
const recuperer = document.getElementById("recuperer");  // Input de récupération
const form = document.getElementById("form");            // Formulaire
const ol = document.getElementById("ol");                // Liste ordonnée
const vide = document.getElementById("vide");            // Élément vide

// Restaurer la liste précédente depuis le stockage local, ou une chaîne vide si aucune liste n'est présente
ol.innerHTML = localStorage.getItem("liste") || "";

// Parcourir les spanSupprimer existants et assigner une fonction de suppression à leur événement onclick
const spanSupprimers = document.querySelectorAll(".supprimer");
for (let span of spanSupprimers) {
    span.onclick = () => supprimer(span.parentElement);
}

// Fonction pour la soumission du formulaire
form.onsubmit = (annuler) => {
    annuler.preventDefault();  // Empêcher le comportement par défaut du formulaire

    // Créer un nouvel élément de liste (li) avec le texte saisi dans l'input
    const li = document.createElement("li");
    const valeurSaisie = recuperer.value;
    li.textContent = valeurSaisie;

    // Créer un span "Supprimer" avec une classe "supprimer" et lui assigner une fonction de suppression
    const spanSupprimer = document.createElement("span");
    spanSupprimer.classList.add("supprimer");
    spanSupprimer.textContent = "Supprimer";
    spanSupprimer.style.paddingLeft = "10px";  // Ajout d'une marge interrieur à gauche
    spanSupprimer.style.fontStyle = "normal";
    spanSupprimer.style.color = "red";
    spanSupprimer.style.cursor = "pointer";

    spanSupprimer.addEventListener("click", () => supprimer(li));

    // Ajouter le span "Supprimer" à l'élément li et li à la liste ordonnée ol
    li.appendChild(spanSupprimer);
    ol.appendChild(li);

    // Réinitialiser la valeur de l'input et masquer l'élément vide
    recuperer.value = "";
    vide.style.display = "none";

    // Sauvegarder la liste mise à jour dans le stockage local
    localStorage.setItem("liste", ol.innerHTML);
};

// Fonction pour supprimer un élément de la liste
function supprimer(elementLi) {
    elementLi.remove();  // Supprimer l'élément li de la liste
    vide.style.display = (ol.innerHTML === "") ? "block" : "none";  // Afficher ou masquer l'élément vide en fonction de la présence de la liste
    localStorage.setItem("liste", ol.innerHTML);  // Mettre à jour le stockage local avec la liste modifiée
}
