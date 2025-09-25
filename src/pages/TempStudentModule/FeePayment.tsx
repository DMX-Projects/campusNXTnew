import React, { useState } from "react";

interface FeeHead {
  head: string;
  amount?: number;
}

interface FeePaymentProps {
  paymentLink: string;
  studentName: string;
  program: string;
  feeHeads?: FeeHead[];
  totalAmount?: number;
  paymentDueDate: string;
}

const FeePaymentPage: React.FC<FeePaymentProps> = ({
  paymentLink,
  studentName,
  program,
  feeHeads = [],
  totalAmount = 0,
  paymentDueDate,
}) => {
  const [paymentMode, setPaymentMode] = useState<"online" | "offline" | "none">("none");
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const handleOnlinePayment = () => {
    window.open(paymentLink, "_blank");
    setPaymentStatus("Redirecting to online payment gateway...");
  };

  return (
    <div className="max-w-3xl mx-auto my-10 px-6 py-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg font-sans text-slate-900 dark:text-slate-100">
      <h1 className="text-3xl font-bold mb-7 text-primary-700 dark:text-primary-400">
        Fee Payment Portal
      </h1>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Student &amp; Payment Details</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300"><span className="font-medium">Name:</span> {studentName}</p>
        <p className="text-sm text-slate-700 dark:text-slate-300"><span className="font-medium">Program:</span> {program}</p>
        <p className="text-sm text-slate-700 dark:text-slate-300"><span className="font-medium">Payment Due Date:</span> {paymentDueDate}</p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Fee Breakup</h2>
        <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary-100 dark:bg-slate-800">
                <th className="text-left px-4 py-2">Fee Head</th>
                <th className="text-right px-4 py-2">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {feeHeads.length > 0 ?
                feeHeads.map(({ head, amount }) => (
                  <tr key={head} className="even:bg-slate-50 odd:bg-white dark:even:bg-slate-800 dark:odd:bg-slate-900">
                    <td className="px-4 py-2">{head}</td>
                    <td className="px-4 py-2 text-right">{(amount ?? 0).toLocaleString()}</td>
                  </tr>
                ))
                : (
                  <tr>
                    <td colSpan={2} className="px-4 py-2 italic text-slate-400 dark:text-slate-500 text-center">No fee heads listed</td>
                  </tr>
                )}
              <tr>
                <td className="px-4 py-2 font-semibold text-right bg-slate-100 dark:bg-slate-800">Total</td>
                <td className="px-4 py-2 font-bold text-right bg-slate-100 dark:bg-slate-800 text-primary-700 dark:text-primary-400">₹ {totalAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Select Payment Mode</h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => { setPaymentMode("online"); setPaymentStatus(null); }}
            className={`flex-1 py-3 rounded-lg shadow text-white font-semibold transition ${paymentMode === "online" ? "bg-primary-700" : "bg-primary-500 hover:bg-primary-600"}`}
          >
            Pay Online
          </button>
          <button
            onClick={() => { setPaymentMode("offline"); setPaymentStatus(null); }}
            className={`flex-1 py-3 rounded-lg shadow font-semibold border-2 transition ${paymentMode === "offline" ? "border-secondary-600 bg-secondary-600 text-white" : "border-secondary-400 bg-secondary-100 dark:bg-secondary-900 hover:border-secondary-600 hover:bg-secondary-600 hover:text-white"}`}
          >
            Pay Offline (Cash/Challan/DD)
          </button>
        </div>
      </section>
      {paymentMode !== "none" && (
        <section className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg shadow-inner transition">
          <p className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
            Amount to Pay: <span className="text-primary-700 dark:text-primary-300">₹ {totalAmount.toLocaleString()}</span>
          </p>
          {paymentMode === "online" && (
            <button
              onClick={handleOnlinePayment}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition shadow"
            >
              Proceed to Online Payment
            </button>
          )}
          {paymentMode === "offline" && (
            <>
              <p className="mb-3 text-slate-700 dark:text-slate-300">
                Please visit the college office during working hours to pay via cash, bank challan, or DD. Retain your receipt.
              </p>
              <p className="italic text-xs text-slate-500 dark:text-slate-400">
                Payment link for reference:{" "}
                <a href={paymentLink} target="_blank" rel="noreferrer" className="underline text-primary-500">{paymentLink}</a>
              </p>
            </>
          )}
          {paymentStatus && (
            <p className="mt-4 text-green-600 dark:text-green-400 font-medium">{paymentStatus}</p>
          )}
        </section>
      )}
    </div>
  );
};

export default FeePaymentPage;
