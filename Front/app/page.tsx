import Image from "next/image";
import Profile from "../public/profile.png";
import Doctor from "../public/doctor.png";
import Link from "next/link";

type Person = {
  id: string;
  name: string;
};

export default function Home() {
  const patient: Person = {
    id: "1",
    name: "Patient",
  };
  const doctor: Person = {
    id: "2",
    name: "Doctor",
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white">
      <h2 className="text-xl mb-10">Chat with...</h2>
      <Link
        href={{
          pathname: "/chat",
          query: {
            id: doctor.id,
          },
        }}
      >
        <div className="flex shadow-xl bg-blue-400 hover:bg-blue-600 py-3 px-6 rounded mb-10">
          <Image src={Doctor} width={40} alt="Picture of the author" />
          <div className="flex flex-col justify-center ml-5">
            <p>{doctor.name}</p>
          </div>
        </div>
      </Link>
      <Link
        href={{
          pathname: "/chat",
          query: {
            id: patient.id,
          },
        }}
      >
        <div className="flex shadow-xl bg-green-400 hover:bg-green-600 py-3 px-6 rounded">
          <Image src={Profile} width={40} alt="Picture of the author" />
          <div className="flex flex-col justify-center ml-5">
            <p>{patient.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
