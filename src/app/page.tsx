import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/landing");
  return null;
}
