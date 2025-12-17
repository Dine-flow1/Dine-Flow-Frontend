"use client";

import { useState } from "react";
import axios from "axios";
import { Send, User, Mail } from "lucide-react";

interface RestaurantFeedbackProps {
  restaurantId: string;
}

export default function RestaurantFeedback({ restaurantId }: RestaurantFeedbackProps) {
  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!comment.trim()) {
      setError("Please write your feedback");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await axios.post(
        `http://localhost:9999/api/feedback/add`,
        {
          restaurantId,
          comment,
          anonymous,
          type: "restaurant",
          ...(anonymous ? {} : { email }),
        },
        { withCredentials: true }
      );

      setSuccess("Thank you for your feedback ❤️");
      setComment("");
      setEmail("");
      setAnonymous(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        📝 Customer Feedback
      </h3>

      {/* Comment */}
      <textarea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience with this restaurant..."
        className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      />

      {/* Anonymous toggle */}
      <div className="flex items-center gap-3 mt-4">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-gray-700">Submit anonymously</span>
      </div>

      {/* Email (only if not anonymous & not logged in) */}
      {!anonymous && (
        <div className="relative mt-4">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email (optional)"
            className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-2xl"
          />
        </div>
      )}

      {/* Messages */}
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {success && <p className="text-green-600 mt-4">{success}</p>}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </div>
  );
}
