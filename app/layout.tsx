import Navbar from "./Navbar";
import ReduxProvider from "./providers/ReduxProvider";
import { Inter } from "@next/font/google";
import setupLocatorUI from "@locator/runtime";
import WalletProvider from "./providers/WalletProvider";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	if (process.env.NODE_ENV === "development") {
		setupLocatorUI();
	}
	return (
		<html>
			<head />

			<body
				className={`${inter.variable} antialiased font-sans bg-slate-300 text-sm overflow-hidden flex h-screen box-border m-w-350 justify-between md:justify-start flex-col-reverse md:flex-row`}
			>
				<ReduxProvider>
					<WalletProvider>
						<Navbar />
						{children}
					</WalletProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
