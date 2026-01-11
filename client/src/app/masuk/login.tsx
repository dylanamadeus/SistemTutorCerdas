'use client'
import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Mail, User, EyeOff, Eye, Github, Twitter } from "lucide-react"
import FallingLeaves from "../Component/falling-leaves"
import SuccessModal from "./Success"
import { motion } from "framer-motion"
import { fadeIn } from "../variant"

type FormType = "login" | "register"

export default function LoginPage() {
  const [formType, setFormType] = useState<FormType>("login")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const router = useRouter()

  useEffect(() => {
    document.title = 'Welcome ';
    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    
    if (favicon) {
      favicon.href = '/footer.png';
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = '/footer.png';
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const url =
      formType === "login"
        ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login`
        : `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/register`

    const payload = formType === "login" ? { email, password } : { name, email, password }

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

      if (formType === "login" && data.token) {
        // Save token in cookie
        const token = `Bearer ${data.token}`;
        document.cookie = `token=${token}; path=/; max-age=3600;`;
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/me`, {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(user => {
            if (user.role === "teacher") {
              router.push("/dosen");
            } else {
              router.push("/");
            }
            setShowVerifyModal(true);
          })
          .catch(err => {
            console.error("Failed to fetch user data:", err);
            // fallback in case of error
            router.push("/");
          });
      }

      if (formType === "register" && data.message) {
        // Show verification modal for registration
        setShowSuccessModal(true)
      }

      console.log("Success", data)
    } catch (error: any) {
      console.error("Login/Register Error:", error.message)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const closeModals = () => {
    setShowVerifyModal(false)
    setShowSuccessModal(false)
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
  <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 md:px-8 py-6 md:py-12" style={{
          background:
            "linear-gradient(140.63deg, #FFFFFF 0%, #FFF9F1 66%, #FEF3E2 100%)",
        }}>
    <FallingLeaves />

    <div className={`container mx-auto max-w-screen-xl z-10 transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"} ${showVerifyModal || showSuccessModal ? "blur-sm" : ""}`}>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
        {/* Image Section */}
        <div 
        className="w-full md:w-1/2 lg:w-3/5 flex items-center justify-center">
          <motion.div 
          variants={fadeIn('right', 0.1)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once: false, amount: 0.65}}
          className={`relative w-full max-w-md md:max-w-lg lg:max-w-2xl transition-all duration-700 transform ${mounted ? "translate-y-0" : "translate-y-8"}`}>
            <div className="rounded-3xl overflow-hidden shadow-xl transition-all duration-500" style={{ aspectRatio: "1.21" }}>
              <img src="/AuditUnpad.jpg" alt="Mental Health Support" className="w-full h-full object-cover object-center" />
            </div>
          </motion.div>
        </div>

        {/* Form Section */}
        <motion.div 
        variants={fadeIn('down', 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.65 }}
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)" 
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ 
          type: "spring", 
          stiffness: 250, 
          damping: 20 
        }}
        className={`w-full md:w-1/2 lg:w-2/5 max-w-md transition-all duration-700 transform ${mounted ? "translate-y-0" : "translate-y-8"}`}>
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-grayblue/30 shadow-lg">
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-semibold text-[#FAB12F]">{formType === "login" ? "Selamat Datang" : "Buat Akun"}</h1>
              <p className="text-sm md:text-base text-[#1F1A17] mt-2">{formType === "login" ? "Perjalanan belajarmu dimulai dari sini" : "Mulai perjalanan belajarmu dengan kami"}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {formType === "register" && (
                <div className="relative animate-fadeIn">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-grayblue bg-offwhite/60 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 peer"
                    placeholder="Full Name"
                    required
                  />
                  <label htmlFor="name" className={`absolute left-4 text-[#FAB12F]/70 transition-all duration-200 pointer-events-none ${name ? "-top-2 text-sm bg-white px-1" : "top-3"} peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1 peer-focus:text-[#FAB12F]`}>Nama Lengkap</label>
                  <User className="absolute right-4 top-3.5 h-5 w-5 text-[#FAB12F]/70" />
                </div>
              )}

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-grayblue bg-offwhite/60 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 peer"
                  placeholder="Email"
                  required
                />
                <label htmlFor="email" className={`absolute left-4 text-[#FAB12F]/70 transition-all duration-200 pointer-events-none ${email ? "-top-2 text-sm bg-white px-1" : "top-3"} peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1 peer-focus:text-[#FAB12F]`}>Alamat E-mail</label>
                <Mail className="absolute right-4 top-3.5 h-5 w-5 text-[#FAB12F]/70" />
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-grayblue bg-offwhite/60 placeholder-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 peer"
                    placeholder="Password"
                    required
                  />
                  <label htmlFor="password" className={`absolute left-4 text-[#FAB12F]/70 transition-all duration-200 pointer-events-none ${password ? "-top-2 text-sm bg-white px-1" : "top-3"} peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1 peer-focus:text-[#FAB12F]`}>Password</label>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-[#FAB12F]/70 hover:text-[#FAB12F] transition duration-300">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {formType === "register" && password && (
                  <div className="space-y-1 animate-fadeIn">
                    <div className="flex gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-500 ${i < passwordStrength ? ["bg-red-400", "bg-accent", "bg-mint", "bg-primary"][passwordStrength - 1] : "bg-grayblue"}`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-[#FAB12F]/70">
                      {["Weak", "Fair", "Good", "Strong"][Math.max(passwordStrength - 1, 0)] || "Add a password"}
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FAB12F] text-white py-3 rounded-lg hover:bg-[#FAB12F]-dark focus:ring-4 focus:ring-[#FAB12F]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative group"
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 group-hover:scale-100 bg-accent/10 rounded-lg" />
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white mx-auto" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : formType === "login" ? "Masuk" : "Buat Akun"}
              </button>

              <p className="text-center mt-8 text-sm text-[#1F1A17]/70">
                {formType === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
                <button onClick={toggleFormType} className="text-[#FAB12F] hover:text-[#FAB12F] font-medium relative group">
                  {formType === "login" ? "Daftar" : "Masuk"}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </button>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>

    {showSuccessModal && (
      <SuccessModal
        onClose={closeModals}
        onGoToEmail={() => window.open("https://mail.google.com/mail/u/1/#spam", "_blank")}
      />
    )}
  </div>
);

}
