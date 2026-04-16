"use client"
import clsx from "clsx";
import { API_URL } from "../settings";
import { CardCreate } from "../interfaces/card";

/* =========================
TYPES
========================= */

type CardType = "unit" | "command" | "equipment";

/* =========================
COMPONENT
========================= */

export default function Card({
	name,
	title,
	user_id,
	illustration,
	cardtype,
	type1,
	type2,
	skilltype1,
	skilltext1,
	skilltype2,
	skilltext2,
	cost,
	power,
	size,
	linktop,
	linkbottom,
	linkleft,
	linkright,
	cardset
}: CardCreate) {

	const cardTypesafe: CardType =
		cardtype === "unit" || cardtype === "command" || cardtype === "equipment"
			? cardtype
			: "unit";

	function getPort(currentPort: string) {
		switch (currentPort) {
			case "unit/left":
				return "/dogfight-frontend-app/assets/ports/portleft.png"
			case "command/left":
				return "/dogfight-frontend-app/assets/ports/portleft_command.png"
			case "equipment/left":
				return "/dogfight-frontend-app/assets/ports/portleft_equipment.png"
			case "unit/right":
				return "/dogfight-frontend-app/assets/ports/portright.png"
			case "command/right":
				return "/dogfight-frontend-app/assets/ports/portright_command.png"
			case "equipment/right":
				return "/dogfight-frontend-app/assets/ports/portright_equipment.png"
			default:
				return undefined
		}
	}

	return (
		<div className={styles.container}>

			{/* NAME */}
			<p className={clsx(styles.name.base, styles.name.color)}>
				{name}
			</p>

			{/* TITLE */}
			<p className={clsx(styles.title.base, styles.title.color)}>
				{title}
			</p>

			{/* BG */}
			<img
				src={API_URL + "/illustrations/" + illustration}
				className={styles.bg}
			/>

			{/* FRAME */}
			<img
				src={cardStyles[cardTypesafe].frame.bg}
				className={clsx(styles.frame.base, cardStyles[cardTypesafe].frame.color)}
			/>

			{/* PORTS */}
			<img src={getPort(linkright)} className={clsx(styles.port.base, styles.port.color, styles.port.right)} />
			<img src={getPort(linkleft)} className={clsx(styles.port.base, styles.port.color, styles.port.left)} />
			<img src={getPort(linktop)} className={clsx(styles.port.base, styles.port.color, styles.port.top)} />
			<img src={getPort(linkbottom)} className={clsx(styles.port.base, styles.port.color, styles.port.bottom)} />

			{/* COST */}
			<p className={clsx(cardStyles[cardTypesafe].cost.base, cardStyles[cardTypesafe].cost.color)}>
				{cost}
			</p>

			{/* TYPES */}
			<img
				src={"/assets/icons/" + type1}
				className={clsx(styles.type.base, styles.type.top, styles.type.color)}
			/>
			<img
				src={"/assets/icons/" + type2}
				className={clsx(styles.type.base, styles.type.bottom, styles.type.color)}
			/>

			{/* ATK / DEF */}
			{cardTypesafe === "unit" && (
				<>
					<p className={clsx(styles.power.base, styles.power.color)}>{power}</p>

					<div className={clsx(styles.powerIcon.base, styles.powerIcon.color)} />

					<p className={clsx(styles.slash.base, styles.slash.color)}>/</p>

					<p className={clsx(styles.def.base, styles.def.color)}>{size}</p>

					<div className={clsx(styles.sizeIcon.base, styles.sizeIcon.color)} />
				</>
			)}

			{/* BOX 1 */}
			<div
				style={{
					backgroundImage: `url(${cardStyles[cardTypesafe].textbox})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				className={clsx(
					cardStyles[cardTypesafe].box.base,
					cardStyles[cardTypesafe].box.top,
					cardStyles[cardTypesafe].box.color
				)}
			>
				<img src={"/assets/icons/" + skilltype1} className={clsx(cardStyles[cardTypesafe].boxIcon.base, cardStyles[cardTypesafe].boxIcon.color)} />
				<p className={clsx(cardStyles[cardTypesafe].boxText.base, cardStyles[cardTypesafe].boxText.color)}>
					{skilltext1}
				</p>
			</div>

			{/* BOX 2 */}
			<div
				style={{
					backgroundImage: `url(${cardStyles[cardTypesafe].textbox})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				className={clsx(
					cardStyles[cardTypesafe].box.base,
					cardStyles[cardTypesafe].box.bottom,
					cardStyles[cardTypesafe].box.color
				)}
			>
				<img src={"/assets/icons/" + skilltype2} className={clsx(cardStyles[cardTypesafe].boxIcon.base, cardStyles[cardTypesafe].boxIcon.color)} />
				<p className={clsx(cardStyles[cardTypesafe].boxText.base, cardStyles[cardTypesafe].boxText.color)}>
					{skilltext2}
				</p>
			</div>


		</div>
	)
}

/* =========================
STYLES (BASE + COLOR SPLIT)
========================= */

const styles = {
	container: "relative aspect-[436/613] w-full [container-type:inline-size]",

	name: {
		base: "absolute underline top-[6cqw] left-[23cqw] text-[5.5cqw] z-10",
		color: "text-gray-900 font-black drop-shadow-[2px_0px_0px_rgba(0,0,0,0.8)]"
	},

	title: {
		base: "absolute top-[13cqw] left-[24cqw] text-[3cqw] z-10",
		color: "text-gray-900 font-bold drop-shadow-2xl/50"
	},

	bg: "absolute inset-0 w-full h-full object-cover",

	frame: {
		base: "absolute inset-0 w-full h-full object-cover drop-shadow-2xl",
		color: "drop-shadow-[0px_0px_1px_rgba(252,197,79,0.9),0px_0px_1px_rgba(252,197,79,0.9)]"
	},

	port: {
		base: "absolute inset-0 w-1/15 object-cover drop-shadow-2xl/50",
		color: "drop-shadow-[-1px_-2px_0px_rgba(252,197,79,0.9),-1px_2px_0px_rgba(252,197,79,0.9)]",
		right: "top-[47%] left-[93%]",
		left: "rotate-180 top-[47%] left-[0%]",
		top: "rotate-270 top-[-2.5%] left-[47.5%]",
		bottom: "rotate-90 top-[92.5%] left-[47.5%]",
	},

	type: {
		base: "absolute aspect-square left-[3%] h-1/15 ",
		color: "drop-shadow-2xl drop-shadow-[0_0_3px_rgba(252,197,79,0.9),0_0_3px_rgba(252,197,79,0.9)]",
		top: "top-[1%]",
		bottom: "top-[8%]"
	},

	cost: {
		base: "absolute top-[86%] left-[97%] -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[5cqw] z-10",
		color: "text-[#e8931d] font-bold drop-shadow-2xl"
	},

	power: {
		base: "absolute top-[87.5%] left-[5%] text-[12cqw]",
		color: "text-[#e8931d]"
	},

	slash: {
		base: "absolute top-[87.5%] left-[20.5%] text-[12cqw]",
		color: "text-[#e8931d]"
	},

	def: {
		base: "absolute top-[87.5%] left-[27%] text-[12cqw]",
		color: "text-[#e8931d]"
	},

	powerIcon: {
		base: "absolute aspect-square top-[90%] left-[11.5%] h-1/15 mask-[url('/assets/icons/power.png')] mask-alpha mask-cover",
		color: "bg-[#e8931d]"
	},

	sizeIcon: {
		base: "absolute aspect-square top-[90.5%] left-[35%] h-1/16 mask-[url('/assets/icons/size.png')] mask-alpha mask-cover",
		color: "bg-[#e8931d]"
	},

	box: {
		base: "absolute left-[5%] w-[80%] h-[15%] p-1 flex items-start gap-2 overflow-hidden bg-cover rounded-md",
		top: "bottom-[28%]",
		bottom: "bottom-[12%]",
		color: "drop-shadow-[0px_0px_1px_rgba(252,197,79,0.9),0px_0px_1px_rgba(252,197,79,0.9)]"
	},

	boxIcon: {
		base: "aspect-square h-2/3 mt-auto mb-auto ml-2 mr-2 drop-shadow-2xl/99 ",
		color: "drop-shadow-[0_0_2px_rgba(223,131,29,0.9),0_0_2px_rgba(223,131,29,0.9),0_0_2px_rgba(223,131,29,0.9)]"
	},
	boxText: {
		base: "uppercase mr-1 text-[4.2cqw] font-bold text-shadow-lg",
		color: "text-[#e8931d] text-shadow-black"
	},
}

/* =========================
CARD TYPE MAP
========================= */

const cardStyles: Record<CardType, any> = {
	unit: {
		...styles,
		frame: {
			...styles.frame,
			bg: "/dogfight-frontend-app/assets/frames/frametransparent.png",
		},
		textbox: "/dogfight-frontend-app/assets/textures/textboximagetransparent.png",
	},

	command: {
		...styles,
		frame: {
			...styles.frame,
			bg: "/dogfight-frontend-app/assets/frames/frametransparent_command.png",
			color: "drop-shadow-[0px_0px_1px_rgba(79,97,254,0.9),0px_0px_1px_rgba(79,97,254,0.9)]"
		},
		cost: {
			...styles.cost,
			color: "text-[#4f61fe] font-bold drop-shadow-2xl"
		},
		box: {
			...styles.box,
			color: "drop-shadow-[0px_0px_1px_rgba(79,97,254,0.9),0px_0px_1px_rgba(79,97,254,0.9)]"
		},
		boxIcon: {
			...styles.boxIcon,
			color: "drop-shadow-[0_0_2px_rgba(79,97,254,0.9),0_0_2px_rgba(79,97,254,0.9),0_0_2px_rgba(79,97,254,0.9)]"
		},
		boxText: {
			...styles.boxText,
			color: "text-[#4f61fe] text-shadow-black"
		},
		textbox: "/dogfight-frontend-app/assets/textures/textboximagetransparent_command.png",
	},

	equipment: {
		...styles,
		frame: {
			...styles.frame,
			bg: "/dogfight-frontend-app/assets/frames/frametransparent_equipment.png",
			color: "drop-shadow-[0px_0px_1px_rgba(240,106,61,0.9),0px_0px_1px_rgba(240,106,61,0.9)]"

		},
		cost: {
			...styles.cost,
			color: "text-[#F06A3D] font-bold drop-shadow-2xl"
		},
		box: {
			...styles.box,
			color: "drop-shadow-[0px_0px_1px_rgba(240,106,61,0.9),0px_0px_1px_rgba(240,106,61,0.9)]"
		},
		boxIcon: {
			...styles.boxIcon,
			color: "drop-shadow-[0_0_2px_rgba(240,106,61,0.9),0_0_2px_rgba(240,106,61,0.9),0_0_2px_rgba(240,106,61,0.9)]"
		},
		boxText: {
			...styles.boxText,
			color: "text-[#f06a3d] text-shadow-black"
		},

		textbox: "/dogfight-frontend-app/assets/textures/textboximagetransparent_equipment.png",
	},
}
