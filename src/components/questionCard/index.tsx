import { Box, Heading, Flex, Spacer } from '@chakra-ui/react'
import { QuestionCardProps } from '../../interface'
import AppButton from '../button'

const QuestionCard: React.FC<QuestionCardProps> = ({
  questions,
  callback,
  category,
  totalQuestions,
  questionNumber,
}) => {
  return (
    <>
      <Box bg='white' width='100%' maxWidth='80vw' minWidth='50vw'>
        <Box mb='6' fontSize='md' fontWeight='bold' textTransform='uppercase'>
          Your Progress: {questionNumber}/{totalQuestions}
        </Box>
        <Box>{category}</Box>
        <Heading mb='6'>
          <Box>{questions}</Box>
        </Heading>
        <Flex direction='column'>
          <Box w='100%' mb={4}>
            <AppButton
              colorScheme='purple'
              variant='outline'
              onClick={callback}
              value='True'
              width='full'
            />
          </Box>
          <Spacer />
          <Box w='100%' mb={4}>
            <AppButton
              colorScheme='purple'
              variant='outline'
              onClick={callback}
              value='False'
              width='full'
            />
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default QuestionCard
