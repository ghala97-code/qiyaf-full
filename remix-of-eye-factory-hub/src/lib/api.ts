// Backend API configuration
export const API_BASE_URL = 'http://localhost:8000';

export const apiUrl = (path: string) => {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${p}`;
};

export async function predictInspection(file: File): Promise<unknown> {
  const formData = new FormData();
  formData.append('file', file);

  const url = apiUrl('/inspections/predict');
  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        // ngrok free tier requires this header to skip the browser warning page
        'ngrok-skip-browser-warning': 'true',
      },
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    throw new Error(`Network error reaching ${url}: ${detail}`);
  }

  if (!response.ok) {
    let body = '';
    try { body = await response.text(); } catch { /* ignore */ }
    throw new Error(`Prediction request failed: ${response.status} ${response.statusText}${body ? ` - ${body.slice(0, 500)}` : ''}`);
  }

  try {
    return await response.json();
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to parse response JSON: ${detail}`);
  }
}
