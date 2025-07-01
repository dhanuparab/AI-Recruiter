
"use client";
import React from "react";
import { PlusCircle, Calendar, Users } from "lucide-react";
import Link from "next/link";

const options = [
	{
		title: "New Interview",
		description: "Schedule a new AI-powered interview session.",
		icon: <PlusCircle className="w-8 h-8 text-white" />,
		href: "/dashboard/create-interview",
		gradient: "from-blue-400 to-indigo-400",
	},
	{
		title: "View Schedule",
		description: "See all your upcoming interviews and events.",
		icon: <Calendar className="w-8 h-8 text-white" />,
		href: "/dashboard/schedule",
		gradient: "from-green-400 to-blue-400",
	},
	{
		title: "Candidates",
		description: "Manage and review your candidate pool.",
		icon: <Users className="w-8 h-8 text-white" />,
		href: "/dashboard/candidates",
		gradient: "from-purple-400 to-pink-400",
	},
];

function CreateOptions() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
			{options.map((opt, idx) => (
				<Link href={opt.href} key={idx} className="group">
					<div
						className={`rounded-2xl shadow-xl p-6 flex flex-col items-center bg-gradient-to-br ${opt.gradient} hover:scale-105 transition-transform cursor-pointer`}
					>
						<div className="mb-4 bg-white/20 rounded-full p-3 shadow-lg">
							{opt.icon}
						</div>
						<h3 className="text-lg font-bold text-white mb-1">
							{opt.title}
						</h3>
						<p className="text-white/90 text-sm text-center">
							{opt.description}
						</p>
					</div>
				</Link>
			))}
		</div>
	);
}

export default CreateOptions;