import React from "react";

const SaleBanner = () => {
  return (
    <div className="w-5/12 object-cover relative banner">
      <img
        src="./salesBanner.png"
        alt="50% sales banner"
        className="w-full rounded-2xl shadow"
      />
      <a href="/sales" className="rounded-full absolute current-page px-5 py-2 top-1/2 right-1/2 translate-x-1/2 -translate-y-5 font-bold">Shop Now</a>
    </div>
  );
};

export default SaleBanner;
