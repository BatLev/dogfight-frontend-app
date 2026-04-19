<header className="h-20 bg-gradient-to-r from-[#7b4e24] to-slate-800 text-white flex items-center px-4 shadow-md">
	{/* Logo */}
	<div className="flex-shrink-0">
		<Image src="/dogfight-frontend-app/assets/ports/portfull.png" alt="MyTCG" width={80} height={80} className="rounded-md" />
	</div>

	{isDesktop ? (
		<div className="flex-1 flex justify-center items-center space-x-4">
			{pages.map((p) => (
				<button
					key={p.path}
					onClick={() => router.push(p.path)}
					className={`px-4 py-2 rounded-lg font-medium transition
					${pathname === p.path
							? "bg-orange-800 text-gray-100 shadow-lg text-lg"
							: "bg-slate-900 text-gray-100 bg-opacity-20 hover:bg-opacity-40 text-lg"
						}`}
				>
					{p.name}
				</button>
			))}

			{/* Logout gomb */}
			<button
				onClick={handleLogout}
				className="ml-6 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-medium"
			>
				Logout
			</button>
		</div>
	) : (
		<div className="flex-1 flex justify-between items-center px-2">
			<div className="text-2xl font-semibold">
				{pages.find((p) => p.path === pathname)?.name ?? ""}
			</div>

			{/* Logout mobilon */}
			<button
				onClick={handleLogout}
				className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-sm"
			>
				Logout
			</button>
		</div>
	)}
</header>
