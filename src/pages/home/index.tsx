import { Box, Divider, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Appspinner, QuestionCard, AppButton } from '../../components'
import { CATEGORY, Difficulty, TOTAL_QUESTIONS } from '../../constants'
import { AnswerObject, QuestionProps } from '../../interface'
import { getQuestionList } from '../../services/fetchQuestions'

import './index.css'

const Home = () => {
  const [questions, setQuestions] = useState<QuestionProps[]>([])
  const [questionNumber, setQuestionNumber] = useState(0)
  const [startQuiz, setStartQuiz] = useState(false)
  const [loading, setLoading] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionList = await getQuestionList(
        TOTAL_QUESTIONS,
        CATEGORY,
        Difficulty.EASY
      )
      setQuestions(questionList)
      setLoading(false)
    }
    fetchQuestions()
  }, [])

  const checkAnswer = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (gameOver) return
    const selectedAnswer = e.currentTarget.innerText
    const correct = questions[questionNumber].correct_answer === selectedAnswer
    if (correct) setScore((previous) => previous + 1)
    if (userAnswer.length != questionNumber) {
      if (!correct) setScore((previous) => previous - 1)
      const lastIndex = userAnswer.length - 1
      if (lastIndex >= 0) {
        userAnswer.splice(lastIndex, 1)
        const answerObject = {
          question: questions[questionNumber].question,
          answer: selectedAnswer,
          correct,
          correctAnswer: questions[questionNumber].correct_answer,
        }
        setUserAnswer((previous) => [...previous, answerObject])
      }
      return
    }
    const asnwerObject = {
      question: questions[questionNumber]?.question,
      answer: selectedAnswer,
      correct,
      correctAnswer: questions[questionNumber]?.correct_answer,
    }
    setUserAnswer((previous) => [...previous, asnwerObject])
  }

  const startQuizGame = (): void => {
    setStartQuiz(true)
  }
  const nextQuestion = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const nextQuestion = questionNumber + 1
    if (TOTAL_QUESTIONS === nextQuestion) {
      setGameOver(true)
      return
    }
    setQuestionNumber(nextQuestion)
  }
  const replayQuiz = (): void => {
    setStartQuiz(false)
    setGameOver(false)
    setQuestionNumber(0)
    setScore(0)
    setUserAnswer([])
  }
  return (
    <div>
      {userAnswer.length === questionNumber &&
      !gameOver &&
      !loading &&
      !startQuiz ? (
        <>
          <div className='greeting-box'>
            <Box boxShadow='base' p='6' rounded='md' bg='white' maxW='560px'>
              <Heading as='h1' size='lg' mb='2'>
                Welcome to A quick History quiz
              </Heading>
              <p>
                You will be presented with {TOTAL_QUESTIONS} questions which can
                be answered true or false. All the best!
              </p>
              <AppButton
                colorScheme='purple'
                variant='solid'
                value='Start Quiz'
                onClick={startQuizGame}
              />
            </Box>
          </div>
        </>
      ) : null}

      {loading && (
        <Appspinner
          speed='0.65s'
          emptyColor='gray.200'
          color='purple'
          size='lg'
          thickness='5px'
        />
      )}
      {!loading && !gameOver && startQuiz && (
        <>
          <QuestionCard
            questions={questions[questionNumber].question}
            category={questions[questionNumber].category}
            callback={checkAnswer}
            totalQuestions={TOTAL_QUESTIONS}
            questionNumber={questionNumber}
          />
          <AppButton
            disabled={
              userAnswer.length === questionNumber + 1 &&
              questionNumber !== TOTAL_QUESTIONS
                ? ''
                : 'disabled'
            }
            value='Next Qestion'
            onClick={nextQuestion}
            colorScheme='purple'
            variant='solid'
            width='full'
            className='next-button'
          />
        </>
      )}
      {gameOver && (
        <>
          <Box boxShadow='base' p='6' rounded='md' bg='white' maxW='560px'>
            <Box mb='4'>
              <Box fontWeight='bold' as='h3' fontSize='4xl'>
                Game Over
              </Box>
              <Box as='h3' fontSize='xl'>
                Your Score is {score}/{TOTAL_QUESTIONS}.
              </Box>
            </Box>
            <Divider />
            {userAnswer.map((answer, index) => {
              const { question, answer: userAnswer, correctAnswer } = answer
              return (
                <Box key={index}>
                  <div className='answer-list'>
                    <Box fontSize='md' fontWeight='bold'>
                      Q: {question}
                    </Box>
                    <ul>
                      <li>You answered: {userAnswer}</li>
                      <li>Correct answer: {correctAnswer}</li>
                    </ul>
                  </div>
                </Box>
              )
            })}
            <AppButton
              value='Replay Quiz'
              onClick={replayQuiz}
              colorScheme='purple'
              variant='solid'
              width='full'
              className='reply-button'
            />
          </Box>
        </>
      )}
    </div>
  )
}

export default Home
