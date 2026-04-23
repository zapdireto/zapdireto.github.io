document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');
    const submitBtn = document.getElementById('submit');
    const displayNum = document.getElementById('display-number');

    function cleanNumber(number) {
        let n = number.replace(/\D/g, "");
        // Se tiver 10 ou 11 dígitos, assume que é Brasil e falta o 55
        if (n.length === 10 || n.length === 11) {
            n = "55" + n;
        }
        return n;
    }

    function formatForDisplay(number) {
        let n = number.replace(/\D/g, "");
        if (n.length === 11) {
            return `(${n.substring(0,2)}) ${n.substring(2,7)}-${n.substring(7)}`;
        } else if (n.length === 10) {
            return `(${n.substring(0,2)}) ${n.substring(2,6)}-${n.substring(6)}`;
        }
        return n;
    }

    phoneInput.addEventListener('input', () => {
        const val = phoneInput.value;
        const cleaned = val.replace(/\D/g, "");
        const isValid = cleaned.length >= 10;

        submitBtn.disabled = !isValid;
        
        if (isValid) {
            displayNum.textContent = formatForDisplay(val);
        } else {
            displayNum.textContent = val.length > 0 ? "Número incompleto..." : "";
        }
    });

    submitBtn.addEventListener('click', () => {
        const number = cleanNumber(phoneInput.value);
        const url = `https://wa.me/${number}`;
        
        // Em extensões, é melhor usar o Chrome API para abrir abas
        chrome.tabs.create({ url: url });
    });

    // Permitir "Enter" para enviar
    phoneInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !submitBtn.disabled) {
            submitBtn.click();
        }
    });
});