"use client";
import React, { useState } from "react";
import { PhoneCall, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const initialCandidates = [
	{
		id: 1,
		name: "Alice Brown",
		role: "Data Scientist",
		phone: "+1 (555) 123-4567",
		email: "alice@example.com",
		scheduled: "10:00 AM",
		status: "pending",
	},
	{
		id: 2,
		name: "David Lee",
		role: "Marketing Manager",
		phone: "+1 (555) 987-6543",
		email: "david@example.com",
		scheduled: "2:00 PM",
		status: "pending",
	},
	{
		id: 3,
		name: "Emma Davis",
		role: "Sales Representative",
		phone: "+1 (555) 456-7890",
		email: "emma@example.com",
		scheduled: "4:30 PM",
		status: "pending",
	},
	{
		id: 4,
		name: "John Wilson",
		role: "Product Manager",
		phone: "+1 (555) 321-0987",
		email: "john@example.com",
		scheduled: "11:30 AM",
		status: "pending",
	},
];

const statusColors = {
	pending: "bg-gray-100 text-gray-500",
	"in progress": "bg-blue-100 text-blue-600",
	completed: "bg-green-100 text-green-600",
};

export default function CandidatesPage() {
	const [candidates, setCandidates] = useState(initialCandidates);
	const [selected, setSelected] = useState([]);
	const router = useRouter();

	const allSelected =
		selected.length === candidates.length && candidates.length > 0;

	const handleSelectAll = (e) => {
		setSelected(e.target.checked ? candidates.map((c) => c.id) : []);
	};

	const handleSelect = (id) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
		);
	};

	const handleCall = (candidate) => {
		// Replace with your call logic
		window.open(`tel:${candidate.phone.replace(/[^+\d]/g, "")}`);
	};

	// Stats
	const total = candidates.length;
	const pending = candidates.filter((c) => c.status === "pending").length;
	const inProgress = candidates.filter(
		(c) => c.status === "in progress"
	).length;
	const completed = candidates.filter((c) => c.status === "completed").length;

	return (
		<div className="p-8">
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

			<h1 className="text-2xl font-bold mb-4 text-gray-800">Candidates</h1>
			<p className="text-gray-600 mb-6">
				Manage and review your candidate pool here.
			</p>

			{/* Select All */}
			<div className="flex items-center mb-3">
				<input
					type="checkbox"
					checked={allSelected}
					onChange={handleSelectAll}
					className="mr-2 accent-blue-600"
				/>
				<span className="text-sm text-gray-700 font-medium">
					Select All Candidates ({candidates.length})
				</span>
			</div>

			{/* Candidate List */}
			<div className="space-y-4 mb-8">
				{candidates.map((c) => (
					<div
						key={c.id}
						className="flex items-center justify-between bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-5"
					>
						<div className="flex items-start gap-4">
							<input
								type="checkbox"
								checked={selected.includes(c.id)}
								onChange={() => handleSelect(c.id)}
								className="mt-1 accent-blue-600"
							/>
							<div>
								<div className="font-semibold text-gray-900">{c.name}</div>
								<div className="text-sm text-gray-500">{c.role}</div>
								<div className="text-xs text-gray-400">{c.phone}</div>
								<div className="text-xs text-gray-400">{c.email}</div>
								<div className="text-xs text-blue-600 mt-1">
									Scheduled: {c.scheduled}
								</div>
							</div>
						</div>
						<div className="flex flex-col items-end gap-2">
							<span
								className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[c.status]}`}
							>
								{c.status}
							</span>
							<button
								className="flex items-center gap-1 px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition text-sm"
								onClick={() => handleCall(c)}
							>
								<PhoneCall className="w-4 h-4" />
								Call Now
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Stats */}
			<div className="flex justify-around border-t pt-6">
				<div className="flex flex-col items-center">
					<span className="text-blue-600 text-xl font-bold">{total}</span>
					<span className="text-xs text-gray-500 mt-1">
						Total Candidates
					</span>
				</div>
				<div className="flex flex-col items-center">
					<span className="text-yellow-600 text-xl font-bold">{pending}</span>
					<span className="text-xs text-gray-500 mt-1">Pending</span>
				</div>
				<div className="flex flex-col items-center">
					<span className="text-blue-600 text-xl font-bold">{inProgress}</span>
					<span className="text-xs text-gray-500 mt-1">In Progress</span>
				</div>
				<div className="flex flex-col items-center">
					<span className="text-green-600 text-xl font-bold">{completed}</span>
					<span className="text-xs text-gray-500 mt-1">Completed</span>
				</div>
			</div>
		</div>
	);
}