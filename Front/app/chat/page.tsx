"use client";

import Image from "next/image";
import Profile from "../../public/profile.png";
import Doctor from "../../public/doctor.png";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Arrow from "../../public/arrow.png";
import { Suspense } from "react";

interface Message {
  id: string;
  message: string;
}

export default function Home() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState<string>("");
  const [id, setId] = useState<string>(searchParams.get("id") || "null");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<Message[]>([
    { id: "2", message: "Hello Doctor!" },
    { id: "1", message: "Hello! How are you?" },
    { id: "2", message: "Good!" },
  ]);

  const createNewMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage = {
      id: id,
      message: input,
    };
    setMessage([...message, newMessage]);
    setInput("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [message]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-screen flex flex-col justify-center items-center bg-gray-300 px-[40%]">
        <div className="flex bg-blue-300 w-full py-2">
          <Link href="/" className="flex flex-col justify-center ml-3">
            <Image src={Arrow} width={30} alt="Picture of the author" />
          </Link>
          <div className="flex ml-5">
            <Image
              src={id === "1" ? Profile : Doctor}
              width={30}
              alt="Picture of the author"
            />
            <div className="flex flex-col justify-center ml-3">
              <p className="text-xl">{id === "1" ? "Patient" : "Doctor"}</p>
            </div>
          </div>
        </div>
        <div
          className="bg-white w-full h-[40rem] overscroll-y-auto overflow-y-auto"
          ref={chatContainerRef}
        >
          <ul className="space-y-2">
            {message.map((chat, index) => (
              <li
                key={index}
                className={`p-3 ${id === chat.id ? "text-end" : "text-start"}`}
              >
                <p
                  className={`max-w-[50%] ${
                    id === chat.id ? "message-sender" : "message"
                  }`}
                >
                  {chat.message}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <form className="w-full" onSubmit={createNewMessage}>
          <input
            type="text"
            className="border w-4/5 p-3"
            placeholder="Text here"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            type="submit"
            className="w-1/5 p-3 bg-[#ffa74f] hover:bg-[#ffcd9c]"
          >
            Send
          </button>
        </form>
      </div>
    </Suspense>
  );
}
