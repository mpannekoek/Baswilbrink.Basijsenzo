import "@testing-library/jest-dom/vitest";

if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
      addListener: () => undefined,
      removeListener: () => undefined,
    }),
  });
}

if (!window.IntersectionObserver) {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "0px";
    readonly thresholds = [0];

    disconnect() {}

    observe() {}

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }

    unobserve() {}
  }

  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
  });
}

if (!window.ResizeObserver) {
  class MockResizeObserver implements ResizeObserver {
    disconnect() {}

    observe() {}

    unobserve() {}
  }

  Object.defineProperty(window, "ResizeObserver", {
    writable: true,
    value: MockResizeObserver,
  });
  Object.defineProperty(globalThis, "ResizeObserver", {
    writable: true,
    value: MockResizeObserver,
  });
}
