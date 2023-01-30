import { GetServerSidePropsContext } from "next";

function Home() {
  return <></>;
}

export default Home;

export function getServerSideProps<GetServerSideProps>(context: GetServerSidePropsContext) {
  return {
    redirect: {
      permanent: true,
      destination: "/practice"
    }
  };
}
