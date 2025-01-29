import axios from 'axios'

export async function fetchWord(length?: number): Promise<string> {
  let API_URL = `https://random-word-api.herokuapp.com/word`
  if (length !== 0 && length !== undefined) API_URL += `?length=${length}`
  const response = await axios.get(API_URL)
  return response.data[0].toUpperCase()
}

export async function fetchWordMeaning(word: string) {
  const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  const response = await axios.get(API_URL)
  return response.data[0].meanings[0].definitions[0].definition.toLowerCase()
}
