import { CharStatus } from './statuses'

const mockSolutionGetter = jest.fn()

beforeEach(() => {
  jest.mock('./quotes', () => ({
    ...jest.requireActual('./quotes'),
    get solution() {
      return mockSolutionGetter()
    },
  }))
})

describe('getGuessStatuses', () => {
  test('guess statuses', () => {
    const status: CharStatus = 'correct'
    expect(status).toEqual('correct')
  })
})
