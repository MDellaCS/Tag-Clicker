export const upgradeConfig = {
    upgrade1: {
        name: "Horta de Melancias",
        description: "Um pequeno jardim onde você cultiva melancias",
        initialPrice: 10,
        productionRate: 5000,
        priceMultiplier: 1.05,
        priceDisplay: document.getElementById('priceDisplay1'),
        qtdDisplay: document.getElementById('qtdDisplay1'),
        velDisplay: document.getElementById('velDisplay1'),
        nameDisplay: document.getElementById('nameDisplay1')
    },
    upgrade2: {
        name: "Fazenda de Melancias",
        description: "Uma grande fazenda dedicada à produção de melancias",
        initialPrice: 50,
        productionRate: 3000,
        priceMultiplier: 1.1,
        priceDisplay: document.getElementById('priceDisplay2'),
        qtdDisplay: document.getElementById('qtdDisplay2'),
        velDisplay: document.getElementById('velDisplay2'),
        nameDisplay: document.getElementById('nameDisplay2')
    },
    upgrade3: {
        name: "Melândia",
        description: "Uma cidade inteira de melancias",
        initialPrice: 550,
        productionRate: 1000,
        priceMultiplier: 1.15,
        priceDisplay: document.getElementById('priceDisplay3'),
        qtdDisplay: document.getElementById('qtdDisplay3'),
        velDisplay: document.getElementById('velDisplay3'),
        nameDisplay: document.getElementById('nameDisplay3')
    },
    upgrade4: {
        name: "Planeta das Melancias",
        description: "Recentemente descoberto, um planeta inteiro de melancias!",
        initialPrice: 10000,
        productionRate: 100,
        priceMultiplier: 1.2,
        priceDisplay: document.getElementById('priceDisplay4'),
        qtdDisplay: document.getElementById('qtdDisplay4'),
        velDisplay: document.getElementById('velDisplay4'),
        nameDisplay: document.getElementById('nameDisplay4')
    }
};