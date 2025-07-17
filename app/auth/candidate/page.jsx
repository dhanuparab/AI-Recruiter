"use client";
import { useRef, useState } from "react";
import { CalendarCheck, History, LayoutDashboard, Info, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function CandidateDashboard() {
  const overviewRef = useRef(null);
  const upcomingRef = useRef(null);
  const historyRef = useRef(null);
  const router = useRouter();

  const scrollTo = (ref) => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const interviewHistory = [
    {
      role: "Frontend Developer",
      company: "StartupXYZ",
      date: "2024-01-10",
      duration: "32 min",
      status: "Completed",
      score: "Pending",
      feedback: "Strong technical skills",
    },
    {
      role: "React Developer",
      company: "WebCorp",
      date: "2024-01-03",
      duration: "28 min",
      status: "Completed",
      score: "85/100",
      feedback: "Excellent problem-solving abilities",
    },
  ];

  const exportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Position,Company,Date,Duration,Status,Score,Feedback"]
        .concat(
          interviewHistory.map(
            (item) =>
              `${item.role},${item.company},${item.date},${item.duration},${item.status},${item.score},${item.feedback}`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "interview_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow-md px-4 py-6">
  <div className="text-2xl font-bold text-blue-600 mb-6">Candidate Panel</div>

  {/* Schedule Today Button */}
  <div className="bg-blue-50 p-4 rounded-md mb-4">
    <p className="text-sm font-semibold mb-2">Schedule for Today</p>
    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
      ⏰ Schedule Today
    </Button>
  </div>

  {/* Calendar Modal */}
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="w-full mb-4">
        📅 Open Full Calendar
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-xs">
      <DialogHeader>
        <DialogTitle>Select Interview Date</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <input
          type="date"
          className="w-full border border-gray-300 rounded-md p-2"
          defaultValue={new Date().toISOString().split("T")[0]}
        />
        <div className="grid grid-cols-2 gap-2 text-sm">
          {["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"].map(
            (time, i) => (
              <Button key={i} variant="outline" className="w-full">
                {time}
              </Button>
            )
          )}
        </div>
        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
          Confirm Schedule
        </Button>
      </div>
    </DialogContent>
  </Dialog>

  {/* Inline Scheduling Section */}
  <div className="bg-gray-50 p-4 rounded-md">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      📆 Select Date
    </label>
    <input
      type="date"
      className="w-full border border-gray-300 rounded-md p-2 mb-4"
      defaultValue={new Date().toISOString().split("T")[0]}
    />
    <label className="block text-sm font-medium text-gray-700 mb-2">
      🕒 Select Time Slot
    </label>
    <div className="grid grid-cols-3 gap-2 mb-4">
      {["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"].map(
        (slot, i) => (
          <Button key={i} variant="outline" size="sm" className="w-full">
            {slot}
          </Button>
        )
      )}
    </div>
    <Button className="w-full bg-indigo-500 text-white hover:bg-indigo-600">
      Confirm Schedule
    </Button>
  </div>
</aside>


      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Overview Section */}
        <section ref={overviewRef} className="mb-8">
          <h1 className="text-2xl font-bold mb-2">👋 Welcome Candidate!</h1>
          <p className="text-gray-600 mb-4">
            Here’s your interview overview with all progress and upcoming schedules.
          </p>
        </section>

        {/* Upcoming Interviews */}
        <section ref={upcomingRef} className="mb-10">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">📅 Upcoming Interviews</h2>
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2">Position</th>
                  <th className="px-4 py-2">Company</th>
                  <th className="px-4 py-2">Interviewer</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Duration</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    role: "Senior Software Engineer",
                    company: "Tech Solutions Inc.",
                    interviewer: "Sarah Johnson",
                    time: "2:00 PM",
                    duration: "45 min",
                    status: "Upcoming",
                  },
                  {
                    role: "Backend Developer",
                    company: "CodeWave",
                    interviewer: "Amit Mehta",
                    time: "4:30 PM",
                    duration: "60 min",
                    status: "Scheduled",
                  },
                ].map((item, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{item.role}</td>
                    <td className="px-4 py-2">{item.company}</td>
                    <td className="px-4 py-2">{item.interviewer}</td>
                    <td className="px-4 py-2">{item.time}</td>
                    <td className="px-4 py-2">{item.duration}</td>
                    <td className="px-4 py-2">{item.status}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <Button size="sm" variant="secondary">View</Button>
                      <Button size="sm" variant="outline">Reschedule</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Interview History */}
        <section ref={historyRef}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-600">🕓 Interview History</h2>
            <Button onClick={exportCSV} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" /> Export CSV
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2">Position</th>
                  <th className="px-4 py-2">Company</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Duration</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Score</th>
                  <th className="px-4 py-2">Feedback</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {interviewHistory.map((item, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{item.role}</td>
                    <td className="px-4 py-2">{item.company}</td>
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">{item.duration}</td>
                    <td className="px-4 py-2">{item.status}</td>
                    <td className="px-4 py-2">{item.score}</td>
                    <td className="px-4 py-2">{item.feedback}</td>
                    <td className="px-4 py-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Info className="w-4 h-4 mr-1" /> Summary
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Feedback Summary</DialogTitle>
                            <DialogDescription>
                              <strong>Position:</strong> {item.role} <br />
                              <strong>Company:</strong> {item.company} <br />
                              <strong>Date:</strong> {item.date} <br />
                              <strong>Feedback:</strong> {item.feedback}
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
