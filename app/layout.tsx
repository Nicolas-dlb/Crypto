import Navbar from "./Navbar";
import ReduxProvider from "./providers/ReduxProvider";
import { Inter } from "@next/font/google";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<head />

			<body
				className={`${inter.variable} font-sans bg-slate-300 text-sm overflow-hidden flex h-screen box-border m-w-350 justify-between md:justify-start flex-col-reverse md:flex-row`}
			>
				<ReduxProvider>
					<Navbar />
					{children}
				</ReduxProvider>
			</body>
		</html>
	);
}
