import { Inter } from "@next/font/google";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  return <></>;
}

export default Home;

export function getServerSideProps<GetServerSideProps>(context: GetServerSidePropsContext) {
  return {
    redirect: {
      permanent: true,
      destination: "/practice",
    },
  };
}
