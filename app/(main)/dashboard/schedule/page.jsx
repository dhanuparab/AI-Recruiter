"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PhoneCall, Play, Calendar, Clock, ArrowLeft } from "lucide-react";
import Papa from "papaparse";

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

	// CSV upload state
	const [csvCandidates, setCsvCandidates] = useState([]);
	const [autoCalling, setAutoCalling] = useState(false);
	const [intervalSec, setIntervalSec] = useState(5);
	const [currentCallIdx, setCurrentCallIdx] = useState(-1);

	// For demo: allow adding uploaded candidates to recent interviews
	const [recentList, setRecentList] = useState(recent);

	const handleCall = (phone) => {
		window.open(`tel:${phone.replace(/[^+\d]/g, "")}`);
	};

	const handleStart = (name) => {
		alert(`Starting interview with ${name}`);
		// Replace with your logic
	};

	// CSV upload handler
	const handleCSV = (e) => {
		const file = e.target.files[0];
		if (!file) return;
		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: (results) => {
				setCsvCandidates(results.data);
			},
		});
	};

	// Download CSV template
	const downloadTemplate = () => {
		const csv = "name,role,phone,email,time\n";
		const blob = new Blob([csv], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "candidate_template.csv";
		a.click();
		URL.revokeObjectURL(url);
	};

	// Auto-call logic
	const startAutoCall = () => {
		if (!csvCandidates.length) return;
		setAutoCalling(true);
		setCurrentCallIdx(0);
		let idx = 0;
		const interval = setInterval(() => {
			setCurrentCallIdx((prev) => {
				if (prev + 1 >= csvCandidates.length) {
					clearInterval(interval);
					setAutoCalling(false);
					return -1;
				}
				return prev + 1;
			});
			idx++;
		}, intervalSec * 1000);
	};

	const stopAutoCall = () => {
		setAutoCalling(false);
		setCurrentCallIdx(-1);
	};

	// Add uploaded candidates to recent interviews (for demo)
	const addToRecent = () => {
		const newRecents = csvCandidates.map((c, i) => ({
			id: Date.now() + i,
			name: c.name,
			role: c.role,
			status: "completed",
			score: Math.floor(Math.random() * 40) + 60, // random score for demo
		}));
		setRecentList((prev) => [...newRecents, ...prev]);
	};

	return (
		<div className="p-6 md:p-8">
			{/* CSV Upload Section */}
			<div className="bg-white rounded-xl shadow p-6 mb-8">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<div>
						<div className="font-semibold mb-2">Upload Candidate Data</div>
						<div className="text-xs text-gray-500 mb-2">
							Upload a CSV file with candidate information
						</div>
						<input
							type="file"
							accept=".csv"
							onChange={handleCSV}
							className="mb-2"
						/>
						<button
							onClick={downloadTemplate}
							className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
						>
							Download Template
						</button>
					</div>
					<div className="flex flex-col items-end gap-2">
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={autoCalling}
								onChange={() => setAutoCalling((v) => !v)}
								className="accent-blue-600 w-4 h-4"
								disabled={autoCalling}
							/>
							Auto-call on upload
						</label>
						<button
							onClick={autoCalling ? stopAutoCall : startAutoCall}
							disabled={!csvCandidates.length}
							className={`px-4 py-2 rounded text-white ${autoCalling ? "bg-red-600" : "bg-blue-600"} hover:opacity-90`}
						>
							{autoCalling ? "Stop Auto Call" : "Start Auto Call"}
						</button>
						<div className="flex items-center gap-2">
							<span className="text-xs">Call Interval (seconds):</span>
							<input
								type="number"
								min={1}
								value={intervalSec}
								onChange={e => setIntervalSec(Number(e.target.value))}
								className="w-16 border rounded px-2 py-1 text-xs"
							/>
						</div>
						<button
							onClick={addToRecent}
							disabled={!csvCandidates.length}
							className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
						>
							Add Uploaded to Recent Interviews
						</button>
					</div>
				</div>
				{/* Candidate Preview */}
				{csvCandidates.length > 0 && (
					<div className="mt-6">
						<div className="mb-2 font-semibold">
							Uploaded Candidates ({csvCandidates.length})
						</div>
						<ul>
							{csvCandidates.map((c, idx) => (
								<li
									key={idx}
									className={`flex items-center justify-between border-b py-2 ${currentCallIdx === idx ? "bg-blue-50" : ""}`}
								>
									<div>
										<div className="font-medium">{c.name}</div>
										<div className="text-xs text-gray-500">{c.role}</div>
										<div className="text-xs text-gray-400">{c.email}</div>
										<div className="text-xs text-blue-700">
											Scheduled: {c.time}
										</div>
									</div>
									<div className="flex items-center gap-2">
										<span className={`text-xs px-2 py-1 rounded-full ${currentCallIdx === idx ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}>
											{currentCallIdx === idx && autoCalling ? "Calling..." : "pending"}
										</span>
										<button
											className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
											onClick={() => handleCall(c.phone)}
										>
											Call Now
										</button>
									</div>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>

			{/* Existing UI */}
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
						{recentList.map((r) => (
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