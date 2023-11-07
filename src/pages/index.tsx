import Image from "next/image";
import { Inter } from "next/font/google";
import Board from "../components/Board";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="bg-primary-200 h-full">
      <Board />
    </main>
  );
}
