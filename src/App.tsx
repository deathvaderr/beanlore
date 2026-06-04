import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Coffee, 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  X, 
  ChevronRight, 
  ChevronDown,
  ExternalLink,
  MessageSquare,
  MessageCircle,
  Compass,
  ArrowRight,
  Maximize2,
  FileText,
  Utensils
} from "lucide-react";
import ImageShowcase from "./components/ImageShowcase";
import FoodAndHoursDisplay from "./components/FoodAndHoursDisplay";
import { 
  CAFE_IMAGES, 
  CAFE_LOGO, 
  CAFE_REVIEWS, 
  DIGITAL_MENU
} from "./data";
import { BRANCH_CONFIG, BranchKey } from "./branchConfig";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("coffee-specialties");
  const [selectedReview, setSelectedReview] = useState<typeof CAFE_REVIEWS[0] | null>(null);
  
  // Load saved branch preference or fall back to HSR
  const [branch, setBranch] = useState<BranchKey>(() => {
    try {
      const saved = localStorage.getItem("beanlore_preferred_branch");
      if (saved && BRANCH_CONFIG[saved as BranchKey]) {
        return saved as BranchKey;
      }
    } catch (e) {}
    return "HSR";
  });

  const branchData = BRANCH_CONFIG[branch];
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);

  // Onboarding Screen visibility check
  const [showBranchOnboarding, setShowBranchOnboarding] = useState(() => {
    try {
      const skipSelection = localStorage.getItem("beanlore_skip_pref_selection") === "true";
      const hasSavedBranch = localStorage.getItem("beanlore_preferred_branch");
      return !(skipSelection && hasSavedBranch);
    } catch (e) {
      return true;
    }
  });

  const [tempBranch, setTempBranch] = useState<BranchKey>(branch);
  const [rememberDefault, setRememberDefault] = useState(true);

  // Curated descriptions/amenities for each branch card in the onboarding welcome splash
  const onboardingBranchDetails: Record<BranchKey, { slogan: string; amenities: string[] }> = {
    Jayanagar: {
      slogan: "Specialty workspace, conversation, and artisanal bakes",
      amenities: ["Private Work Pods", "In-House Roastery", "Valet Parking"]
    },
    HSR: {
      slogan: "A vibrant workspace hub pairing custom micro-roasts and fresh bakes",
      amenities: ["Brewing Labs", "Quiet Zones", "Ergonomic Chairs"]
    },
    Indiranagar: {
      slogan: "CMH Road premium gathering spot with stunning sourdough bites",
      amenities: ["Pet Friendly Patio", "Matcha Specialists", "Artistic Vibe"]
    },
    Whitefield: {
      slogan: "Premium workspace sanctuary focused on high-speed co-working",
      amenities: ["Focus Desks", "Gigabit Wi-Fi", "Quiet Working Zone"]
    }
  };

  const handleEnterCafe = (selectedKey: BranchKey) => {
    setBranch(selectedKey);
    try {
      localStorage.setItem("beanlore_preferred_branch", selectedKey);
      if (rememberDefault) {
        localStorage.setItem("beanlore_skip_pref_selection", "true");
      } else {
        localStorage.removeItem("beanlore_skip_pref_selection");
      }
    } catch (e) {}
    setShowBranchOnboarding(false);
  };

  // Dynamic real-time calculation for opening status (10 AM - 10 PM IST)
  const getCalculatedStatus = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istDate = new Date(utc + (3600000 * 5.5)); // IST = UTC + 5.5
    const hours = istDate.getHours();
    const minutes = istDate.getMinutes();
    const timeInMinutes = hours * 60 + minutes;
    
    const openTime = 10 * 60;   // 10:00 AM
    const closeTime = 22 * 60;  // 10:00 PM
    
    if (timeInMinutes >= openTime && timeInMinutes < closeTime) {
      const remainingMinutes = closeTime - timeInMinutes;
      const remainingHours = Math.floor(remainingMinutes / 60);
      const mins = remainingMinutes % 60;
      let timeStr = "";
      if (remainingHours > 0) timeStr += `${remainingHours}h `;
      timeStr += `${mins}m`;
      return {
        isOpen: true,
        message: "BREWING NOW",
        subMessage: `Beanlore is open right now. Stop by for an exceptional experience! Closes in ${timeStr}.`
      };
    } else {
      let minsToOpen;
      if (timeInMinutes < openTime) {
        minsToOpen = openTime - timeInMinutes;
      } else {
        minsToOpen = (24 * 60 - timeInMinutes) + openTime;
      }
      const remainingHours = Math.floor(minsToOpen / 60);
      const mins = minsToOpen % 60;
      let timeStr = "";
      if (remainingHours > 0) timeStr += `${remainingHours}h `;
      timeStr += `${mins}m`;
      return {
        isOpen: false,
        message: "CLOSED FOR REFLECTION",
        subMessage: `We are currently resting our roasters. Opening doors again in ${timeStr} (at 10:00 AM).`
      };
    }
  };

  const [cafeOpenStatus, setCafeOpenStatus] = useState(getCalculatedStatus);

  useEffect(() => {
    const interval = setInterval(() => {
      setCafeOpenStatus(getCalculatedStatus());
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = `Beanlore | Workspace & Specialty Coffee, ${branchData.name}`;
  }, [branch, branchData.name]);

  // Prevent scroll background when menu or onboarding is active
  useEffect(() => {
    if (isMenuOpen || showBranchOnboarding) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, showBranchOnboarding]);

  // Click outside listener for branch dropdown
  useEffect(() => {
    const handleOutsideClick = () => {
      setIsBranchDropdownOpen(false);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Handle smooth scrolls
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#1A1A1A] font-sans antialiased selection:bg-[#9CB49F]/20 selection:text-[#9CB49F] flex flex-col relative" id="app-root-container">
      
      {/* COMPACT BRANCH ONBOARDING SCREEN */}
      <AnimatePresence>
        {showBranchOnboarding && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              y: -30,
              filter: "blur(8px)",
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 z-[100] bg-[#D7E2D9] text-[#1A1A1A] flex flex-col justify-start md:justify-center items-center overflow-y-auto px-4 py-6 sm:py-12 md:py-16 selection:bg-[#9CB49F]/20 selection:text-[#9CB49F] no-scrollbar"
            id="branch-onboarding-splash"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#9cb49f15_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
            
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-5 sm:gap-6 relative z-10 py-2 sm:py-6 md:my-auto">
              {/* Header block */}
              <motion.div 
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center max-w-xl flex flex-col items-center select-none mb-1 sm:mb-2"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-2.5 overflow-hidden">
                  <img 
                    src={CAFE_LOGO} 
                    alt="Beanlore Brand Logo" 
                    className="w-full h-full object-contain opacity-95"
                    referrerPolicy="no-referrer"
                    style={{ filter: "contrast(1.2)" }}
                  />
                </div>
                <p className="font-mono text-[#9CB49F] text-[9px] sm:text-[9.5px] uppercase tracking-[0.3em] font-bold">
                  BEANLORE COFFEE ROASTERS
                </p>
                <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-light tracking-tight mt-0.5 sm:mt-1 text-[#1A1A1A]">
                  Select Your Coffee Location
                </h1>
              </motion.div>

              {/* Grid block */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
                {(Object.keys(BRANCH_CONFIG) as BranchKey[]).map((key, index) => {
                  const config = BRANCH_CONFIG[key];
                  const isSelected = tempBranch === key;
                  
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                      whileHover={{ scale: 1.015, y: -2 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => setTempBranch(key)}
                      onDoubleClick={() => handleEnterCafe(key)}
                      className={`relative p-3.5 sm:p-4.5 rounded-sm border cursor-pointer select-none transition-all duration-300 flex flex-col justify-between ${
                        isSelected 
                          ? "border-[#9CB49F] bg-white shadow-[0_8px_30px_rgba(156,180,159,0.25)]" 
                          : "border-[#1A1A1A]/10 opacity-80 hover:opacity-100 bg-white/70 hover:bg-white/90 hover:border-[#1A1A1A]/20"
                      }`}
                    >
                      {/* Top Header Row: Rating */}
                      <div className="flex justify-end items-start">
                        <div className="flex items-center gap-0.5 font-mono text-[10px] sm:text-[11px] text-[#9CB49F] font-bold bg-[#9CB49F]/10 px-1.5 py-0.5 rounded-sm">
                          <span>★</span>
                          <span>{config.rating}</span>
                        </div>
                      </div>

                      {/* Main title info */}
                      <div className="mt-2.5">
                        <h3 className="font-serif text-[14px] sm:text-[17px] font-bold tracking-tight text-[#1A1A1A] leading-tight">
                          {config.name}
                        </h3>
                      </div>

                      {/* Active check target mark overlay */}
                      {isSelected && (
                        <motion.div 
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute top-2.5 right-2 bg-[#9CB49F] text-white w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Action layout panel */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-3.5 mt-2 w-full"
              >
                <label className="flex items-center gap-2 px-3 py-1.5 bg-white/40 hover:bg-white/80 rounded-full cursor-pointer select-none transition-all duration-300 border border-[#1A1A1A]/10 group">
                  <input 
                    type="checkbox" 
                    checked={rememberDefault} 
                    onChange={(e) => setRememberDefault(e.target.checked)}
                    className="rounded border-[#1A1A1A]/20 bg-white text-[#9CB49F] focus:ring-[#9CB49F]/30 h-3.5 w-3.5 accent-[#9CB49F]/80 cursor-pointer"
                  />
                  <span className="font-mono text-[8.5px] sm:text-[9.5px] text-stone-700 group-hover:text-[#1A1A1A] tracking-wider uppercase">
                    Remember preference and bypass this screen in the future
                  </span>
                </label>

                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleEnterCafe(tempBranch)}
                  className="px-6 py-3 bg-[#9CB49F] hover:bg-[#8AA28D] text-white font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 rounded-sm shadow-xl cursor-pointer hover:shadow-[0_4px_15px_rgba(156,180,159,0.25)] transition-all duration-300"
                >
                  Enter Café {BRANCH_CONFIG[tempBranch].name} <ChevronRight size={13} className="stroke-[2.5]" />
                </motion.button>
                
                <p className="font-mono text-[8.5px] text-stone-600 tracking-wider">
                  Tip: Switch neighborhood locations anytime via the header dropdown. Double-click a tile to enter.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* HEADER & STICKY NAVIGATION */}
      <header 
        className="sticky top-0 z-40 bg-[#F4F4F6]/80 backdrop-blur-md border-b border-[#1A1A1A]/10 px-4 md:px-8 py-2 md:py-3 transition-all duration-300"
        id="main-app-header"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo Brand Cluster */}
            <div className="flex items-center gap-2 md:gap-3">
              <div 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center relative cursor-pointer group shrink-0 mix-blend-multiply"
                id="brand-logo-trigger"
              >
                <img 
                  src={CAFE_LOGO} 
                  alt="Beanlore Symbol" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  style={{ filter: 'contrast(1.2)' }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-[26px] md:text-[36px] font-black tracking-[0.04em] uppercase text-[#1A1A1A] leading-none">
                  BEANLORE
                </span>
                <span className="font-mono text-[8px] md:text-[9px] text-stone-400 uppercase tracking-[0.2em] mt-0.5 select-none">
                  this is a model website
                </span>
                <div className="relative mt-0.5" id="header-branch-switcher-container">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsBranchDropdownOpen(!isBranchDropdownOpen);
                    }}
                    className="flex items-center gap-1 font-mono text-[10px] md:text-[11px] tracking-wider text-[#9CB49F] font-bold py-0.5 px-0.5 bg-transparent rounded-sm hover:text-[#1A1A1A] transition-colors cursor-pointer touch-manipulation"
                  >
                    {branchData.displayLabel} <ChevronDown size={12} className={`transition-transform duration-200 ${isBranchDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`absolute top-full left-0 mt-1.5 w-44 bg-white border border-[#1A1A1A]/10 shadow-2xl rounded-sm transition-all duration-200 z-50 overflow-hidden flex flex-col font-mono text-[10.5px] md:text-[11px] tracking-wider uppercase ${
                    isBranchDropdownOpen 
                      ? "opacity-100 translate-y-0 visible" 
                      : "opacity-0 -translate-y-1 invisible pointer-events-none"
                  }`}>
                    {(Object.keys(BRANCH_CONFIG) as BranchKey[]).map(key => (
                      <button 
                        key={key}
                        onClick={(e) => {
                          e.stopPropagation();
                          setBranch(key);
                          setIsBranchDropdownOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`px-4 py-3 text-left cursor-pointer transition-colors touch-manipulation min-h-[44px] border-b border-[#1A1A1A]/5 last:border-0 ${branch === key ? "text-[#1A1A1A] bg-[#F4F4F6] font-bold" : "text-[#9CB49F] hover:bg-[#F4F4F6] hover:text-[#1A1A1A]"}`}
                      >
                        {BRANCH_CONFIG[key].name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Links (Asymmetric minimalism) */}
            <nav className="hidden md:flex items-center gap-10 font-mono text-[11px] tracking-widest text-[#1A1A1A]/80 uppercase" id="nav-desktop-menu">
              {branchData.hasMenu && (
                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="hover:text-[#9CB49F] transition-colors cursor-pointer py-1 font-semibold flex items-center gap-1.5"
                  id="nav-link-menu"
                >
                  <Coffee size={12} className="text-[#9CB49F]" /> Menu
                </button>
              )}
              <button 
                onClick={() => scrollToSection("section-location")}
                className="hover:text-[#9CB49F] transition-colors cursor-pointer py-1 font-semibold"
                id="nav-link-location"
              >
                Location
              </button>
              <button 
                onClick={() => scrollToSection("section-contact")}
                className="hover:text-[#9CB49F] transition-colors cursor-pointer py-1 font-semibold"
                id="nav-link-contact"
              >
                Contact
              </button>
            </nav>

            {/* Primary CTA (Pale Green Accent) */}
            <div className="flex items-center gap-3 md:gap-5">
              <span className="hidden lg:inline-block text-[10px] uppercase tracking-tighter opacity-50 font-mono text-[#1A1A1A]">
                {branchData.name} • BLR
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* CINEMATIC PAGE TRANSITIONS ON BRANCH SWITCH */}
      <AnimatePresence mode="wait">
        <motion.main 
          key={branch}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1" 
          id="main-content-layout"
        >
        <section className="relative overflow-hidden w-full border-b border-[#1A1A1A]/10" id="section-hero">
          <ImageShowcase images={branchData.heroImages} />
        </section>

        {/* WELCOMING INTRO SECTION (DIRECTLY UNDER CAROUSEL WITH MAIN COPY) */}
        <section className="bg-gradient-to-br from-[#F4F4F6] to-stone-50/50 py-16 md:py-24 px-6 md:px-12 lg:px-16 border-b border-[#1A1A1A]/10 relative" id="section-intro">
          {/* Faint industrial wireframes in the background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-120px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto text-center md:text-left relative z-10"
          >
            <h1 className="font-serif text-3.5xl sm:text-4.5xl md:text-5xl font-light leading-tight mb-8 text-[#1A1A1A]">
              Where specialty coffee meets slow afternoons <br />
              <span className="text-[#9CB49F] font-semibold font-sans tracking-tight block mt-2">{branchData.subtitle}</span>
            </h1>
            
            <p className="text-stone-600 text-sm md:text-base leading-relaxed mb-10 font-light max-w-3xl whitespace-pre-line">
              {branchData.about}
            </p>

            {/* Primary Action Buttons */}
            {branchData.hasMenu && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => {
                    setIsMenuOpen(true);
                  }}
                  className="bg-[#9CB49F] text-white px-8 py-3.5 text-xs uppercase tracking-widest font-bold hover:brightness-110 transition-all rounded-sm cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  id="btn-hero-digital-menu"
                >
                  Explore Menu
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </motion.div>
        </section>

        {/* OPERATION HOURS & ESSENCE SHOWCASE */}
        <section className="bg-[#D7E2D9] text-[#1A1A1A] py-20 md:py-28 px-6 md:px-12 lg:px-16 border-b border-[#1A1A1A]/10 relative overflow-hidden" id="section-experience">
          {/* Subtle design accents */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/15 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            
            {/* Left Column: Food and Hours Display */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-120px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col items-center justify-center gap-6"
            >
              <FoodAndHoursDisplay branch={branch} />
              
              {/* Cool real-time status card block (Brewing / Reflection) right below the beverage */}
              <div className="w-full max-w-[340px] sm:max-w-[380px] px-4">
                <div className="bg-white/80 p-5 shadow-xl border border-[#1A1A1A]/10 flex gap-4 items-start rounded-sm">
                  <div className="w-2.5 h-2.5 rounded-full mt-1.5 relative shrink-0 flex items-center">
                    <span className={`h-2.5 w-2.5 rounded-full ${cafeOpenStatus.isOpen ? "bg-[#15C33C] animate-ping" : "bg-[#9CB49F]"}`}></span>
                    <span className={`h-2.5 w-2.5 rounded-full ${cafeOpenStatus.isOpen ? "bg-[#15C33C]" : "bg-[#9CB49F]"} absolute`}></span>
                  </div>
                  <div className="space-y-1 text-left">
                    <span className="font-mono text-[10px] text-[#9CB49F] uppercase tracking-widest font-bold block">
                      {cafeOpenStatus.message}
                    </span>
                    <p className="text-stone-700 text-xs sm:text-[13px] font-light leading-relaxed">
                      {cafeOpenStatus.subMessage}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Local specialty features */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-120px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              className="lg:col-span-6 space-y-10"
            >
              {/* Simple View Us On Links - Balanced 2x2 Grid with Real Brand Logos */}
              <div className="border-t border-[#1A1A1A]/15 pt-8 mt-6">
                <span className="font-mono text-[9.5px] text-stone-700 uppercase tracking-[0.25em] font-semibold block mb-3">
                  FIND US ON
                </span>
                
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  {/* Zomato */}
                  {branchData.zomato !== "#" && (
                    <a 
                      href={branchData.zomato} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3.5 py-2.5 bg-white/40 border border-[#1A1A1A]/10 hover:border-red-500/30 hover:bg-white/90 text-stone-800 hover:text-[#1A1A1A] transition-all rounded-sm cursor-pointer group"
                      id="btn-zomato-badge"
                    >
                      <svg className="w-4 h-4 text-[#E23744] shrink-0 group-hover:scale-115 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 6h14L5 18h14" />
                      </svg>
                      <span className="font-sans text-xs font-semibold tracking-wide text-stone-700 group-hover:text-[#1A1A1A] transition-colors">Zomato</span>
                    </a>
                  )}

                  {/* District */}
                  {branchData.district !== "#" && (
                    <a 
                      href={branchData.district} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3.5 py-2.5 bg-white/40 border border-[#1A1A1A]/10 hover:border-[#A855F7]/30 hover:bg-white/90 text-stone-800 hover:text-[#1A1A1A] transition-all rounded-sm cursor-pointer group"
                      id="btn-district-badge"
                    >
                      <svg className="w-4 h-4 text-[#A855F7] shrink-0 group-hover:scale-115 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 21V3c5 0 9 4.5 9 9s-4 9-9 9Z" />
                      </svg>
                      <span className="font-sans text-xs font-semibold tracking-wide text-stone-700 group-hover:text-[#1A1A1A] transition-colors">District</span>
                    </a>
                  )}

                  {/* Instagram Reels */}
                  <a 
                    href="https://www.instagram.com/beanloreindia/?hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3.5 py-2.5 bg-white/40 border border-[#1A1A1A]/10 hover:border-[#E1306C]/30 hover:bg-white/90 text-stone-800 hover:text-[#1A1A1A] transition-all rounded-sm cursor-pointer group"
                    id="btn-insta-badge"
                  >
                    <Instagram size={15} className="text-[#E1306C] shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-sans text-xs font-semibold tracking-wide text-stone-700 group-hover:text-[#1A1A1A] transition-colors">Instagram</span>
                  </a>

                  {/* Swiggy */}
                  {branchData.swiggy !== "#" && (
                    <a 
                      href={branchData.swiggy} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3.5 py-2.5 bg-white/40 border border-[#1A1A1A]/10 hover:border-[#FC8019]/30 hover:bg-white/90 text-stone-800 hover:text-[#1A1A1A] transition-all rounded-sm cursor-pointer group"
                      id="btn-swiggy-badge"
                    >
                      <span className="text-[#FC8019] font-bold shrink-0 group-hover:scale-110 transition-transform duration-300 text-[15px] flex items-center justify-center w-4 h-4 leading-none">S</span>
                      <span className="font-sans text-xs font-semibold tracking-wide text-stone-700 group-hover:text-[#1A1A1A] transition-colors">Swiggy</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* GOOGLE RATING STATS & AUTO-CYCLING VISITOR REVIEWS */}
        <section 
          className="bg-[#D7E2D9] text-[#1A1A1A] py-16 border-b border-[#1A1A1A]/15 relative overflow-hidden" 
          id="reviews-section"
        >
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-120px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl mx-auto px-6 mb-12"
          >
            {/* Google rating stats overview - Moved Up as requested */}
            <div className="bg-white/90 border border-[#1A1A1A]/10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8" id="google-ratings-top-bar">
              {/* Left Column: Overall Big score with stars */}
              <div className="flex items-center gap-6 text-center md:text-left">
                <div>
                  <span className="font-sans text-6xl font-extrabold tracking-tight text-[#1A1A1A] block">{branchData.rating}</span>
                  <span className="font-mono text-[10px] text-stone-600 uppercase tracking-widest mt-1 block">{branchData.reviewsCount}</span>
                </div>
                <div className="h-14 w-[1px] bg-[#1A1A1A]/15 hidden md:block" />
                <div>
                  <div className="flex items-center gap-0.5 text-amber-500 text-xl justify-center md:justify-start">
                    {Array.from({ length: Math.floor(parseFloat(branchData.rating)) }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                    {/* Empty Star roughly for fractional */}
                    <span className="relative inline-block select-none leading-none">
                      <span className="text-stone-300">★</span>
                      <span className="absolute top-0 left-0 overflow-hidden text-amber-500" style={{ width: `${(parseFloat(branchData.rating) % 1) * 100}%` }}>★</span>
                    </span>
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-[#9CB49F] uppercase font-bold mt-1.5 block">GOOGLE BUSINESS REVIEW</span>
                </div>
              </div>

              {/* Middle Column: Progress bars */}
              <div className="w-full max-w-xs flex flex-col gap-1.5 pt-0.5">
                {(branchData.starDistribution || ["90%", "20%", "10%", "8%", "18%"]).map((width: string, i: number) => {
                  const label = (5 - i).toString();
                  return (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-stone-500 text-[10px] w-2 text-right">{label}</span>
                      <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Verified symbol */}
              <div className="text-center md:text-right flex flex-col items-center md:items-end gap-2">
                <span className="inline-flex items-center gap-1 bg-[#15C33C]/10 text-[#15C33C] px-2 py-1 rounded-sm font-mono text-[9px] font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#15C33C]"></span> VERIFIED LISTING
                </span>
              </div>
            </div>
          </motion.div>

          {/* Subheading: Voices from Beanlore */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-120px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="max-w-6xl mx-auto px-6 mb-8 text-center md:text-left"
          >
            <p className="font-mono text-[#9CB49F] text-xs tracking-widest uppercase mb-1 font-semibold">VOICES FROM BEANLORE</p>
          </motion.div>

          {/* SILLY MARQUEE TRACK - Seamless infinite auto-scrolling loop, hover to pause */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-120px" }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full relative py-2 overflow-hidden select-none group" 
            id="ticker-container"
          >
            <div className="flex w-max gap-8 whitespace-nowrap">
              
              {/* Loop Track 1 */}
              <div className="flex gap-8 animate-marquee shrink-0 items-stretch py-4">
                {branchData.reviews.map((review: any, idx: number) => {
                  const limit = 160;
                  const isLong = review.text.length > limit;
                  return (
                    <div 
                      key={`t1-${idx}`} 
                      className="w-[340px] sm:w-[380px] bg-white border border-[#1A1A1A]/10 p-6 flex flex-col justify-between whitespace-normal hover:border-[#9CB49F] transition-colors duration-300 rounded-sm shadow-sm"
                    >
                      <div>
                        {/* Rating stars */}
                        <div className="flex items-center gap-0.5 text-amber-500 text-xs mb-3">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                          {Array.from({ length: 5 - review.rating }).map((_, i) => (
                            <span key={i} className="text-stone-200">★</span>
                          ))}
                        </div>
                        
                        <p className="text-stone-800 text-[13px] leading-relaxed italic mb-4 font-light">
                          &ldquo;
                          {isLong ? `${review.text.slice(0, limit)}...` : review.text}
                          &rdquo;
                          {isLong && (
                            <button
                              onClick={() => setSelectedReview(review)}
                              className="ml-2 text-[#9CB49F] text-[11px] font-mono hover:underline uppercase tracking-wider font-semibold cursor-pointer inline-block"
                            >
                              Read More
                            </button>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-6 border-t border-[#1A1A1A]/5 pt-3">
                        <div>
                          <span className="font-sans text-xs font-semibold text-[#1A1A1A] block">{review.name}</span>
                          <span className="font-mono text-[9px] tracking-wider text-stone-500 uppercase mt-0.5">{review.context}</span>
                        </div>
                        <span className="text-[#9CB49F]/25 font-serif text-3xl leading-none">”</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Loop Track 2 (Clone for infinite seamless marquee sliding) */}
              <div className="flex gap-8 animate-marquee shrink-0 items-stretch py-4">
                {branchData.reviews.map((review: any, idx: number) => {
                  const limit = 160;
                  const isLong = review.text.length > limit;
                  return (
                    <div 
                      key={`t2-${idx}`} 
                      className="w-[340px] sm:w-[380px] bg-white border border-[#1A1A1A]/10 p-6 flex flex-col justify-between whitespace-normal hover:border-[#9CB49F] transition-colors duration-300 rounded-sm shadow-sm"
                    >
                      <div>
                        {/* Rating stars */}
                        <div className="flex items-center gap-0.5 text-amber-500 text-xs mb-3">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                          {Array.from({ length: 5 - review.rating }).map((_, i) => (
                            <span key={i} className="text-stone-200">★</span>
                          ))}
                        </div>
                        
                        <p className="text-stone-800 text-[13px] leading-relaxed italic mb-4 font-light">
                          &ldquo;
                          {isLong ? `${review.text.slice(0, limit)}...` : review.text}
                          &rdquo;
                          {isLong && (
                            <button
                              onClick={() => setSelectedReview(review)}
                              className="ml-2 text-[#9CB49F] text-[11px] font-mono hover:underline uppercase tracking-wider font-semibold cursor-pointer inline-block"
                            >
                              Read More
                            </button>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-6 border-t border-[#1A1A1A]/5 pt-3">
                        <div>
                          <span className="font-sans text-xs font-semibold text-[#1A1A1A] block">{review.name}</span>
                          <span className="font-mono text-[9px] tracking-wider text-stone-500 uppercase mt-0.5">{review.context}</span>
                        </div>
                        <span className="text-[#9CB49F]/25 font-serif text-3xl leading-none font-bold">”</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </motion.div>
        </section>

        {/* OTHER BRANCHES MINIMAL SELECTION SECTION */}
        <section className="bg-[#D7E2D9] pb-24 pt-4 border-b border-[#1A1A1A]/10 relative overflow-hidden" id="section-other-branches">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-120px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl mx-auto px-6"
          >
            <div className="border-t border-[#1A1A1A]/15 pt-16">
              <span className="font-mono text-[#9CB49F] text-[9px] tracking-[0.3em] uppercase block mb-3 text-center md:text-left font-bold">
                EXPLORE BENGALURU
              </span>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 text-center md:text-left">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                    Our Other Cozy Work & Coffee Spaces
                  </h3>
                </div>
              </div>

              {/* 3 other branches in linear arrangement */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="other-branches-list">
                {(Object.keys(BRANCH_CONFIG) as BranchKey[])
                  .filter((key) => key !== branch) // only show 3 other branches
                  .map((key, index) => {
                    const other = BRANCH_CONFIG[key];
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 45 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-120px" }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 + index * 0.15 }}
                        onClick={() => {
                          setBranch(key);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="group relative bg-white border border-[#1A1A1A]/10 hover:border-[#9CB49F] p-6 flex flex-col justify-between transition-all duration-300 rounded-sm cursor-pointer select-none active:scale-[0.98] min-h-[160px] shadow-sm hover:shadow-md"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif text-lg font-bold text-[#1A1A1A] group-hover:text-[#9CB49F] transition-colors duration-300">
                              {other.name}
                            </h4>
                            <span className="text-stone-500 font-mono text-[9.5px] tracking-wider uppercase">
                              BLR
                            </span>
                          </div>
                          <p className="text-stone-600 text-xs font-light mt-2 line-clamp-2">
                            {other.about}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-6 pt-3 border-t border-[#1A1A1A]/10">
                          <span className="text-[10px] font-mono font-bold tracking-widest text-stone-700 group-hover:text-[#9CB49F] uppercase transition-colors duration-300 flex items-center gap-1">
                            Visit Space <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                          <span className="text-[9px] font-mono text-[#9CB49F] font-bold">
                            {other.rating} ★
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        </section>

        {/* LOCATION & INTEGRATED GOOGLE MAPS IFRAME COMPONENT */}
        <section className="bg-[#F4F4F6] py-16 md:py-24 border-b border-[#1A1A1A]/10 px-4 md:px-8" id="section-location">
          <div className="max-w-7xl mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column Address Info */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-120px" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#9CB49F] text-white font-mono text-[9.5px] uppercase tracking-widest mb-6 rounded-sm">
                    Beanlore // {branchData.displayLabel}
                  </div>
                  
                  {/* Concrete block table stats */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-3.5">
                      <MapPin size={18} className="text-[#9CB49F] mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-mono text-[10px] tracking-widest text-stone-400 uppercase mb-1">ADDRESS</h4>
                        <p className="text-sm text-[#1A1A1A] font-medium">
                          {branchData.address1} <br />
                          {branchData.address2}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 pt-4">
                      <Phone size={18} className="text-[#9CB49F] mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-mono text-[10px] tracking-widest text-stone-400 uppercase mb-1">COMMUNICATION</h4>
                        <p className="text-sm text-[#1A1A1A]">
                          Phone: <a href={`tel:${branchData.phone.replace(/\s+/g, '')}`} className="underline font-mono text-[#9CB49F] hover:text-[#1A1A1A] transition-colors">{branchData.phone}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>

              {/* Right Column Maps Embed with exact coordinates */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-120px" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                className="lg:col-span-7" 
                id="map-iframe-container"
              >
                <div className="bg-stone-200 border border-[#1A1A1A]/10 p-2.5 relative flex flex-col">
                  {/* Subtle coordinates aesthetic labels */}
                  <div className="flex items-center justify-between pb-2 bg-[#F4F4F6] px-2 text-[10px] text-stone-500 font-mono">
                    <span>SECTOR 1 — BEANLORE PORTAL</span>
                    <span>COORDS: {branchData.mapCoords}</span>
                  </div>
                  
                  <div className="w-full aspect-[16/10] overflow-hidden bg-stone-300 relative border border-[#1A1A1A]/10">
                    <iframe 
                      title="Beanlore -  Location Map"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(branchData.mapQuery)}&t=m&z=17&ie=UTF8&iwloc=&output=embed`}
                      width="100%" 
                      height="100%" 
                      style={{ border: 0, filter: "grayscale(1) contrast(1.1) brightness(0.95)" }} 
                      allowFullScreen={false} 
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      id="gmaps-iframe"
                    />
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </section>

        </motion.main>
      </AnimatePresence>

      {/* FOOTER SECTION & SOCIAL BRIDGES */}
      <footer className="bg-[#D7E2D9] text-stone-700 py-16 px-4 md:px-8 border-t border-[#1A1A1A]/10" id="section-contact">
        <motion.div 
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto"
        >
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-16 border-b border-[#1A1A1A]/10">
            
            {/* Column 1: Brand statement */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded flex items-center justify-center mix-blend-multiply">
                  <img src={CAFE_LOGO} alt="Beanlore Symbol" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-[14px] font-bold text-[#1A1A1A] tracking-widest uppercase mb-1">BEANLORE</span>
                </div>
              </div>
            </div>

            {/* Column 2: Section links */}
            <div className="md:col-span-7 space-y-3">
              <h4 className="font-mono text-[9px] text-[#9CB49F] tracking-widest uppercase font-semibold">HOTLINKS</h4>
              <ul className="text-xs text-stone-800 space-y-2 font-medium">
                {branchData.hasMenu && (
                  <li><button onClick={() => { setIsMenuOpen(true); }} className="hover:text-[#9CB49F] transition-colors cursor-pointer">Menu</button></li>
                )}
                <li><button onClick={() => scrollToSection("section-location")} className="hover:text-[#9CB49F] transition-colors cursor-pointer">Interactive Location Module</button></li>
                {branchData.zomato !== "#" && (
                  <li><a href={branchData.zomato} target="_blank" rel="noopener noreferrer" className="hover:text-[#9CB49F] transition-colors">Zomato Dining & Menu</a></li>
                )}
                {branchData.swiggy !== "#" && (
                  <li><a href={branchData.swiggy} target="_blank" rel="noopener noreferrer" className="hover:text-[#9CB49F] transition-colors">Swiggy Dining</a></li>
                )}
                {branchData.district !== "#" && (
                  <li><a href={branchData.district} target="_blank" rel="noopener noreferrer" className="hover:text-[#9CB49F] transition-colors">District Dining Discovery</a></li>
                )}
                <li><a href="https://www.instagram.com/beanloreindia/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-[#9CB49F] transition-colors">Instagram Page</a></li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-8 text-[10px] font-mono text-stone-600 gap-4">
            <div>
              © {new Date().getFullYear()} BEANLORE. ALL RIGHTS RESERVED.
            </div>
          </div>

        </motion.div>
      </footer>


      {/* FLOATING ACTION INTERACTIVE BUTTONS */}
      
      {/* Target Bottom-Right: Floating Reserve a Table button - positioned at bottom-8 */}
      {branchData.reserveTableUrl && (
        <a 
          href={branchData.reserveTableUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 px-6 py-3 bg-[#9CB49F] text-white rounded-full flex items-center gap-3 shadow-lg hover:brightness-110 transition-all z-30 touch-manipulation hover:scale-105 active:scale-95 font-sans cursor-pointer whitespace-nowrap"
          title="Reserve a Table at Beanlore"
          id="floating-reserve-table-btn"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold font-mono">Reserve Table</span>
          <Utensils size={15} strokeWidth={2.5} className="text-white" />
        </a>
      )}
      
      {/* Target Bottom-Right: Permanent elegant Toggle Menu button - positioned above Reserve Table when available */}
      <button 
        onClick={() => setIsMenuOpen(true)}
        className={`fixed ${branchData.reserveTableUrl ? "bottom-20" : "bottom-8"} right-8 px-6 py-3 bg-[#9CB49F] text-white rounded-full flex items-center gap-3 shadow-lg hover:brightness-110 transition-all z-30 touch-manipulation hover:scale-105 active:scale-95 font-sans cursor-pointer`}
        title="Explore interactive digital menu"
        id="floating-menu-toggle-btn"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold font-mono">Open Menu</span>
        <Coffee size={16} strokeWidth={2.5} className="animate-pulse" />
      </button>


      {/* INTERACTIVE DIGITAL MENU STATE-DRIVEN OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#D7E2D9]/90 backdrop-blur-md flex justify-end"
            id="menu-overlay-modal"
          >
            {/* Modal Box */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="w-full max-w-2xl bg-[#F4F4F6] text-[#1A1A1A] h-full flex flex-col relative border-l border-[#1A1A1A]/20"
            >
              
              {/* Header inside overlay */}
              <div className="p-6 md:p-8 border-b border-[#1A1A1A]/10 flex items-center justify-between bg-[#F4F4F6] sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 mix-blend-multiply flex items-center justify-center">
                    <img src={CAFE_LOGO} alt="Beanlore Symbol" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold tracking-widest text-[#1A1A1A] uppercase">BEANLORE MENU</h3>
                    <p className="font-mono text-[9px] tracking-wider text-[#9CB49F]">Craft Espresso & Manual Micro-Roast</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 border border-[#1A1A1A]/20 hover:border-[#9CB49F] hover:bg-[#9CB49F] hover:text-[#1A1A1A] flex items-center justify-center transition-all duration-300"
                  aria-label="Close menu overlay"
                  id="btn-close-menu-overlay"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* OVERLAY PANEL BODY CONTENT */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-8">
                
                  <div className="space-y-8" id="digital-menu-tab-content">
                    
                    {/* Category quick filters */}
                    <div className="flex flex-wrap gap-2 pb-4 border-b border-[#1A1A1A]/5">
                      {DIGITAL_MENU.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`px-3 py-1.5 font-mono text-[9px] tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                            selectedCategory === category.id
                              ? "bg-[#9CB49F] text-white border-[#9CB49F]"
                              : "border-stone-300 text-[#1A1A1A]/70 hover:border-[#1A1A1A]"
                          }`}
                          id={`category-filter-${category.id}`}
                        >
                          {category.title}
                        </button>
                      ))}
                    </div>

                    {/* Selected Category Content Card layout */}
                    <div>
                      {DIGITAL_MENU.filter(c => c.id === selectedCategory).map((category) => (
                        <div key={category.id} className="space-y-6">
                          <div className="flex items-center justify-between pb-2 border-b border-[#1A1A1A]/10">
                            <span className="font-serif text-lg italic text-[#9CB49F]">{category.title} Catalog</span>
                            <span className="font-mono text-[9px] tracking-widest text-[#1A1A1A]/40 uppercase">
                              {category.items.length} options listed
                            </span>
                          </div>

                          <div className="space-y-6 divide-y divide-[#1A1A1A]/5">
                            {category.items.map((item, keyIdx) => (
                              <div 
                                key={keyIdx} 
                                className={`pt-6 ${keyIdx === 0 ? "pt-0" : ""} flex flex-col sm:flex-row sm:items-start justify-between gap-3 group`}
                              >
                                <div className="space-y-1.5 max-w-md">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-serif text-[17px] font-semibold text-[#1A1A1A] group-hover:text-[#9CB49F] transition-colors">
                                      {item.name}
                                    </h4>
                                    
                                    {/* Item decorative labels */}
                                    {item.tags?.map((tag, tIdx) => (
                                      <span 
                                        key={tIdx} 
                                        className="font-mono text-[8px] bg-[#1A1A1A]/5 text-[#1A1A1A]/60 px-1.5 py-0.5"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                  
                                  <p className="text-stone-500 text-xs font-light leading-relaxed">
                                    {item.description}
                                  </p>
                                </div>
                                
                                <div className="font-mono text-xs font-bold text-[#1A1A1A] self-start sm:self-center shrink-0">
                                  ₹{Number(item.price).toFixed(2)}
                                </div>
                              </div>
                            ))}
                          </div>

                        </div>
                      ))}
                    </div>



                  </div>

              </div>

              {/* Footer sticky bar inside menu overlay */}
              <div className="p-6 border-t border-[#1A1A1A]/10 bg-stone-100 text-center">
                <span className="font-mono text-[10px] text-stone-500">
                  All prices are inclusive of taxes. Enjoy your brewing experience.
                </span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* FULL EXPANDED REVIEW LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedReview(null)}
            className="fixed inset-0 z-55 bg-[#D7E2D9]/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
            id="review-lightbox-modal"
          >
            <div 
              className="relative max-w-xl w-full bg-white border border-[#1A1A1A]/10 p-8 sm:p-10 flex flex-col justify-between shadow-2xl rounded-sm cursor-default" 
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedReview(null)}
                className="absolute top-4 right-4 bg-transparent text-stone-500 hover:text-[#1A1A1A] transition-colors cursor-pointer w-8 h-8 flex items-center justify-center"
                aria-label="Close review details"
                id="btn-close-review-modal"
              >
                <X size={20} />
              </button>
              
              <div className="pb-4">
                <div className="flex items-center gap-0.5 text-amber-500 text-sm mb-4">
                  {Array.from({ length: selectedReview.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  {Array.from({ length: 5 - selectedReview.rating }).map((_, i) => (
                    <span key={i} className="text-stone-200">★</span>
                  ))}
                </div>
                
                <p className="text-stone-800 text-[15px] sm:text-[16px] leading-relaxed italic font-light">
                  &ldquo;{selectedReview.text}&rdquo;
                </p>
              </div>
              
              <div className="flex items-center justify-between border-t border-[#1A1A1A]/10 pt-4 mt-6">
                <div>
                  <span className="font-sans text-sm font-semibold text-[#1A1A1A] block">{selectedReview.name}</span>
                  <span className="font-mono text-[9px] tracking-widest text-[#9CB49F] uppercase font-bold block mt-1">{selectedReview.context}</span>
                </div>
                <span className="text-[#9CB49F]/25 font-serif text-5xl leading-none select-none">”</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING CALL ICON FOR CURRENT BRANCH */}
      {branchData.phone && (
        <a
          href={`tel:${branchData.phone.replace(/\s+/g, '')}`}
          className="fixed bottom-6 left-6 z-50 bg-[#9CB49F] hover:bg-[#8AA28D] text-[#1A1A1A] p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgb(156,180,159,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer group"
          aria-label={`Call Beanlore ${branchData.name}`}
          id="btn-floating-call"
        >
          <Phone size={22} className="group-hover:animate-pulse" />
        </a>
      )}
      
    </div>
  );
}
