import Head from "next/head";

interface Props {
  title: string;
}

const SeoHeadCalendarPage = ({ title }: Props) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default SeoHeadCalendarPage;
