import React from "react";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { GiReturnArrow } from "react-icons/gi";
import { HiOutlineCreditCard } from "react-icons/hi";
const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* feature 1 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <RiShoppingBag4Fill className="text-xl h-9 w-9"></RiShoppingBag4Fill>
          </div>
          <h4 className="tracking-tighter mb-2 uppercase">
            Free International Shipping
          </h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            On all orders over $100.00
          </p>
        </div>

        {/* feature 2 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <GiReturnArrow className="text-xl h-9 w-9"></GiReturnArrow>
          </div>
          <h4 className="tracking-tighter mb-2 uppercase">45 Days Return</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            Money back gurantee
          </p>
        </div>

        {/* feature 3 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-3">
            <HiOutlineCreditCard className="text-xl h-10 w-10"></HiOutlineCreditCard>
          </div>
          <h4 className="tracking-tighter mb-2 uppercase">secure checkout</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            100% secure checkout process
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
