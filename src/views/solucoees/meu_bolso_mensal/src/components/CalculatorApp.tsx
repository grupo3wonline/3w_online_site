import { useState } from "react";
import LandingPage from "./LandingPage";
import RendimentosCalculator from "./calculators/RendimentosCalculator";
import InvestimentosCalculator from "./calculators/InvestimentosCalculator";
import FeriasCalculator from "./calculators/FeriasCalculator";
import DecimoTerceiroCalculator from "./calculators/DecimoTerceiroCalculator";
import RescisaoCalculator from "./calculators/RescisaoCalculator";
import SeguroDesempregoCalculator from "./calculators/SeguroDesempregoCalculator";
import AposentadoriaCalculator from "./calculators/AposentadoriaCalculator";
import FgtsCalculator from "./calculators/FgtsCalculator";
import ImpostoRendaCalculator from "./calculators/ImpostoRendaCalculator";
import SalarioCalculator from "./calculators/SalarioCalculator";
import PlrCalculator from "./calculators/PlrCalculator";
import BeneficiosCalculator from "./calculators/BeneficiosCalculator";

type CalculatorType = 'landing' | 'rendimentos' | 'ferias' | 'decimo-terceiro' | 'rescisao' | 'seguro-desemprego' | 'aposentadoria' | 'fgts' | 'imposto-renda' | 'investimentos' | 'salario' | 'plr' | 'beneficios';

export default function CalculatorApp() {
  const [currentCalculator, setCurrentCalculator] = useState<CalculatorType>('landing');

  const navigateToCalculator = (calculatorType: string) => {
    setCurrentCalculator(calculatorType as CalculatorType);
  };

  const navigateToLanding = () => {
    setCurrentCalculator('landing');
  };

  const renderCalculator = () => {
    switch (currentCalculator) {
      case 'landing':
        return <LandingPage onNavigateToCalculator={navigateToCalculator} />;
      case 'rendimentos':
        return <RendimentosCalculator onBack={navigateToLanding} />;
      case 'ferias':
        return <FeriasCalculator onBack={navigateToLanding} />;
      case 'decimo-terceiro':
        return <DecimoTerceiroCalculator onBack={navigateToLanding} />;
      case 'rescisao':
        return <RescisaoCalculator onBack={navigateToLanding} />;
      case 'seguro-desemprego':
        return <SeguroDesempregoCalculator onBack={navigateToLanding} />;
      case 'aposentadoria':
        return <AposentadoriaCalculator onBack={navigateToLanding} />;
      case 'fgts':
        return <FgtsCalculator onBack={navigateToLanding} />;
      case 'imposto-renda':
        return <ImpostoRendaCalculator onBack={navigateToLanding} />;
      case 'investimentos':
        return <InvestimentosCalculator onBack={navigateToLanding} />;
      case 'salario':
        return <SalarioCalculator onBack={navigateToLanding} />;
      case 'plr':
        return <PlrCalculator onBack={navigateToLanding} />;
      case 'beneficios':
        return <BeneficiosCalculator onBack={navigateToLanding} />;
      default:
        return <LandingPage onNavigateToCalculator={navigateToCalculator} />;
    }
  };

  return renderCalculator();
}