import axios from 'axios'

const API_URL = 'https://api.api-ninjas.com/v1/randomword'

export const fetchWord = async (): Promise<string> => {
  const apiKey = import.meta.env.VITE_RANDOM_WORD_API_KEY
  const response = await axios.get(API_URL, {
    headers: {
      'X-Api-Key': apiKey,
    },
  })
  return response.data.word[0]
}
