// Cria o menu de contexto quando a extensão é instalada
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "zapdireto-selection",
        title: "Chamar '%s' no ZapDireto",
        contexts: ["selection"] // Só aparece quando um texto for selecionado
    });
});

// Escuta o clique no menu de contexto
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "zapdireto-selection" && info.selectionText) {
        // Limpa o texto selecionado deixando apenas os números
        let number = info.selectionText.replace(/\D/g, "");
        
        // Se tiver 10 ou 11 dígitos, assume que é Brasil e adiciona o 55
        if (number.length === 10 || number.length === 11) {
            number = "55" + number;
        }

        // Abre a aba do WhatsApp se o número tiver um tamanho válido
        if (number.length >= 10) {
            chrome.tabs.create({ url: `https://wa.me/${number}` });
        }
    }
});