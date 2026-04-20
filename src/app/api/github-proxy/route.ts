import { NextResponse } from 'next/server';

// Extremely critical: Never expose this key to the frontend process via NEXT_PUBLIC prefix.
const GITHUB_TOKEN = process.env.GITHUB_ADMIN_PAT;
const REPO_OWNER = process.env.GITHUB_OWNER || 'Chiranjeevi005';
const REPO_NAME = process.env.GITHUB_REPO || 'My-Portfolio';

// This acts as a sterile middle-man preventing the client from ever needing or seeing the GitHub PAT
export async function POST(request: Request) {
  try {
    const { action, path, content, message, sha } = await request.json();

    if (!GITHUB_TOKEN) {
      return NextResponse.json({ error: 'System unconfigured' }, { status: 500 });
    }

    // Example Action mapping for interacting with GitHub API seamlessly from /admin dashboard
    if (action === 'CREATE_OR_UPDATE_FILE') {
      const g_url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
      
      const response = await fetch(g_url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message || `Architect Update: ${path}`,
          content: Buffer.from(content).toString('base64'),
          sha: sha || undefined // only required for updating existing file
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'GitHub mutation failed');
      }

      return NextResponse.json({ success: true, data }, { status: 200 });
    }

    return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
  } catch (err: any) {
    console.error('[GITHUB_PROXY Error]:', err);
    return NextResponse.json({ error: err.message || 'Interfacing error' }, { status: 500 });
  }
}
