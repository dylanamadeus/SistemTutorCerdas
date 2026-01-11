import Hero from "./HeroSection"
import Navbar from "../Component/navbar"
import BackgroundEffects from './BackgroundEffects';

export default function Home() {
  return (
    <main className="min-h-screen bg-sage-50">
      {/* <BackgroundEffects /> */}
      <Navbar />
      <Hero />
    </main>
  )
}

