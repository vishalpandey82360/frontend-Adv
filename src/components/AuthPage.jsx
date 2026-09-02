import { useState } from "react";
import { ArrowRight, LockKeyhole, Mail, Play, UserRound } from "lucide-react";
import "./AuthPage.css";

function AuthPage({ onAuthenticated }) {
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const isSignUp = mode === "signup";

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSignUp && !form.name.trim()) {
      setError("Tell us your name to create your account.");
      return;
    }

    if (!form.email.trim() || !form.password.trim()) {
      setError("Enter your email and password to continue.");
      return;
    }

    localStorage.setItem("youtube-stories-authenticated", "true");
    onAuthenticated();
  };

  return (
    <main className="auth-page">
      <div className="auth-showcase">
        <div className="auth-brand">
          <span className="auth-brand-icon"><Play size={15} fill="currentColor" /></span>
          <span>YouTube <em>Stories</em></span>
        </div>
        <div className="auth-showcase-copy">
          <p className="auth-kicker">Your people. Your feed. Your moment.</p>
          <h1>Make space for the stories worth sharing.</h1>
          <p>Follow creators, save discoveries, and post the little updates that bring your community closer.</p>
        </div>
        <div className="auth-preview" aria-hidden="true">
          <div className="preview-orbit orbit-one" />
          <div className="preview-orbit orbit-two" />
          <div className="preview-note note-top">Fresh from your circle <strong>+12</strong></div>
          <div className="preview-note note-bottom"><span className="preview-dot" /> Someone is watching your story</div>
        </div>
      </div>

      <section className="auth-panel" aria-labelledby="auth-heading">
        <div className="auth-panel-inner">
          <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
            <button
              type="button"
              role="tab"
              aria-selected={!isSignUp}
              className={!isSignUp ? "auth-tab active" : "auth-tab"}
              onClick={() => { setMode("signin"); setError(""); }}
            >
              Sign in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isSignUp}
              className={isSignUp ? "auth-tab active" : "auth-tab"}
              onClick={() => { setMode("signup"); setError(""); }}
            >
              Create account
            </button>
          </div>

          <div className="auth-heading">
            <p className="auth-eyebrow">Welcome back</p>
            <h2 id="auth-heading">{isSignUp ? "Join the story" : "Pick up where you left off"}</h2>
            <p>{isSignUp ? "Set up your profile and start sharing." : "Sign in to see what your community is creating."}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignUp && (
              <label className="auth-field">
                <span>Your name</span>
                <div className="auth-input-wrap">
                  <UserRound size={17} />
                  <input name="name" type="text" placeholder="Alex Morgan" value={form.name} onChange={updateField} autoComplete="name" />
                </div>
              </label>
            )}
            <label className="auth-field">
              <span>Email address</span>
              <div className="auth-input-wrap">
                <Mail size={17} />
                <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={updateField} autoComplete="email" />
              </div>
            </label>
            <label className="auth-field">
              <span>Password</span>
              <div className="auth-input-wrap">
                <LockKeyhole size={17} />
                <input name="password" type="password" placeholder="At least 8 characters" value={form.password} onChange={updateField} autoComplete={isSignUp ? "new-password" : "current-password"} />
              </div>
            </label>

            {error && <p className="auth-error" role="alert">{error}</p>}

            <button className="auth-submit" type="submit">
              <span>{isSignUp ? "Create my account" : "Sign in to YouTube Stories"}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-legal">By continuing, you agree to our Terms and Privacy Policy.</p>
          <button className="auth-demo" type="button" onClick={onAuthenticated}>Continue with demo account</button>
        </div>
      </section>
    </main>
  );
}

export default AuthPage;