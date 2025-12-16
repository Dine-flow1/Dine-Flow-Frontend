"use client";

import { useEffect, useState } from "react";
import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function SubscriptionPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  /* ----------------------------------
     Load Razorpay Script
  -----------------------------------*/
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /* ----------------------------------
     Fetch Subscription Plans
  -----------------------------------*/
  useEffect(() => {
    const fetchPlans = async () => {
      const res = await axios.get(
        "http://localhost:9999/api/subscription/subscription-plans",
        { withCredentials: true }
      );
      setPlans(res.data);
    };
    fetchPlans();
  }, []);

  /* ----------------------------------
     Initiate Subscription
  -----------------------------------*/
  const handleSubscribe = async (plan: string) => {
    try {
      setLoadingPlan(plan);

      // 1️⃣ Initiate payment (backend)
      const { data } = await axios.post(
        "http://localhost:9999/api/subscription/subInitiate",
        { plan },
        { withCredentials: true }
      );

      const { key, orderId, amount, currency, subscriptionId } = data.data;

      // 2️⃣ Open Razorpay Checkout
      const razorpay = new window.Razorpay({
        key,
        amount,
        currency,
        order_id: orderId,
        name: "Restaurant Subscription",
        description: `Plan ${plan}`,
        handler: async function (response: any) {
          try {
            // 3️⃣ Verify payment
            const verifyRes = await axios.post(
              "http://localhost:9999/api/subscription/subVerify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                subscriptionId,
              },
              { withCredentials: true }
            );

            alert("Subscription activated successfully ✅");
            console.log(verifyRes.data);
          } catch (err: any) {
            alert("Payment verification failed ❌");
            console.error(err);
          }
        },
        theme: { color: "#0f172a" },
      });

      razorpay.open();
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingPlan(null);
    }
  };

  /* ----------------------------------
     UI
  -----------------------------------*/
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Choose Your Subscription
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((p) => (
            <div
              key={p.plan}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">₹{p.price}</h2>
                <p className="text-gray-600 mb-4">
                  {p.duration} Months Subscription
                </p>
              </div>

              <button
                onClick={() => handleSubscribe(p.plan)}
                disabled={loadingPlan === p.plan}
                className="mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
              >
                {loadingPlan === p.plan ? "Processing..." : "Subscribe Now"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
