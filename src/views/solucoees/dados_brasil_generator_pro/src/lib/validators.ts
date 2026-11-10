export const validateCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    return true;
};

export const validateCNPJ = (cnpj: string): boolean => {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;
    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(0))) return false;
    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(1))) return false;
    return true;
};

export const validateCreditCard = (value: string): boolean => {
    if (/[^0-9-\s]+/.test(value)) return false;
    let nCheck = 0, bEven = false;
    value = value.replace(/\D/g, "");
    if (value.length < 13 || value.length > 19) return false;
    for (let n = value.length - 1; n >= 0; n--) {
        let cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);
        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }
        nCheck += nDigit;
        bEven = !bEven;
    }
    return (nCheck % 10) === 0;
};

export const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
};

export const validatePIS = (pis: string): boolean => {
    pis = pis.replace(/[^\d]+/g, '');
    if (pis.length !== 11) return false;
    const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(pis.charAt(i)) * weights[i];
    }
    const remainder = sum % 11;
    const digit = remainder < 2 ? 0 : 11 - remainder;
    return digit === parseInt(pis.charAt(10));
};

export const validateRenavam = (renavam: string): boolean => {
    renavam = renavam.replace(/[^\d]+/g, '');
    if (renavam.length !== 11) return false; // Current renavam is 11 digits
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(renavam.charAt(i)) * [3, 2, 9, 8, 7, 6, 5, 4, 3, 2][i];
    }
    const remainder = (sum * 10) % 11;
    const digit = remainder === 10 ? 0 : remainder;
    return digit === parseInt(renavam.charAt(10));
};

export const validateTitulo = (titulo: string): boolean => {
    titulo = titulo.replace(/[^\d]+/g, '');
    if (titulo.length !== 12) return false;
    // Simplified validation logic
    return true;
};

export const validateCNH = (cnh: string): boolean => {
    cnh = cnh.replace(/[^\d]+/g, '');
    if (cnh.length !== 11) return false;
    // CNH validation logic is complex and has changed over time.
    // Basic structural check for 11 digits
    return true;
};

// Generic validators for formats
export const validateRG = (rg: string): boolean => {
    // RG varies by state, usually between 7 and 9 digits
    const cleaned = rg.replace(/[^\d]+/g, '');
    return cleaned.length >= 7 && cleaned.length <= 13;
};

export const validateIE = (ie: string, _uf: string): boolean => {
    // A validação de IE exige lógica por UF. Aqui aplicamos verificação genérica de tamanho.
    // O parâmetro _uf é mantido para futura implementação por estado.
    const cleaned = ie.replace(/[^\d]+/g, '');
    return cleaned.length >= 8 && cleaned.length <= 14;
};

export const validateCertidao = (cert: string): boolean => {
    // Standard format for birth/marriage/death certificates: 32 digits
    const cleaned = cert.replace(/[^\d]+/g, '');
    return cleaned.length === 32;
};

export const validateContaBancaria = (agencia: string, conta: string): boolean => {
    // Basic check if they have numbers
    return agencia.replace(/\D/g, '').length > 0 && conta.replace(/\D/g, '').length > 0;
};
