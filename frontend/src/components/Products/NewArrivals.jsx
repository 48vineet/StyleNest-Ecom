import { useEffect, useRef, useState, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };
    fetchNewArrivals();
  }, []);

  const scroll = useCallback((direction) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const scrollAmount = direction === "left" ? -300 : 300;

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }, []);

  // Continuous smooth auto-scroll
  const startAutoScroll = useCallback(() => {
    const smoothScroll = () => {
      if (!scrollRef.current || isPaused || isDragging) {
        animationRef.current = requestAnimationFrame(smoothScroll);
        return;
      }

      const container = scrollRef.current;
      const isAtEnd =
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth - 1;

      if (isAtEnd) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 1; // Continuous smooth scroll speed
      }

      animationRef.current = requestAnimationFrame(smoothScroll);
    };

    animationRef.current = requestAnimationFrame(smoothScroll);
  }, [isPaused, isDragging]);

  const stopAutoScroll = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (newArrivals.length > 0) {
      startAutoScroll();
    }

    return () => stopAutoScroll();
  }, [newArrivals, startAutoScroll, stopAutoScroll]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleOnMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleOnMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleOnMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setTimeout(() => {
        setIsPaused(false);
      }, 500);
    }
  };

  const updateScrollButton = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScrollPosition = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScrollPosition + container.clientWidth;
      setCanScrollLeft(leftScrollPosition > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButton);
      updateScrollButton();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButton);
      }
    };
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 lg:px-0">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
          Explore New Arrivals
        </h2>
        <p className="text-lg text-gray-600 mb-9">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>
        <div className="w-24 h-px bg-gray-900 mx-auto mb-6"> </div>
        <br />
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => {
              scroll("left");
              setIsPaused(true);
              setTimeout(() => {
                setIsPaused(false);
              }, 1000);
            }}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full border border-black transition-all duration-300 ${
              canScrollLeft
                ? "bg-white text-black hover:bg-gray-100"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => {
              scroll("right");
              setIsPaused(true);
              setTimeout(() => {
                setIsPaused(false);
              }, 1000);
            }}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border border-black transition-all duration-300 ${
              canScrollRight
                ? "bg-white text-black hover:bg-gray-100"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      <div
        onMouseDown={handleOnMouseDown}
        onMouseMove={handleOnMouseMove}
        onMouseUp={handleOnMouseUpOrLeave}
        onMouseLeave={() => {
          handleOnMouseUpOrLeave();
          handleMouseLeave();
        }}
        onMouseEnter={handleMouseEnter}
        ref={scrollRef}
        className={`container mx-auto overflow-x-auto flex space-x-6 relative scrollbar-hide ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <img
              draggable="false"
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[500px] object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur-sm text-gray-900 p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium text-lg">{product.name}</h4>
                <p className="mt-1 text-xl font-semibold">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
