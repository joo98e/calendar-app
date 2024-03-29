import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@store/index";
import { ConfigProvider } from "antd";
import ko_KR from "antd/lib/locale/ko_KR";
import moment from "moment";

moment.locale("ko");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={ko_KR}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ConfigProvider>
  );
}
