"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PhoneCall, Play, Calendar, Clock, ArrowLeft } from "lucide-react";

const upcoming = [
	{
		id: 1,
		name: "Alice Brown",
		role: "Data Scientist",
		time: "10:00 AM",
		phone: "+1 (555) 123-4567",
	},
	{
		id: 2,
		name: "David Lee",
		role: "Marketing Manager",
		time: "2:00 PM",
		phone: "+1 (555) 987-6543",
	},
	{
		id: 3,
		name: "Emma Davis",
		role: "Sales Representative",
		time: "4:30 PM",
		phone: "+1 (555) 456-7890",
	},
];

const recent = [
	{
		id: 1,
		name: "John Smith",
		role: "Software Engineer",
		status: "completed",
		score: 85,
	},
	{
		id: 2,
		name: "Sarah Johnson",
		role: "Product Manager",
		status: "in-progress",
	},
	{
		id: 3,
		name: "Mike Wilson",
		role: "UX Designer",
		status: "scheduled",
	},
];

const statusColors = {
	completed: "bg-gray-900 text-white",
	"in-progress": "bg-gray-100 text-gray-700",
	scheduled: "bg-gray-100 text-gray-700",
};

export default function SchedulePage() {
	const router = useRouter();
	const [autoCall, setAutoCall] = useState(false);

	const handleCall = (phone) => {
		window.open(`tel:${phone.replace(/[^+\d]/g, "")}`);
	};

	const handleStart = (name) => {
		alert(`Starting interview with ${name}`);
		// Replace with your logic
	};

	return (
		<div className="p-6 md:p-8">
			{/* Back Arrow */}
			<button
				onClick={() => router.push("/dashboard")}
				className="mb-6 flex items-center gap-2 text-gray-700 hover:text-blue-700 transition"
				aria-label="Back to Dashboard"
			>
				<ArrowLeft className="w-6 h-6" />
				<span className="hidden md:inline text-base font-medium">
					Back to Dashboard
				</span>
			</button>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Upcoming Interviews */}
				<div className="bg-white rounded-xl shadow p-6">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-2">
							<Calendar className="w-5 h-5 text-blue-600" />
							<h2 className="text-lg font-semibold text-gray-900">
								Upcoming Interviews
							</h2>
						</div>
						<div className="flex items-center gap-2">
							<PhoneCall className="w-4 h-4 text-gray-500" />
							<span className="text-sm text-gray-700">Auto-Call</span>
							<input
								type="checkbox"
								checked={autoCall}
								onChange={() => setAutoCall((v) => !v)}
								className="accent-blue-600 w-4 h-4"
							/>
						</div>
					</div>
					<div className="space-y-4">
						{upcoming.map((u) => (
							<div
								key={u.id}
								className="flex items-center justify-between bg-gray-50 rounded-lg border border-gray-200 p-4"
							>
								<div>
									<div className="font-semibold text-gray-900">{u.name}</div>
									<div className="text-sm text-gray-500">{u.role}</div>
									<div className="text-blue-700 text-sm font-medium">
										{u.time}
									</div>
									<div className="text-xs text-gray-400">{u.phone}</div>
								</div>
								<div className="flex flex-col gap-2">
									<button
										className="flex items-center gap-1 px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition text-sm"
										onClick={() => handleCall(u.phone)}
									>
										<PhoneCall className="w-4 h-4" />
										Call
									</button>
									<button
										className="px-4 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
										onClick={() => handleStart(u.name)}
									>
										Start
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Recent Interviews */}
				<div className="bg-white rounded-xl shadow p-6">
					<div className="flex items-center gap-2 mb-4">
						<Clock className="w-5 h-5 text-green-600" />
						<h2 className="text-lg font-semibold text-gray-900">
							Recent Interviews
						</h2>
					</div>
					<div className="space-y-4">
						{recent.map((r) => (
							<div
								key={r.id}
								className="bg-gray-50 rounded-lg border border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between"
							>
								<div>
									<div className="font-semibold text-gray-900">{r.name}</div>
									<div className="text-sm text-gray-500">{r.role}</div>
								</div>
								<div className="flex items-center gap-3 mt-2 md:mt-0">
									<span
										className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[r.status]}`}
									>
										{r.status}
									</span>
									{r.status === "completed" && (
										<span className="text-green-600 text-sm font-semibold">
											Score: {r.score}/100
										</span>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}