"use client"

import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { CardGet, CardCreate } from "@/app/interfaces/card";
import { useSearchParams } from "next/navigation";
import * as cardsAPI from "@/app/utility/CardAPICalls";

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

		cardset: ""
	})


	const [id, setid] = useState(0)
	const params = useSearchParams()

	useEffect(() => {
		const currentid = Number(params.get("id"));
		if (currentid > 0) {
			setid(currentid)
			cardsAPI.getOne(currentid).then(res => setForm(res))
		}
	}, [])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target

		setForm(prev => ({
			...prev,
			[name]: type === "checkbox"
				? (e.target as HTMLInputElement).checked
				: value
		}))
	}

	const deleteconfirm = () => {
		const confirmed = window.confirm("Are you sure you want to delete this card?");
		if (confirmed) {
			cardsAPI.remove(id)
		} else {
			console.log("delete canceled");
		}
	}

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
							<input name="name" value={form.name} onChange={handleChange} placeholder="name" className="input" />
						</div>
						<div>
							<p>Title</p>
							<input name="title" value={form.title} onChange={handleChange} placeholder="title" className="input" />
						</div>

						<div>
							<p>Illustration</p>
							<input name="illustration" value={form.illustration} onChange={handleChange} placeholder="illustration url" className="input" />
						</div>
						<div>
							<p>CardType</p>
							<input name="Cardtype" value={form.cardtype} onChange={handleChange} placeholder="cardtype" className="input" />
						</div>

						<div>
							<p>Type1</p>
							<input name="type1" value={form.type1} onChange={handleChange} placeholder="type1" className="input" />
						</div>
						<div>
							<p>Type2</p>
							<input name="type2" value={form.type2} onChange={handleChange} placeholder="type2" className="input" />
						</div>

						<div className="grid grid-cols-1 gap-4">
							<p>Skill 1</p>
							<div className="grid grid-cols-1 gap-4">
								<select name="skilltype1" value={form.skilltype1} onChange={handleChange} className="input">
									<option value="hazard.png">Hazard</option>
									<option value="portfull.png">potrtfull</option>
								</select>
								<textarea name="skilltext1" value={form.skilltext1} onChange={handleChange} placeholder="box1 text" className="input h-20" />
							</div>
						</div>
						<div className="grid grid-cols-1 gap-4">
							<p>Skill 2</p>
							<div className="grid grid-cols-1 gap-4">
								<select name="skilltype2" value={form.skilltype2} onChange={handleChange} className="input">
									<option value="hazard.png">Hazard</option>
									<option value="portfull.png">potrtfull</option>
								</select>
								<textarea name="skilltext2" value={form.skilltext2} onChange={handleChange} placeholder="box2 text" className="input h-20" />
							</div>
						</div>
						<div>
							<p>Cost</p>
							<input name="cost" value={form.cost} onChange={handleChange} placeholder="cost" className="input" />
						</div>
						<div className=" grid grid-cols-2 gap-4">
							<div>
								<p>Power</p>
								<input name="power" value={form.power} onChange={handleChange} placeholder="power" className="input" />
							</div>

							<div>
								<p>Size</p>
								<input name="size" value={form.size} onChange={handleChange} placeholder="size" className="input" />
							</div>
						</div>

						{/* CHECKBOXES */}
						<div>
							<p>Links</p>
							<div className="flex flex-wrap gap-4 sm:col-span-2">
								<label className="flex items-center gap-2">
									<input type="checkbox" name="linktop" checked={form.linktop} onChange={handleChange} />
									top
								</label>

								<label className="flex items-center gap-2">
									<input type="checkbox" name="linkbottom" checked={form.linkbottom} onChange={handleChange} />
									bottom
								</label>

								<label className="flex items-center gap-2">
									<input type="checkbox" name="linkleft" checked={form.linkleft} onChange={handleChange} />
									left
								</label>

								<label className="flex items-center gap-2">
									<input type="checkbox" name="linkright" checked={form.linkright} onChange={handleChange} />
									right
								</label>
							</div>
							<div className="mt-6 w-full">
								<button
									className="w-full bg-slate-800 border-[#F5F5DC] text-white text-2xl font-bold py-4 rounded-lg hover:bg-yellow-400 transition-colors"
									onClick={id > 0 ? () => cardsAPI.update(id, form).then(() => alert("card updated")) : () => cardsAPI.create(form).then(() => alert("created card"))}
								>
									{id > 0 ? "Update Card" : "Create Card"}
								</button>
							</div>
							<div className="mt-6 w-full">
								<button hidden={id > 0 ? false : true}
									className="w-full bg-slate-800 border-[#F5F5DC] text-white text-2xl font-bold py-4 rounded-lg hover:bg-yellow-400 transition-colors"
									onClick={deleteconfirm}
								>
									Delete Card
								</button>
							</div>

						</div>
					</div>
				</div>

			</div>

			<style jsx>{`
				.input {
					background: black;
					color: #F5F5DC;
					border: 1px solid #F5F5DC;
					padding: 8px 10px;
					border-radius: 6px;
					outline: none;
					width: 100%
				}

				.input:focus {
					box-shadow: 0 0 0 1px #F5F5DC;
				}
			`}</style>
		</div>
	)
}
