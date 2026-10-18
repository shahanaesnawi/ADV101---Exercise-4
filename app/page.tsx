"use client"; // needed for useState and event handlers

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Window from "./components/Window";

const MIN_PASSWORD = 6; 

export default function LoginPage() {
  const router = useRouter();               
  const [email, setEmail] = useState("");       
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");       

  function handleSubmit(e: FormEvent) {
    e.preventDefault(); 
    const cleanEmail = email.trim();

    
    if (cleanEmail === "") {
      setError("Email can't be empty.");
      return;
    }
    
    if (!cleanEmail.endsWith("@gmail.com") || cleanEmail === "@gmail.com") {
      setError("Email must be a @gmail.com address.");
      return;
    }
    
    if (password.length <= MIN_PASSWORD) {
      setError(`Password must be more than ${MIN_PASSWORD} characters.`);
      return;
    }

  
    setError("");
    sessionStorage.setItem("loggedIn", "true");
    router.push("/notes");
  }

  function clearForm() {
    setEmail("");
    setPassword("");
    setError("");
  }

  return (
    <Window title="welcome back, bestie" pills={["pure notes", "pure feelings", "pure vibes"]} onClose={clearForm}>
      <h1 className="big">Log<span>in</span></h1>
      <p className="tagline">A classy, sassy, and a bit bad assy notebook.</p>

      <form onSubmit={handleSubmit} className="form" noValidate>
        <input
          type="email"
          placeholder="Email (@gmail.com)"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
        />
        <button className="btn float" type="submit">Login</button>
        {/* Bonus: error message below the login button */}
        {error && <p className="error" role="alert">{error}</p>}
      </form>
    </Window>
  );
}