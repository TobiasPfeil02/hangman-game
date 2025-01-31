import axios from 'axios'

export async function fetchWord(length: number = 5): Promise<string> {
  const API_URL = `https://api.datamuse.com/words?sp=${'?'.repeat(length)}&max=50`
  const response = await axios.get(API_URL)

  if (response.data.length === 0) throw new Error("No words found")

  // Randomly select a word from the list
  const randomIndex = Math.floor(Math.random() * response.data.length)
  return response.data[randomIndex].word.toUpperCase()
}

export async function fetchWordMeaning(word: string) {
  const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  const response = await axios.get(API_URL)
  return response.data[0].meanings[0].definitions[0].definition.toLowerCase()
}
