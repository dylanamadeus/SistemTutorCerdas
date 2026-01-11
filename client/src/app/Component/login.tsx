'use client'
import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation" //BARU
import { Mail, User, EyeOff, Eye, Github, Twitter } from "lucide-react"
import FallingLeaves from "./falling-leaves"
type FormType = "login" | "register"

export default function LoginPage() {
  const [formType, setFormType] = useState<FormType>("login")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter() //BARU

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   await new Promise((resolve) => setTimeout(resolve, 2000))
  //   setLoading(false)
  //   const form = e.target as HTMLFormElement
  //   form.classList.add("success")
  //   setTimeout(() => form.classList.remove("success"), 1500)
  // }

  //BARU
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const url = formType === "login" ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login` : `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/register`

    const payload = formType === "login" 
    ? { email, password } 
    : { name, email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || "Something went wrong")
      }

      if (formType === "login" && data.token){
        // localStorage.setItem("token", data.token)
        document.cookie = `token= Bearer ${data.token}; path=/; max-age=3600;`
        router.push("/")
      }

      console.log("Success", data);
      
    } catch (error: any) {
      console.error("Login/Register Error:", error.message);
      alert(error.message);
    } finally {
      setLoading(false)
    }
  }

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = calculatePasswordStrength(password)

  const toggleFormType = () => {
    const formElement = document.querySelector(".form-container")
    formElement?.classList.add("form-switching")

    setTimeout(() => {
      setFormType(formType === "login" ? "register" : "login")
      setTimeout(() => {
        formElement?.classList.remove("form-switching")
      }, 50)
    }, 300)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-offwhite via-teal-light to-primary-light flex items-center justify-center p-4 md:p-6 lg:p-8">
     <FallingLeaves/>
      <div
        className={`container mx-auto max-w-8xl z-10 transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 lg:gap-0">
          <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col items-center md:items-end md:mb-0">
            <div
              className={`relative w-full max-w-md md:max-w-lg lg:max-w-2xl transition-all duration-700 transform ${mounted ? "translate-y-0" : "translate-y-8"}`}
            >
              <div
                className="rounded-2xl overflow-hidden transition-all duration-500 "
                style={{ aspectRatio: "1.21" }}
              >
                <img src="/IconLogin.png" alt="Mental Health Support" className="w-full h-full object-cover object-center" />
              </div>
            </div>
          </div>

          <div
            className={`w-full md:w-1/2 lg:w-3/5 max-w-md transition-all duration-700 transform ${mounted ? "translate-y-0" : "translate-y-8"}`}
          >
            <div className="form-container bg-white/95 backdrop-blur-sm rounded-2xl  p-6 md:p-8 border border-grayblue/30 transition-all duration-300 ">
              <div className="text-center mb-6 md:mb-8 transition-all duration-300">
                <h1 className="text-xl md:text-2xl font-semibold text-primary-dark mb-2">
                  {formType === "login" ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-sm md:text-base text-primary mt-2 transition-all duration-300">
                  {formType === "login"
                    ? "Your mental wellness journey continues here"
                    : "Begin your path to mental wellness with us"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 transition-all duration-300">
                {formType === "register" && (
                  <div className="relative transition-all duration-500 animate-fadeIn">
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-grayblue focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none peer placeholder-transparent bg-offwhite/50"
                      placeholder="Full Name"
                      required
                    />
                    <label
                      htmlFor="name"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none text-primary/70
                        ${name ? "-top-2 text-sm bg-white px-1" : "top-3"} 
                        peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1 peer-focus:text-primary`}
                    >
                      Full Name
                    </label>
                    <User className="absolute right-4 top-3.5 h-5 w-5 text-primary/70 transition-all duration-300" />
                  </div>
                )}

                <div className="relative transition-all duration-300">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-grayblue focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none peer placeholder-transparent bg-offwhite/50"
                    placeholder="Email"
                    required
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none text-primary/70
                      ${email ? "-top-2 text-sm bg-white px-1" : "top-3"} 
                      peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1 peer-focus:text-primary`}
                  >
                    Email Address
                  </label>
                  <Mail className="absolute right-4 top-3.5 h-5 w-5 text-primary/70 transition-all duration-300" />
                </div>

                <div className="space-y-2 transition-all duration-300">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-grayblue focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none peer placeholder-transparent bg-offwhite/50"
                      placeholder="Password"
                      required
                    />
                    <label
                      htmlFor="password"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none text-primary/70
                        ${password ? "-top-2 text-sm bg-white px-1" : "top-3"} 
                        peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1 peer-focus:text-primary`}
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-primary/70 hover:text-primary transition-colors duration-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 transition-all duration-300" />
                      ) : (
                        <Eye className="h-5 w-5 transition-all duration-300" />
                      )}
                    </button>
                  </div>

                  {formType === "register" && password && (
                    <div className="space-y-1 transition-all duration-500 animate-fadeIn">
                      <div className="flex gap-2">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                              i < passwordStrength
                                ? ["bg-red-400", "bg-accent", "bg-mint", "bg-primary"][passwordStrength - 1]
                                : "bg-grayblue"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-primary/70 transition-all duration-300">
                        {["Weak", "Fair", "Good", "Strong"][Math.max(passwordStrength - 1, 0)] || "Add a password"}
                      </p>
                    </div>
                  )}
                </div>

                {formType === "login" && (
                  <div className="flex items-center justify-between text-sm transition-all duration-300">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 border border-grayblue rounded appearance-none checked:bg-primary checked:border-primary transition-colors duration-300"
                        />
                        <svg
                          className="absolute w-4 h-4 pointer-events-none opacity-0 check-[]:opacity-100 text-white transition-opacity duration-300"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-primary-dark group-hover:text-primary transition-colors duration-300">
                        Remember me
                      </span>
                    </label>
                    <a href="#" className="text-primary/70 hover:text-primary transition-colors duration-300">
                      Forgot password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark focus:ring-4 focus:ring-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center overflow-hidden relative group"
                >
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 group-hover:scale-100 bg-accent/10 rounded-lg"></span>
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : formType === "login" ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <p className="text-center mt-8 text-sm text-primary/70 transition-all duration-300">
                {formType === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={toggleFormType}
                  className="text-primary hover:text-primary-dark font-medium transition-colors duration-300 relative group"
                >
                  {formType === "login" ? "Sign up" : "Sign in"}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}