import React from 'react'

import { StatsModal } from './StatsModal'

export default {
  title: 'StatsModal',
  component: StatsModal,
}

export const Default = () => (
  <StatsModal
    isOpen={true}
    handleClose={() => console.log('handleClose')}
    guesses={[
      { input: 'G', status: 'present' },
      { input: 'K', status: 'correct' },
    ]}
    incorrectGuesses={[]}
    gameStats={{
      totalGames: 10,
      successRate: 50,
      currentStreak: 2,
      bestStreak: 5,
      winDistribution: [10, 20, 30, 40, 50],
      gamesFailed: 5,
    }}
    isLatestGame={true}
    isGameLost={false}
    isGameWon={true}
    handleShareToClipboard={() => console.log('handleShareToClipboard')}
    handleShareFailure={() => console.log('handleShareFailure')}
    handleMigrateStatsButton={() => console.log('handleMigrateStatsButton')}
    isHardMode={false}
    isDarkMode={false}
    isHighContrastMode={false}
    numberOfGuessesMade={2}
  />
)
