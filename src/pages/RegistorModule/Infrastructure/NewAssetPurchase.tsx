import React, { useState } from 'react';

type ProcessStep =
  | 'Identify Need'
  | 'Quotation Management'
  | 'Approval'
  | 'Generate PO'
  | 'Delivery Verification';

interface VendorQuote {
  id: number;
  vendorName: string;
  quoteAmount: number;
  vendorEmail?: string;
  expectedDelivery?: string;
  selected: boolean;
}

interface PurchaseData {
  itemName: string;
  department: string;
  quantity: number;
  estimatedPrice?: number;
  vendorQuotes: VendorQuote[];
  approved: boolean | null;
  poGenerated: boolean;
  deliveryVerified: boolean;
  approvalComments: string;
}

const initialPurchaseData: PurchaseData = {
  itemName: '',
  department: '',
  quantity: 0,
  estimatedPrice: undefined,
  vendorQuotes: [],
  approved: null,
  poGenerated: false,
  deliveryVerified: false,
  approvalComments: '',
};

export default function NewAssetPurchase() {
  const [step, setStep] = useState<ProcessStep>('Identify Need');
  const [purchaseData, setPurchaseData] = useState<PurchaseData>({ ...initialPurchaseData });
  const [quoteDraft, setQuoteDraft] = useState<Partial<VendorQuote>>({ vendorName: '', quoteAmount: 0, vendorEmail: '', expectedDelivery: '', selected: false });

  const stepOrder: ProcessStep[] = ['Identify Need', 'Quotation Management', 'Approval', 'Generate PO', 'Delivery Verification'];

  const canGoNext = () => {
    if (step === 'Identify Need')
      return purchaseData.itemName && purchaseData.department && purchaseData.quantity > 0;
    if (step === 'Quotation Management')
      return purchaseData.vendorQuotes.length > 0;
    if (step === 'Approval')
      return purchaseData.approved !== null;
    if (step === 'Generate PO')
      return !purchaseData.poGenerated;
    return false;
  };

  const handleNext = () => {
    if (!canGoNext()) return;
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex < stepOrder.length - 1) setStep(stepOrder[currentIndex + 1]);
  };

  const handlePrevious = () => {
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex > 0) setStep(stepOrder[currentIndex - 1]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPurchaseData(prev => ({
      ...prev,
      [name]: (name === "quantity" || name === "estimatedPrice") ? Number(value) : value
    }));
  };

  const handleQuoteDraftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuoteDraft(prev => ({
      ...prev,
      [name]: name === "quoteAmount" ? Number(value) : value
    }));
  };

  const addQuote = () => {
    if (!quoteDraft.vendorName || !quoteDraft.quoteAmount) {
      alert("Vendor name and quote amount are required");
      return;
    }
    const newQuote: VendorQuote = {
      id: Date.now(),
      vendorName: quoteDraft.vendorName!,
      quoteAmount: quoteDraft.quoteAmount!,
      vendorEmail: quoteDraft.vendorEmail,
      expectedDelivery: quoteDraft.expectedDelivery,
      selected: false,
    };
    setPurchaseData(prev => ({
      ...prev,
      vendorQuotes: [...prev.vendorQuotes, newQuote],
    }));
    setQuoteDraft({ vendorName: '', quoteAmount: 0, vendorEmail: '', expectedDelivery: '', selected: false });
  };

  const removeQuote = (id: number) => {
    setPurchaseData(prev => ({
      ...prev,
      vendorQuotes: prev.vendorQuotes.filter(q => q.id !== id)
    }));
  };

  const selectQuote = (id: number) => {
    setPurchaseData(prev => ({
      ...prev,
      vendorQuotes: prev.vendorQuotes.map(q => ({
        ...q,
        selected: q.id === id,
      }))
    }));
  };

  const setApproval = (approved: boolean) => {
    if (approved && purchaseData.vendorQuotes.filter(q => q.selected).length === 0) {
      alert("Please select a vendor quote before approving.");
      return;
    }
    setPurchaseData(prev => ({ ...prev, approved }));
    alert(approved ? "Purchase approved" : "Purchase rejected");
  };

  const generatePO = () => {
    setPurchaseData(prev => ({ ...prev, poGenerated: true }));
    alert("Purchase order generated");
  };

  const verifyDelivery = () => {
    setPurchaseData(prev => ({ ...prev, deliveryVerified: true }));
    alert("Delivery verified");
  };

  return (
    <div className="">
     
      <div className="flex justify-between mb-16">
        {stepOrder.map((s, i) => {
          const active = s === step;
          return (
            <div key={s} className={`relative flex-1 cursor-pointer select-none`} onClick={() => setStep(s)}>
              <div className={`flex flex-col items-center`}>
                <div className={`p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2 transition-all duration-300 ${active ? "bg-primary-600 text-white shadow-lg" : "bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400"}`}>
                  <span className="text-lg font-bold">{i + 1}</span>
                </div>
                <div className={`text-center font-semibold text-base tracking-wider ${active ? "text-primary-600" : "text-gray-500 dark:text-gray-400"}`}>{s}</div>
              </div>
              {i < stepOrder.length - 1 && (
                <div className={`absolute top-10 left-full w-12 h-[5px] mt-2 rounded-r-md transition-colors ${active ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-700"}`}></div>
              )}
            </div>
          )
        })}
      </div>

      <div className="max-w-5xl mx-auto">
        {step === "Identify Need" && (
          <form onSubmit={e => e.preventDefault()} className="grid grid-cols-2 gap-10 mb-12">
            <input type="text" name="itemName" placeholder="Item Name" value={purchaseData.itemName} onChange={handleInputChange}
              className="col-span-2 p-4 rounded-lg border border-gray-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-primary-500" />
            <input type="text" name="department" placeholder="Department" value={purchaseData.department} onChange={handleInputChange}
              className="p-4 rounded-lg border border-gray-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-primary-500" />
            <input type="number" name="quantity" placeholder="Quantity" min={1} value={purchaseData.quantity} onChange={handleInputChange}
              className="p-4 rounded-lg border border-gray-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-primary-500" />
            <input type="number" name="estimatedPrice" placeholder="Estimated Price" value={purchaseData.estimatedPrice || ""} onChange={handleInputChange}
              className="col-span-2 p-4 rounded-lg border border-gray-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-primary-500" />
          </form>
        )}

        {step === "Quotation Management" && (
          <div className="mb-12">
            <div className="flex flex-wrap gap-6 mb-8">
              <input type="text" name="vendorName" placeholder="Vendor Name" value={quoteDraft.vendorName} onChange={handleQuoteDraftChange}
                className="p-4 rounded-lg border border-gray-300 flex-grow focus:border-primary-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-primary-500" />
              <input type="number" name="quoteAmount" placeholder="Quote Amount" min={1} value={quoteDraft.quoteAmount || ""} onChange={handleQuoteDraftChange}
                className="p-4 rounded-lg border border-gray-300 w-[140px] focus:border-primary-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-primary-500" />
              <input type="email" name="vendorEmail" placeholder="Vendor Email (optional)" value={quoteDraft.vendorEmail} onChange={handleQuoteDraftChange}
                className="p-4 rounded-lg border border-gray-300 flex-grow focus:border-primary-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-primary-500" />
              <input type="date" name="expectedDelivery" placeholder="Expected Delivery" value={quoteDraft.expectedDelivery} onChange={handleQuoteDraftChange}
                className="p-4 rounded-lg border border-gray-300 w-[160px] focus:border-primary-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-primary-500" />
              <button onClick={addQuote} className="bg-primary-600 text-white p-4 rounded-lg hover:bg-primary-700 transition-colors">Add Quote</button>
            </div>

            {purchaseData.vendorQuotes.length === 0 ? (
              <p className="text-lg text-gray-500 dark:text-gray-400">No vendor quotations added yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 max-h-72 overflow-y-auto">
                {purchaseData.vendorQuotes.map(q => (
                  <div key={q.id} className="bg-primary-50 dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-lg">{q.vendorName} {q.selected && <span className="text-green-600 ml-3">Selected</span>}</p>
                      <p>Quote: ${q.quoteAmount.toFixed(2)}</p>
                      {q.vendorEmail && <p className="text-gray-700 dark:text-gray-400">Email: {q.vendorEmail}</p>}
                      {q.expectedDelivery && <p className="text-gray-700 dark:text-gray-400">Expected Delivery: {q.expectedDelivery}</p>}
                    </div>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="selectedQuote" checked={q.selected} onChange={() => selectQuote(q.id)} className="scale-150 cursor-pointer" />
                      <button onClick={() => removeQuote(q.id)} className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === "Approval" && (
          <div className="max-w-4xl mx-auto bg-primary-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg space-y-8">
            <h2 className="text-2xl font-semibold text-primary-800 dark:text-primary-200">Approval Step</h2>
            <div className="space-y-2 text-lg">
              <p><strong>Item:</strong> {purchaseData.itemName}</p>
              <p><strong>Department:</strong> {purchaseData.department}</p>
              <p><strong>Quantity:</strong> {purchaseData.quantity}</p>
              <p><strong>Quotes:</strong> {purchaseData.vendorQuotes.length}</p>
            </div>
            <textarea 
              placeholder="Enter approval comments"
              value={purchaseData.approvalComments}
              onChange={(e) => setPurchaseData(prev => ({ ...prev, approvalComments: e.target.value }))}
              className="w-full h-40 p-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <div className="flex gap-8">
              <button 
                onClick={() => setApproval(true)}
                disabled={purchaseData.approved === true}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg disabled:opacity-50"
              >
                Approve
              </button>
              <button 
                onClick={() => setApproval(false)}
                disabled={purchaseData.approved === false}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          </div>
        )}

        {step === "Generate PO" && (
          <div className="max-w-4xl mx-auto text-center pt-20 pb-40">
            <h2 className="text-2xl font-semibold text-primary-800 dark:text-primary-200 mb-8">Generate Purchase Order</h2>
            {purchaseData.poGenerated ? (
              <p className="text-green-600 dark:text-green-400 text-2xl font-semibold">Purchase Order generated successfully!</p>
            ) : (
              <button
                onClick={() => {
                  generatePO();
                  handleNext();
                }}
                className="bg-primary-700 hover:bg-primary-800 text-white px-10 py-4 rounded-xl font-extrabold tracking-wide shadow-lg transition-colors"
              >
                Generate PO
              </button>
            )}
          </div>
        )}

        {step === "Delivery Verification" && (
          <div className="max-w-4xl mx-auto text-center pt-20 pb-40">
            <h2 className="text-2xl font-semibold text-primary-800 dark:text-primary-200 mb-8">Delivery Verification</h2>
            {purchaseData.deliveryVerified ? (
              <p className="text-green-600 dark:text-green-400 text-2xl font-semibold">Delivery verified successfully!</p>
            ) : (
              <button
                onClick={() => {
                  verifyDelivery();
                  alert('Purchase process completed successfully!');
                }}
                className="bg-primary-700 hover:bg-primary-800 text-white px-10 py-4 rounded-xl font-extrabold tracking-wide shadow-lg transition-colors"
              >
                Verify Delivery
              </button>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between max-w-4xl mx-auto mt-20 mb-20 px-6">
          <button
            disabled={step === "Identify Need"}
            onClick={handlePrevious}
            className={`px-12 py-4 rounded-lg font-extrabold tracking-wide cursor-pointer text-white transition-colors ${
              step === "Identify Need"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary-700 hover:bg-primary-800"
            }`}
          >
            Previous
          </button>
          <button
            disabled={!canGoNext()}
            onClick={() => {
              if (!canGoNext()) return;
              handleNext();
            }}
            className={`px-12 py-4 rounded-lg font-extrabold tracking-wide cursor-pointer text-white transition-colors ${
              !canGoNext()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary-700 hover:bg-primary-800"
            }`}
          >
            Next
          </button>
        </div>
      </div>
      </div>
    );
}
