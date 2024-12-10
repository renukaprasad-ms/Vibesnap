import React from "react";
import { FcGoogle } from "react-icons/fc";

const LoginSec = () => {
  return (
    <div className="w-full h-full rounded-3xl flex flex-col mt-10 justify-start items-center lg:border lg:border-gray-300 lg:h-2/3 lg:w-2/3 lg:justify-center">
      <div className="w-full h-1/4 flex  items-center justify-center">
        <img
          className="h-16 w-16 md:h-24 md:w-24"
          src="https://s3-alpha-sig.figma.com/img/e588/3ae0/261c0b95b3d799ea23271ef18084f911?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ro97CzrY1-xXAkdAkDnEOVx0tKagq7W2ADpM15gZ1QOPtDnU29AXGYvfbDDrklbMp8DoeEgQWeqKo3jAw-IpDrI~IZCetw-42e06AiWgM7fFouaaHpyWp4CpqZ4uAtJMmgNP770y652TlCGXZrT0Ld5Gia-ZDSj2QWLgqbj9uHwPEHGK9a1ruXZ6Hz84poJRdYvh3iKmguBDCG3PONGKgdYSrK669uu8pLJqMdVmVtVqv9vnxHxRuSBelqL7m2ghelPKWDFbbdh2vBeQJS7dGwq-GMHCGXUkvEOOGi9XmZr2ZOpFPLHea0DTBbnouhtseaDC-c-6BTGuHuxaUTSHcQ__"
          alt=""
        />
        <h1 className="font-extrabold text-xl lg:text-4xl -ml-4 ">VibeSnap</h1>
      </div>
      <div className="font-semibold text-sm mb-6">
        {" "}
        Moments That Matter, Shared Forever.
      </div>
      <div className="w-full h-[40%] lg:flex lg:flex-col lg:items-center lg:justify-center hidden  mt-9 lg:block">
        <div className="w-3/4 h-1/2 flex flex-col gap-2 ">
          <label htmlFor="">UserName</label>
          <input
            className="w-full h-[40%] border border-gray-300"
            type="text"
          />
        </div>
        <div className="w-3/4 h-1/2 flex flex-col gap-2 ">
          <label htmlFor="">Password</label>
          <input
            className="w-full h-[40%] border border-gray-300"
            type="password"
          />
        </div>
      </div>
      <div className="hidden lg:block">OR</div>
      <button className="bg-black h-10 text-white w-2/3  lg:h-14 rounded-full flex items-center justify-center gap-2">
        <span>
          <FcGoogle size={25} />
        </span>
        <div className="text-sm">Continue with Google</div>
      </button>
    </div>
  );
};

export default LoginSec;
