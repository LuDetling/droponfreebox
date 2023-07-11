const button = document.querySelector("#dl center a")
const value = {
    checked: false,
    url: null,
    dl: false
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
            value.url = null
            value.dl = false
            urlInStorage(value)
        }
        else {
            value.checked = true;
            value.url = button.href
            urlInStorage(value)
        }
    })

}
checked()

const noDownload = () => {
    const checkbox = document.querySelector("#checkbox");
    button.addEventListener("click", (e) => {
        if (checkbox.checked === false) return
        e.preventDefault();
        e.stopPropagation();
        value.dl = true
        urlInStorage(value)
    })
}

noDownload()


const urlInStorage = (value) => {
    chrome.storage.local.set({ key: value }).then(() => {
        console.log("Value is set");
    });
}
