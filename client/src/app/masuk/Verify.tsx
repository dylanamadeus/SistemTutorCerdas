"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface VerifyModalProps {
  onClose: () => void
  onLogin?: () => void
}

export const VerifyModal = ({ onClose, onLogin }: VerifyModalProps): JSX.Element => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`transition-all duration-500 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="w-full max-w-[810px] min-h-[350px] xs:min-h-[380px] sm:min-h-[410px] rounded-[25px] xs:rounded-[35px] sm:rounded-[50px] border-[3px] xs:border-[4px] sm:border-[5px] border-solid border-[#337bbf] shadow-[5px_5px_5px_2px_#00000040] sm:shadow-[9px_8px_9px_3px_#00000040] bg-white relative overflow-hidden">
          <CardContent className="p-0 flex flex-col md:flex-row h-full">
            {/* Left side with images */}
            <div className="relative w-full md:w-[241px] h-[160px] xs:h-[180px] sm:h-[200px] md:h-[257px] mt-4 xs:mt-6 sm:mt-8 md:mt-[76px] flex justify-center md:ml-[67px]">
              <div className="relative w-[160px] xs:w-[180px] sm:w-[200px] md:w-[241px] h-full">
                <img
                  className="absolute w-[140px] xs:w-[150px] sm:w-[170px] md:w-[206px] h-[130px] xs:h-[140px] sm:h-[160px] md:h-[195px] top-[30px] xs:top-[35px] sm:top-[40px] md:top-[63px] left-0"
                  alt="Decorative background"
                  src="/image-22.png"
                />
                <img
                  className="absolute w-20 xs:w-24 sm:w-28 md:w-36 h-[80px] xs:h-[90px] sm:h-[100px] md:h-[124px] top-0 left-[65px] xs:left-[70px] sm:left-[80px] md:left-[97px]"
                  alt="Decorative element"
                  src="/image-21.png"
                />
                <img
                  className="absolute w-[80px] xs:w-[90px] sm:w-[100px] md:w-[129px] h-[80px] xs:h-[90px] sm:h-[100px] md:h-[129px] top-[55px] xs:top-[60px] sm:top-[70px] md:top-[91px] left-[30px] xs:left-[32px] sm:left-[35px] md:left-[39px] object-cover"
                  alt="Decorative foreground"
                  src="/image-23.png"
                />
              </div>
            </div>

            {/* Right side with text and button */}
            <div className="flex flex-col px-4 xs:px-5 sm:px-6 md:px-0 md:ml-[49px] mt-2 xs:mt-3 sm:mt-4 md:mt-[81px] items-center md:items-start">
              <div className="w-full md:w-[416px] text-center md:text-left font-['Outfit',Helvetica] font-semibold text-[#337bbf] text-xl xs:text-2xl md:text-[32px] leading-tight xs:leading-normal mb-4 xs:mb-5 sm:mb-6 md:mb-0">
                Hiii!! Your email have been verified. Thank youu!
              </div>
              <Button
                className="w-full max-w-[300px] md:w-[258px] h-10 xs:h-11 sm:h-12 md:h-16 mb-6 xs:mb-8 sm:mb-10 md:mt-[108px] rounded-[15px] xs:rounded-[18px] sm:rounded-[20px] [background:linear-gradient(132deg,rgba(51,123,191,1)_0%,rgba(177,217,255,1)_100%)] font-['Outfit',Helvetica] font-medium text-white text-lg xs:text-xl md:text-2xl"
                onClick={onLogin || onClose}
              >
                Login :)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default VerifyModal
