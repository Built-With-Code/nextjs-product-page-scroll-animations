import type { NextPage } from "next";
import Head from "next/head";
import Features from "../components/Features";
import Highlights from "../components/Highlights";
import Masthead from "../components/Masthead";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>AirPods Max</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Masthead />
      <Highlights />
      <Features />
    </div>
  );
};

export default Home;
