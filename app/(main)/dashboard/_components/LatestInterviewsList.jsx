"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Video, Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import InterviewCard from "./interviewcard";
import { toast } from "sonner";

const statusColors = {
  upcoming: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700"
};

function LatestInterviewsList() {
  const router = useRouter();

  const [InterviewList, setInterviewList] = useState([]);
  const [showAllPrevious, setShowAllPrevious] = useState(false);
  const [showAllLatest, setShowAllLatest] = useState(false);
  const PREVIEW_COUNT = 3;
  const { user } = useUser();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("userEmail", user?.email)
      .order('id', { ascending: false });
    setInterviewList(Interviews || []);
  };

  // Sorted for latest (descending by id)
  const LatestInterviews = [...InterviewList].sort((a, b) => b.id - a.id);

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl mb-4">Previously Created Interviews</h2>
      {InterviewList?.length === 0 ? (
        <div className="p-5 flex flex-col items-center gap-3 text-center text-gray-500 bg-white border rounded-xl shadow-sm">
          <Video className="text-primary h-10 w-10" />
          <h2 className="text-base">You don't have any interview created</h2>
          <Button
            className="cursor-pointer"
            onClick={() => router.push("/dashboard/create-interview")}
          >
            + Create New Interview
          </Button>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
            {(showAllPrevious ? InterviewList : InterviewList.slice(0, PREVIEW_COUNT)).map(
              (interview, index) => (
                <InterviewCard interview={interview} key={index} />
              )
            )}
          </div>
          {InterviewList.length > PREVIEW_COUNT && (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                onClick={() => setShowAllPrevious((v) => !v)}
              >
                {showAllPrevious ? "Show Less" : "Show All"}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* <div className="bg-white rounded-2xl shadow-xl p-6 mt-10">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Latest Interviews</h3>
        {LatestInterviews.length === 0 ? (
          <p className="text-gray-500">No interviews found.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {(showAllLatest ? LatestInterviews : LatestInterviews.slice(0, PREVIEW_COUNT)).map((iv) => (
                <li key={iv.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:shadow-lg transition">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-tr from-blue-400 to-indigo-400 rounded-full p-2">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{iv.job}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {iv.date} • {iv.time}
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500">
                          <strong>Candidate:</strong> {iv.candidateName || iv.candidate || "N/A"}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[iv.status]}`}>
                          {iv.status ? iv.status.charAt(0).toUpperCase() + iv.status.slice(1) : "Unknown"}
                        </span>
                        {/* <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded-full">
                          Score: {iv.score !== undefined ? iv.score : "N/A"}
                        </span> */}
                      {/* </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">  */}
                    {/* <Link href={`/dashboard/interview/${iv.id}`}>
                      <button className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-lg flex items-center gap-1 hover:bg-blue-700 transition">
                        Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link> */}
                  {/* </div>
                </li>
              ))}
            </ul>
            {LatestInterviews.length > PREVIEW_COUNT && (
              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAllLatest((v) => !v)}
                >
                  {showAllLatest ? "Show Less" : "Show All"}
                </Button>
              </div>
            )}
          </>
        )}
      </div> */}
    </div>
  );
}

export default LatestInterviewsList;