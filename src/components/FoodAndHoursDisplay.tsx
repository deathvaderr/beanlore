import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock } from "lucide-react";

const FOOD_IMAGES = [
  "/f/Screenshot_20260531-134522.webp",
  "/f/Screenshot_20260531-134527.webp",
  "/f/Screenshot_20260531-141631.webp",
  "/f/Screenshot_20260531-141938.webp",
  "/f/Screenshot_20260531-142000.webp",
  "/f/Screenshot_20260531-142010.webp",
  "/f/Screenshot_20260531-142030.webp",
  "/f/Screenshot_20260531-142033.webp",
  "/f/Screenshot_20260531-142037.webp",
  "/f/Screenshot_20260531-142043.webp",
  "/f/Screenshot_20260531-142046.webp",
  "/f/Screenshot_20260531-142102.webp",
  "/f/Screenshot_20260531-142139.webp"
];

const HOURS = [
  { loc: "Jayanagar", time: "10am to 10pm" },
  { loc: "HSR", time: "8am to 11pm" },
  { loc: "Indiranagar", time: "8:30am to 11pm" },
  { loc: "Whitefield", time: "12pm to 11pm" },
];

// Custom crossfade image component to guarantee zero white or blank screen flashes during image changes.
// It achieves this by rendering previous image as a background layout underneath, while the new one fades in smoothly on top.
function CrossfadeImage({ src, alt }: { src: string; alt: string }) {
  const [prevSrc, setPrevSrc] = useState<string | null>(null);
  const [currentSrc, setCurrentSrc] = useState<string>(src);

  useEffect(() => {
    if (src !== currentSrc) {
      setPrevSrc(currentSrc);
      setCurrentSrc(src);
    }
  }, [src, currentSrc]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Background layer: keeps showing the previous image while the next fades in */}
      {prevSrc && (
        <img
          src={prevSrc}
          alt={alt}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      
      {/* Foreground layer: animates the transition smoothly */}
      <AnimatePresence mode="popLayout" onExitComplete={() => setPrevSrc(null)}>
        <motion.img
          key={currentSrc}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          src={currentSrc}
          alt={alt}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}

export default function FoodAndHoursDisplay({ branch = "Jayanagar" }: { branch?: "Jayanagar" | "HSR" | "Indiranagar" | "Whitefield" }) {
  // Circles start with widely spread initial indices to keep visual content contrasting and beautiful
  const [index0, setIndex0] = useState(0);
  const [index1, setIndex1] = useState(4);
  const [index2, setIndex2] = useState(8);

  useEffect(() => {
    // Circle 0 (top-left): alternates every 5 seconds. Runs immediately at T=5s, 10s, 15s...
    const interval0 = setInterval(() => {
      setIndex0(prev => (prev + 1) % FOOD_IMAGES.length);
    }, 5000);

    // Circle 1 (bottom-left): gap of exactly 1 second after Circle 0.
    // Starts its 5-second interval at T=1000ms. Runs at T=1s, 6s, 11s, 16s...
    let interval1: any;
    const timeout1 = setTimeout(() => {
      setIndex1(prev => (prev + 1) % FOOD_IMAGES.length);
      interval1 = setInterval(() => {
        setIndex1(prev => (prev + 1) % FOOD_IMAGES.length);
      }, 5000);
    }, 1000);

    // Circle 2 (middle-right): gap of exactly 2 seconds after Circle 0 (1 second after Circle 1).
    // Starts its 5-second interval at T=2000ms. Runs at T=2s, 7s, 12s, 17s...
    let interval2: any;
    const timeout2 = setTimeout(() => {
      setIndex2(prev => (prev + 1) % FOOD_IMAGES.length);
      interval2 = setInterval(() => {
        setIndex2(prev => (prev + 1) % FOOD_IMAGES.length);
      }, 5000);
    }, 2000);

    return () => {
      clearInterval(interval0);
      clearTimeout(timeout1);
      if (interval1) clearInterval(interval1);
      clearTimeout(timeout2);
      if (interval2) clearInterval(interval2);
    };
  }, []);

  const hours = HOURS.find(h => h.loc === branch);

  return (
    <div className="relative w-full max-w-xl mx-auto py-10 flex flex-col md:flex-row items-center justify-center gap-10">
      
      {/* 3 Circular Intersecting Images — Scaled Up slightly for custom screen harmony */}
      <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] max-w-full aspect-square text-[#1A1A1A]">
        
        {/* Circle 1 - Top Left */}
        <div className="absolute top-0 left-0 w-[195px] h-[195px] md:w-[265px] md:h-[265px] rounded-full overflow-hidden border-4 border-[#9CB49F] shadow-2xl z-10 bg-[#EADECE] flex items-center justify-center">
          <CrossfadeImage src={FOOD_IMAGES[index0]} alt="Artisanal Food Selection - Beanlore Kitchen" />
          <span className="font-serif text-[10px] text-stone-400 tracking-wider absolute bottom-3 z-30 select-none bg-black/30 backdrop-blur-xs px-2.5 py-0.5 text-white rounded-full">Beanlore Kitchen</span>
        </div>

        {/* Circle 2 - Bottom Left */}
        <div className="absolute bottom-2 left-2 w-[185px] h-[185px] md:w-[250px] md:h-[250px] rounded-full overflow-hidden border-4 border-[#9CB49F] shadow-2xl z-20 bg-[#D7E2D9] flex items-center justify-center">
          <CrossfadeImage src={FOOD_IMAGES[index1]} alt="Freshly Baked Specialty" />
        </div>

        {/* Circle 3 - Middle Right */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[210px] h-[210px] md:w-[285px] md:h-[285px] rounded-full overflow-hidden border-4 border-[#9CB49F] shadow-2xl z-30 bg-[#E0D7CD] flex items-center justify-center">
          <CrossfadeImage src={FOOD_IMAGES[index2]} alt="Premium Specialty Coffee Pairing" />
        </div>
      </div>

      {/* Opening Hours Rectangle */}
      <div className="absolute bottom-[-10px] md:bottom-auto md:top-[180px] right-2 md:-right-[60px] bg-[#E6D0BA] px-4 py-3 shadow-2xl border border-white/10 rounded-sm z-40 flex flex-col justify-center transform hover:-translate-y-1 transition-transform">
        <div className="flex items-center gap-2 mb-1">
          <Clock size={14} className="text-stone-800 stroke-[2.5]" />
          <h5 className="font-sans text-[12px] font-bold text-stone-900 leading-none">Opening Hours</h5>
        </div>
        <div className="pl-6">
          <span className="font-mono text-[11px] text-stone-800 font-bold tracking-wider whitespace-nowrap">{hours?.time}</span>
        </div>
      </div>

    </div>
  );
}
