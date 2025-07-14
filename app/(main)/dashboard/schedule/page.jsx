"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PhoneCall, Play, Calendar as CalendarIcon, Clock, ArrowLeft } from "lucide-react";
import Papa from "papaparse";
import { supabase } from "@/services/supabaseClient";

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
	const [recentList, setRecentList] = useState([]);
	const [showAll, setShowAll] = useState(false);

	useEffect(() => {
		async function fetchRecentInterviews() {
			const { data, error } = await supabase
				.from("interview-feedback")
				.select("id, userName, userEmail, created_at, feedback")
				.order("created_at", { ascending: false });
			if (!error && data) {
				// Parse score from feedback JSON
				const parsed = data.map(item => {
					let score = "N/A";
					try {
						const fb = JSON.parse(item.feedback);
						score = fb?.rating?.TechnicalSkills ?? "N/A";
					} catch {}
					return {
						id: item.id,
						name: item.userName || item.userEmail,
						role: "", // Add role if available in your table
						status: "completed",
						score,
						date: item.created_at,
						feedback: item.feedback,
					};
				});
				setRecentList(parsed);
			}
		}
		fetchRecentInterviews();
	}, []);

	// Calendar scheduling state
	const [showFullCalendar, setShowFullCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [availableTimes, setAvailableTimes] = useState([
		"09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"
	]);
	const [selectedTime, setSelectedTime] = useState("");
	const [calendarMessage, setCalendarMessage] = useState("");

	const [calendarModalOpen, setCalendarModalOpen] = useState(false);
	const [calendarSelectedDate, setCalendarSelectedDate] = useState(new Date());
	const [calendarSelectedTime, setCalendarSelectedTime] = useState("");

	const today = new Date().toISOString().split("T")[0];

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

	const handleScheduleToday = () => {
		setSelectedDate(today);
		setShowFullCalendar(false);
		setSelectedTime("");
		setCalendarMessage("");
	};

	const handleOpenCalendar = () => {
		setCalendarModalOpen(true);
		setCalendarSelectedDate(new Date());
		setCalendarSelectedTime("");
	};

	const handleDateChange = (e) => {
		setSelectedDate(e.target.value);
		setSelectedTime("");
		setCalendarMessage("");
	};

	const handleTimeSelect = (time) => {
		setSelectedTime(time);
		setCalendarMessage("");
	};

	const handleConfirmSchedule = () => {
		if (!selectedDate || !selectedTime) {
			setCalendarMessage("Please select a date and time slot.");
			return;
		}
		setCalendarMessage(
			`Interview scheduled for ${selectedDate} at ${selectedTime}.`
		);

		// Show notification (use candidate name if available, else a random id)
		const candidateNameOrId =
			(csvCandidates[0]?.name || Math.floor(Math.random() * 1000));
		showInterviewNotification(candidateNameOrId);

		// Here you can add your scheduling logic (API call, etc.)
	};

	function showInterviewNotification(candidateNameOrId) {
		if (!("Notification" in window)) return;
		if (Notification.permission === "granted") {
			new Notification("Incoming AI Interview Call", {
				body: `Candidate ${candidateNameOrId} is calling for their interview`,
			});
		} else if (Notification.permission !== "denied") {
			Notification.requestPermission().then(permission => {
				if (permission === "granted") {
					new Notification("Incoming AI Interview Call", {
						body: `Candidate ${candidateNameOrId} is calling for their interview`,
					});
				}
			});
		}
	}

	return (
		<div className="p-6 md:p-8">
			{/* Quick Scheduling Section */}
			<div className="mb-8">
				<h2 className="font-semibold text-lg flex items-center gap-2 mb-2">
					<CalendarIcon className="w-5 h-5 text-blue-600" />
					Quick Scheduling
				</h2>
				<div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-2">
					<div className="font-medium mb-1">Schedule for Today</div>
					<div className="text-xs text-gray-600 mb-3">
						Quickly set up an interview for today with the next available time slot.
					</div>
					<button
						className="w-full py-2 rounded bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-600 transition"
						onClick={handleScheduleToday}
					>
						<Clock className="w-4 h-4" />
						Schedule Today
					</button>
				</div>
				<button
					className="w-full flex items-center justify-center gap-2 py-2 border rounded mb-2 bg-white hover:bg-gray-50 transition"
					onClick={handleOpenCalendar}
				>
					<CalendarIcon className="w-4 h-4" />
					Open Full Calendar
				</button>
				{/* Calendar UI */}
				{(showFullCalendar || selectedDate) && (
					<div className="mt-4 bg-white border rounded-xl p-4 shadow">
						<div className="mb-2 font-semibold flex items-center gap-2">
							<CalendarIcon className="w-4 h-4 text-blue-600" />
							Select Date
						</div>
						<input
							type="date"
							className="border rounded px-3 py-2 mb-4"
							value={selectedDate || ""}
							onChange={handleDateChange}
							min={today}
						/>
						{selectedDate && (
							<>
								<div className="mb-2 font-semibold flex items-center gap-2">
									<Clock className="w-4 h-4 text-indigo-600" />
									Select Time Slot
								</div>
								<div className="flex flex-wrap gap-2 mb-4">
									{availableTimes.map((time) => (
										<button
											key={time}
											className={`px-4 py-2 rounded border ${
												selectedTime === time
													? "bg-indigo-600 text-white border-indigo-600"
													: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-indigo-50"
											} transition`}
											onClick={() => handleTimeSelect(time)}
										>
											{time}
										</button>
									))}
								</div>
								<button
									className="w-full py-2 rounded bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold hover:from-indigo-600 hover:to-blue-600 transition"
									onClick={handleConfirmSchedule}
								>
									Confirm Schedule
								</button>
								{calendarMessage && (
									<div className={`mt-3 text-sm ${calendarMessage.includes("scheduled") ? "text-green-600" : "text-red-600"}`}>
										{calendarMessage}
									</div>
								)}
							</>
						)}
					</div>
				)}
			</div>

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
			<div className="grid grid-cols-1 md:grid-cols-1 gap-8">
				{/* Recent Interviews */}
				<div className="bg-white rounded-xl shadow p-6">
					<div className="flex items-center gap-2 mb-4">
						<Clock className="w-5 h-5 text-green-600" />
						<h2 className="text-lg font-semibold text-gray-900">
							Recent Interviews
						</h2>
					</div>
					<div className="space-y-4">
						{(showAll ? recentList : recentList.slice(0, 5)).map((r) => (
							<div
								key={r.id}
								className="bg-gray-50 rounded-lg border border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between"
							>
								<div>
									<div className="font-semibold text-gray-900">{r.name}</div>
									{/* Show role if available */}
									<div className="text-sm text-gray-500">{r.role}</div>
									<div className="text-xs text-gray-400">{new Date(r.date).toLocaleString()}</div>
								</div>
								<div className="flex items-center gap-3 mt-2 md:mt-0">
									<span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gray-900 text-white`}>
										{r.status}
									</span>
								</div>
							</div>
						))}
						{recentList.length > 5 && (
							<div className="flex justify-center mt-4">
								<button
									className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
									onClick={() => setShowAll(v => !v)}
								>
									{showAll ? "Show Less" : "Show More"}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Calendar Modal */}
			<CalendarModal
				open={calendarModalOpen}
				onClose={() => setCalendarModalOpen(false)}
				selectedDate={calendarSelectedDate}
				setSelectedDate={setCalendarSelectedDate}
				selectedTime={calendarSelectedTime}
				setSelectedTime={setCalendarSelectedTime}
				onConfirm={() => {
					if (!calendarSelectedDate || !calendarSelectedTime) return;
					setCalendarModalOpen(false);
					setCalendarMessage(
						`Interview scheduled for ${calendarSelectedDate.toLocaleDateString()} at ${calendarSelectedTime}.`
					);
					// Optionally, show notification here
				}}
			/>
		</div>
	);
}

function CalendarModal({ open, onClose, selectedDate, setSelectedDate, selectedTime, setSelectedTime, onConfirm }) {
    const today = new Date();
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    // Get days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun

    const weeks = [];
    let week = [];
    for (let i = 0; i < firstDay; i++) week.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
        week.push(d);
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    }
    if (week.length) {
        while (week.length < 7) week.push(null);
        weeks.push(week);
    }

    const availableTimes = [
        "9:00 AM", "10:00 AM", "11:00 AM",
        "2:00 PM", "3:00 PM", "4:00 PM"
    ];

    return open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-xl w-[350px] p-5 relative">
                <button className="absolute right-3 top-3 text-gray-400 hover:text-gray-700" onClick={onClose}>×</button>
                <div className="font-semibold mb-2">Select Interview Date</div>
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                        <button
                            className="text-gray-500 hover:text-gray-900"
                            onClick={() => setSelectedDate(new Date(year, month - 1, 1))}
                        >{"<"}</button>
                        <span className="font-medium">{selectedDate.toLocaleString("default", { month: "long", year: "numeric" })}</span>
                        <button
                            className="text-gray-500 hover:text-gray-900"
                            onClick={() => setSelectedDate(new Date(year, month + 1, 1))}
                        >{">"}</button>
                    </div>
                    <table className="w-full text-center text-xs">
                        <thead>
                            <tr>
                                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                                    <th key={d} className="py-1">{d}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {weeks.map((week, i) => (
                                <tr key={i}>
                                    {week.map((d, j) => (
                                        <td key={j} className="py-1">
                                            {d ? (
                                                <button
                                                    className={`w-7 h-7 rounded-full ${
                                                        selectedDate.getDate() === d && selectedDate.getMonth() === month
                                                            ? "bg-blue-600 text-white"
                                                            : "hover:bg-blue-100"
                                                    }`}
                                                    onClick={() => setSelectedDate(new Date(year, month, d))}
                                                    disabled={
                                                        new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
                                                    }
                                                >
                                                    {d}
                                                </button>
                                            ) : (
                                                ""
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mb-2 font-semibold">Available Time Slots</div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {availableTimes.map((time) => (
                        <button
                            key={time}
                            className={`py-2 rounded border ${
                                selectedTime === time
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-indigo-50"
                            } transition`}
                            onClick={() => setSelectedTime(time)}
                        >
                            {time}
                        </button>
                    ))}
                </div>
                <button
                    className="w-full py-2 rounded bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold hover:from-indigo-600 hover:to-blue-600 transition"
                    onClick={onConfirm}
                >
                    Confirm Schedule
                </button>
            </div>
        </div>
    ) : null;
}