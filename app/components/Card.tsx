"use client"
import CardProps from "@/interfaces/card";
import clsx from "clsx";

export default function Card({ id, name, user_id, illustration, type1, type2, skilltype1, skilltext1, skilltype2, skilltext2, cost, power, size, linktop, linkbottom, linkleft, linkright, cardset
}: CardProps) {

	return (
		<div className={styles.container}>
			{/* nameplate */}
			<p className={styles.name}>
				{name}
			</p>
			<p className={styles.subtitle}>
				Cryoneer mech
			</p>

			{/* Background */}
			<img
				src={"/templateimage.png"}
				className={styles.bg}
			/>

			{/* Frame */}
			<img
				src={"/frametransparent.png"}
				className={styles.frame}
			/>

			{/* Ports */}
			<img src="/portleft.png" className={clsx(styles.port.base, styles.port.right)} />
			<img src="/portleft.png" className={clsx(styles.port.base, styles.port.left)} />
			<img src="/portleft.png" className={clsx(styles.port.base, styles.port.top)} />
			<img src="/portleft.png" className={clsx(styles.port.base, styles.port.bottom)} />

			{/* Cost */}
			<p className={styles.cost}>4X3P</p>

			{/* Types */}
			<img
				src="/hazard.png"
				className={clsx(styles.type.base, styles.type.top)}
			/>
			<img
				src="/hazard.png"
				className={clsx(styles.type.base, styles.type.bottom)}
			/>

			{/* ATK / DEF */}
			<p className={styles.power}>4</p>

			<div className={styles.powerIcon} />

			<p className={styles.slash}>/</p>

			<p className={styles.def}>4</p>

			<div className={styles.sizeIcon} />

			{/* Text Box 1 */}
			<div className={clsx(styles.box.base, styles.box.top)}>
				<img src="/hazard.png" className={styles.boxIcon} />
				<p className={styles.boxText}>
					{skilltext1}
				</p>
			</div>

			{/* Text Box 2 */}
			<div className={clsx(styles.box.base, styles.box.bottom)}>
				<img src="/hazard.png" className={styles.boxIcon} />
				<p className={styles.boxText}>
					{skilltext2}
				</p>
			</div>
		</div>
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
		base: `absolute inset-0 aspect-squire w-1/15 object-cover drop-shadow-2xl/50 
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
	cost: "absolute rotate-270 top-[84%] left-[90.5%] text-[5cqw] text-[#e8931d] font-bold z-10 drop-shadow-2xl drop-shadow-[1px_1px_1px_rgba(1,1,1,0.8),1px_1px_1px_rgba(1,1,1,0.8)]",

	power: "absolute top-[87.5%] left-[5%]  text-[12cqw] text-[#e8931d]",
	slash: "absolute top-[87.5%] left-[20.5%]  text-[12cqw] text-[#e8931d]",
	def: "absolute top-[87.5%] left-[27%]  text-[12cqw] text-[#e8931d]",

	/* ICONS */
	powerIcon: "absolute aspect-square top-[90%] left-[11.5%] h-1/15 mask-[url('/power.png')] mask-alpha mask-cover bg-[#e8931d]",
	sizeIcon: "absolute aspect-square top-[90.5%] left-[35%] h-1/16 mask-[url('/size.png')] mask-alpha mask-cover bg-[#e8931d]",

	/* BOXES */
	box: {
		base: `
		absolute
		left-[5%]
		w-[80%]
		h-[15%]
		p-1
		flex items-start gap-2 overflow-hidden
		bg-[url('/textboximagetransparent.png')]
		bg-cover
		rounded-md
		text-[#e8931d]
		drop-shadow-[0px_0px_1px_rgba(252,197,79,0.9),0px_0px_1px_rgba(252,197,79,0.9)]`,

		top: "bottom-[28%]",
		bottom: "bottom-[12%]",
	},

	boxIcon: `aspect-square h-2/3 mt-auto mb-auto ml-2 mr-2 drop-shadow-2xl/99  
	drop-shadow-[0_0_2px_rgba(223,131,29,0.9),0_0_2px_rgba(223,131,29,0.9),0_0_2px_rgba(223,131,29,0.9)] `,

	boxText: "uppercase mr-1 text-[#e8931d] font-bold text-[4.2cqw] text-shadow-lg text-shadow-black",
}
