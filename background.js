const host = 'http://mafreebox.freebox.fr'

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${JSON.stringify(oldValue)}", new value is "${JSON.stringify(newValue)}".`
        );

        if (!newValue.checked) return

        console.log(newValue);

    }
});

//créer une session token et pas une app token

const authorizeFreebox = async () => {
    const dataToFetch = {
        app_id: "fr.freebox.FreeboxMediaUploader",
        app_name: "Freebox Media Uploader",
        app_version: "0.0.1",
        device_name: "Pc de Lucas"
    }

    try {
        await fetch(host + "/api/v8/login/authorize/", {
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(dataToFetch)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                authorizationProgress(data.result.track_id)
            })
    } catch (error) {
        console.log(error);
    }
}

const authorizationProgress = async (trackId) => {
    try {
        await fetch(host + "/api/v8/login/authorize/" + trackId)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    } catch (error) {
        console.log(error);
    }
}

authorizeFreebox()