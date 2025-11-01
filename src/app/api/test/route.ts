export async function GET() {
  // Simulate a fast API call (500ms)
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return new Response(JSON.stringify({ message: 'Test API response' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}