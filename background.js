
/**
 * The function `digestMessage` takes a message as input, encodes it as a Uint8Array using UTF-8
 * encoding, computes the SHA-1 hash of the encoded message, and returns the hash as a hexadecimal
 * string.
 * @param message - The `message` parameter is the string that you want to compute the SHA-1 hash for.
 * @returns The function `digestMessage` returns a hexadecimal string representing the SHA-1 hash of
 * the input message.
 */

let sessionToken
async function cryptoSign(key, data) {
    var enc = new TextEncoder("utf-8");

    await crypto.subtle.importKey(
        "raw", // raw format of the key - should be Uint8Array
        enc.encode(key),
        { // algorithm details
            name: "HMAC",
            hash: { name: "SHA-1" }
        },
        false, // export = false
        ["sign", "verify"] // what this key can do
    ).then(key => {
        crypto.subtle.sign(
            "HMAC",
            key,
            enc.encode(data)
        ).then(signature => {
            var b = new Uint8Array(signature);
            var password = Array.prototype.map.call(b, x => x.toString(16).padStart(2, '0')).join("")
            openSession(password)
        });
    });
}

const host = "http://mafreebox.freebox.fr"

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (!newValue.checked) return
        const download = async () => {
            if (newValue.dl === true) {
                try {
                    await fetch(host + "/api/v8/downloads/add", {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "X-Fbx-App-Auth": sessionToken,
                        },
                        method: 'POST',
                        body: new URLSearchParams({
                            download_url: newValue.url,
                            download_dir: "L0Rpc3F1ZSBkdXIvRmlsbXM=",
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                        })
                } catch (error) {
                    console.log(error);
                }
            }
        }

        download()
    }
});

// const authorizeFreebox = async () => {
//     const dataToFetch = {
//         app_id: "fr.freebox.FreeboxMediaUploader",
//         app_name: "Freebox Media Uploader",
//         app_version: "0.0.1",
//         device_name: "Pc de Lucas"
//     }

//     try {
//         await fetch(host + "/api/v8/login/authorize/", {
//             headers: {
//                 "Accept": 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             method: "POST",
//             body: JSON.stringify(dataToFetch)
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log("1 ", data);
//                 authorizationProgress(data.result)
//             })
//     } catch (error) {
//         console.log(error);
//     }
// }

const authorizationProgress = async () => {
    try {
        await fetch(host + "/api/v8/login/authorize/" + 95)
            .then(res => res.json())
            .then(data => {
                console.log("2 ", data);
                cryptoSign("jNnUEK7U5B+h4RkmQjImLWqe1q1Sw8hxZJhzZTl3SA0q+qfGwieXwyYx2tkFvh7T", data.result.challenge)
            })
    } catch (error) {
        console.log(error);
    }
}

const openSession = async (password) => {
    const dataToFetch = {
        app_id: "fr.freebox.FreeboxMediaUploader",
        password,
    }
    try {
        await fetch(host + "/api/v8/login/session/", {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToFetch)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("3 ", data)
                sessionToken = data.result.session_token;
            })
    } catch (error) {
        console.log(error);
    }
}

authorizationProgress()