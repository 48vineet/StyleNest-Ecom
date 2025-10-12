import React, { useState, useEffect } from "react";
import heroImg from "../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      if (!isMobile) {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Floating Elements for Vacation Theme - Simplified for Mobile */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {/* Floating Palm Leaves */}
          <div
            className="absolute top-20 left-10 w-8 h-8 opacity-20"
            style={{
              transform: `translate(${mousePosition.x * 0.1}px, ${
                mousePosition.y * 0.1 + scrollY * 0.1
              }px) rotate(${scrollY * 0.2}deg)`,
            }}
          >
            <div className="text-white text-2xl">🌴</div>
          </div>

          <div
            className="absolute top-40 right-20 w-6 h-6 opacity-15"
            style={{
              transform: `translate(${mousePosition.x * -0.08}px, ${
                mousePosition.y * -0.08 + scrollY * 0.15
              }px) rotate(${scrollY * -0.3}deg)`,
            }}
          >
            <div className="text-white text-xl">☀️</div>
          </div>

          <div
            className="absolute bottom-40 right-10 w-5 h-5 opacity-25"
            style={{
              transform: `translate(${mousePosition.x * 0.12}px, ${
                mousePosition.y * 0.12 + scrollY * -0.1
              }px) rotate(${scrollY * 0.4}deg)`,
            }}
          >
            <div className="text-white text-lg">🏖️</div>
          </div>

          {/* Subtle Gradient Orbs */}
          <div
            className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-orange-400/10 to-pink-400/10 blur-xl"
            style={{
              transform: `translate(${mousePosition.x * 0.05}px, ${
                mousePosition.y * 0.05
              }px)`,
            }}
          ></div>

          <div
            className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full bg-gradient-to-r from-blue-400/10 to-teal-400/10 blur-xl"
            style={{
              transform: `translate(${mousePosition.x * -0.03}px, ${
                mousePosition.y * -0.03
              }px)`,
            }}
          ></div>
        </div>
      )}

      {/* Mobile-only simple decorative elements */}
      {isMobile && (
        <div className="absolute inset-0 pointer-events-none md:hidden">
          <div className="absolute top-20 right-6 opacity-20 animate-float">
            <div className="text-white text-xl">🌴</div>
          </div>
          <div className="absolute bottom-32 left-6 opacity-15 animate-float-delayed">
            <div className="text-white text-lg">☀️</div>
          </div>
        </div>
      )}

      {/* Parallax Image - Reduced effect on mobile */}
      <img
        src={heroImg}
        alt="Summer Collection"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: isMobile
            ? `translateY(${scrollY * 0.3}px)`
            : `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0001})`,
        }}
      />

      {/* Dynamic Overlay - Simplified for mobile */}
      <div
        className="absolute inset-0"
        style={{
          background: isMobile
            ? "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 100%)"
            : `linear-gradient(135deg, rgba(0,0,0,${
                0.2 + scrollY * 0.0005
              }) 0%, rgba(0,0,0,${0.25 + scrollY * 0.0003}) 50%, rgba(0,0,0,${
                0.4 + scrollY * 0.0002
              }) 100%)`,
        }}
      ></div>

      {/* Content with Counter Parallax - Reduced effect on mobile */}
      <div
        className="relative h-full flex items-end pb-16 md:pb-20 lg:pb-32 px-4 md:px-6 lg:px-16 max-w-7xl mx-auto"
        style={{
          transform: isMobile
            ? `translateY(${scrollY * -0.1}px)`
            : `translateY(${scrollY * -0.2}px)`,
        }}
      >
        <div className="max-w-2xl w-full">
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase mb-4 tracking-tight opacity-0 animate-fade-in-up relative leading-none">
            Vacation
            <br />
            Ready
            {/* Subtle glow effect - only on desktop */}
            {!isMobile && (
              <div className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-orange-200/20 to-pink-200/20 blur-sm -z-10 hidden md:block">
                Vacation
                <br />
                Ready
              </div>
            )}
          </h1>

          <p className="text-white/90 text-base md:text-lg lg:text-xl mb-6 md:mb-8 font-light opacity-0 animate-fade-in-up animation-delay-200 relative">
            Fast worldwide shipping
            <span className="absolute -right-6 md:-right-8 top-0 text-orange-300/60 animate-pulse text-sm md:text-base">
              ✈️
            </span>
          </p>

          <Link
            to="/shop"
            className="group inline-block bg-white text-black px-6 md:px-8 py-3 md:py-3 text-xs md:text-sm uppercase font-medium tracking-wider hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white transition-all duration-300 md:duration-500 overflow-hidden relative opacity-0 animate-fade-in-up animation-delay-400 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 touch-manipulation"
          >
            <span className="relative z-10">Shop Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 md:duration-500"></div>

            {/* Shimmer effect - only on desktop */}
            {!isMobile && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:animate-shimmer hidden md:block"></div>
            )}
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(-3deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-200%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animate-shimmer {
          animation: shimmer 0.6s ease-out;
        }

        .touch-manipulation {
          touch-action: manipulation;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .animate-fade-in-up {
            animation-duration: 0.4s;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
