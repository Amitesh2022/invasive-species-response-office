// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

describe('invasive species response office', () => {
  it('loads response cases from the Java API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: 'Invasive hornet early detection pathway', owner: 'European Invasive Species Team', status: 'Review', priority: 'High' }],
    }))
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(<QueryClientProvider client={client}><App /></QueryClientProvider>)
    expect(await screen.findByText('Invasive hornet early detection pathway')).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Invasive Species Response Office' })).toBeTruthy()
  })
})
