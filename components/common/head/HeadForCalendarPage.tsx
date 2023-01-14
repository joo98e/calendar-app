import Head from "next/head";

interface Props {
  title: string;
}

const HeadForCalendarPage = ({ title }: Props) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default HeadForCalendarPage;
