import Navbar from "./Navbar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<head />

			<body className="bg-slate-600">
				{children}
				<Navbar />
			</body>
		</html>
	);
}
