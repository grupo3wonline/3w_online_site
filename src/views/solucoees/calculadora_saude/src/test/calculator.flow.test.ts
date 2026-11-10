import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import CalculatorSection from '@/components/sections/CalculatorSection.vue';

// Evita abrir o modal real do SweetAlert no ambiente de teste.
vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn(() => Promise.resolve({ isConfirmed: true })) },
}));

describe('Fluxo do formulário da calculadora', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('habilita o botão Calcular ao preencher dados válidos (regressão do bug "não calcula")', async () => {
    const wrapper = mount(CalculatorSection, {
      global: { stubs: { Icon: true, HelpTooltip: true } },
    });

    const submit = () => wrapper.get('button[type="submit"]');

    // Preenche os campos com strings, exatamente como os inputs entregam.
    await wrapper.get('#height').setValue('175');
    await wrapper.get('#weight').setValue('70');
    await wrapper.get('#age').setValue('30');
    await wrapper.get('#gender').setValue('male');
    await wrapper.get('#activityLevel').setValue('moderate');
    await wrapper.get('button[role="radio"]').trigger('click');
    await flushPromises();

    // O objetivo foi marcado
    expect(wrapper.get('button[role="radio"]').attributes('aria-checked')).toBe('true');

    // O formulário passa a ser válido e o botão habilita — antes ficava travado
    // porque o schema esperava número e o input entregava string.
    expect(submit().attributes('disabled')).toBeUndefined();

    // Nenhuma mensagem de erro de validação é exibida.
    expect(wrapper.findAll('.text-red-500')).toHaveLength(0);
  });

  it('mantém o botão desabilitado com dados fora da faixa válida', async () => {
    const wrapper = mount(CalculatorSection, {
      global: { stubs: { Icon: true, HelpTooltip: true } },
    });

    await wrapper.get('#height').setValue('50'); // abaixo do mínimo (100)
    await wrapper.get('#height').trigger('blur');
    await wrapper.get('#weight').setValue('70');
    await wrapper.get('#age').setValue('30');
    await wrapper.get('#gender').setValue('male');
    await wrapper.get('#activityLevel').setValue('moderate');
    await wrapper.get('button[role="radio"]').trigger('click');
    await flushPromises();
    await new Promise((r) => setTimeout(r, 10));
    await flushPromises();

    // Mensagem de erro da altura aparece e o botão fica desabilitado.
    expect(wrapper.text()).toContain('Altura deve estar entre 100 e 250 cm.');
    expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeDefined();
  });
});
