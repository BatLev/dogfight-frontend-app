"use client";

import { useEffect, useState } from "react";

// ----------------------
// Types
// ----------------------
interface Message {
	id: number;
	user_id: number;
	senttime: string;
	replyto: string | null;
	chattext: string;
	children?: Message[];
}

// ----------------------
// Dummy Data
// ----------------------
const dummyData: Message[] = [
	{
		id: 1,
		user_id: 1,
		senttime: "2026-01-01 10:00",
		replyto: null,
		chattext: "Root message",
	},
	{
		id: 2,
		user_id: 2,
		senttime: "2026-01-01 10:01",
		replyto: "1",
		chattext: "Reply to 1",
	},
	{
		id: 3,
		user_id: 3,
		senttime: "2026-01-01 10:02",
		replyto: "1",
		chattext: "Another reply to 1",
	},
	{
		id: 4,
		user_id: 2,
		senttime: "2026-01-01 10:03",
		replyto: "2",
		chattext: "Reply to reply",
	},
	{
		id: 5,
		user_id: 1,
		senttime: "2026-01-01 10:00",
		replyto: null,
		chattext: "message",
	}
];

// ----------------------
// Build Tree
// ----------------------
function buildMessageTree(messages: Message[]): Message[] {
	const map = new Map<number, Message>();

	messages.forEach((msg) => {
		map.set(msg.id, { ...msg, children: [] });
	});

	const roots: Message[] = [];

	map.forEach((msg) => {
		if (msg.replyto && map.has(Number(msg.replyto))) {
			const parent = map.get(Number(msg.replyto))!;
			parent.children!.push(msg);
		} else {
			roots.push(msg);
		}
	});

	return roots;
}

// ----------------------
// Dummy Actions
// ----------------------
function handleReply(messageId: number) {
	console.log("Reply to:", messageId);
}

function handleDelete(messageId: number) {
	console.log("Delete:", messageId);
}

// ----------------------
// Message Component
// ----------------------
function MessageBlock({
	message,
	level = 0,
}: {
	message: Message;
	level?: number;
}) {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<div
			className="flex flex-col gap-2"
			style={{ marginLeft: level * 20 }}
		>
			{/* Message */}
			<div className="border border-orange-800 p-3 bg-slate-900">

				{/* Header */}
				<div className="flex justify-between text-xs text-orange-800 mb-1">
					<span>User {message.user_id}</span>
					<span>{message.senttime}</span>
				</div>

				{/* Text */}
				<div className="text-sm mb-2">
					{message.chattext}
				</div>

				{/* Actions */}
				<div className="flex gap-3 text-xs text-orange-800">

					<button onClick={() => handleReply(message.id)}>
						reply
					</button>

					<button onClick={() => handleDelete(message.id)}>
						delete
					</button>

					{message.children && message.children.length > 0 && (
						<button onClick={() => setCollapsed(!collapsed)}>
							{collapsed ? "expand" : "collapse"}
						</button>
					)}

				</div>
			</div>

			{/* Children */}
			{!collapsed &&
				message.children &&
				message.children
					.sort((a, b) => b.id - a.id)
					.map((child) => (
						<MessageBlock
							key={child.id}
							message={child}
							level={level + 1}
						/>
					))}
		</div>
	);
}

// ----------------------
// MAIN COMPONENT
// ----------------------
export default function Chat() {
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		setMessages(dummyData);
	}, []);

	// sort newest first
	const sorted = [...messages].sort((a, b) => b.id - a.id);

	// build tree
	const tree = buildMessageTree(sorted);

	return (
		<div className="flex flex-col items-center w-full">

			{/* Top separator */}
			<div className="w-full border-t border-orange-800 mb-6" />

			{/* Chat container */}
			<div className="w-[90%] lg:w-[60%] flex flex-col gap-4">

				{tree.map((msg) => (
					<MessageBlock key={msg.id} message={msg} />
				))}

			</div>
		</div>
	);
}
