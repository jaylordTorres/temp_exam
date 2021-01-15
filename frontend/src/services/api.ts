export const url = 'http://localhost:3000/api'

export const getList = async () => {
  const response = await fetch('http://localhost:3000/api')
  return response.json()
}
