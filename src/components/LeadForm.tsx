"use client";

import { useState, useEffect } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [source, setSource] = useState("direct");

  useEffect(() => {
    // Get source from URL params (e.g., ?source=qr)
    const params = new URLSearchParams(window.location.search);
    const urlSource = params.get("source");
    if (urlSource) {
      setSource(urlSource);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      eventDate: formData.get("eventDate") as string,
      guestCount: parseInt(formData.get("guestCount") as string, 10),
      eventType: formData.get("eventType") as string,
      details: formData.get("details") as string,
      source,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="font-oswald text-2xl font-bold uppercase text-[#8b0000] mb-2">
          Request Received!
        </h3>
        <p className="text-gray-600 mb-6">
          Thanks for reaching out! We&apos;ll be in touch within 24 hours with your custom quote.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="bg-[#8b0000] text-white px-6 py-3 font-oswald font-bold uppercase tracking-wider hover:bg-[#a00] transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8">
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="firstName" className="block mb-2 font-oswald font-medium uppercase tracking-wide text-sm text-gray-800">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 text-base focus:outline-none focus:border-[#8b0000] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-2 font-oswald font-medium uppercase tracking-wide text-sm text-gray-800">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 text-base focus:outline-none focus:border-[#8b0000] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="email" className="block mb-2 font-oswald font-medium uppercase tracking-wide text-sm text-gray-800">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 text-base focus:outline-none focus:border-[#8b0000] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2 font-oswald font-medium uppercase tracking-wide text-sm text-gray-800">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 text-base focus:outline-none focus:border-[#8b0000] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="eventDate" className="block mb-2 font-oswald font-medium uppercase tracking-wide text-sm text-gray-800">
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 text-base focus:outline-none focus:border-[#8b0000] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="guestCount" className="block mb-2 font-oswald font-medium uppercase tracking-wide text-sm text-gray-800">
            Guest Count
          </label>
          <input
            type="number"
            id="guestCount"
            name="guestCount"
            min="15"
            placeholder="e.g. 50"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 text-base focus:outline-none focus:border-[#8b0000] transition-colors"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="eventType" className="block mb-2 font-oswald font-medium uppercase tracking-wide text-sm text-gray-800">
          Event Type
        </label>
        <select
          id="eventType"
          name="eventType"
          required
          className="w-full px-4 py-3 border-2 border-gray-200 text-base focus:outline-none focus:border-[#8b0000] transition-colors bg-white"
        >
          <option value="">Select one...</option>
          <option value="private">Private Party</option>
          <option value="corporate">Corporate Event</option>
          <option value="wedding">Wedding / Rehearsal</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="details" className="block mb-2 font-oswald font-medium uppercase tracking-wide text-sm text-gray-800">
          Tell Us More
        </label>
        <textarea
          id="details"
          name="details"
          placeholder="Location, menu preferences, dietary needs, questions..."
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-200 text-base focus:outline-none focus:border-[#8b0000] transition-colors resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-[#8b0000] text-white py-4 font-oswald text-lg font-bold uppercase tracking-wider hover:bg-[#a00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Submitting..." : "Request Quote"}
      </button>
    </form>
  );
}
