
// chrome.storage.onChanged.addListener((changes, namespace) => {
//     for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//         console.log(
//             `Storage key "${key}" in namespace "${namespace}" changed.`,
//             `Old value was "${JSON.stringify(oldValue)}", new value is "${JSON.stringify(newValue)}".`
//         );

//         if (!newValue.checked) return

//         console.log(newValue);

//     }
// });

// const getData = async () => {

//     const dataToFetch = {
//         app_id: "fr.freebox.FreeboxMediaUploader",
//         app_name: "Freebox Media Uploader",
//         app_version: "0.0.1",
//         device_name: "Pc de Lucas"
//     }

//     try {
//         const res = await fetch("http://mafreebox.freebox.fr/api/v8/login/authorize/", {
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             method: "POST",
//             body: JSON.stringify(dataToFetch)
//         })
//         console.log(res);
//     } catch (error) {
//         console.log("erreur : " + error);
//     }

// }

// getData()