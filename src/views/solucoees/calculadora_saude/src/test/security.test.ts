import { describe, it, expect } from 'vitest';
import { userDataSchema, sanitizeText, clampNumber } from '@/utils/validation';

describe('Segurança — Validação de Entrada (Zod)', () => {
  const validData = {
    height: 175,
    weight: 70,
    age: 30,
    gender: 'male' as const,
    activityLevel: 'moderate' as const,
    goal: 'maintain' as const,
  };

  it('aceita dados válidos', () => {
    const result = userDataSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejeita valores negativos de altura, peso e idade', () => {
    const result = userDataSchema.safeParse({ ...validData, height: -175, weight: -70, age: -30 });
    expect(result.success).toBe(false);
  });

  it('rejeita altura fora da faixa fisiológica (100-250 cm)', () => {
    expect(userDataSchema.safeParse({ ...validData, height: 50 }).success).toBe(false);
    expect(userDataSchema.safeParse({ ...validData, height: 400 }).success).toBe(false);
  });

  it('rejeita peso fora da faixa (30-300 kg)', () => {
    expect(userDataSchema.safeParse({ ...validData, weight: 10 }).success).toBe(false);
    expect(userDataSchema.safeParse({ ...validData, weight: 999 }).success).toBe(false);
  });

  it('rejeita idade fora da faixa (10-120 anos)', () => {
    expect(userDataSchema.safeParse({ ...validData, age: 5 }).success).toBe(false);
    expect(userDataSchema.safeParse({ ...validData, age: 200 }).success).toBe(false);
  });

  it('aceita apenas gênero válido', () => {
    expect(userDataSchema.safeParse({ ...validData, gender: 'outro' }).success).toBe(false);
    expect(userDataSchema.safeParse({ ...validData, gender: 'female' }).success).toBe(true);
  });

  it('aceita apenas níveis de atividade válidos', () => {
    expect(userDataSchema.safeParse({ ...validData, activityLevel: 'hacker' }).success).toBe(false);
    expect(userDataSchema.safeParse({ ...validData, activityLevel: 'active' }).success).toBe(true);
  });

  it('rejeita tipos não numéricos em campos numéricos', () => {
    expect(userDataSchema.safeParse({ ...validData, height: '175abc' }).success).toBe(false);
  });

  it('aceita strings numéricas vindas dos inputs (coerção)', () => {
    // Os inputs com máscara entregam strings; o schema deve coagir para número.
    const result = userDataSchema.safeParse({
      height: '175',
      weight: '70',
      age: '30',
      gender: 'male',
      activityLevel: 'moderate',
      goal: 'maintain',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.height).toBe(175);
      expect(typeof result.data.height).toBe('number');
    }
  });

  it('rejeita string vazia em campo numérico', () => {
    expect(userDataSchema.safeParse({ ...validData, weight: '' }).success).toBe(false);
  });
});

describe('Segurança — Sanitização contra XSS', () => {
  it('remove tags de script', () => {
    const out = sanitizeText('<script>alert("XSS")</script>Olá');
    expect(out).not.toContain('<script>');
    expect(out).not.toContain('</script>');
    expect(out).toContain('Olá');
  });

  it('remove pseudo-protocolo javascript:', () => {
    const out = sanitizeText('javascript:alert(1)');
    expect(out.toLowerCase()).not.toContain('javascript:');
  });

  it('remove handlers inline (onerror=, onclick=)', () => {
    const out = sanitizeText('<img src=x onerror=alert(1)>');
    expect(out).not.toMatch(/on\w+=/i);
    expect(out).not.toContain('<');
    expect(out).not.toContain('>');
  });

  it('preserva texto legítimo', () => {
    expect(sanitizeText('  Maria da Silva  ')).toBe('Maria da Silva');
  });
});

describe('Segurança — clampNumber (limites seguros)', () => {
  it('mantém valor dentro dos limites', () => {
    expect(clampNumber(50, 0, 100)).toBe(50);
  });

  it('corta acima do máximo e abaixo do mínimo', () => {
    expect(clampNumber(500, 0, 100)).toBe(100);
    expect(clampNumber(-10, 0, 100)).toBe(0);
  });

  it('trata NaN retornando o mínimo', () => {
    expect(clampNumber(Number.NaN, 5, 100)).toBe(5);
  });
});
