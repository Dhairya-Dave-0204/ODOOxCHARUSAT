import React from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col-reverse items-center justify-between gap-8 px-12 py-6 mt-10 mb-20 xl:mt-32 xl:flex-row xl:px-60">
      <div className="basis-1/2">
        <h2 className="mb-5 text-3xl font-semibold md:text-5xl text-primary">
          <span className="text-secondary">Doc</span>Appoint
        </h2>

        <p className="mb-3 text-sm font-light md:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consectetur maiores tenetur doloribus repellat officiis, commodi
          numquam et quidem quam! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Temporibus, maxime!
        </p>

        <p className="mb-3 text-sm font-light md:text-lg">
            Go and register now for completly free!
        </p>

        <button onClick={() => navigate("/join")}
            className="px-3 py-2 text-sm font-medium text-white transition-all duration-500 border bg-primary md:px-5 md:py-3 md:text-lg rounded-2xl hover:scale-110 hover:text-primary hover:border-primary hover:bg-white"
        >
            Join Now
        </button>
      </div>

      <div>
        <img src={assets.hero_banner} alt="Hero Banner" />
      </div>
    </div>
  );
}

export default Header;
