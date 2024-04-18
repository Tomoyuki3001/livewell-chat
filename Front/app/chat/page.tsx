"use client";

import Image from "next/image";
import Profile from "../../public/profile.png";
import Doctor from "../../public/doctor.png";
import Link from "next/link";
import Phone from "../../public/phone.png";
import Send from "../../public/send.png";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Arrow from "../../public/arrow.png";
import { Suspense } from "react";

interface Message {
  id: string;
  message: string;
}

const ChatComponent = () => {
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
    if (input === "") {
      alert("Plese type message");
      return;
    }
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
    <div className="h-screen flex flex-col justify-center items-center bg-slate-100 sm:p-0 lg:px-[40%] lg:py-[5%]">
      <div className="flex bg-slate-200 w-full py-2">
        <div className="flex w-1/5">
          <Link href="/" className="flex flex-col justify-center ml-3">
            <div className="flex">
              <Image src={Arrow} width={20} alt="Picture of the author" />
              <p className="ml-1">Back</p>
            </div>
          </Link>
        </div>
        <div className="w-3/5 flex flex-col justify-center items-center">
          <div className="flex">
            <Image
              src={id === "1" ? Profile : Doctor}
              width={30}
              alt="Picture of the author"
            />
            <div className="flex flex-col justify-center ml-3">
              <p className="text-lg">{id === "1" ? "Patient" : "Doctor"}</p>
            </div>
          </div>
        </div>
        <Image
          className="ml-5"
          src={Phone}
          width={25}
          alt="Picture of the author"
        />
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
                className={`max-w-[60%] text-sm ${
                  id === chat.id ? "message-sender" : "message"
                }`}
              >
                {chat.message}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <form className="w-full flex" onSubmit={createNewMessage}>
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
          className="w-1/5 p-3 bg-[#ffa74f] hover:bg-[#ffcd9c] flex flex-col items-center"
        >
          <Image
            className=""
            src={Send}
            width={25}
            alt="Picture of the author"
          />
        </button>
      </form>
    </div>
  );
};

const ChatPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ChatComponent />
  </Suspense>
);

export default ChatPage;
