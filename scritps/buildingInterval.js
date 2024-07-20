import { buildingConfig } from './buildingConfig.js';
import { modifyMelancias } from './modifyMelancias.js';

let totalProductionRate = 0;
const productionRates = {};

// Função para atualizar a taxa de produção total
function updateTotalProductionRate() {
    totalProductionRate = Object.values(productionRates).reduce((acc, rate) => acc + rate, 0);
}

// Função para iniciar o intervalo de contagem de melancias
function startBuildingsInterval() {
    setInterval(() => {
        if (totalProductionRate > 0) {
            modifyMelancias((totalProductionRate / 100), true);
        }
    }, 10);
}

// Função para configurar a produção de uma construção
export function setBuildingProduction(buildingName, productionRate) {
    productionRates[buildingName] = productionRate;
    updateTotalProductionRate();
}

// Inicia o intervalo quando o script é carregado
startBuildingsInterval();
