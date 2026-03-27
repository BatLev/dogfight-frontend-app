"use client"

interface CardProps {
	name: string
	illustration: string

	type1: string
	type2: string

	box1Icon: string
	box1Text: string

	box2Icon: string
	box2Text: string

	cost: string
	power: string
	size: string

	linktop: boolean
	linkbottom: boolean
	linkleft: boolean
	linkright: boolean

	cardset: string
}

export default function Card({
	name,
	illustration,
	type1,
	type2,
	box1Icon,
	box1Text,
	box2Icon,
	box2Text,
	cost,
	power,
	size,
	linktop,
	linkbottom,
	linkleft,
	linkright
}: CardProps) {

	return (
		<div className={`relative aspect-[436/613] w-full [container-type:inline-size]`}>
			{/* nameplate */}
			<p className={'absolute underline top-[6cqw] left-[23cqw] text-[5.5cqw] text-gray-900 font-black z-10 drop-shadow-[2px_0px_0px_rgba(0,0,0,0.8)]'}>
				CRIO-01 Freezer
			</p>
			<p className={'absolute top-[13cqw] left-[24cqw] text-[3cqw]  text-gray-900 font-bold z-10 drop-shadow-2xl/50 '}>Cryoneer mech</p>

			{/* Background */}
			<img
				src={"/templateimage.png"}
				className="absolute inset-0 w-full h-full object-cover"
			/>

			{/* Frame Overlay */}
			<img
				src={"/frametransparent.png"}
				className="absolute inset-0 w-full h-full object-cover drop-shadow-2xl 
				drop-shadow-[0px_0px_1px_rgba(252,197,79,0.9),0px_0px_1px_rgba(252,197,79,0.9)] "
			/>
			{/* ports */}
			<img
				src="/portleft.png"
				className="absolute inset-0 aspect-squire top-[47%] left-[93%]  w-1/15 object-cover drop-shadow-2xl/50 
				drop-shadow-[-1px_-2px_0px_rgba(252,197,79,0.9),-1px_2px_0px_rgba(252,197,79,0.9)] "
			/>
			<img
				src="/portleft.png"
				className="rotate-180 absolute inset-0 aspect-squire top-[47%] left-[0%]  w-1/15 object-cover drop-shadow-2xl/50 
				drop-shadow-[-1px_-2px_0px_rgba(252,197,79,0.9),-1px_2px_0px_rgba(252,197,79,0.9)] "
			/>
			<img
				src="/portleft.png"
				className="rotate-270 absolute inset-0 aspect-squire top-[-2.5%] left-[47.5%]  w-1/15 object-cover drop-shadow-2xl/50 
				drop-shadow-[-1px_-2px_0px_rgba(252,197,79,0.9),-1px_2px_0px_rgba(252,197,79,0.9)] "
			/>
			<img
				src="/portleft.png"
				className="rotate-90 absolute inset-0 aspect-squire top-[92.5%] left-[47.5%]  w-1/15 object-cover drop-shadow-2xl/50 
				drop-shadow-[-1px_-2px_0px_rgba(252,197,79,0.9),-1px_2px_0px_rgba(252,197,79,0.9)] "
			/>

			{/* Cost */}

			<p className={'absolute rotate-270 top-[84%] left-[90.5%] text-[5cqw] text-[#e8931d] font-bold z-10 drop-shadow-2xl drop-shadow-[1px_1px_1px_rgba(1,1,1,0.8),1px_1px_1px_rgba(1,1,1,0.8)]'} > 4X3P</p>

			{/* types */}
			<img
				src="/hazard.png"
				className="absolute aspect-square top-[1%] left-[3%] h-1/15 drop-shadow-2xl drop-shadow-[0_0_3px_rgba(0,0,255,0.8),0_0_3px_rgba(0,0,255,0.8)]"
			/>
			<img
				src="/hazard.png"
				className="absolute aspect-square top-[8%] left-[3%] h-1/15 drop-shadow-2xl drop-shadow-[0_0_3px_rgba(0,255,0,0.8),0_0_3px_rgba(0,255.0,0.8)]"
			/>

			{/* ATK/DEF */}
			<p
				className="absolute top-[87.5%] left-[5%]  text-[12cqw] text-[#e8931d]"
			>4</p>
			<div
				className="absolute aspect-square top-[90%] left-[11.5%] h-1/15 mask-[url('/power.png')] mask-alpha mask-cover bg-[#e8931d]"
			/>
			<p
				className="absolute top-[87.5%] left-[20.5%]  text-[12cqw] text-[#e8931d]"
			>/</p>

			<p
				className="absolute top-[87.5%] left-[27%]  text-[12cqw] text-[#e8931d]"
			>4</p>

			<div
				className="absolute aspect-square top-[90.5%] left-[35%] h-1/16 mask-[url('/size.png')] mask-alpha mask-cover bg-[#e8931d]"
			/>


			{/* Text Box 1 */}

			<div
				className="
    absolute
    bottom-[28%]
    left-[5%]
    w-[80%]
    h-[15%]
    p-1
    flex items-start gap-2 overflow-hidden

    /* Main background */
    bg-[url('/textboximagetransparent.png')]
    bg-cover
    rounded-md
    text-[#e8931d]
    drop-shadow-[0px_0px_1px_rgba(252,197,79,0.9),0px_0px_1px_rgba(252,197,79,0.9)] "
			>
				<img
					src="/hazard.png"
					className="aspect-square h-2/3 mt-auto mb-auto ml-2 mr-2 drop-shadow-2xl/99  
					drop-shadow-[0_0_2px_rgba(223,131,29,0.9),0_0_2px_rgba(223,131,29,0.9),0_0_2px_rgba(223,131,29,0.9)] "
				/>
				<p className="uppercase mr-1 text-[#e8931d] font-bold text-[4.2cqw] text-shadow-lg text-shadow-black">
					{box1Text}Lorem IPSUM DOLOR ET ASD ASD ASD ASD ASD ASD SAD ASD  WASD
				</p>
			</div>

			{/* Text Box 2 */}

			<div
				className="
    absolute
    bottom-[12%]
    left-[5%]
    w-[80%]
    h-[15%]
    p-1
    flex items-start gap-2 overflow-hidden

    /* Main background */
    bg-[url('/textboximagetransparent.png')]
    bg-cover
    rounded-md
    text-[#e8931d]
    drop-shadow-[0px_0px_1px_rgba(252,197,79,0.9),0px_0px_1px_rgba(252,197,79,0.9)]"

			>
				<img
					src="/hazard.png"
					className="aspect-square h-2/3 mt-auto mb-auto ml-2 mr-2 drop-shadow-2xl/99  
					drop-shadow-[0_0_2px_rgba(223,131,29,0.9),0_0_2px_rgba(223,131,29,0.9),0_0_2px_rgba(223,131,29,0.9)] "

				/>
				<p className="uppercase mr-1 text-[#e8931d] font-bold text-[4.2cqw] text-shadow-lg text-shadow-black">
					{box1Text}Lorem IPSUM DOLOR ET ASD ASD ASD ASD ASD ASD ASD ASD WASD
				</p>
			</div>
		</div>
	)
}
