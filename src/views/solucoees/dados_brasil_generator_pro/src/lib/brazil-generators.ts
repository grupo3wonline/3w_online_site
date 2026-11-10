// Utility functions for generating Brazilian document data and random data

const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const arrayOfNumbers = (length: number) => Array.from({ length }, () => getRandomInt(0, 9));

const mod11 = (digits: number[], multipliers: number[]) => {
    const sum = digits.reduce((acc, digit, i) => acc + digit * multipliers[i], 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
};

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// CPF
export const generateCPF = (formatted = true) => {
    const n = arrayOfNumbers(9);
    const d1 = mod11(n, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
    const d2 = mod11([...n, d1], [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
    const cpf = [...n, d1, d2].join('');
    return formatted ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : cpf;
};

// CNPJ
export const generateCNPJ = (formatted = true) => {
    const n = arrayOfNumbers(8); // Root
    const branch = [0, 0, 0, 1]; // Filial standard
    const base = [...n, ...branch];
    const d1 = mod11(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const d2 = mod11([...base, d1], [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const cnpj = [...base, d1, d2].join('');
    return formatted ? cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5') : cnpj;
};

// RG (Simulado - SP Rule approximated)
export const generateRG = (formatted = true) => {
    const n = arrayOfNumbers(8);
    const d1 = mod11(n, [2, 3, 4, 5, 6, 7, 8, 9]); // Note: Logic varies by state, this is generic
    const rg = [...n, d1].join('');
    return formatted ? rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4') : rg;
};

// CNH (Simulated - 11 digits)
export const generateCNH = () => {
    // Simplified logic, real validation is complex
    return arrayOfNumbers(11).join('');
};

// PIS/PASEP
export const generatePIS = (formatted = true) => {
    const n = arrayOfNumbers(10);
    const d1 = mod11(n, [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const pis = [...n, d1].join('');
    return formatted ? pis.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, '$1.$2.$3-$4') : pis;
};

// RENAVAM
export const generateRenavam = () => {
    const n = arrayOfNumbers(10);
    const d = mod11(n, [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]); // Pseudo algorithm for consistency
    return [...n, d].join('');
};

// Título Eleitor (Simulado)
export const generateTituloEleitor = () => {
    return arrayOfNumbers(12).join('');
};

// Placa Veículo
export const generatePlate = (mercosul = true) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const L = () => letters.charAt(getRandomInt(0, 25));
    const N = () => getRandomInt(0, 9);

    // AAA1A11 (Mercosul) or AAA-1234 (Antiga)
    if (mercosul) {
        return `${L()}${L()}${L()}${N()}${L()}${N()}${N()}`;
    }
    return `${L()}${L()}${L()}-${N()}${N()}${N()}${N()}`;
};

// Credit Card (Luhn)
export const generateCreditCard = (formatted = true, brand = 'visa') => {
    const brands: any = {
        'visa': [4],
        'mastercard': [5, 1], // Simplified
        'amex': [3, 4],
        'elo': [6, 3]
    };

    let digits = [...brands[brand] || [4]];
    const length = 16;

    while (digits.length < length - 1) {
        digits.push(getRandomInt(0, 9));
    }

    // Luhn Algorithm for Check Digit
    let sum = 0;
    let isSecond = true;
    for (let i = digits.length - 1; i >= 0; i--) {
        let d = digits[i];
        if (isSecond) {
            d *= 2;
            if (d > 9) d -= 9;
        }
        sum += d;
        isSecond = !isSecond;
    }
    const checkDigit = (sum * 9) % 10;
    digits.push(checkDigit);

    const cc = digits.join('');
    return formatted ? cc.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4') : cc;
};

// CEP (Simulado)
export const generateCEP = (formatted = true) => {
    const cep = arrayOfNumbers(8).join('');
    return formatted ? cep.replace(/(\d{5})(\d{3})/, '$1-$2') : cep;
};

// Inscrição Estadual (Simulada - SP format simpler)
export const generateIE = (_uf = "SP", formatted = true) => {
    const len = 12; // Tamanho padrão baseado em SP (demonstração)
    const ie = arrayOfNumbers(len).join('');
    return formatted ? ie.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1.$2.$3.$4') : ie;
};

// Names
const names = ["Miguel", "Arthur", "Gael", "Théo", "Heitor", "Ravi", "Davi", "Bernardo", "Noah", "Gabriel", "Helena", "Alice", "Laura", "Maria Alice", "Sophia", "Manuela", "Maitê", "Liz", "Cecília", "Isabella"];
const surnames = ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes", "Costa", "Ribeiro", "Martins"];

export const generateName = () => {
    return `${getRandomItem(names)} ${getRandomItem(surnames)} ${getRandomItem(surnames)}`;
};

export const generateEmail = (name: string) => {
    const cleanName = name.toLowerCase().replace(/\s+/g, '.').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const domains = ["gmail.com", "outlook.com", "uol.com.br", "hotmail.com"];
    const domain = getRandomItem(domains);
    return `${cleanName}@${domain}`;
};

// Addresses
const streets = ["Rua das Flores", "Avenida Brasil", "Rua São João", "Avenida Paulista", "Rua Sete de Setembro", "Rua Quinze de Novembro", "Rua Tiradentes"];
const neighborhoods = ["Centro", "Jardim América", "Vila Nova", "Bela Vista", "Santa Cecília", "Jardim Europa"];
const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Porto Alegre", "Salvador"];
const ufs = ["SP", "RJ", "MG", "PR", "RS", "BA"];

export const generateAddress = () => {
    const idx = getRandomInt(0, cities.length - 1);
    return {
        cep: generateCEP(),
        street: streets[getRandomInt(0, streets.length - 1)],
        number: getRandomInt(10, 2000),
        neighborhood: neighborhoods[getRandomInt(0, neighborhoods.length - 1)],
        city: cities[idx],
        uf: ufs[idx]
    };
};

// Vehicles
const vehicles = [
    { brand: "Volkswagen", models: ["Gol", "Polo", "Virtus", "T-Cross"] },
    { brand: "Chevrolet", models: ["Onix", "Tracker", "Spin", "S10"] },
    { brand: "Fiat", models: ["Mobi", "Argo", "Cronos", "Toro", "Strada"] },
    { brand: "Toyota", models: ["Corolla", "Yaris", "Hilux", "Corolla Cross"] },
    { brand: "Hyundai", models: ["HB20", "Creta"] }
];
const colors = ["Branco", "Preto", "Prata", "Cinza", "Vermelho", "Azul"];

export const generateVehicle = () => {
    const brandData = getRandomItem(vehicles);
    const model = getRandomItem(brandData.models);
    const year = getRandomInt(1990, 2024);

    return {
        brand: brandData.brand,
        model: model,
        year: year,
        color: getRandomItem(colors),
        plate: generatePlate(),
        renavam: generateRenavam()
    };
};

// Bank Accounts
const banks = [
    { code: "001", name: "Banco do Brasil" },
    { code: "237", name: "Bradesco" },
    { code: "341", name: "Itaú" },
    { code: "104", name: "Caixa Econômica" },
    { code: "033", name: "Santander" },
    { code: "077", name: "Inter" },
    { code: "260", name: "Nubank" }
];

export const generateBankAccount = () => {
    const bank = getRandomItem(banks);
    return {
        bankCode: bank.code,
        bankName: bank.name,
        agency: `${getRandomInt(1000, 9999)}-${getRandomInt(0, 9)}`,
        account: `${getRandomInt(10000, 99999)}-${getRandomInt(0, 9)}`
    };
};

// Companies
const companySuffixes = ["Ltda", "S.A.", "ME", "EPP", "e Associados", "Tecnologia", "Serviços"];
const companyPrefixes = ["Tech", "Mega", "Global", "Brasil", "Super", "Alpha", "Omega", "Prime"];
const companyIndustries = ["Soluções", "Consultoria", "Comércio", "Indústria", "Logística", "Sistemas"];

export const generateCompany = () => {
    const name = `${getRandomItem(companyPrefixes)} ${getRandomItem(companyIndustries)} ${getRandomItem(companySuffixes)}`;
    const address = generateAddress();
    return {
        name: name,
        cnpj: generateCNPJ(),
        ie: generateIE(),
        openingDate: new Date(Date.now() - Math.floor(Math.random() * 1000000000000)).toLocaleDateString('pt-BR'),
        email: `contato@${name.split(' ')[0].toLowerCase()}.com.br`,
        phone: `(11) 3${getRandomInt(0, 9)}${getRandomInt(0, 9)}${getRandomInt(0, 9)}-${getRandomInt(0, 9)}${getRandomInt(0, 9)}${getRandomInt(0, 9)}${getRandomInt(0, 9)}`,
        address: `${address.street}, ${address.number} - ${address.neighborhood}`,
        city: `${address.city} - ${address.uf}`,
        cep: address.cep
    };
};

// Nicks
const adjectives = ["Fast", "Cyber", "Dark", "Light", "Pro", "Master", "Ultra", "Mega", "Hyper", "Super"];
const nouns = ["Gamer", "Coder", "Ninja", "Warrior", "Knight", "Wizard", "Wolf", "Tiger", "Eagle", "Lion"];

export const generateNick = () => {
    return `${getRandomItem(adjectives)}${getRandomItem(nouns)}${getRandomInt(10, 99)}`;
};
