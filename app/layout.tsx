import Navbar from "./Navbar";
import ReduxProvider from "./providers/ReduxProvider";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<head />

			<body className="bg-slate-300 text-sm overflow-hidden flex h-screen box-border m-w-350 justify-between md:justify-start flex-col-reverse md:flex-row">
				<ReduxProvider>
					<Navbar />
					{children}
				</ReduxProvider>
			</body>
		</html>
	);
}
