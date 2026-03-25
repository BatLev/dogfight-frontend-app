import Header from "../components/Header";
import SwipeNavigator from "../components/SwipeNavigator"

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col h-screen">
			{/* Header */}
			<Header />

			{/* Small separator */}
			<div className="h-px bg-gray-200"></div>

			{/* Page content */}
			<main className="flex-1 overflow-auto">
				{children}
			</main>
		</div>
	)
}


