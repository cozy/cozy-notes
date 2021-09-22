declare module 'cozy-ui/transpiled/react/Alerter' {
  function error(
    error: string,
    options?: {
      duration?: number
      buttonText?: string
      buttonAction?: (...args: unknown[]) => void
    }
  ): void
}

// At some point this should be declared in cozy-ui instead
declare module 'cozy-ui/transpiled/react/hooks/useBreakpoints' {
  export default function useBreakpoints(): {
    isExtraLarge: boolean
    isLarge: boolean
    isMedium: boolean
    isSmall: boolean
    isTiny: boolean
    isDesktop: boolean
    isTablet: boolean
    isMobile: boolean
  }
}
