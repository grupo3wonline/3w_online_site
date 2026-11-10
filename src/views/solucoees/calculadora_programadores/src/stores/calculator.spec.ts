import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useCalculatorStore, complexityMultipliers } from "./calculator";
import { isBusinessDay } from "@/lib/date";

describe("useCalculatorStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("inicia sem tarefas e com valores padrão", () => {
    const calc = useCalculatorStore();
    expect(calc.tasks).toHaveLength(0);
    expect(calc.hourlyRate).toBe(50);
    expect(calc.total).toBe(0);
    expect(calc.isIssued).toBe(false);
  });

  it("adiciona e remove tarefas", () => {
    const calc = useCalculatorStore();
    calc.addTask();
    calc.addTask();
    expect(calc.tasks).toHaveLength(2);
    calc.removeTask(calc.tasks[0].id);
    expect(calc.tasks).toHaveLength(1);
  });

  it("calcula subtotal aplicando complexidade e urgência", () => {
    const calc = useCalculatorStore();
    calc.hourlyRate = 100;
    calc.urgencyMultiplier = 1.5;
    calc.addTask();
    const id = calc.tasks[0].id;
    calc.updateTask(id, "hours", 10);
    calc.updateTask(id, "complexity", "high");
    // 10 * 100 * 2.2 * 1.5 = 3300
    expect(calc.subtotal).toBe(10 * 100 * complexityMultipliers.high * 1.5);
    expect(calc.subtotal).toBe(3300);
  });

  it("aplica desconto e impostos ao total final", () => {
    const calc = useCalculatorStore();
    calc.hourlyRate = 100;
    calc.addTask();
    const id = calc.tasks[0].id;
    calc.updateTask(id, "hours", 10);
    calc.updateTask(id, "complexity", "low");
    // subtotal = 10 * 100 * 1 * 1 = 1000
    calc.discountPercent = 10; // -100 => 900
    calc.taxPercent = 10; // +90 => 990
    expect(calc.subtotal).toBe(1000);
    expect(calc.discountAmount).toBe(100);
    expect(calc.taxAmount).toBe(90);
    expect(calc.total).toBe(990);
  });

  it("estima prazo em dias úteis com base em horas/dia", () => {
    const calc = useCalculatorStore();
    calc.hoursPerDay = 6;
    calc.addTask();
    const id = calc.tasks[0].id;
    calc.updateTask(id, "hours", 12);
    calc.updateTask(id, "complexity", "low");
    // 12 horas efetivas / 6 por dia = 2 dias úteis
    expect(calc.totalHours).toBe(12);
    expect(calc.estimatedBusinessDays).toBe(2);
    expect(calc.estimatedDeliveryDate).not.toBeNull();
    expect(isBusinessDay(calc.estimatedDeliveryDate as Date)).toBe(true);
  });

  it("emite o orçamento gerando número e data de expiração", () => {
    const calc = useCalculatorStore();
    calc.validityDays = 15;
    calc.issue();
    expect(calc.isIssued).toBe(true);
    expect(calc.budgetNumber).toMatch(/^ORC-\d{8}-\d{3}$/);
    expect(calc.expiresAt).not.toBeNull();
  });

  it("valida campos obrigatórios", () => {
    const calc = useCalculatorStore();
    expect(calc.validate().success).toBe(false);
    calc.projectName = "Projeto X";
    calc.clientName = "Cliente Y";
    calc.addTask();
    expect(calc.validate().success).toBe(true);
  });

  it("reseta todo o estado", () => {
    const calc = useCalculatorStore();
    calc.projectName = "Teste";
    calc.addTask();
    calc.issue();
    calc.reset();
    expect(calc.projectName).toBe("");
    expect(calc.tasks).toHaveLength(0);
    expect(calc.isIssued).toBe(false);
  });
});
