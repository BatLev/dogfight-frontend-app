"use client"

import { useRouter, usePathname } from "next/navigation"
import { useRef } from "react"

const pages = ["/main", "/main/cardmaker", "/main/cardgallery", "/main/deckbuilder", "/main/rules", "/main/combat"]

export default function SwipeNavigator({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const pathname = usePathname()
	const startX = useRef<number | null>(null)

	const handleTouchStart = (e: React.TouchEvent) => {
		startX.current = e.touches[0].clientX
	}

	const handleTouchEnd = (e: React.TouchEvent) => {
		if (startX.current === null) return

		const endX = e.changedTouches[0].clientX
		const diff = startX.current - endX
		const currentIndex = pages.indexOf(pathname)

		// Swipe left → next page
		if (diff > 50 && currentIndex < pages.length - 1) {
			router.push(pages[currentIndex + 1])
		}

		// Swipe right → previous page
		if (diff < -50 && currentIndex > 0) {
			router.push(pages[currentIndex - 1])
		}
	}

	return (
		<div
			className="flex-1 overflow-hidden"
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			{children}
		</div>
	)
}
