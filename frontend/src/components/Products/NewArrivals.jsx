import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0); // Corrected state variable
  const [canScrollLeft, setCanScrollLeft] = useState(false); // Corrected state variable
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [newArrivals, setNewArrivals] = useState([]);

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

  const handelOnMousedown = (e) => {
    e.preventDefault(); // Prevent default behavior to avoid interference
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft); // Initialize the scroll position
  };

  const handelOnMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent default behavior for smoother dragging
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX; // Calculate the distance moved
    scrollRef.current.scrollLeft = scrollLeft - walk; // Directly update the scroll position
  };

  const handelOnMouseUpOrLeave = () => {
    setIsDragging(false); // Stop dragging
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" }); // Fixed typo in 'left'
  };

  //! Update Scroll Button

  const updateScrollButton = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;
      setScrollLeft(leftScroll > 0); // Corrected state update
      setCanScrollLeft(leftScroll > 0); // Corrected state update
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
        container.removeEventListener("scroll", updateScrollButton); // Cleanup event listener
      }
    };
  }, [newArrivals]); // Fixed: Added dependency array to avoid redundant effect executions

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-9">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>
        <br />
        {/* Scroll Button */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")} // Fixed: Ensure the function is invoked correctly
            disabled={!canScrollLeft}
            className={`p-2  rounded-full border border-black ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-gray-200 text-black cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")} // Fixed: Ensure the function is invoked correctly
            disabled={!canScrollRight} // Added missing 'disabled' attribute for consistency
            className={`p-2  rounded-full border border-black ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-200 text-black cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
      {/* Scrollable Content */}
      <div
        onMouseDown={handelOnMousedown}
        onMouseMove={handelOnMouseMove}
        onMouseUp={handelOnMouseUpOrLeave}
        onMouseLeave={handelOnMouseUpOrLeave}
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {newArrivals.map((product) => {
          return (
            <div
              key={product._id}
              className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
            >
              <img
                draggable="false"
                src={product.images.url}
                alt={product.images.altText || product.name}
                className="w-full h-[500px] object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
                <Link to={`/product/${product._id}`} className="block">
                  <h4 className="font-medium ">{product.name}</h4>
                  <p className="mt-1 ">${product.price}</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NewArrivals;
