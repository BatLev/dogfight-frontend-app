'use client'
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");


	const router = useRouter();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("http://127.0.0.1:8000/users/login", {
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
			router.push("/main");
		} catch (err) {
			console.error(err);
			alert("Server error");
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		alert("Signed out");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
			<div className="w-80 border border-amber-700 p-8 bg-slate-900">

				{/* Logo */}
				<h1 className="text-center text-2xl tracking-widest text-amber-700 mb-8">
					DOGFIGHT
				</h1>

				{/* Form */}
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

				{/* Logout */}
				<button
					onClick={handleLogout}
					className="mt-6 w-full text-xs text-slate-500 hover:text-slate-300"
				>
					SIGN OUT
				</button>
			</div>
		</div>
	);
}
