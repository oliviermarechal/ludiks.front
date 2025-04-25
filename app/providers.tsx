'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"
import { ReactNode } from 'react'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
})

interface ProvidersProps extends Partial<ThemeProviderProps> {
    children: ReactNode
}

export function Providers({ children, ...props }: ProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <NextThemesProvider
                attribute="class"
                defaultTheme="system"
                enableSystem={true}
                {...props}
            >
                {children}
            </NextThemesProvider>
        </QueryClientProvider>
    )
} 