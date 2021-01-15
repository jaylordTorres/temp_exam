
export async function validateResponseError(response: Response) {
  if (response.ok) {
    return response
  }
  const text = await response.text()
  throw new Error(text || 'Request error.');
}