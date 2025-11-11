import '@testing-library/jest-dom'
import { configure } from '@testing-library/dom'
import React from 'react'

configure({ testIdAttribute: 'data-test-id' })

const originalLazy = React.lazy;
React.lazy = (factory) => {
  return originalLazy(() => 
    factory().then(module => {
      return module;
    })
  );
};

if (!global.fetch) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: async () => ({}),
    })
  );
}

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

jest.mock('framer-motion', () => ({
  motion: {
    article: ({ children, ...props }) => {
      const { initial, animate, transition, whileHover, whileTap, ...restProps } = props;
      return React.createElement('article', restProps, children);
    },
    div: ({ children, ...props }) => {
      const { initial, animate, transition, whileHover, whileTap, ...restProps } = props;
      return React.createElement('div', restProps, children);
    },
  },
}))
