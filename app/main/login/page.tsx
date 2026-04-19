'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/settings";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const router = useRouter();

	// Check token on mount
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const res = await fetch(API_URL + "/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ username, password })
			});

			const data = await res.json();

			if (!res.ok) {
				alert(data.detail || "Login failed");
				return;
			}

			localStorage.setItem("token", data.access_token);
			setIsLoggedIn(true);

			router.push("/main");
		} catch (err) {
			console.error(err);
			alert("Server error");
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		alert("Signed out");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
			<div className="w-80 border border-amber-700 p-8 bg-slate-900">

				<h1 className="text-center text-2xl tracking-widest text-amber-700 mb-8">
					DOGFIGHT
				</h1>

				{/* Logged in state */}
				{isLoggedIn ? (
					<div className="flex flex-col items-center gap-6">
						<div className="text-3xl font-bold text-orange-500 tracking-widest">
							LOGGED IN
						</div>

						<button
							onClick={handleLogout}
							className="text-xs text-slate-500 hover:text-slate-300"
						>
							SIGN OUT
						</button>
					</div>
				) : (
					/* Login form */
					<form onSubmit={handleLogin} className="flex flex-col gap-4">
						<input
							className="bg-transparent border border-slate-700 px-3 py-2 outline-none focus:border-amber-700"
							type="text"
							placeholder="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>

						<input
							className="bg-transparent border border-slate-700 px-3 py-2 outline-none focus:border-amber-700"
							type="password"
							placeholder="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<button
							className="border border-amber-700 text-amber-700 py-2 hover:bg-amber-700 hover:text-black transition"
							type="submit"
						>
							LOGIN
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
