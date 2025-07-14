"use client";
import React from "react";
import { PlusCircle, Calendar, Users } from "lucide-react";
import Link from "next/link";

const options = [
	{
		title: "New Interview",
		description: "Schedule a new AI-powered interview session.",
		icon: <PlusCircle className="w-8 h-8 text-blue-600" />,
		href: "/dashboard/create-interview",
		bg: "bg-white border border-blue-100 hover:shadow-lg",
	},
	{
		title: "View Schedule",
		description: "See all your upcoming interviews and events.",
		icon: <Calendar className="w-8 h-8 text-green-600" />,
		href: "/dashboard/schedule",
		bg: "bg-white border border-green-100 hover:shadow-lg",
	},
	// {
	// 	title: "Candidates",
	// 	description: "Manage and review your candidate pool.",
	// 	icon: <Users className="w-8 h-8 text-purple-600" />,
	// 	href: "/dashboard/candidates",
	// 	bg: "bg-white border border-purple-100 hover:shadow-lg",
	// },
];

function CreateOptions() {
	return (
		<div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-10">
			{options.map((opt, idx) => (
				<Link href={opt.href} key={idx} className="group">
					<div
						className={`rounded-2xl p-6 flex flex-col items-center transition-transform cursor-pointer ${opt.bg}`}
					>
						<div className="mb-4 bg-gray-100 rounded-full p-3 shadow">
							{opt.icon}
						</div>
						<h3 className="text-lg font-bold text-gray-800 mb-1">
							{opt.title}
						</h3>
						<p className="text-gray-500 text-sm text-center">
							{opt.description}
						</p>
					</div>
				</Link>
			))}
		</div>
	);
}

export default CreateOptions;