"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

export default function ImageFrameCropper() {
	const [image, setImage] = useState(null);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

	const onCropComplete = useCallback((_, croppedPixels) => {
		setCroppedAreaPixels(croppedPixels);
	}, []);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(URL.createObjectURL(file));
		}
	};

	const createImage = (url) =>
		new Promise((resolve, reject) => {
			const img = new Image();
			img.src = url;
			img.onload = () => resolve(img);
			img.onerror = reject;
		});

	const getCroppedImage = async () => {
		const img = await createImage(image);
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		canvas.width = croppedAreaPixels.width;
		canvas.height = croppedAreaPixels.height;

		ctx.drawImage(
			img,
			croppedAreaPixels.x,
			croppedAreaPixels.y,
			croppedAreaPixels.width,
			croppedAreaPixels.height,
			0,
			0,
			croppedAreaPixels.width,
			croppedAreaPixels.height
		);

		return new Promise((resolve) => {
			canvas.toBlob((blob) => {
				resolve(blob);
			}, "image/jpeg", 0.9);
		});
	};

	const handleUpload = async () => {
		const blob = await getCroppedImage();

		const formData = new FormData();
		formData.append("file", blob, "cropped.jpg");

		await fetch("http://localhost:8000/upload_illustration", {
			method: "POST",
			body: formData,
		});

		alert("Uploaded!");
	};

	return (
		<div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
			<div className="w-full max-w-md space-y-4">

				{/* Upload */}
				<input
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-orange-800 file:text-white hover:file:bg-orange-700"
				/>

				{/* Crop Area */}
				{image && (
					<div className="relative w-full aspect-[432/640] bg-black rounded-xl overflow-hidden">

						{/* Cropper */}
						<Cropper
							image={image}
							crop={crop}
							zoom={zoom}
							aspect={432 / 640}
							onCropChange={setCrop}
							onZoomChange={setZoom}
							onCropComplete={onCropComplete}
						/>

						{/* Frame Overlay */}
						<img
							src="/assets/frametransparent.png"
							alt="frame"
							className="absolute inset-0 w-full h-full pointer-events-none"
						/>
					</div>
				)}

				{/* Zoom slider */}
				{image && (
					<input
						type="range"
						min={1}
						max={3}
						step={0.1}
						value={zoom}
						onChange={(e) => setZoom(e.target.value)}
						className="w-full accent-orange-800"
					/>
				)}

				{/* Upload button */}
				{image && (
					<button
						onClick={handleUpload}
						className="w-full bg-orange-800 hover:bg-orange-700 transition rounded-lg py-2 font-semibold"
					>
						Upload Cropped Image
					</button>
				)}
			</div>
		</div>
	);
}
