import axios from 'axios'

// https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean
const BASE_URL = 'https://opentdb.com/api.php?amount='

export const getQuestionList = async (
  amount: number,
  category: number,
  difficulty: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `${BASE_URL}${amount}&category=${category}&difficulty=${difficulty}&type=boolean`
    )
    return response.data.results
  } catch (error) {
    throw new Error(`Error fetching the questions. ${error}`)
  }
}
