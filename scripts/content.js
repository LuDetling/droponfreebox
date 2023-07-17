const button = document.querySelector("#dl center a")
const value = {
    checked: false,
    url: null,
    dl: false,
    timer: null,
}

const createContent = () => {
    const newContent = document.createElement("div");

    newContent.innerHTML = `
    <input type="checkbox" id="checkbox" name="checkbox""></input>
    <label for="checkbox">Envoyer sur la freebox</label>
    <div id="download">
        <div class="content-bar">
            <div class="bar bar-show"></div>
            <div class="bar bar-back"></div>
        </div>
        <div class="show-pourcent">0%</div>
    </div>
    `
    document.querySelector("#dl center").appendChild(newContent);
}

createContent()

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

const showTimer = async () => {
    chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
            console.log(newValue.timer);
            if (newValue.timer) {

                document.querySelector(".show-pourcent").innerHTML = newValue.timer + "%";
                document.querySelector(".bar-show").style.width = newValue.timer + "px"
            }
        }
    });
}

showTimer()
