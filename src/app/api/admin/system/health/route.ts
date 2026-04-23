import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthService } from "@/lib/AuthService";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    if (!token || !(await AuthService.verifySession(token))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Simulate real-time health data
    const successRate = 95 + Math.random() * 5;
    const latency = 10 + Math.random() * 15;
    
    return NextResponse.json({
      api: {
        status: "healthy",
        successRate: successRate.toFixed(1),
        latency: `${latency.toFixed(0)}ms`,
        sparkline: Array.from({ length: 10 }, () => 90 + Math.random() * 10)
      },
      cdn: {
        status: "online",
        uploadSuccess: "100%",
        lastUpload: new Date(Date.now() - 1000 * 60 * 45).toISOString() // 45 mins ago
      },
      github: {
        status: "synced",
        lastSync: new Date().toISOString()
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
