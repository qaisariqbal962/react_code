import React from "react";

const Auth = () => {

const handleSubmit =(e)=> {
    e.preventDefault()
}

  return (
    <div className="flex items-center bg-white min-h-screen">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row rounded-xl shadow-xl overflow-hidden">
          {/* left side */}
          <div className="w-full lg:w-1/2 p-12">
            <div className="flex flex-col">
              <h3 className="text-3xl text-gray-700 mb-2 font-bold">
                Welcome Back
              </h3>
              <p className="text-gray-600">Login to your account</p>
              {/* Social buttons */}
              <div className="grid grid-cols-2 gap-6 mt-6">
                <button className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded">
                  <img className="w-5 " src="./google.png" alt="" />
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded">
                  <img className="w-5" src="./facebook.png" alt="" />
                  Facebook
                </button>
              </div>
              {/* Authentication form */}
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-4 ">
                    <label className="block text-gray-700 mb-2" text-gray-700 mb-2>Email Adress</label>
                    <input className="w-full px-4 py-2 border border-gray-300 rounded" 
                    placeholder="Enter your email address"
                    type="text" />
                </div>
              </form>
            </div>
          </div>

          {/* Right side banner */}
          <div className="w-full lg:w-1/2 p-12"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
