import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface LearningData {
  question: string
  response: string
  context?: any
}

export const useAILearning = () => {
  const [isLearning, setIsLearning] = useState(false)

  const saveConversation = useCallback(async (messages: any[], userId: string = 'anonymous') => {
    try {
      const { error } = await supabase
        .from('conversations')
        .upsert({
          user_id: userId,
          messages,
          updated_at: new Date().toISOString()
        })
      
      if (error) console.error('Error saving conversation:', error)
    } catch (error) {
      console.error('Error saving conversation:', error)
    }
  }, [])

  const learnFromInteraction = useCallback(async (data: LearningData, userId: string = 'anonymous') => {
    setIsLearning(true)
    try {
      const { error } = await supabase
        .from('ai_analyses')
        .insert({
          user_id: userId,
          findings: data.question,
          recommendations: data.response,
          analysis_result: data.context
        })
      
      if (error) console.error('Error saving learning data:', error)
    } catch (error) {
      console.error('Error saving learning data:', error)
    } finally {
      setIsLearning(false)
    }
  }, [])

  const getPersonalizedResponse = useCallback(async (question: string, userId: string = 'anonymous') => {
    try {
      const { data, error } = await supabase
        .from('ai_analyses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10)
      
      if (error) {
        console.error('Error fetching learning data:', error)
        return null
      }
      
      return data
    } catch (error) {
      console.error('Error fetching learning data:', error)
      return null
    }
  }, [])

  return {
    isLearning,
    saveConversation,
    learnFromInteraction,
    getPersonalizedResponse
  }
}