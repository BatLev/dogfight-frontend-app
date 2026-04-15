"use client";

import { API_URL } from "@/app/settings";
import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";

const generateRandomFilename = (): string =>
	`img_${Date.now()}_${Math.random().toString(36).slice(2, 10)}.jpg`;

export default function ImageFrameCropper() {
	const [image, setImage] = useState<string | null>(null);
	const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState<number>(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

	const [filename, setFilename] = useState<string>(generateRandomFilename());

	const [uploading, setUploading] = useState<boolean>(false);
	const [uploadStatus, setUploadStatus] = useState<"success" | "error" | null>(null);

	useEffect(() => {
		return () => {
			if (image) URL.revokeObjectURL(image);
		};
	}, [image]);

	const onCropComplete = useCallback(
		(_: Area, croppedPixels: Area) => {
			setCroppedAreaPixels(croppedPixels);
		},
		[]
	);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setImage(URL.createObjectURL(file));
		setUploadStatus(null);
	};

	const createImage = (url: string): Promise<HTMLImageElement> =>
		new Promise((resolve, reject) => {
			const img = new Image();
			img.src = url;
			img.onload = () => resolve(img);
			img.onerror = reject;
		});

	const getCroppedImage = async (): Promise<Blob | null> => {
		if (!image || !croppedAreaPixels) return null;

		const img = await createImage(image);

		const scaleX = img.naturalWidth / img.width;
		const scaleY = img.naturalHeight / img.height;

		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		if (!ctx) return null;

		canvas.width = croppedAreaPixels.width * scaleX;
		canvas.height = croppedAreaPixels.height * scaleY;

		ctx.drawImage(
			img,
			croppedAreaPixels.x * scaleX,
			croppedAreaPixels.y * scaleY,
			croppedAreaPixels.width * scaleX,
			croppedAreaPixels.height * scaleY,
			0,
			0,
			canvas.width,
			canvas.height
		);

		return new Promise<Blob | null>((resolve) => {
			canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.9);
		});
	};

	const handleUpload = async () => {
		try {
			setUploading(true);
			setUploadStatus(null);

			const blob = await getCroppedImage();
			if (!blob) throw new Error("No image to upload");

			const token = localStorage.getItem("token"); // 👈 auth token

			if (!token) throw new Error("No auth token found");

			const formData = new FormData();
			formData.append("file", blob, filename);

			const res = await fetch(`${API_URL}/upload_illustration/${filename}`, {
				method: "POST",
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`, // 👈 attach token
				},
			});

			if (!res.ok) throw new Error("Upload failed");

			setUploadStatus("success");
		} catch (err) {
			console.error(err);
			setUploadStatus("error");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
			<div className="w-full max-w-md space-y-4">
				<input
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-orange-800 file:text-white hover:file:bg-orange-700"
				/>

				<input
					type="text"
					value={filename}
					onChange={(e) => setFilename(e.target.value)}
					className="w-full p-2 rounded bg-slate-800 text-sm"
				/>

				{image && (
					<div className="relative w-full aspect-[436/613] bg-black overflow-hidden">
						<Cropper
							image={image}
							crop={crop}
							zoom={zoom}
							aspect={436 / 613}
							cropShape="rect"
							showGrid={false}
							objectFit="cover"
							onCropChange={setCrop}
							onZoomChange={(z) => setZoom(Number(z))}
							onCropComplete={onCropComplete}
						/>

						{/* Frame overlay */}
						<img
							src="/assets/frames/frametransparent.png"
							alt="frame"
							className="absolute inset-0 w-full h-full pointer-events-none"
						/>
					</div>
				)}

				{image && (
					<input
						type="range"
						min={1}
						max={3}
						step={0.1}
						value={zoom}
						onChange={(e) => setZoom(Number(e.target.value))}
						className="w-full accent-orange-800"
					/>
				)}

				{image && (
					<button
						onClick={handleUpload}
						disabled={uploading}
						className={`w-full transition rounded-lg py-2 font-semibold ${uploading
								? "bg-gray-600 cursor-not-allowed"
								: "bg-orange-800 hover:bg-orange-700"
							}`}
					>
						{uploading ? "Uploading..." : "Upload Cropped Image"}
					</button>
				)}

				{uploadStatus === "success" && (
					<p className="text-green-400 text-sm text-center">
						Upload successful ✔
					</p>
				)}

				{uploadStatus === "error" && (
					<p className="text-red-400 text-sm text-center">
						Upload failed ✖
					</p>
				)}
			</div>
		</div>
	);
}
