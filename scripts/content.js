
// afficher une case a cocher si je veux l'envoyer sur freebox server
window.onload = () => {
    const buttonDownload = document.querySelector('#dl center');
    let newCheckbox = document.createElement("input");
    let newLabel = document.createElement("label");
    let newDiv = document.createElement("div");

    newDiv.appendChild(newLabel)
    newDiv.appendChild(newCheckbox)

    newCheckbox.type = "checkbox"
    newCheckbox.name = "freebox"
    newCheckbox.id = "freebox"

    newLabel.setAttribute("for", "freebox");
    newLabel.textContent = "Ajouter à ma freebox"

    buttonDownload.appendChild(newDiv)

}