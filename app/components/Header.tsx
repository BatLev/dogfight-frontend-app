"use client"
import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image"

interface Page {
	name: string
	path: string
}

const pages: Page[] = [
	{ name: "Home", path: "/main" },
	{ name: "Card Maker", path: "/main/cardmaker" },
	{ name: "Card Gallery", path: "/main/cardgallery" },
	{ name: "Rules", path: "/main/rules" },
]

export default function Header() {
	const pathname = usePathname()
	const router = useRouter()
	const [isDesktop, setIsDesktop] = useState(false)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsAuthenticated(false);
		router.replace("/main/login");
	};

	// auth check
	useEffect(() => {
		let token = localStorage.getItem("token");

		if (pathname !== "/main/login") {
			if (token) {
				try {
					let payload: any = jwtDecode(token);
					if (payload.exp * 1000 < Date.now()) {
						localStorage.removeItem("token");
						setIsAuthenticated(false);
						router.replace("/main/login");
					} else {
						setIsAuthenticated(true);
					}
				} catch {
					localStorage.removeItem("token");
					setIsAuthenticated(false);
					router.replace("/main/login");
				}
			} else {
				setIsAuthenticated(false);
				router.replace("/main/login");
			}
		} else {
			setIsAuthenticated(false);
		}
	}, [pathname, router]);

	// Detect desktop
	useEffect(() => {
		const checkWidth = () => setIsDesktop(window.innerWidth >= 768)
		checkWidth()
		window.addEventListener("resize", checkWidth)
		return () => window.removeEventListener("resize", checkWidth)
	}, [])

	return (
		<header className="h-20 bg-gradient-to-r from-[#7b4e24] to-slate-800 text-white flex items-center px-4 shadow-md">
			{/* Logo */}
			<div className="flex-shrink-0">
				<Image
					src="/dogfight-frontend-app/assets/ports/portfull.png"
					alt="MyTCG"
					width={80}
					height={80}
					className="rounded-md filter-none"
				/>
			</div>

			{isDesktop ? (
				<div className="flex-1 flex justify-center items-center space-x-4">
					{pages.map((p) => (
						<button
							key={p.path}
							onClick={() => router.push(p.path)}
							className={`px-4 py-2 rounded-lg font-medium transition
								${pathname === p.path
									? "bg-orange-800 text-gray-100 shadow-lg text-lg"
									: "bg-slate-900 text-gray-100 bg-opacity-20 hover:bg-opacity-40 text-lg"
								}`}
						>
							{p.name}
						</button>
					))}

					{isAuthenticated && (
						<button
							onClick={handleLogout}
							className="ml-6 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-medium"
						>
							Logout
						</button>
					)}
				</div>
			) : (
				<div className="flex-1 flex justify-between items-center px-2">
					<div className="text-2xl font-semibold">
						{pages.find((p) => p.path === pathname)?.name ?? ""}
					</div>

					{isAuthenticated && (
						<button
							onClick={handleLogout}
							className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-sm"
						>
							Logout
						</button>
					)}
				</div>
			)}
		</header>
	)
}
