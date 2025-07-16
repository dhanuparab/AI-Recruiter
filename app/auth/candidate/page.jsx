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
        <nav className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => scrollTo(overviewRef)}
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Overview
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => scrollTo(upcomingRef)}
          >
            <CalendarCheck className="w-4 h-4 mr-2" />
            Upcoming
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => scrollTo(historyRef)}
          >
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
          <Button
            variant="secondary"
            className="w-full justify-start mt-4"
            onClick={() => router.push("/schedule")}
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Go to Schedule Page
          </Button>
        </nav>
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
