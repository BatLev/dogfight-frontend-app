"use client"

import { useState } from "react"
import Card from "../../components/Card"

export default function CardMaker() {
	const [form, setForm] = useState({
		name: "CRIO-01 Freezer",
		illustration: "/templateimage.png",

		type1: "/hazard.png",
		type2: "/hazard.png",

		box1Icon: "/hazard.png",
		box1Text: "Freeze enemy for 2 turns",

		box2Icon: "/hazard.png",
		box2Text: "Gain shield when attacked",

		cost: "4X3P",
		power: "4",
		size: "4",

		linktop: false,
		linkbottom: false,
		linkleft: false,
		linkright: false,

		cardset: ""
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target

		setForm(prev => ({
			...prev,
			[name]: type === "checkbox"
				? (e.target as HTMLInputElement).checked
				: value
		}))
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
							<p>Illustration</p>
							<input name="illustration" value={form.illustration} onChange={handleChange} placeholder="illustration url" className="input" />
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
								<select name="box1Icon" value={form.box1Icon} onChange={handleChange} className="input">
									<option value="hazard.png">Hazard</option>
									<option value="portfull.png">potrtfull</option>
								</select>
								<textarea name="box1Text" value={form.box1Text} onChange={handleChange} placeholder="box1 text" className="input h-20" />
							</div>
						</div>
						<div className="grid grid-cols-1 gap-4">
							<p>Skill 2</p>
							<div className="grid grid-cols-1 gap-4">
								<select name="box2Icon" value={form.box2Icon} onChange={handleChange} className="input">
									<option value="hazard.png">Hazard</option>
									<option value="portfull.png">potrtfull</option>
								</select>
								<textarea name="box2Text" value={form.box2Text} onChange={handleChange} placeholder="box2 text" className="input h-20" />
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
