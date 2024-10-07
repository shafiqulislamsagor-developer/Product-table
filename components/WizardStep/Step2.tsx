import Lottie from "lottie-react";

import groovyWalkAnimation from "../../public/Animation - 1728272273822.json";
import { AlertDialogAction } from "../ui/alert-dialog";

export default function Step2() {
  return (
    <div>
      <div className="relative">
        <Lottie
          animationData={groovyWalkAnimation}
          loop={true}
          className="w-80 mx-auto"
        />
        <h2 className="text-2xl text-center absolute bottom-5 left-0 right-0">
          Completed View 🥳🥳
        </h2>
      </div>
      <div className="flex justify-center mt-5">
        <AlertDialogAction className="bg-green-500 text-white">
          Completed
        </AlertDialogAction>
      </div>
    </div>
  );
}
