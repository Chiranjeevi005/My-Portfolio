"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MorphLoading from "@/components/ui/morph-loading";

// Use server-only env to prevent bundling into client JS. 
// Will be undefined on client, effectively failing closed for UI-level recognition.
const ALLOWED_IDENTITY = process.env.ADMIN_EMAIL;

export default function AccessGatewayPage() {
  const [identity, setIdentity] = useState("");
  const [isRecognized, setIsRecognized] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [authResponse, setAuthResponse] = useState<string | null>(null);
  
  const mountedRef = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Recognition Logic
  useEffect(() => {
    // If ALLOWED_IDENTITY is missing (standard client state), always deny recognition.
    if (!ALLOWED_IDENTITY) {
      setIsRecognized(false);
    } else {
      const isMatch = identity.trim().toLowerCase() === ALLOWED_IDENTITY.toLowerCase();
      setIsRecognized(isMatch);
    }

    // Typing state logic for intelligent pulse
    if (identity.length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [identity]);

  const handleProceed = async () => {
    setIsVerifying(true);
    setAuthResponse(null);

    try {
      const response = await fetch('/api/auth/request-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: identity }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = {};
      }
      
      // Artificial delay for UX
      timeoutRef.current = setTimeout(() => {
        if (!mountedRef.current) return;
        setIsVerifying(false);
        if (response.status === 429) {
          setAuthResponse(data.message || "Too many requests. Please wait.");
        } else {
          setAuthResponse("If authorized, access link has been sent.");
        }
      }, 1000);
    } catch (err) {
      timeoutRef.current = setTimeout(() => {
        if (!mountedRef.current) return;
        setIsVerifying(false);
        setAuthResponse("If authorized, access link has been sent.");
      }, 1000);
    }
  };

  // Determine indicator state classes
  let indicatorStateClasses = "h-5 bg-light-textMuted dark:bg-dark-textMuted";
  if (isRecognized) {
    indicatorStateClasses = "h-7 bg-gradient-to-b from-[#E85D45] to-[#D7745B] shadow-[0_0_8px_rgba(232,93,69,0.5)]";
  } else if (isFocused) {
    indicatorStateClasses = "h-6 bg-light-textAccent dark:bg-dark-textAccent";
  }

  // Determine feedback text
  let feedbackText = "";
  if (isVerifying) {
    feedbackText = "Generating secure access link...";
  } else if (isRecognized) {
    feedbackText = "Identity confirmed";
  } else if (identity.length > 0) {
    feedbackText = "Awaiting verification...";
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-light-bgPrimary dark:bg-dark-bgPrimary transition-colors duration-700 overflow-hidden font-body">
      {/* Background Floating Gradient Blobs (NO CHANGE) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
          className="absolute w-72 h-72 rounded-full bg-light-textAccent/10 dark:bg-dark-textAccent/10 blur-[80px] -translate-x-1/2 -translate-y-1/4"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute w-96 h-96 rounded-full bg-light-textHighlight/10 dark:bg-dark-textHighlight/10 blur-[100px] translate-x-1/4 translate-y-1/4"
        />
      </div>

      {/* Main Access Card Container */}
      <div className="relative z-10 w-full max-w-md px-4 perspective-1000">

        {/* Glow behind the card when typing (Micro interaction intelligence layer) */}
        <div
          className={`absolute inset-4 rounded-[2rem] bg-light-textAccent dark:bg-dark-textAccent blur-2xl transition-all duration-1000 z-0 ${isTyping ? "opacity-[0.03] animate-[pulse_2s_ease-in-out_infinite]" : "opacity-0"
            }`}
        />

        {/* 1. Enhanced Card Presence (ring, shadow, inner depth) */}
        <div className="relative z-10 bg-light-cardBg/80 dark:bg-dark-cardBg/70 backdrop-blur-md 
                        border border-light-cardBorder/50 dark:border-dark-cardBorder/50 
                        rounded-2xl px-6 py-10 md:px-8 
                        ring-1 ring-light-border/60 dark:ring-dark-border/60 
                        shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]
                        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none">

          {/* Main content wrapped to handle Blur in transition state */}
          <div className={`relative z-10 transition-all duration-700 ${isVerifying ? "opacity-30 blur-[2px] pointer-events-none" : ""}`}>

            {/* System Label */}
            <h3 className="text-xs tracking-[0.3em] text-light-textMuted dark:text-dark-textMuted uppercase mb-6 text-center">
              Private Access
            </h3>

            {/* 2. Upgraded Heading */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl md:text-3xl font-semibold font-heading text-light-textPrimary dark:text-dark-textPrimary">
                Secure Gateway
              </h1>
              <p className="text-xs tracking-wide opacity-70 text-light-textSecondary dark:text-dark-textSecondary mt-1">
                System access is intentionally restricted
              </p>
            </div>

            {/* 3. Dynamic Interactive Area */}
            <AnimatePresence mode="wait">
              {authResponse ? (
                <motion.div
                  key="auth-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="py-10 text-center"
                >
                  <p className="text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary">
                    {authResponse}
                  </p>
                  <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-4 opacity-70">
                    The window can now be closed safely.
                  </p>
                  
                  <button
                    onClick={() => {
                      setAuthResponse(null);
                      setIdentity("");
                    }}
                    className="mt-8 text-xs font-medium text-light-textAccent dark:text-dark-textAccent hover:underline underline-offset-4 opacity-80 hover:opacity-100 transition-all"
                  >
                    ← Add New Email
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="auth-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative group mx-auto"
                >
                  {/* Left-side Intelligent Indicator */}
                  <div
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-[2px] rounded-full transition-all duration-500 z-10 pointer-events-none ${indicatorStateClasses}`}
                  />

                  <input
                    type="email"
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter authorized email"
                    disabled={isVerifying}
                    spellCheck={false}
                    autoComplete="off"
                    className={`
                      w-full pl-[2.25rem] pr-4 py-3 rounded-lg
                      bg-light-bgSurface dark:bg-dark-bgSurface
                      border border-light-border dark:border-dark-border
                      text-light-textPrimary dark:text-dark-textPrimary
                      placeholder:text-light-textMuted/70 dark:placeholder:text-dark-textMuted/70
                      focus:outline-none focus:border-light-textAccent dark:focus:border-dark-textAccent
                      transition-all duration-700 ease-in-out caret-light-textAccent dark:caret-dark-textAccent
                      ${isRecognized
                        ? "shadow-[0_0_15px_rgba(232,93,69,0.25)] dark:shadow-[0_0_20px_rgba(255,138,92,0.25)] ring-1 ring-light-textAccent/30 dark:ring-dark-textAccent/30"
                        : ""
                      }
                    `}
                    style={{ caretColor: "currentColor" }}
                  />

                  {/* 4. Real System Feedback */}
                  <div className="h-5 mt-3 flex items-center justify-center">
                    <span className={`text-xs text-light-textMuted dark:text-dark-textMuted tracking-wide transition-opacity duration-500 ease-out ${feedbackText ? "opacity-100" : "opacity-0"}`}>
                      {feedbackText}
                    </span>
                  </div>

                  {/* 5. Progressive Reveal CTA Button */}
                  <div className="mt-4 h-12 relative w-full overflow-hidden rounded-lg">
                    <button
                      onClick={handleProceed}
                      className={`
                          absolute inset-0 w-full py-3 rounded-lg font-medium
                          bg-light-buttonPrimary dark:bg-dark-buttonPrimary
                          text-light-buttonText dark:text-dark-buttonText
                          overflow-hidden
                          after:absolute after:inset-0
                          after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent
                          after:translate-x-[-100%] hover:after:translate-x-[100%]
                          after:transition-transform after:duration-700
                          transition-all duration-500 ease-out
                          hover:shadow-[0_0_20px_rgba(232,93,69,0.3)] dark:hover:shadow-[0_0_20px_rgba(255,138,92,0.3)]
                          focus:outline-none 
                          ${identity.trim().length > 0
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 translate-y-2 pointer-events-none"
                        }
                        `}
                    >
                      Request Secure Link →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 7. Transition State Lock + Overlay */}
          <AnimatePresence>
            {isVerifying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl pointer-events-none"
              >
                <div className="scale-75">
                  <MorphLoading size="sm" />
                </div>
                <p className="text-xs text-light-textPrimary dark:text-dark-textPrimary tracking-[0.15em] uppercase mt-4 font-medium animate-pulse">
                  Verifying Identity...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
