import axios from 'axios'
import FormData from 'form-data'
import fs from "fs";

// Paramètres de connexion à la Freebox
const freeboxIp = "http://mafreebox.freebox.fr";
const apiVersion = "v6";
const apiBaseUrl = `${freeboxIp}/api/${apiVersion}`;
const appToken = "votre_token_d'application";
const appId = "votre_identifiant_d'application";

// Fonction pour calculer le mot de passe d'authentification
function calculatePassword(challenge) {
    const password = sha1(challenge + "votre_mot_de_passe");
    return password;
}

// Fonction pour effectuer l'authentification
async function authenticate() {
    const authorizeUrl = `${apiBaseUrl}/login/authorize/`;
    const response = await axios.get(authorizeUrl);
    const challenge = response.data.result.challenge;
    const password = calculatePassword(challenge);

    const sessionUrl = `${apiBaseUrl}/login/session/`;
    const data = {
        app_id: appId,
        password: password
    };
    const sessionResponse = await axios.post(sessionUrl, data);
    const sessionToken = sessionResponse.data.result.session_token;
    return sessionToken;
}

// Fonction pour envoyer le fichier
async function sendFile(sessionToken, filePath) {
    const uploadUrl = `${apiBaseUrl}/downloads/`;
    const headers = {
        'X-Fbx-App-Auth': sessionToken,
        'Content-Type': 'multipart/form-data'
    };
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const response = await axios.post(uploadUrl, formData, { headers });
    return response;
}

// Exécution du processus d'envoi de fichier
(async () => {
    try {
        const sessionToken = await authenticate();
        const filePath = 'chemin_vers_votre_fichier';
        const response = await sendFile(sessionToken, filePath);
        if (response.status === 200) {
            console.log('Le téléchargement a été envoyé avec succès !');
        } else {
            console.log('Une erreur s\'est produite lors de l\'envoi du téléchargement.');
            console.log(`Code d'erreur : ${response.status}`);
            console.log(`Message d'erreur : ${response.data}`);
        }
    } catch (error) {
        console.log('Une erreur s\'est produite :');
        console.error(error);
    }
})();
