"use client";
import { useState, useEffect, useRef } from "react";
import { Upload, Scissors, TrendingUp, Check, Zap, Clock, Shield, Star, ArrowRight, Play, Sparkles, ChevronDown } from "lucide-react";

const GRADIENT = "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedCounter({ end, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function VeloClipLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [count] = useState(73);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleWaitlist = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const [heroRef, heroIn] = useInView(0.1);
  const [stepsRef, stepsIn] = useInView(0.1);
  const [pricingRef, pricingIn] = useInView(0.1);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Inter', sans-serif", background: "#05060F", color: "#E8EAFF", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #05060F; }
        
        .grain::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 1000; opacity: 0.35;
        }

        .glow-btn {
          background: linear-gradient(135deg, #2563EB, #7C3AED);
          color: white;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .glow-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #3B82F6, #8B5CF6);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .glow-btn:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(99,102,241,0.5); }
        .glow-btn:hover::after { opacity: 1; }
        .glow-btn span { position: relative; z-index: 1; }

        .ghost-btn {
          background: transparent;
          border: 1px solid rgba(99,102,241,0.4);
          color: #A5B4FC;
          cursor: pointer;
          transition: all 0.2s;
        }
        .ghost-btn:hover {
          background: rgba(99,102,241,0.1);
          border-color: rgba(99,102,241,0.8);
          color: white;
        }

        .glass {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(20px);
        }

        .glass-blue {
          background: rgba(37,99,235,0.08);
          border: 1px solid rgba(37,99,235,0.2);
          backdrop-filter: blur(20px);
        }

        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .step-card:hover { transform: translateY(-4px); }
        .step-card { transition: transform 0.3s; }

        .orbit {
          animation: orbit 20s linear infinite;
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(200px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
        }

        .pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .badge-flash {
          animation: flash 3s ease-in-out infinite;
        }
        @keyframes flash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .scroll-line {
          height: 100%;
          background: linear-gradient(to bottom, #2563EB, #7C3AED);
          animation: grow 2s ease-in-out infinite alternate;
        }
        @keyframes grow {
          from { transform: scaleY(0.3); }
          to { transform: scaleY(1); }
        }

        .tag { 
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(37,99,235,0.15); border: 1px solid rgba(37,99,235,0.3);
          color: #93C5FD; padding: 4px 12px; border-radius: 999px;
          font-size: 12px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;
        }

        .progress-bar {
          background: rgba(255,255,255,0.07);
          border-radius: 999px; overflow: hidden; height: 6px;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #2563EB, #7C3AED);
          width: 73%;
          border-radius: 999px;
          transition: width 1.5s ease;
        }

        input::placeholder { color: rgba(165,180,252,0.3); }
        input:focus { outline: none; border-color: rgba(99,102,241,0.6) !important; }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.4rem !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="grain" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 5%",
        background: scrollY > 40 ? "rgba(5,6,15,0.9)" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(20px)" : "none",
        borderBottom: scrollY > 40 ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "all 0.3s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: GRADIENT,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Scissors size={16} color="white" />
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>
            Velo<span style={{ background: "linear-gradient(135deg, #60A5FA, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Clip</span>
          </span>
        </div>
        <button
          className="glow-btn"
          style={{ padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, letterSpacing: "0.02em" }}
          onClick={() => document.getElementById("pricing").scrollIntoView({ behavior: "smooth" })}
        >
          <span>Get Founding Access →</span>
        </button>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 5% 80px", textAlign: "center", position: "relative" }}>
        {/* BG orbs */}
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "30%", right: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div ref={heroRef} className={`fade-up ${heroIn ? "visible" : ""}`} style={{ maxWidth: 780, width: "100%", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <span className="tag badge-flash"><Sparkles size={11} /> AI-Powered Clip Generation</span>
          </div>

          <h1 className="hero-title" style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}>
            Turn 1 Hour of Podcast into{" "}
            <span style={{ display: "inline-block", background: "linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #F472B6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              10 Viral Clips
            </span>{" "}
            in 60 Seconds
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(165,180,252,0.7)", lineHeight: 1.6, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
            VeloClip's AI watches your entire podcast, finds the most viral-worthy moments, and exports TikTok, Reels & Shorts—ready to post.
          </p>

          {/* Email capture */}
          <form onSubmit={handleWaitlist} style={{ display: "flex", gap: 10, maxWidth: 480, margin: "0 auto 16px", flexWrap: "wrap", justifyContent: "center" }}>
            {submitted ? (
              <div className="glass-blue" style={{ padding: "14px 28px", borderRadius: 12, display: "flex", alignItems: "center", gap: 8, color: "#93C5FD", fontWeight: 600 }}>
                <Check size={18} /> You're on the list! We'll reach out soon.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  style={{
                    flex: 1, minWidth: 240, padding: "14px 18px", borderRadius: 10,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#E8EAFF", fontSize: 15,
                  }}
                />
                <button type="submit" className="glow-btn" style={{ padding: "14px 24px", borderRadius: 10, fontWeight: 600, fontSize: 15, whiteSpace: "nowrap" }}>
                  <span>Join Waitlist</span>
                </button>
              </>
            )}
          </form>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
            <button
              className="ghost-btn"
              style={{ padding: "14px 28px", borderRadius: 10, fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}
              onClick={() => document.getElementById("pricing").scrollIntoView({ behavior: "smooth" })}
            >
              <Zap size={16} /> Buy Founding Member Pass — $197
            </button>
          </div>

          {/* Social proof */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            {[
              { icon: <Star size={14} fill="#FBBF24" color="#FBBF24" />, text: "4.9/5 from beta users" },
              { icon: <Clock size={14} color="#60A5FA" />, text: "60-second processing" },
              { icon: <Shield size={14} color="#34D399" />, text: "No subscription ever" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(165,180,252,0.6)" }}>
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 1, height: 48, overflow: "hidden" }}>
            <div className="scroll-line" />
          </div>
          <ChevronDown size={14} color="rgba(165,180,252,0.3)" />
        </div>
      </section>

      {/* STATS BANNER */}
      <section style={{ padding: "0 5% 80px" }}>
        <div className="glass" style={{ maxWidth: 900, margin: "0 auto", borderRadius: 20, padding: "40px 5%", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, textAlign: "center" }}>
          {[
            { val: 10, suffix: "x", label: "More content from same recording" },
            { val: 60, suffix: "s", label: "Average processing time" },
            { val: 100, suffix: "%", label: "Done-for-you editing" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 800, background: "linear-gradient(135deg, #60A5FA, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>
                <AnimatedCounter end={s.val} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 13, color: "rgba(165,180,252,0.5)", marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "60px 5% 100px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="tag" style={{ marginBottom: 16, display: "inline-flex" }}><Zap size={11} /> How it Works</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.1, marginTop: 16 }}>
              Three steps to{" "}
              <span style={{ background: "linear-gradient(135deg, #60A5FA, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>viral content</span>
            </h2>
          </div>

          <div ref={stepsRef} className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              {
                step: "01",
                icon: <Upload size={28} />,
                title: "Upload Your Podcast",
                desc: "Drop in any audio or video file—MP3, MP4, YouTube link, or Spotify RSS. We handle everything up to 3 hours.",
                color: "#2563EB",
              },
              {
                step: "02",
                icon: <Scissors size={28} />,
                title: "AI Finds Viral Moments",
                desc: "Our model watches for emotional peaks, quotable lines, story hooks, and audience-retention triggers—automatically.",
                color: "#7C3AED",
              },
              {
                step: "03",
                icon: <TrendingUp size={28} />,
                title: "Download & Go Viral",
                desc: "Get 9:16 vertical clips with captions, B-roll suggestions, and hashtag packs—ready to post on TikTok, Reels, and Shorts.",
                color: "#EC4899",
              },
            ].map((s, i) => (
              <div
                key={i}
                className={`glass step-card fade-up ${stepsIn ? "visible" : ""}`}
                style={{
                  borderRadius: 20, padding: "36px 28px",
                  transitionDelay: `${i * 120}ms`,
                  position: "relative", overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: -30, right: -20, fontFamily: "'Syne', sans-serif", fontSize: 120, fontWeight: 800, color: s.color, opacity: 0.06, lineHeight: 1, userSelect: "none" }}>{s.step}</div>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: `${s.color}22`, border: `1px solid ${s.color}44`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, marginBottom: 20 }}>
                  {s.icon}
                </div>
                <div style={{ fontSize: 11, color: "rgba(165,180,252,0.4)", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 10 }}>STEP {s.step}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.02em", marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(165,180,252,0.55)", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES MARQUEE */}
      <section style={{ overflow: "hidden", marginBottom: 80, borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "20px 0" }}>
        <style>{`
          .marquee-track { display: flex; gap: 48px; animation: marquee 18s linear infinite; }
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        `}</style>
        <div className="marquee-track">
          {[...Array(2)].map((_, k) =>
            ["TikTok Clips", "YouTube Shorts", "Instagram Reels", "Auto Captions", "Hashtag Packs", "B-Roll Suggestions", "One-Click Export", "Viral Hooks", "AI Transcripts", "Batch Processing"].map((item, i) => (
              <span key={`${k}-${i}`} style={{ whiteSpace: "nowrap", fontSize: 13, color: "rgba(165,180,252,0.35)", fontWeight: 500, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: "rgba(99,102,241,0.5)" }}>✦</span> {item}
              </span>
            ))
          )}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "60px 5% 120px" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="tag" style={{ marginBottom: 16, display: "inline-flex" }}><Sparkles size={11} /> Founding Member Offer</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.1, marginTop: 16 }}>
              One price.{" "}
              <span style={{ background: "linear-gradient(135deg, #60A5FA, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Forever.</span>
            </h2>
            <p style={{ color: "rgba(165,180,252,0.5)", marginTop: 14, fontSize: 16 }}>No subscriptions. No surprises. Lock in lifetime access before we go live.</p>
          </div>

          <div ref={pricingRef} className={`fade-up ${pricingIn ? "visible" : ""}`}>
            <div style={{
              borderRadius: 24, overflow: "hidden", position: "relative",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(99,102,241,0.25)",
              boxShadow: "0 0 60px rgba(99,102,241,0.1), inset 0 0 40px rgba(99,102,241,0.03)",
            }}>
              {/* Top gradient bar */}
              <div style={{ height: 3, background: GRADIENT }} />

              <div style={{ padding: "40px 40px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#A78BFA", marginBottom: 6 }}>FOUNDING MEMBER</div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2.8rem", letterSpacing: "-0.04em" }}>
                      $197
                      <span style={{ fontSize: "1rem", fontWeight: 400, color: "rgba(165,180,252,0.4)", letterSpacing: "0", marginLeft: 6 }}>one-time</span>
                    </h3>
                    <div style={{ fontSize: 13, color: "rgba(165,180,252,0.4)", marginTop: 2, textDecoration: "line-through" }}>$497/year otherwise</div>
                  </div>
                  <div className="glass-blue" style={{ padding: "8px 14px", borderRadius: 10, textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: "#60A5FA" }}>{count}</div>
                    <div style={{ fontSize: 10, color: "rgba(165,180,252,0.5)", letterSpacing: "0.05em" }}>SPOTS LEFT</div>
                  </div>
                </div>

                {/* Progress */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(165,180,252,0.4)", marginBottom: 8 }}>
                    <span>27 of 100 spots claimed</span>
                    <span>27%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "27%" }} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
                  {[
                    "Lifetime access — pay once",
                    "Unlimited podcast uploads",
                    "10 clips per hour of content",
                    "Auto-captions in 50+ languages",
                    "TikTok, Reels & Shorts export",
                    "Viral hook suggestions",
                    "Priority processing queue",
                    "All future feature updates",
                    "Private Discord community",
                    "1:1 onboarding call",
                  ].map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "rgba(229,231,255,0.8)" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(37,99,235,0.2)", border: "1px solid rgba(37,99,235,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check size={10} color="#60A5FA" strokeWidth={3} />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: "0 40px 40px" }}>
                <button
                  className="glow-btn"
                  style={{ width: "100%", padding: "18px", borderRadius: 14, fontSize: 17, fontWeight: 700, letterSpacing: "0.01em", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
                  onClick={() => alert("Redirecting to checkout...")}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Zap size={20} fill="white" />
                    Buy Founding Member Pass — $197
                    <ArrowRight size={18} />
                  </span>
                </button>
                <p style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "rgba(165,180,252,0.35)" }}>
                  🔒 Secure checkout · 30-day money-back guarantee · No subscription ever
                </p>
              </div>
            </div>
          </div>

          {/* FAQ teaser */}
          <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { q: "When will I get access?", a: "Immediately after purchase — login credentials hit your inbox within 2 minutes." },
              { q: "What formats are supported?", a: "MP3, MP4, WAV, MOV, YouTube URLs, and Spotify/RSS podcast links." },
              { q: "Is this really a one-time payment?", a: "Yes. Founding members pay $197 once and never pay again, even as we add features." },
            ].map((faq, i) => (
              <div key={i} className="glass" style={{ borderRadius: 14, padding: "18px 22px" }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{faq.q}</div>
                <div style={{ fontSize: 13, color: "rgba(165,180,252,0.5)", lineHeight: 1.6 }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px 5%", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: GRADIENT, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Scissors size={12} color="white" />
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15 }}>VeloClip AI</span>
        </div>
        <div style={{ fontSize: 12, color: "rgba(165,180,252,0.3)" }}>© 2025 VeloClip AI · All rights reserved</div>
        <div style={{ display: "flex", gap: 20, fontSize: 12, color: "rgba(165,180,252,0.4)" }}>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}