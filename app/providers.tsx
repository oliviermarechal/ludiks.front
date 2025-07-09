'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
})

type NestedMessages = {
  [key: string]: string | NestedMessages;
}

interface ProvidersProps extends Partial<ThemeProviderProps> {
    children: ReactNode
    locale: string
    messages: NestedMessages
}

export function Providers({ children, locale, messages, ...props }: ProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <NextThemesProvider {...props} themes={["light"]} enableSystem={false} defaultTheme="light" forcedTheme="light">
                    {children}
                </NextThemesProvider>
            </NextIntlClientProvider>
        </QueryClientProvider>
    )
} 