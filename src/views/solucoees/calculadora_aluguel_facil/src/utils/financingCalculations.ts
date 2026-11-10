import { regionalFinancing, propertyFinancing, insurance, financingPhases } from '@/data/financingData'

export interface FinancingParams {
  propertyValue: number
  downPayment: number
  interestRate: number
  years: number
  system: 'price' | 'sac'
  income: number
  region: string
  propertyType: string
  financingType: string
  useFGTS: boolean
  fgtsAmount: number
  includeInsurance: boolean
  includeIOF: boolean
}

export interface PaymentRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

export interface SystemResult {
  type: string
  firstPayment: number
  lastPayment: number
  totalPaid: number
  totalInterest: number
  table: PaymentRow[]
}

export interface FinancingResult {
  financedAmount: number
  additionalCosts: { itbi: number; cartorio: number; evaluation: number; iof: number; total: number }
  systems: { price: SystemResult; sac: SystemResult }
  selectedSystem: SystemResult
  affordabilityAnalysis: {
    maxAffordableValue: number
    debtToIncomeRatio: number
    recommendation: 'aprovado' | 'atenção' | 'reprovado'
    monthlyIncomeNeeded: number
  }
  timeline: { phases: any[]; totalDays: number }
}

export function calculateFinancing(params: FinancingParams): FinancingResult {
  const regional = regionalFinancing[params.region]
  const propertyType = propertyFinancing[params.propertyType]

  const financedAmount = params.propertyValue - params.downPayment

  // Additional costs
  const itbi = params.propertyValue * (regional.itbiRate / 100)
  const cartorio = params.propertyValue * (regional.cartorioFee / 100)
  const evaluation = Math.min(2000, params.propertyValue * 0.002)
  const iof = params.includeIOF ? financedAmount * 0.0038 : 0

  const additionalCosts = { itbi, cartorio, evaluation, iof, total: itbi + cartorio + evaluation + iof }

  // Rate
  const baseRate = params.interestRate || regional.defaultRate
  const adjustedRate = baseRate * propertyType.riskMultiplier
  const monthlyRate = adjustedRate / 100 / 12
  const totalMonths = params.years * 12

  // Insurance
  const monthlyInsurance = params.includeInsurance
    ? (financedAmount * (insurance.mip.rate / 100) / 12) + (params.propertyValue * (insurance.dfi.rate / 100) / 12)
    : 0

  // Calculate systems
  const priceSystem = calcPrice(financedAmount, monthlyRate, totalMonths, monthlyInsurance)
  const sacSystem = calcSAC(financedAmount, monthlyRate, totalMonths, monthlyInsurance)
  const selectedSystem = params.system === 'price' ? priceSystem : sacSystem

  // Affordability
  const maxAffordablePayment = params.income * 0.3
  const maxAffordableValue = (maxAffordablePayment * (Math.pow(1 + monthlyRate, totalMonths) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))
  const debtToIncomeRatio = (selectedSystem.firstPayment / params.income) * 100
  const recommendation = debtToIncomeRatio <= 25 ? 'aprovado' : debtToIncomeRatio <= 35 ? 'atenção' : 'reprovado'
  const monthlyIncomeNeeded = selectedSystem.firstPayment / 0.3

  return {
    financedAmount,
    additionalCosts,
    systems: { price: priceSystem, sac: sacSystem },
    selectedSystem,
    affordabilityAnalysis: { maxAffordableValue, debtToIncomeRatio, recommendation, monthlyIncomeNeeded },
    timeline: { phases: financingPhases, totalDays: financingPhases.reduce((t, p) => t + p.estimatedDays, 0) }
  }
}

function calcPrice(principal: number, rate: number, months: number, insurance: number): SystemResult {
  const payment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
  const table: PaymentRow[] = []
  let balance = principal

  for (let m = 1; m <= Math.min(months, 24); m++) {
    const interest = balance * rate
    const principalPay = payment - interest
    balance -= principalPay
    table.push({ month: m, payment: payment + insurance, principal: principalPay, interest, balance: Math.max(0, balance) })
  }

  const totalPaid = (payment + insurance) * months
  return { type: 'price', firstPayment: payment + insurance, lastPayment: payment + insurance, totalPaid, totalInterest: totalPaid - principal - (insurance * months), table }
}

function calcSAC(principal: number, rate: number, months: number, insurance: number): SystemResult {
  const amortization = principal / months
  const table: PaymentRow[] = []
  let balance = principal

  for (let m = 1; m <= Math.min(months, 24); m++) {
    const interest = balance * rate
    const payment = amortization + interest
    balance -= amortization
    table.push({ month: m, payment: payment + insurance, principal: amortization, interest, balance: Math.max(0, balance) })
  }

  let totalInterest = 0
  let bal = principal
  for (let m = 1; m <= months; m++) {
    totalInterest += bal * rate
    bal -= amortization
  }

  const totalPaid = principal + totalInterest + (insurance * months)
  const firstPayment = table[0]?.payment || 0
  const lastBal = principal - amortization * (months - 1)
  const lastPayment = amortization + lastBal * rate + insurance

  return { type: 'sac', firstPayment, lastPayment, totalPaid, totalInterest, table }
}
