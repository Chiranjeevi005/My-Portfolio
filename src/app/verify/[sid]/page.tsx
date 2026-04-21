'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

type State = 'loading' | 'processing' | 'success' | 'expired_or_invalid' | 'rate_limited';

export default function VerifyGatewayPage({ params }: { params: Promise<{ sid: string }> }) {
  const router = useRouter();
  const [state, setState] = useState<State>('loading');
  const resolvedParams = use(params);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const verifyToken = async () => {
      setState('processing');
      try {
        const res = await fetch(`/api/auth/verify?sid=${encodeURIComponent(resolvedParams.sid)}`, {
          method: 'GET',
          cache: 'no-store',
        });

        if (res.status === 429) {
          setState('rate_limited');
          return;
        }

        if (res.ok) {
          setState('success');
          timerId = setTimeout(() => {
            router.push('/admin');
          }, 1000);
        } else {
          setState('expired_or_invalid');
        }
      } catch (err) {
        setState('expired_or_invalid');
      }
    };

    verifyToken();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [resolvedParams.sid, router]);

  const requestNewLink = () => {
    router.push('/access'); // redirect to the request link page
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#FFF9F3] transition-colors duration-700 overflow-hidden font-sans">
      {/* Background Floating Gradient Blobs matched to Access page */}
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
          className="absolute w-72 h-72 rounded-full bg-[#E85D45]/5 blur-[80px] -translate-x-1/2 -translate-y-1/4"
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
          className="absolute w-96 h-96 rounded-full bg-[#D7745B]/5 blur-[100px] translate-x-1/4 translate-y-1/4"
        />
      </div>

      <div className="z-10 relative flex flex-col items-center w-full max-w-md px-4">
        {/* Glow behind the card */}
        <div className="absolute inset-4 rounded-[2rem] bg-[#E85D45]/5 blur-3xl opacity-20 animate-pulse z-0" />
        {/* Gateway Panel */}
        <motion.div
          className="bg-white/80 backdrop-blur-xl border border-[#E8D5C8] rounded-2xl p-8 max-w-sm w-full mx-4 shadow-[0_20px_50px_rgba(58,45,40,0.1)] relative"
          animate={{
            opacity: state === 'processing' ? 0.7 : 1, // slightly dimmed during processing
            scale: state === 'processing' ? 0.98 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="min-h-[160px] flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              {state === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <Loader2 className="w-8 h-8 animate-spin text-[#E85D45] mb-4" />
                  <h2 className="text-lg font-medium text-[#3A2D28]">Validating session…</h2>
                </motion.div>
              )}

              {state === 'processing' && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center w-full"
                >
                  <h2 className="text-lg font-medium text-[#3A2D28] mb-6">Verifying identity…</h2>
                  {/* Indeterminate loader bar */}
                  <div className="h-1 w-full bg-[#E8D5C8] rounded-full overflow-hidden relative">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-[#E85D45] rounded-full"
                      initial={{ left: '-100%', right: '100%' }}
                      animate={{ left: '100%', right: '-100%' }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}

              {state === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-[#E85D45] mb-4 stroke-[1.5]" />
                  <h2 className="text-xl font-medium text-[#3A2D28] mb-2">Access granted</h2>
                  <p className="text-sm text-[#6E5C55]">Redirecting to secure workspace…</p>
                </motion.div>
              )}

              {state === 'expired_or_invalid' && (
                <motion.div
                  key="expired"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <XCircle className="w-10 h-10 text-[#A48C82] mb-4 stroke-[1.5]" />
                  <h2 className="text-xl font-medium text-[#3A2D28] mb-2">Session could not be verified</h2>
                  <p className="text-sm text-[#6E5C55] mb-6 px-4">
                    Request a new secure link to continue
                  </p>
                  <button
                    onClick={requestNewLink}
                    className="w-full py-2.5 px-4 bg-[#E85D45] text-white text-sm font-medium rounded-lg hover:bg-[#D94A33] transition-colors shadow-lg shadow-[#E85D45]/20"
                  >
                    Request new link
                  </button>
                </motion.div>
              )}

              {state === 'rate_limited' && (
                <motion.div
                  key="rate_limited"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <Loader2 className="w-8 h-8 text-[#A48C82] mb-4 stroke-[1.5]" />
                  <h2 className="text-xl font-medium text-[#3A2D28] mb-2">Please wait before trying again</h2>
                  <p className="text-sm text-[#6E5C55] mb-6">
                    Try again shortly
                  </p>
                  <button
                    onClick={requestNewLink}
                    className="w-full py-2.5 px-4 bg-[#E8D5C8] text-[#3A2D28] text-sm font-medium rounded-lg hover:bg-[#E8D5C8]/80 transition-colors"
                  >
                    Go back
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
