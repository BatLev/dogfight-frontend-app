"use client";
import Chat from "../components/Chat";

export default function Home() {
	return (
		<div className={styles.page}>

			<h1 className="text-5xl underline">DOGFIGHT</h1>

			{/* Pinned Comment */}
			<div className={styles.pinned}>
				<p>
					Welcome! For optimal user experience use updated browser and use swipe navigation on mobile.
				</p>
			</div>

			{/* ===================== POSTS ================= */}

			{/* Post 1 */}
			<div className={styles.post}>
				<div className={styles.header}>
					<h2 className={styles.title}>Roadmap</h2>
					<span className={styles.date}>2026-04-17</span>
				</div>

				<div className={styles.content}>
					<p>
						After we generate cards for the first playtest I will add deckbuilder page and multiplayer.
						I will soon add forum so we dont flood messenger.
						If the game will be funny enough I will add meme page.
					</p>
				</div>
			</div>

			{/* Post 2 */}
			<div className={styles.post}>
				<div className={styles.header}>
					<h2 className={styles.title}>Hello World!</h2>
					<span className={styles.date}>2026-04-16</span>
				</div>

				<div className={styles.content}>
					<p>
						Finally published the MVP. more update soon
					</p>
				</div>
			</div>

			{/* ===================== END POSTS ===================== */}
			{/*<Chat></Chat>*/}
		</div>

	);
}

const styles = {
	page: "min-h-screen bg-slate-950 text-orange-700 flex flex-col items-center gap-6 p-6",

	pinned: "w-full max-w-2xl border rounded-lg border-orange-800 p-4 text-sm",

	post: "w-full max-w-2xl",

	header: " border rounded-t-lg  border-orange-800 border-b-black h-12 flex flex-cols-2 justify-between justify-items-center p-3 bg-slate-800 bg-cover bg-center",

	title: "text-xl text-orange-700",

	date: "text-lg text-orange-700",

	content: "border rounded-b-lg border-orange-800 border-t-black p-4 mt-0 text-sm text-slate-200 leading-relaxed",
};
