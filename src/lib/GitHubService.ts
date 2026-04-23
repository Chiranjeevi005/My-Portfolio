/**
 * Secure GitHub Interaction Service
 * Handles atomic file operations via GitHub REST API
 */
export class GitHubService {
  private token: string;
  private owner: string;
  private repo: string;

  constructor() {
    this.token = process.env.GITHUB_ADMIN_PAT || "";
    this.owner = process.env.GITHUB_OWNER || "Chiranjeevi005";
    this.repo = process.env.GITHUB_REPO || "My-Portfolio";

    if (!this.token) {
      console.warn("[GITHUB SERVICE]: GITHUB_ADMIN_PAT is missing. Commits will fail.");
    }
  }

  /**
   * Fetches the latest content of a file and its SHA
   */
  async getFile(path: string) {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 0 } // Bypass cache
    });

    if (response.status === 404) {
      return { content: [], sha: null }; // File doesn't exist yet
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch file from GitHub: ${response.statusText}`);
    }

    const data = await response.json();
    const content = JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'));
    
    return {
      content,
      sha: data.sha
    };
  }

  /**
   * Commits a full file replacement to GitHub
   */
  async commitFile(path: string, content: any, message: string, sha: string | null) {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`;
    
    // Ensure clean stringification
    const body: any = {
      message,
      content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
    };

    if (sha) {
      body.sha = sha;
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'GitHub commit failed');
    }

    return data;
  }

  /**
   * Fetches latest commits from the repository
   */
  async getCommits(limit = 10) {
    if (!this.token) {
      throw new Error("GITHUB_NOT_CONFIGURED");
    }

    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/commits?per_page=${limit}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error(`GitHub Error: ${response.statusText}`);
    }

    return await response.json();
  }

  isConfigured() {
    return !!this.token;
  }
}



export const githubService = new GitHubService();
