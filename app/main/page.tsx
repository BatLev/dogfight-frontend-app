"use client";

export default function Home() {
	return (
		<div className={styles.page}>

			<h1 className="text-5xl underline">Dogfight</h1>

			{/* Pinned Comment */}
			<div className={styles.pinned}>
				<p>
					Welcome to the blog. This is a pinned message. You can use this area
					for announcements, updates, or anything important.
				</p>
			</div>

			{/* ===================== POSTS ===================== */}

			{/* Post 1 */}
			<div className={styles.post}>
				<div className={styles.header}>
					<h2 className={styles.title}>First Post</h2>
					<span className={styles.date}>2026-03-31</span>
				</div>

				<div className={styles.content}>
					<p>
						This is the first post. Replace this text with your actual content.
						Keep it minimal and clean.
					</p>
				</div>
			</div>

			{/* Post 2 */}
			<div className={styles.post}>
				<div className={styles.header}>
					<h2 className={styles.title}>Another Update</h2>
					<span className={styles.date}>2026-03-30</span>
				</div>

				<div className={styles.content}>
					<p>
						Add more posts by copying one of these blocks and editing the text.
					</p>
				</div>
			</div>

			{/* ===================== END POSTS ===================== */}

		</div>
	);
}

const styles = {
	page: "min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center gap-6 p-6",

	pinned: "w-full max-w-2xl border rounded-lg border-orange-800 p-4 text-sm",

	post: "w-full max-w-2xl",

	header: "bg-[url(/textboxtexture.png)] border rounded-t-lg  border-orange-800 border-b-black h-12 flex flex-cols-2 justify-between justify-items-center p-3 bg-slate-800 bg-cover bg-center",

	title: "text-xl text-slate-100",

	date: "text-lg text-slate-400",

	content: "border rounded-b-lg border-orange-800 border-t-black p-4 mt-0 text-sm leading-relaxed",
};
