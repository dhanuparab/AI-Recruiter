"use client";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { Video } from "lucide-react";
import react, { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/interviewcard";
import { useRouter } from "next/navigation";

function AllInterview() {
  const router = useRouter();

  const [InterviewList, setInterviewList] = useState([]);
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateEmail: "",
    // Add other fields as needed, e.g. jobPosition, date, etc.
  });
  const { user } = useUser();

  const [showAllPrevious, setShowAllPrevious] = useState(false);
  const [showAllLatest, setShowAllLatest] = useState(false);
  const PREVIEW_COUNT = 3;

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    console.log(Interviews);
    setInterviewList(Interviews);
  };

  // When creating a new interview
  const createInterview = async (formData) => {
    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        {
          job: formData.jobPosition,
          date: formData.date,
          time: formData.time,
          duration: formData.duration,
          status: "Scheduled",
          score: null,
          candidateName: formData.candidateName, // <-- add this
          candidateEmail: formData.candidateEmail, // <-- add this
          userEmail: user.email,
          // ...other fields
        },
      ]);
  };

  // When submitting the interview creation form
  const handleCreateInterview = async () => {
    // ...validation...
    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        {
          job: formData.jobPosition,
          date: formData.date,
          time: formData.time,
          duration: formData.duration,
          status: "Scheduled",
          score: null,
          candidateName: formData.candidateName,
          candidateEmail: formData.candidateEmail,
          userEmail: user.email,
          // ...other fields
        },
      ]);
    // ...handle response...
  };

  // Handler for input changes
  function onHandleInputChange(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Add your form submission logic here
    // For example: create a new interview, validate fields, etc.
    // You can show a toast or console.log for now
    console.log("Form submitted!");
  }

  // Example: const LatestInterviews = [...InterviewList].sort((a, b) => b.id - a.id);
  const LatestInterviews = [...InterviewList].sort((a, b) => b.id - a.id);

  return (
    <div className="my-5">
      {/* <h2 className="font-bold text-2xl mb-4">Previously Created Interviews</h2>

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
        InterviewList && (
          <> */}
            {/* Show only 3 by default, all if expanded */}
            {/* <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
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
          </>
        )
      )} */}

      {/* <form onSubmit={handleSubmit}> */}
        {/* ...other fields... */}
        {/* <label className="block mb-2 text-sm font-medium text-gray-700">
          Candidate Name
        </label>
        <input
          type="text"
          className="input-class"
          value={formData.candidateName || ""}
          onChange={(e) => onHandleInputChange("candidateName", e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Candidate Email
        </label>
        <input
          type="email"
          className="input-class"
          value={formData.candidateEmail || ""}
          onChange={(e) => onHandleInputChange("candidateEmail", e.target.value)}
          required
        /> */}
        {/* ...submit button... */}
      {/* </form> */}

      <div className="mt-10">
        <h2 className="font-bold text-xl mb-4">Latest Interviews</h2>
        <div>
          {(showAllLatest
            ? LatestInterviews
            : LatestInterviews.slice(0, PREVIEW_COUNT)
          ).map((interview, idx) => (
            <div key={idx} className="mb-4 bg-white rounded-xl p-4 shadow flex items-center justify-between">
              <div>
                <div className="font-semibold">{interview.job || "Unknown"}</div>
                <div className="text-xs text-gray-500">
                  Candidate: {interview.candidateName || "N/A"}
                </div>
                <div className="text-xs text-gray-400">
                  Score: {interview.score ?? "N/A"}
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => router.push(`/dashboard/interview/${interview.id}`)}
              >
                Details &rarr;
              </Button>
            </div>
          ))}
          {LatestInterviews.length > PREVIEW_COUNT && (
            <div className="flex justify-center mt-2">
              <Button
                variant="outline"
                onClick={() => setShowAllLatest((v) => !v)}
              >
                {showAllLatest ? "Show Less" : "Show All"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default AllInterview;

// <div>
//   <div className="font-semibold text-gray-900">{interview.job}</div>
//   <div className="text-xs text-gray-500">
//     Candidate: {interview.candidateName || interview.candidate || "N/A"}
//   </div>
//   {/* ...other fields */}
// </div>
