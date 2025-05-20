"use client";

import { useState } from "react";
import toast from "react-hot-toast";

type ExamType = {
  id: string;
  name: string;
};

type FormData = {
  examType: string;
  examNumber: string;
  examYear: string;
  resultType: string;
};

export default function ExamCheckerForm() {
  const [formData, setFormData] = useState<FormData>({
    examType: "",
    examNumber: "",
    examYear: "",
    resultType: "full", // Default to full result
  });

  const [examTypes, setExamTypes] = useState<ExamType[]>([
    { id: "waec", name: "WAEC" },
    { id: "neco", name: "NECO" },
    { id: "jamb", name: "JAMB" },
    // Add more exam types as necessary
  ]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.examType) newErrors.examType = "Please select an exam type.";
    if (!formData.examNumber.match(/^[A-Za-z0-9]+$/))
      newErrors.examNumber = "Enter a valid exam number (alphanumeric).";
    if (!formData.examYear.match(/^\d{4}$/))
      newErrors.examYear = "Enter a valid exam year (e.g., 2023).";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the form errors.");
      return;
    }

    setLoading(true);
    toast.success("Checking your exam result...");
    console.log("Exam Checker Data:", formData);

    // Simulate an API call (replace with actual backend API)
    setTimeout(() => {
      setLoading(false);
      toast.success("Exam result fetched successfully!");
      // Show the result or an error if the exam number is incorrect
      // e.g., Redirect to result page or show an error message
    }, 1500); // Simulate network delay
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-md space-y-6"
    >
      {/* Exam Type */}
      <div>
        <label className="block font-medium mb-1 text-black">Exam Type</label>
        <select
          name="examType"
          value={formData.examType}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md text-black"
        >
          <option value="">-- Select Exam Type --</option>
          {examTypes.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.name}
            </option>
          ))}
        </select>
        {errors.examType && <p className="text-red-500 text-sm">{errors.examType}</p>}
      </div>

      {/* Exam Number (Pin) */}
      <div>
        <label className="block font-medium mb-1 text-black">Exam Number</label>
        <input
          type="text"
          name="examNumber"
          value={formData.examNumber}
          onChange={handleChange}
          placeholder="Enter your exam number"
          className="w-full border px-4 py-2 rounded-md text-black"
        />
        {errors.examNumber && <p className="text-red-500 text-sm">{errors.examNumber}</p>}
      </div>

      {/* Exam Year */}
      <div>
        <label className="block font-medium mb-1 text-black">Exam Year</label>
        <input
          type="text"
          name="examYear"
          value={formData.examYear}
          onChange={handleChange}
          placeholder="Enter exam year (e.g., 2023)"
          className="w-full border px-4 py-2 rounded-md text-black"
        />
        {errors.examYear && <p className="text-red-500 text-sm">{errors.examYear}</p>}
      </div>

      {/* Result Type */}
      <div>
        <label className="block font-medium mb-1 text-black">Result Type</label>
        <select
          name="resultType"
          value={formData.resultType}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md text-black"
        >
          <option value="full">Full Result</option>
          <option value="subject">Specific Subject Result</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition ${
          loading ? "opacity-60 cursor-not-allowed" : "hover:bg-teal-700"
        }`}
      >
        {loading ? "Processing..." : "Check Result"}
      </button>
    </form>
  );
}
