"use client";

import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { CardCreate } from "@/app/interfaces/card";
import { useRouter, useSearchParams } from "next/navigation";
import * as cardsAPI from "@/app/utility/CardAPICalls";
import { API_URL } from "@/app/settings";

export default function CardMaker() {
	const [form, setForm] = useState<CardCreate>({
		name: "???",
		title: "???",
		user_id: 1,
		illustration: "/templateimage.png",
		cardtype: "unit",
		type1: "/hazard.png",
		type2: "/hazard.png",

		skilltype1: "/hazard.png",
		skilltext1: "???",

		skilltype2: "/hazard.png",
		skilltext2: "???",

		cost: "?X?P",
		power: "?",
		size: "?",

		linktop: "",
		linkbottom: "",
		linkleft: "",
		linkright: "",

		cardset: "",
	});

	const [id, setid] = useState(0);
	const params = useSearchParams();

	const router = useRouter();

	useEffect(() => {
		const currentid = Number(params.get("id"));
		if (currentid > 0) {
			setid(currentid);
			cardsAPI.getOne(currentid).then((res) => setForm(res));
		}
	}, []);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const deleteconfirm = () => {
		const confirmed = window.confirm(
			"Are you sure you want to delete this card?"
		);
		if (confirmed) {
			cardsAPI.remove(id);
		} else {
			console.log("delete canceled");
		}
	};

	const cardtypeOptions = [
		{ label: "Unit", value: "unit" },
		{ label: "Command", value: "command" },
		{ label: "Equipment", value: "equipment" },
	]

	const [illustrationOptions, setillustrationOptions] = useState<string[]>(["templateimage.png",]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) return;

		fetch(API_URL + "/upload_illustration/", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then(res => {
				if (!res.ok) throw new Error("Failed to fetch illustrations");
				return res.json();
			})
			.then(data => setillustrationOptions(data.illustrations))
			.catch(err => console.error(err));
	}, []);


	const typeOptions = [
		{ label: "Hazard", value: "hazard" },
	]

	const skilltypeOptions = [
		{ label: "Hazard", value: "hazard" },
	]


	const linkOptions = [
		{ label: "None", value: "" },
		{ label: "Unit provider", value: "unit/left" },
		{ label: "Command provider", value: "command/left" },
		{ label: "Equipment provide", value: "equipment/left" },
		{ label: "Unit need", value: "unit/right" },
		{ label: "Command need", value: "comman/right" },
		{ label: "Equipment need", value: "equipment/right" },
	];

	return (
		<div className="min-h-screen bg-black text-[#F5F5DC] flex items-center justify-center p-4">
			<div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
				{/* CARD */}
				<div className="w-full max-w-[436px] mx-auto lg:mx-0">
					<Card {...form} />
				</div>

				{/* FORM */}
				<div className="flex-1 w-full max-w-2xl mx-auto lg:mx-0">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<p>Name</p>
							<input
								name="name"
								value={form.name}
								onChange={handleChange}
								className="input"
							/>
						</div>

						<div>
							<p>Title</p>
							<input
								name="title"
								value={form.title}
								onChange={handleChange}
								className="input"
							/>
						</div>

						<div>
							<p>Illustration</p>
							<select
								name="illustration"
								value={form.illustration}
								onChange={handleChange}
								className="input"
							>
								{illustrationOptions.map((opt) => (
									<option key={opt} value={opt}>
										{opt}
									</option>
								))}
							</select>
						</div>

						<div>
							<p>Card Type</p>
							<select
								name="cardtype"
								value={form.cardtype}
								onChange={handleChange}
								className="input"
							>
								{cardtypeOptions.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>

						</div>

						<div>
							<p>Type 1</p>
							<select
								name="type1"
								value={form.type1}
								onChange={handleChange}
								className="input"
							>
								{typeOptions.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>

						</div>
						<div>
							<p>Type 2</p>
							<select
								name="type2"
								value={form.type2}
								onChange={handleChange}
								className="input"
							>
								{typeOptions.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>

						</div>

						{/* SKILL 1 */}
						<div className="grid gap-2">
							<p>Skill 1</p>
							<select
								name="skilltype1"
								value={form.skilltype1}
								onChange={handleChange}
								className="input"
							>
								{skilltypeOptions.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>

							<textarea
								name="skilltext1"
								value={form.skilltext1}
								onChange={handleChange}
								className="input h-20"
							/>
						</div>

						{/* SKILL 2 */}
						<div className="grid gap-2">
							<p>Skill 2</p>
							<select
								name="skilltype2"
								value={form.skilltype2}
								onChange={handleChange}
								className="input"
							>
								{skilltypeOptions.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>

							<textarea
								name="skilltext2"
								value={form.skilltext2}
								onChange={handleChange}
								className="input h-20"
							/>
						</div>

						<div>
							<p>Cost</p>
							<input
								name="cost"
								value={form.cost}
								onChange={handleChange}
								className="input"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<p>Power</p>
								<input
									name="power"
									value={form.power}
									onChange={handleChange}
									className="input"
								/>
							</div>

							<div>
								<p>Size</p>
								<input
									name="size"
									value={form.size}
									onChange={handleChange}
									className="input"
								/>
							</div>
						</div>

						{/* LINKS (NOW DROPDOWNS) */}
						<div className="sm:col-span-2">
							<p>Links</p>

							<div className="grid grid-cols-2 gap-3 mt-2">
								<select
									name="linktop"
									value={form.linktop}
									onChange={handleChange}
									className="input"
								>
									{linkOptions.map((opt) => (
										<option key={opt.value} value={opt.value}>
											Top: {opt.label}
										</option>
									))}
								</select>

								<select
									name="linkbottom"
									value={form.linkbottom}
									onChange={handleChange}
									className="input"
								>
									{linkOptions.map((opt) => (
										<option key={opt.value} value={opt.value}>
											Bottom: {opt.label}
										</option>
									))}
								</select>

								<select
									name="linkleft"
									value={form.linkleft}
									onChange={handleChange}
									className="input"
								>
									{linkOptions.map((opt) => (
										<option key={opt.value} value={opt.value}>
											Left: {opt.label}
										</option>
									))}
								</select>

								<select
									name="linkright"
									value={form.linkright}
									onChange={handleChange}
									className="input"
								>
									{linkOptions.map((opt) => (
										<option key={opt.value} value={opt.value}>
											Right: {opt.label}
										</option>
									))}
								</select>
							</div>
						</div>

						{/* BUTTONS */}
						<div className="sm:col-span-2 mt-6 space-y-4">
							<button
								className="w-full bg-slate-800 text-white text-2xl font-bold py-4 rounded-lg hover:bg-yellow-400 transition-colors"
								onClick={
									id > 0
										? () =>
											cardsAPI.update(id, form).then(() =>
												alert("card updated")
											)
										: () =>
											cardsAPI.create(form).then(() =>
												alert("created card")
											)
								}
							>
								{id > 0 ? "Update Card" : "Create Card"}
							</button>

							<button
								className="w-full bg-slate-800 text-white text-2xl font-bold py-4 rounded-lg hover:bg-yellow-400 transition-colors"
								onClick={() => { router.push("/main/imageupload") }}>
								{"Upload illustration first"}
							</button>

							{id > 0 && (
								<button
									className="w-full bg-slate-800 text-white text-2xl font-bold py-4 rounded-lg hover:bg-red-500 transition-colors"
									onClick={deleteconfirm}
								>
									Delete Card
								</button>
							)}
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
        .input {
          background: black;
          color: #f5f5dc;
          border: 1px solid #f5f5dc;
          padding: 8px 10px;
          border-radius: 6px;
          outline: none;
          width: 100%;
        }

        .input:focus {
          box-shadow: 0 0 0 1px #f5f5dc;
        }
      `}</style>
		</div>
	);
}
