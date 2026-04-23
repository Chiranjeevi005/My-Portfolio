import { NextResponse } from "next/server";
import { githubService } from "@/lib/GitHubService";
import { cookies } from "next/headers";
import { AuthService } from "@/lib/AuthService";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    if (!token || !(await AuthService.verifySession(token))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let activity = [];
    try {
      const commits = await githubService.getCommits(5);
      activity = commits.map((c: any) => ({
        id: c.sha,
        type: "commit",
        message: c.commit.message,
        timestamp: c.commit.author.date,
        author: c.commit.author.name
      }));
    } catch (e: any) {
      console.warn("[ACTIVITY API]: GitHub fallback active -", e.message);
      activity = [
        { 
          id: "fallback-1", 
          type: "system", 
          message: "GitHub Connectivity Offline - Check PAT in .env.local", 
          timestamp: new Date().toISOString(), 
          author: "System" 
        }
      ];
    }

    return NextResponse.json({ activity });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
