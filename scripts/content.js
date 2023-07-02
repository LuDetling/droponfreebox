const getData = async () => {
    try {
        const response = await fetch("mafreebox.freebox.fr/api/v8/login/authorize/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: "POST"
        });
    console.log(response);

    } catch (error) {
        console.log("il y a une erreure : " + error);
    }
}

getData()
// afficher une case a cocher si je veux l'envoyer sur freebox server
window.onload = () => {
    const buttonDownload = document.querySelector('#dl center');
    const newCheckbox = document.createElement("input");
    const newLabel = document.createElement("label");
    const newDiv = document.createElement("div");

    newDiv.appendChild(newLabel);
    newDiv.appendChild(newCheckbox);

    newCheckbox.type = "checkbox";
    newCheckbox.name = "freebox";
    newCheckbox.id = "freebox";

    newLabel.setAttribute("for", "freebox");
    newLabel.textContent = "Ajouter à ma freebox";

    buttonDownload.appendChild(newDiv);

    document.querySelector("#freebox").addEventListener("change", (e) => {
        //conditions de la checkbox
        if(!e.target.checked) return 
        
    })
}