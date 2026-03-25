"use client"

interface CardProps {
	background: string
	frame: string

	box1Icon: string
	box1Text: string

	box2Icon: string
	box2Text: string

	className?: string
}

export default function Card({
	background,
	frame,
	box1Icon,
	box1Text,
	box2Icon,
	box2Text,
	className = ""
}: CardProps) {
	return (
		<div className={`relative aspect-[436/613] w-full max-w-[436px] ${className}`}>

			{/* Background */}
			<img
				src={background}
				className="absolute inset-0 w-full h-full object-cover"
			/>


			{/* Frame Overlay */}
			<img
				src={frame}
				className="absolute inset-0 w-full h-full object-cover drop-shadow-lg"
			/>
			{/* Text Box 1 */}
			<div className="absolute bottom-[30%] left-[5%] w-[80%] h-[17%] p-3 flex items-start gap-2 overflow-hidden
    bg-[#585141]/95 backdrop-blur-sm rounded-md text-white
    [clip-path:polygon(10px_0,calc(100%-10px)_0,100%_10px,100%_calc(100%-40px),calc(100%-40px)_100%,10px_100%,0_calc(100%-10px),0_10px)]">

				{/* Overlay for amber holo glow following the panel shape */}
				<div className="absolute inset-0
      [clip-path:polygon(10px_0,calc(100%-10px)_0,100%_10px,100%_calc(100%-40px),calc(100%-40px)_100%,10px_100%,0_calc(100%-10px),0_10px)]
      bg-gradient-to-tr from-transparent via-[#CB8734]/25 to-transparent
      pointer-events-none
  " />

				{/* Top-left dark separation using a subtle inner shadow */}
				<div className="absolute inset-0
      [clip-path:polygon(10px_0,calc(100%-10px)_0,100%_10px,100%_calc(100%-40px),calc(100%-40px)_100%,10px_100%,0_calc(100%-10px),0_10px)]
      shadow-[inset_0_4px_6px_rgba(0,0,0,0.5),inset_4px_0_6px_rgba(0,0,0,0.5)]
      pointer-events-none
  " />

				<img src={box1Icon} className="w-5 h-5 mt-1" />
				<p className="text-sm leading-tight whitespace-pre-line">
					{box1Text}
				</p>
			</div>

			{/* Text Box 2 */}
			<div className="absolute bottom-[11%] left-[5%] w-[80%] h-[17%] p-3 flex items-start gap-2 overflow-hidden
    bg-[#585141]/95 backdrop-blur-sm rounded-md text-white
    [clip-path:polygon(10px_0,calc(100%-10px)_0,100%_10px,100%_calc(100%-40px),calc(100%-40px)_100%,10px_100%,0_calc(100%-10px),0_10px)]">

				{/* Overlay for amber holo glow following the panel shape */}
				<div className="absolute inset-0
      [clip-path:polygon(10px_0,calc(100%-10px)_0,100%_10px,100%_calc(100%-40px),calc(100%-40px)_100%,10px_100%,0_calc(100%-10px),0_10px)]
      bg-gradient-to-tr from-transparent via-[#CB8734]/25 to-transparent
      pointer-events-none
  " />

				{/* Top-left dark separation using a subtle inner shadow */}
				<div className="absolute inset-0
      [clip-path:polygon(10px_0,calc(100%-10px)_0,100%_10px,100%_calc(100%-40px),calc(100%-40px)_100%,10px_100%,0_calc(100%-10px),0_10px)]
      shadow-[inset_0_4px_6px_rgba(0,0,0,0.5),inset_4px_0_6px_rgba(0,0,0,0.5)]
      pointer-events-none
  " />

				<img src={box2Icon} className="w-5 h-5 mt-1" />

				<p className="text-sm leading-tight whitespace-pre-line">
					{box2Text}
				</p>
			</div>

		</div>
	)
}
