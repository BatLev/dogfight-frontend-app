"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/app/components/Card";
import { getAll } from "@/app/utility/CardAPICalls";
import { API_URL } from "@/app/settings";
import type { CardGet } from "@/app/interfaces/card";

// ----------------------
// Types
// ----------------------
type User = {
	id: number;
	username: string;
	role: string;
};

// ----------------------
// Filter Button Group
// ----------------------
function FilterGroup({
	options,
	selected,
	onChange,
}: {
	options: string[];
	selected: string;
	onChange: (val: string) => void;
}) {
	return (
		<div className="flex">
			{options.map((opt, i) => {
				const active = selected === opt;

				return (
					<button
						key={opt}
						onClick={() => onChange(opt)}
						className={`
              px-4 py-1 border border-orange-800 text-sm
              ${active ? "bg-orange-800 text-black" : "text-orange-800"}
              ${i === 0 ? "rounded-l-full" : ""}
              ${i === options.length - 1 ? "rounded-r-full" : ""}
              ${i !== options.length - 1 ? "border-r-0" : ""}
            `}
					>
						{opt}
					</button>
				);
			})}
		</div>
	);
}

// ----------------------
// Card Wrapper
// ----------------------
function GalleryCard({
	card,
	selected,
	onClick,
}: {
	card: CardGet;
	selected: boolean;
	onClick: () => void;
}) {
	return (
		<div
			onClick={onClick}
			className={`
        w-40 sm:w-44 md:w-48
        transition-all duration-300 cursor-pointer
        ${selected ? "z-50" : ""}
      `}
		>
			<div
				className={`
          ${selected
						? `
            fixed 
            top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 
            w-[90vw] 
            z-50
          `
						: ""
					}

          ${selected ? "lg:scale-30" : "hover:scale-105"}

          ${selected ? "ring-2 ring-orange-800" : ""}
        `}
			>
				<Card {...card} />
			</div>
		</div>
	);
}

// ----------------------
// MAIN COMPONENT
// ----------------------
export default function CardGallery() {
	const router = useRouter();

	const [cards, setCards] = useState<CardGet[]>([]);
	const [users, setUsers] = useState<User[]>([]);

	const [loadingCards, setLoadingCards] = useState(true);
	const [loadingUsers, setLoadingUsers] = useState(true);

	const [error, setError] = useState<string | null>(null);

	const [selectedUser, setSelectedUser] = useState<string>("all");
	const [selectedSet, setSelectedSet] = useState<string>("all");
	const [search, setSearch] = useState("");
	const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

	// ----------------------
	// Fetch Cards
	// ----------------------
	useEffect(() => {
		async function fetchCards() {
			try {
				setLoadingCards(true);
				const res = (await getAll()) as CardGet[];
				setCards(res);
			} catch (err) {
				console.error(err);
				setError("Failed to load cards");
			} finally {
				setLoadingCards(false);
			}
		}

		fetchCards();
	}, []);

	// ----------------------
	// Fetch Users
	// ----------------------
	useEffect(() => {
		async function fetchUsers() {
			try {
				setLoadingUsers(true);

				const res = await fetch(`${API_URL}/users`);
				if (!res.ok) throw new Error("Failed to fetch users");

				const data: User[] = await res.json();
				setUsers(data);
			} catch (err) {
				console.error(err);
				setError("Failed to load users");
			} finally {
				setLoadingUsers(false);
			}
		}

		fetchUsers();
	}, []);

	// ----------------------
	// Derived Data
	// ----------------------
	const userMap = useMemo(() => {
		const map = new Map<number, string>();
		users.forEach((u) => map.set(u.id, u.username));
		return map;
	}, [users]);

	const userOptions = useMemo(
		() => ["all", ...users.map((u) => u.username)],
		[users]
	);

	const setOptions = useMemo(() => {
		const uniqueSets = Array.from(
			new Set(cards.map((c) => c.cardset).filter(Boolean))
		);

		return ["all", ...uniqueSets.sort()];
	}, [cards]);

	// ----------------------
	// Filtering
	// ----------------------
	const filteredCards = useMemo(() => {
		return cards.filter((card) => {
			const username = userMap.get(card.user_id);

			const userMatch =
				selectedUser === "all" || username === selectedUser;

			const setMatch =
				selectedSet === "all" || card.cardset === selectedSet;

			const searchMatch = card.name
				.toLowerCase()
				.includes(search.toLowerCase());

			return userMatch && setMatch && searchMatch;
		});
	}, [cards, selectedUser, selectedSet, search, userMap]);

	// ----------------------
	// UI STATES
	// ----------------------
	if (loadingCards || loadingUsers) {
		return (
			<div className="min-h-screen flex items-center justify-center text-slate-400">
				Loading...
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center text-red-500">
				{error}
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-950 text-slate-200 p-6 flex flex-col items-center gap-6">
			{/* ---------------- FILTERS ---------------- */}
			<div className="flex flex-wrap gap-4 items-center justify-center">
				<FilterGroup
					options={userOptions}
					selected={selectedUser}
					onChange={setSelectedUser}
				/>

				<input
					type="text"
					placeholder="search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="border border-orange-800 bg-transparent px-3 py-1 text-sm outline-none"
				/>

				<FilterGroup
					options={setOptions}
					selected={selectedSet}
					onChange={setSelectedSet}
				/>
			</div>

			{/* ---------------- BACKDROP ---------------- */}
			{selectedCardId && (
				<div
					className="fixed inset-0 bg-black/70 z-40"
					onClick={() => setSelectedCardId(null)}
				/>
			)}

			{/* ---------------- CARDS ---------------- */}
			<div className="flex flex-wrap gap-8 justify-center w-full lg:w-[60%]">
				{filteredCards.map((card) => (
					<GalleryCard
						key={card.id}
						card={card}
						selected={selectedCardId === card.id}
						onClick={() => {
							if (selectedCardId === card.id) {
								router.push(`/main/cardmake/?id=${card.id}`);
							} else {
								setSelectedCardId(card.id);
							}
						}}
					/>
				))}
			</div>
		</div>
	);
}
