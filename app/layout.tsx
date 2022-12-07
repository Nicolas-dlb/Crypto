import Navbar from "./Navbar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<head />

			<body className="bg-slate-300 overflow-hidden flex h-screen box-border flex-1 m-w-350 justify-between md:justify-start flex-col-reverse md:flex-row">
				<Navbar />
				{children}
			</body>
		</html>
	);
}
