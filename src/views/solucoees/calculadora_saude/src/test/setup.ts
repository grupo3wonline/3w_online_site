import { beforeEach, vi } from 'vitest';

// Mock de matchMedia (usado pela store de tema) — jsdom não implementa.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock de scrollIntoView (jsdom não implementa)
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn();
}

// Limpa o localStorage entre testes para isolamento
beforeEach(() => {
  localStorage.clear();
});
