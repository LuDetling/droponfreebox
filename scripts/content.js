const value = {
    checked: false,
    link: null,
}
const createCheckbox = () => {
    const newCheckbox = document.createElement("div");

    newCheckbox.innerHTML = `
        <input type="checkbox" id="checkbox" name="checkbox""></input>
        <label for="checkbox">Envoyer sur la freebox</label>
    `

    document.querySelector("#dl center").appendChild(newCheckbox);
}

createCheckbox()

const checked = () => {
    const checkbox = document.querySelector("#checkbox");


    checkbox.addEventListener('change', (e) => {
        if (!e.target.checked) {
            value.checked = false
            value.link = null
            linkInStorage(value)
        }
        else {

            value.checked = true;
            value.link = document.querySelector("#dl center a").href
            linkInStorage(value)
        }
    })

}

checked()

const linkInStorage = (value) => {
    console.log('ici');
    chrome.storage.local.set({ key: value }).then(() => {
        console.log("Value is set");
    });
}
