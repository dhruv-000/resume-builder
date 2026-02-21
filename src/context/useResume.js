import { useContext } from 'react'
import { ResumeContext } from './resumeContextStore'

export const useResume = () => {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error('useResume must be used within ResumeProvider')
  }

  return context
}

