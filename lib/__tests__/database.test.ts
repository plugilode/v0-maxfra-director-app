import { getAppointments } from '../database'
import { vi } from 'vitest'

vi.useFakeTimers()
vi.setSystemTime(new Date('2025-06-24T12:00:00Z'))

describe('getAppointments', () => {
  afterAll(() => {
    vi.useRealTimers()
  })

  it('should include today appointments', async () => {
    const result = await getAppointments(1)
    const ids = result.map((r) => r.id)
    expect(ids).toContain('1')
    expect(ids).toContain('2')
  })
})
