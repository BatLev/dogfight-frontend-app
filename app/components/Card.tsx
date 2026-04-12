"use client"
import clsx from "clsx";
import { API_URL } from "../settings";
import { CardCreate } from "../interfaces/card";
import { get } from "node:https";

export default function Card({ name, title, user_id, illustration, cardtype, type1, type2, skilltype1, skilltext1, skilltype2, skilltext2, cost, power, size, linktop, linkbottom, linkleft, linkright, cardset
}: CardCreate) {

	function getframe(currenttype: string) {
		switch (currenttype) {
			case "unit":
				return "/assets/frames/frametransparent.png"
				break;
			case "command":
				return "/assets/frames/frametransparent_command.png"
				break;
			case "equipment":
				return "/assets/frames/frametransparent_equipment.png"
				break;
			default:
				return "/assets/frames/frametransparent.png"
		}
	}

	function gettextbox(currentextbox: string) {
		switch (currentextbox) {
			case "unit":
				return "/assets/textures/textboximagetransparent.png"
				break;
			case "command":
				return "/assets/textures/textboximagetransparent_command.png"
				break;
			case "equipment":
				return "/assets/textures/textboximagetransparent_equipment.png"
				break;
			default:
				return "/assets/textures/textboximagetransparent.png"
		}
	}
	function getport(currentport: string) {
		switch (currentport) {
			case "unit/left":
				return "/assets/ports/portleft.png"
				break;
			case "command/left":
				return "/assets/ports/portleft_command.png"
				break;
			case "equipment/left":
				return "/assets/ports/portleft_equipment.png"
				break;
			case "unit/right":
				return "/assets/ports/portright.png"
				break;
			case "command/right":
				return "/assets/ports/portright_command.png"
				break;
			case "equipment/right":
				return "/assets/ports/portright_equipment.png"
				break;
			default:
				return undefined
		}
	}

	return (
		<div className={styles.container}>
			{/* nameplate */}
			<p className={styles.name}>
				{name}
			</p>
			<p className={styles.subtitle}>
				{title}
			</p>

			{/* Background */}
			<img
				src={API_URL + "/illustrations/" + illustration}
				className={styles.bg}
			/>

			{/* Frame */}
			<img
				src={getframe(cardtype)}
				className={styles.frame}
			/>

			{/* Ports */}
			<img src={getport(linkright)} className={clsx(styles.port.base, styles.port.right)} />
			<img src={getport(linkleft)} className={clsx(styles.port.base, styles.port.left)} />
			<img src={getport(linktop)} className={clsx(styles.port.base, styles.port.top)} />
			<img src={getport(linkbottom)} className={clsx(styles.port.base, styles.port.bottom)} />

			{/* Cost */}
			<p className={styles.cost}>{cost}</p>
			{/* Types */}
			<img
				src={"/assets/icons/" + type1}
				className={clsx(styles.type.base, styles.type.top)}
			/>
			<img
				src={"/assets/icons/" + type2}
				className={clsx(styles.type.base, styles.type.bottom)}
			/>

			{/* ATK / DEF */}
			<p className={styles.power}>{power}</p>

			<div className={styles.powerIcon} />

			<p className={styles.slash}>/</p>

			<p className={styles.def}>{size}</p>

			<div className={styles.sizeIcon} />

			{/* Text Box 1 */}
			<div
				style={{
					backgroundImage: `url(${gettextbox(cardtype)})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				className={clsx(styles.box.base, styles.box.top)}>
				<img src={"/assets/icons/" + skilltype1} className={styles.boxIcon} />
				<p className={styles.boxText}>
					{skilltext1}
				</p>
			</div>

			{/* Text Box 2 */}
			<div
				style={{
					backgroundImage: `url(${gettextbox(cardtype)})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				className={clsx(styles.box.base, styles.box.bottom)}>
				<img src={"/assets/icons/" + skilltype2} className={styles.boxIcon} />
				<p className={styles.boxText}>
					{skilltext2}
				</p>
			</div>
		</div >
	)
}

/* =========================
STYLES 
========================= */

const styles = {
	container: "relative aspect-[436/613] w-full [container-type:inline-size]",

	name: "absolute underline top-[6cqw] left-[23cqw] text-[5.5cqw] text-gray-900 font-black z-10 drop-shadow-[2px_0px_0px_rgba(0,0,0,0.8)]",

	subtitle: "absolute top-[13cqw] left-[24cqw] text-[3cqw]  text-gray-900 font-bold z-10 drop-shadow-2xl/50 ",

	bg: "absolute inset-0 w-full h-full object-cover",

	frame: `absolute inset-0 w-full h-full object-cover drop-shadow-2xl 
	drop-shadow-[0px_0px_1px_rgba(252,197,79,0.9),0px_0px_1px_rgba(252,197,79,0.9)] `,

	/* PORTS */
	port: {
		base: `absolute inset-0 w-1/15 object-cover drop-shadow-2xl/50 
		drop-shadow-[-1px_-2px_0px_rgba(252,197,79,0.9),-1px_2px_0px_rgba(252,197,79,0.9)]`,

		right: "top-[47%] left-[93%]",
		left: "rotate-180 top-[47%] left-[0%]",
		top: "rotate-270 top-[-2.5%] left-[47.5%]",
		bottom: "rotate-90 top-[92.5%] left-[47.5%]",
	},

	/* TYPES */
	type: {
		base: "absolute aspect-square left-[3%] h-1/15 drop-shadow-2xl",

		top: "top-[1%] drop-shadow-[0_0_3px_rgba(0,0,255,0.8),0_0_3px_rgba(0,0,255,0.8)]",
		bottom: "top-[8%] drop-shadow-[0_0_3px_rgba(0,255,0,0.8),0_0_3px_rgba(0,255,0,0.8)]",
	},

	/* TEXT */

	cost: "absolute top-[86%] left-[96%] -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap break-normal text-[5cqw] text-[#e8931d] font-bold z-10 drop-shadow-2xl",

	power: "absolute top-[87.5%] left-[5%]  text-[12cqw] text-[#e8931d]",
	slash: "absolute top-[87.5%] left-[20.5%]  text-[12cqw] text-[#e8931d]",
	def: "absolute top-[87.5%] left-[27%]  text-[12cqw] text-[#e8931d]",

	/* ICONS */
	powerIcon: "absolute aspect-square top-[90%] left-[11.5%] h-1/15 mask-[url('/assets/icons/power.png')] mask-alpha mask-cover bg-[#e8931d]",
	sizeIcon: "absolute aspect-square top-[90.5%] left-[35%] h-1/16 mask-[url('/assets/icons/size.png')] mask-alpha mask-cover bg-[#e8931d]",

	/* BOXES */
	box: {
		base: `
		absolute
		left-[5%]
		w-[80%]
		h-[15%]
		p-1
		flex items-start gap-2 overflow-hidden
		bg-cover
		rounded-md
		text-[#e8931d]
		drop-shadow-[0px_0px_1px_rgba(252,197,79,0.9),0px_0px_1px_rgba(252,197,79,0.9)]`,

		unit: '',
		command: '',
		equiment: '',

		top: "bottom-[28%]",
		bottom: "bottom-[12%]",
	},

	boxIcon: `aspect-square h-2/3 mt-auto mb-auto ml-2 mr-2 drop-shadow-2xl/99  
	drop-shadow-[0_0_2px_rgba(223,131,29,0.9),0_0_2px_rgba(223,131,29,0.9),0_0_2px_rgba(223,131,29,0.9)] `,

	boxText: "uppercase mr-1 text-[#e8931d] font-bold text-[4.2cqw] text-shadow-lg text-shadow-black",
}
