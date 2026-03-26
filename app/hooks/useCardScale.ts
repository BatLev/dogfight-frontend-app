"use client"

import { useEffect, useState } from "react"

export function useCardScale(baseWidth: number = 436) {
	const [scale, setScale] = useState(1)

	useEffect(() => {
		const updateScale = () => {
			const viewportWidth = window.innerWidth

			// You can tweak this padding if needed
			const safeWidth = viewportWidth * 0.95

			const newScale = Math.min(safeWidth / baseWidth, 1)
			setScale(newScale)
		}

		updateScale()
		window.addEventListener("resize", updateScale)

		return () => window.removeEventListener("resize", updateScale)
	}, [baseWidth])

	return scale
}
