import { describe, it, expect, beforeEach } from 'vitest';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import { useThemeStore } from '@/stores/theme';

describe('Tema claro/escuro (store Pinia)', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    document.documentElement.classList.remove('dark');
  });

  it('alterna o modo e reflete na classe do html', () => {
    const theme = useThemeStore();
    const inicial = theme.darkMode;
    theme.toggleDarkMode();
    expect(theme.darkMode).toBe(!inicial);
  });

  it('persiste a preferência no localStorage', async () => {
    const theme = useThemeStore();
    const alvo = !theme.darkMode;
    theme.toggleDarkMode();
    await nextTick();
    expect(JSON.parse(localStorage.getItem('darkMode') as string)).toBe(alvo);
  });

  it('aplica a classe dark quando ativo', async () => {
    const theme = useThemeStore();
    if (!theme.darkMode) {
      theme.toggleDarkMode();
      await nextTick();
    }
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
