'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import FormContainer from './_components/FormContainer';
import QuestionList from './_components/QuestionList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';
import { useUser } from '@/app/provider';

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [interviewId, setInterviewId] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev, 
      [field]: value
    }));
  };

  const onGoToNext = () => {
    if (!user) return; // Wait for user to load

    // Validation
    let missingField = '';
    if (!formData.jobPosition) missingField = 'Job Position';
    else if (!formData.jobDescription) missingField = 'Job Description';
    else if (!formData.duration) missingField = 'Duration';
    else if (!formData.type) missingField = 'Interview Type';

    if (missingField) {
      toast.error(`${missingField} is required`);
      return;
    }
    setStep(step + 1);
  };

  const onCreateLink = async (interview_id) => {
    setLoading(true);
    try {
      setInterviewId(interview_id);
      setStep(step + 1);
    } catch (error) {
      toast.error("Failed to create interview link");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Unique, subtle color palette
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] via-[#e9e6f7] to-[#dbeafe] flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full bg-white/70 hover:bg-violet-100 shadow transition"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 text-violet-600" />
          </button>
          <h2 className="font-extrabold text-2xl md:text-3xl text-gray-900 tracking-tight drop-shadow-sm">
            Create New Interview
          </h2>
        </div>
        {/* Progress Bar */}
        <div className="mb-8">
          <Progress
            value={step * 33.33}
            className="h-2 rounded-full bg-violet-100"
            style={{ boxShadow: '0 2px 8px 0 #c7d2fe55' }}
          />
        </div>
        {/* Glassmorphism Card */}
        <div className="rounded-3xl shadow-2xl bg-white/70 backdrop-blur-md border border-violet-100 p-8 md:p-12 transition-all">
          {/* Stepper Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-4">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300
                    ${step === s
                      ? 'bg-violet-600 border-violet-600 scale-125 shadow-lg'
                      : 'bg-white border-violet-200'
                    }`}
                />
              ))}
            </div>
          </div>
          {/* Step Content */}
          {step === 1 && (
            <FormContainer
              onHandleInputChange={onHandleInputChange}
              GoToNext={onGoToNext}
              accentColor="#7c3aed"
              inputClass="bg-white/80 border-violet-200 focus:border-violet-400"
              labelClass="text-violet-700"
              buttonClass="bg-violet-600 hover:bg-violet-700"
            />
          )}
          {step === 2 && (
            <QuestionList
              formData={formData}
              onCreateLink={onCreateLink}
              loading={loading}
              accentColor="#7c3aed"
              cardClass="bg-violet-50/80 border-violet-100"
              buttonClass="bg-violet-600 hover:bg-violet-700"
            />
          )}
          {step === 3 && (
            <InterviewLink
              interview_id={interviewId}
              formData={formData}
              accentColor="#7c3aed"
              cardClass="bg-violet-50/80 border-violet-100"
              buttonClass="bg-violet-600 hover:bg-violet-700"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateInterview;