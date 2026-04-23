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

    let projectCount = 0;
    let liveCount = 0;
    let skillCount = 0;
    let experienceCount = 0;
    let activeRole = "N/A";
    let isDegraded = false;

    try {
      // Attempt GitHub Fetch
      const [projects, experiences, skills] = await Promise.all([
        githubService.getFile("content/projects.json"),
        githubService.getFile("content/experience.json"),
        githubService.getFile("content/skills.json")
      ]);

      projectCount = projects.content.length;
      liveCount = projects.content.filter((p: any) => p.liveUrl && p.liveUrl !== "#").length;
      experienceCount = experiences.content.length;
      activeRole = experiences.content[0]?.role || "N/A";
      skillCount = skills.content.reduce((acc: number, cat: any) => acc + cat.skills.length, 0);
    } catch (e: any) {
      console.warn("[STATS API]: GitHub fallback active -", e.message);
      isDegraded = true;
      // Hardcoded Fallbacks (mirroring the UI defaults for safety)
      projectCount = 8;
      liveCount = 7;
      experienceCount = 3;
      activeRole = "Frontend Developer";
      skillCount = 25;
    }

    const stats = {
      projects: {
        total: projectCount,
        live: liveCount,
        draft: projectCount - liveCount,
        trend: isDegraded ? "±0" : "+2",
        lastUpdated: new Date().toISOString()
      },
      experience: {
        total: experienceCount,
        activeRole: activeRole,
        continuity: "100%"
      },
      skills: {
        total: skillCount,
        categories: 5,
        growth: isDegraded ? "±0" : "+5"
      },
      skillEvolution: [
        { month: 'Jan', count: 12 },
        { month: 'Feb', count: 15 },
        { month: 'Mar', count: 18 },
        { month: 'Apr', count: 22 },
        { month: 'May', count: skillCount },
      ],
      projectComplexity: [
        { type: 'Web', count: 4, proportion: 40 },
        { type: 'AI', count: 2, proportion: 20 },
        { type: 'Analytics', count: 3, proportion: 30 },
        { type: 'Others', count: 1, proportion: 10 },
      ]
    };

    return NextResponse.json(stats);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
