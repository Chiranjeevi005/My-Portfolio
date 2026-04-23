import { NextResponse } from "next/server";
import { commitController } from "@/lib/CommitController";

const commitRateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkCommitRateLimit(ip: string): boolean {
  const now = Date.now();
  const data = commitRateLimitMap.get(ip);
  if (!data || now > data.resetAt) {
    commitRateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 1000 }); // 60s window
    return true;
  }
  if (data.count >= 10) {
    return false;
  }
  data.count++;
  return true;
}

/**
 * Secure Content Commit Endpoint
 * Entry point for the SecureContentPipeline
 */
export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    if (!checkCommitRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please wait before committing again." }, { status: 429 });
    }

    const body = await request.json();
    const { contentType, payload, mediaFiles } = body;

    // 1. Basic Structure Validation
    if (!contentType || !payload) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Execute Transactional Pipeline
    const result = await commitController.executeCommit({
      contentType,
      payload,
      mediaFiles
    });

    return NextResponse.json(result);

  } catch (err: any) {
    console.error("[COMMIT API ERROR]:", err);
    
    const rawMsg = typeof err === "string" ? err : err?.message;
    const isValidationError = typeof rawMsg === "string" && rawMsg.includes("Validation");
    const isConflictError = typeof rawMsg === "string" && 
      (rawMsg.toLowerCase().includes("conflict") || rawMsg.toLowerCase().includes("does not match"));
    
    // Determine public response
    let publicMsg = "An internal error occurred during commit.";
    let status = 500;

    if (isValidationError) {
      publicMsg = rawMsg;
      status = 422;
    } else if (isConflictError) {
      publicMsg = "Another update occurred simultaneously. Please refresh to receive the latest changes before committing.";
      status = 409;
    }

    return NextResponse.json(
      { error: publicMsg },
      { status }
    );
  }
}
