import React from 'react'

function ChangePass() {
  return (
    <div className="flex flex-col w-full h-[93vh] mb-40 xl:flex-row">
    {/* Left Section (Hidden on small screens) */}
    <div className="relative flex-col justify-center hidden w-1/2 text-left text-white pl-60 xl:flex gradient-2">
      <i className="bx bx-health text-8xl mb-10 pr-[30rem]"></i>
      <h1 className="font-medium text-7xl">
        Hello from <br /> CareConnect ! 👋
      </h1>
      <p className="max-w-md mt-8 text-xl ">
        Skip repetitive and manual tasks. Get highly productive through
        automation and save tons of time!
      </p>
    </div>

    {/* Right Section (Form) */}
    <div className="flex flex-col items-center justify-center w-full p-8 xl:w-1/2">
      <div className="w-full max-w-md">
        <h2 className="text-6xl font-medium text-primary">CareConnect</h2>
        <h3 className="mt-6 mb-10 text-4xl font-light">Reset Password !!</h3>

        <form className="space-y-8">
          
          <div>
            <input
              type="password"
              name="new"
              required
              minLength={8}
              maxLength={14}
              className="w-full p-3 text-xl border-b outline-none bg-light"
              placeholder="New Password"
            />
          </div>
          
          <div>
            <input
              type="password"
              name="confirm"
              required
              minLength={8}
              maxLength={14}
              className="w-full p-3 text-xl border-b outline-none bg-light"
              placeholder="Confirm Password"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 mb-4 text-2xl text-white transition-all duration-300 rounded-lg cursor-pointer bg-primary hover:bg-secondary"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ChangePass