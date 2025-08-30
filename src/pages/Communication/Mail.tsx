import React, { useState } from "react";

interface Errors {
  to?: string;
  message?: string;
}

const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

const SendMail: React.FC = () => {
  const [to, setTo] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  const validateForm = (): Errors => {
    let errs: Errors = {};

    if (!to.trim()) {
      errs.to = "Recipient is required.";
    } else {
      // Support multiple emails separated by comma
      const emails = to.split(",").map((e) => e.trim());
      const invalids = emails.filter((email) => !validateEmail(email));
      if (invalids.length) {
        errs.to = "Invalid email(s): " + invalids.join(", ");
      }
    }

    if (!message.trim()) {
      errs.message = "Message cannot be empty.";
    }

    return errs;
  };

  const handleSend = () => {
    const errs = validateForm();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);

      // Reset fields
      setTo("");
      setSubject("");
      setMessage("");

      setTimeout(() => setSent(false), 2500);
    }, 1500);

    // Example: To really send use backend API or EmailJS
    // const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    // window.location.href = mailtoLink;
  };

  const handleReset = () => {
    setTo("");
    setSubject("");
    setMessage("");
    setErrors({});
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
        📧 Send Email
      </h2>

      {/* To */}
      <label htmlFor="to" className="block mb-1 font-medium text-gray-700">
        To
      </label>
      <input
        id="to"
        type="text"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="Recipient email(s), comma separated"
        className={`w-full p-3 border rounded-lg mb-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          errors.to ? "border-red-500" : "border-gray-300"
        }`}
        aria-invalid={!!errors.to}
      />
      {errors.to && <div className="text-red-500 text-sm mb-2">{errors.to}</div>}

      {/* Subject */}
      <label htmlFor="subject" className="block mb-1 font-medium text-gray-700">
        Subject
      </label>
      <input
        id="subject"
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
      />

      {/* Message */}
      <label htmlFor="message" className="block mb-1 font-medium text-gray-700">
        Message
      </label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className={`w-full p-3 border rounded-lg mb-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          errors.message ? "border-red-500" : "border-gray-300"
        }`}
        rows={5}
        aria-invalid={!!errors.message}
      />
      {errors.message && (
        <div className="text-red-500 text-sm mb-2">{errors.message}</div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleSend}
          className={`flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Sending..." : "Send Email"}
        </button>

        <button
          onClick={handleReset}
          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Clear
        </button>
      </div>

      {/* Status */}
      {sent && (
        <div className="text-green-600 text-center mt-4 font-medium">
          ✅ Email Sent Successfully!
        </div>
      )}
    </div>
  );
};

export default SendMail;
