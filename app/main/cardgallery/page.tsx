"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/app/components/Card";

// ----------------------
// Dummy Data
// ----------------------
const cards = [
	{
		id: 1,
		name: "Freezer",
		illustration: "/templateimage.png",
		type1: "hazard",
		type2: "hazard",
		box1Icon: "hazard",
		box1Text: "Freeze enemy unit",
		box2Icon: "hazard",
		box2Text: "Slow effect",
		cost: "4X3P",
		power: "4",
		size: "4",
		linktop: true,
		linkbottom: false,
		linkleft: true,
		linkright: false,
		cardset: "set1",
		userId: "Felix",
	},
	{
		id: 2,
		name: "Blaster",
		illustration: "/templateimage.png",
		type1: "hazard",
		type2: "hazard",
		box1Icon: "hazard",
		box1Text: "Deal damage",
		box2Icon: "hazard",
		box2Text: "Extra hit",
		cost: "3X2P",
		power: "5",
		size: "2",
		linktop: false,
		linkbottom: true,
		linkleft: false,
		linkright: true,
		cardset: "set2",
		userId: "Levente",
	},

	{
		id: 3,
		name: "Freezer",
		illustration: "/templateimage.png",
		type1: "hazard",
		type2: "hazard",
		box1Icon: "hazard",
		box1Text: "Freeze enemy unit",
		box2Icon: "hazard",
		box2Text: "Slow effect",
		cost: "4X3P",
		power: "4",
		size: "4",
		linktop: true,
		linkbottom: false,
		linkleft: true,
		linkright: false,
		cardset: "set1",
		userId: "Felix",
	},
	{
		id: 4,
		name: "Dick",
		illustration: "/templateimage.png",
		type1: "hazard",
		type2: "hazard",
		box1Icon: "hazard",
		box1Text: "Deal damage",
		box2Icon: "hazard",
		box2Text: "Extra hit",
		cost: "3X2P",
		power: "5",
		size: "2",
		linktop: false,
		linkbottom: true,
		linkleft: false,
		linkright: true,
		cardset: "set2",
		userId: "Levente",
	},
	{
		id: 5,
		name: "Freezer",
		illustration: "/templateimage.png",
		type1: "hazard",
		type2: "hazard",
		box1Icon: "hazard",
		box1Text: "Freeze enemy unit",
		box2Icon: "hazard",
		box2Text: "Slow effect",
		cost: "4X3P",
		power: "4",
		size: "4",
		linktop: true,
		linkbottom: false,
		linkleft: true,
		linkright: false,
		cardset: "set1",
		userId: "Felix",
	}
];

const users = ["Felix", "Levente"];
const sets = ["set1", "set2"];


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
	card: any;
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
          ${selected ? `
            fixed 
            top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 
            w-[90vw] 
            z-50
          ` : ""}

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

	const [selectedUser, setSelectedUser] = useState("all");
	const [selectedSet, setSelectedSet] = useState("all");
	const [search, setSearch] = useState("");
	const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

	// ----------------------
	// Filtering
	// ----------------------
	const filteredCards = cards.filter((card) => {
		const userMatch =
			selectedUser === "all" || card.userId === selectedUser;

		const setMatch =
			selectedSet === "all" || card.cardset === selectedSet;

		const searchMatch = card.name
			.toLowerCase()
			.includes(search.toLowerCase());

		return userMatch && setMatch && searchMatch;
	});

	return (
		<div className="min-h-screen bg-slate-950 text-slate-200 p-6 flex flex-col items-center gap-6">

			{/* ---------------- FILTERS ---------------- */}
			<div className="flex flex-wrap gap-4 items-center justify-center">

				<FilterGroup
					options={[...users, "all"]}
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
					options={[...sets, "all"]}
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
								router.push(`/main/cardmake/${card.id}`);
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
