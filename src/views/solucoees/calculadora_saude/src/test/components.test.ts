import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import HelpTooltip from '@/components/common/HelpTooltip.vue';
import LoadingOverlay from '@/components/common/LoadingOverlay.vue';
import { useUiStore } from '@/stores/ui';

describe('Componentes de UI (montagem e acessibilidade)', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('HelpTooltip exibe o conteúdo ao focar e usa aria-label', async () => {
    const wrapper = mount(HelpTooltip, {
      props: { content: 'Dica de ajuda' },
      global: { stubs: { Icon: true } },
    });
    const btn = wrapper.get('button');
    expect(btn.attributes('aria-label')).toBe('Ajuda');
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
    await btn.trigger('focus');
    expect(wrapper.find('[role="tooltip"]').text()).toContain('Dica de ajuda');
  });

  it('LoadingOverlay só renderiza quando isLoading é verdadeiro', async () => {
    const wrapper = mount(LoadingOverlay, { global: { stubs: { Icon: true } } });
    const ui = useUiStore();
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);

    ui.startLoading('Carregando teste...');
    await wrapper.vm.$nextTick();
    const overlay = wrapper.find('[role="alert"]');
    expect(overlay.exists()).toBe(true);
    expect(overlay.attributes('aria-busy')).toBe('true');
    expect(overlay.text()).toContain('Carregando teste...');

    ui.stopLoading();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
  });
});
