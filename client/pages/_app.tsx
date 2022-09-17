import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { PhoneMockup } from '../components/phoneMockup';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		// <PhoneMockup {...pageProps}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		// </PhoneMockup>
	);
}

export default MyApp;
