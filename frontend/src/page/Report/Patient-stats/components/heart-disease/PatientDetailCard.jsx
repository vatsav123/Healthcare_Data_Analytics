import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const PatientDetailCard = () => {
  return (
    <div>
      <div id="side-card">
        <div className="flex flex-col gap-2" id="fcon">
          <p className="text-xl font-medium text-center mb-4">
            Patient Details
          </p>
          <div className="flex flex-col items-center gap-4 cursor-pointer">
            <div className="rounded-full bg-gray-300 w-24 h-24 flex items-center justify-center text-4xl">
              KR
            </div>
            <p className="font-medium">Kaushal Rai</p>
            <p className="text-sm text-gray-600 mt-[-10px]">Male</p>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <div
              className="bg-gray-300 p-4 rounded-full cursor-pointer
            hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out
            "
            >
              <FaPhoneAlt className="" />
            </div>
            <div
              className="bg-gray-300 p-4 rounded-full cursor-pointer
            hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out
            
            "
            >
              <FaEnvelope className="" />
            </div>
            <div
              className="flex items-center bg-gray-300 p-4 rounded-full  cursor-pointer 
            hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out
            
            "
            >
              <span className="text-xs font-medium ">Download Report</span>
            </div>
          </div>
          <hr className="my-4" />
        </div>
        <div id="scon">
          <p className="font-medium text-lg mb-3">General Info</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm text-gray-400">
                Date of Birth
              </span>
              <span className="font-medium text-sm ">09 August 1559 (76)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm text-gray-400">
                Blood group
              </span>
              <span className="font-medium text-sm ">B+</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm text-gray-400">Height</span>
              <span className="font-medium text-sm ">156cm</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm text-gray-400">Weight</span>
              <span className="font-medium text-sm ">78kg</span>
            </div>
          </div>
          <hr className="my-4" />
        </div>
        <div id="tcon">
          <p className="font-medium text-lg mb-3">Health Metrics </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm text-gray-400">
                Blood Pressure (Systolic)
              </span>
              <span className="font-medium text-sm ">140 mmHg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm text-gray-400">
                Serum Cholestoral
              </span>
              <span className="font-medium text-sm ">260 mg/dL</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm text-gray-400">
                Chest Pain Type
              </span>
              <span className="font-medium text-sm ">Non-anginal pain</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm text-gray-400">
                Max Heart Rate
              </span>
              <span className="font-medium text-sm ">150 bpm</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm text-gray-400">
                ST Segment
              </span>
              <span className="font-medium text-sm ">Up</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm text-gray-400">
                Exercise Induced Angina
              </span>
              <span className="font-medium text-sm ">No</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm text-gray-400">
                Number of Major Vessels
              </span>
              <span className="font-medium text-sm ">0</span>
            </div>
          </div>
          <hr className="my-4" />
        </div>

        <div id="fcon">
          <p className="font-medium text-lg mb-3">Doctors</p>
          <div className="flex gap-2">
            <p className="flex justify-center items-center w-12 h-12 bg-blue-200 rounded-full cursor-pointer">
              UR
            </p>
            <p className="flex justify-center items-center w-12 h-12 bg-pink-200 rounded-full cursor-pointer">
              SD
            </p>
            <p className="flex justify-center items-center w-12 h-12 bg-green-200 rounded-full cursor-pointer">
              SS
            </p>
            <p className="flex justify-center items-center w-12 h-12 bg-yellow-200 rounded-full cursor-pointer">
              SK
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailCard;
