import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="md:px-32 py-20 px-10 bg-gradient-to-r from-primary to-secondary text-white w-full rounded-tl-[125px]">
        <div className="flex flex-col gap-12 mb-10 md:flex-row md:mb-6">
          <div className="pr-10 mr-10 basis-3/6">
            <h2 className="mb-3 text-2xl font-semibold md:text-3xl">DocAppoint</h2>
            
            <p className="mb-5 font-light md:text-lg">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
              error cupiditate ipsum commodi, eum natus. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Nam, maxime.
            </p>
            
            <div className="mb-6 text-2xl">
              <Link to="https://www.wikipedia.org/" className="mr-4">
                <i className="ri-global-line bg-white text-primary p-2 rounded-[50%]"></i>
              </Link>
              <Link to="https://www.facebook.com/" className="mr-4">
                <i className="ri-facebook-circle-line bg-white text-primary p-2 rounded-[50%]"></i>
              </Link>
              <Link to="https://www.instagram.com/" className="mr-4">
                <i className="ri-instagram-line bg-white text-primary p-2 rounded-[50%]"></i>
              </Link>
              <Link to="https://www.whatsapp.com/" className="mr-4">
                <i className="ri-whatsapp-line bg-white text-primary p-2 rounded-[50%]"></i>
              </Link>
            </div>
          </div>

          <div className="basis-2/6">
            <h2 className="mb-3 text-xl font-semibold">Get in touch with us</h2>
            
            <div className="mb-3">
              <p className="font-medium">24/7 Support:</p>
              <p>Mobile: +91 1234567890</p>
              <p>Telephone: 00 123456789</p>
            </div>

            <div>
              <p className="font-medium">E-mail:</p>
              <p>aiueoiefidu@gmail.com</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 basis-1/6 ">
            <h2 className="mb-2 text-xl font-semibold">Quick Links</h2>
            <Link to="/">Home</Link>
            <Link to="/doctor">Doctor</Link>
            <Link to="/survey">Survey</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/faq">FAQ's</Link>
          </div>
        </div>

        <hr className="border"/>

        <p className="mt-8 text-lg text-center">DocAppoint © - All Rights Reserved</p>
      </footer>
    </>
  );
}

export default Footer;
