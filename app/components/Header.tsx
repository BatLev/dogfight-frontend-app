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
	//	{ name: "Deck Builder", path: "/main/deckbuilder" },
	{ name: "Rules", path: "/main/rules" },
	//	{ name: "Combat", path: "/main/combat" },
	{ name: "Login", path: "/main/login" }
]

export default function Header() {
	const pathname = usePathname()
	const router = useRouter()
	const [isDesktop, setIsDesktop] = useState(false)

	// redirect to auth when needed
	useEffect(() => {

		let token = localStorage.getItem("token");
		if (pathname != "/main/login") {
			if (token) {
				let payload: any = jwtDecode(token);
				if (payload.exp * 1000 < Date.now()) router.replace("/main/login");
			} else {
				router.replace("/main/login");
			}
		}
		console.log("redirect")
	})

	// Detect desktop based on window width
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
				<Image src="/dogfight-frontend-app/assets/ports/portfull.png" alt="MyTCG" width={80} height={80} className="rounded-md" />
			</div>

			{isDesktop ? (
				<div className="flex-1 flex justify-center space-x-4">
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
				</div>
			) : (
				<div className="flex-1 text-center text-3xl font-semibold">
					{pages.find((p) => p.path === pathname)?.name ?? ""}
				</div>
			)}
		</header>

	)
}
