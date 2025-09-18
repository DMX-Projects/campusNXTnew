// import React, { useState } from 'react';
// import { useMediaQuery } from 'react-responsive';

// interface BookRequest {
//   title: string;
//   author: string;
//   edition: string;
//   isbn: string;
//   requestDate: string;
//   reason: string;
//   copies: number;
//   pickupLocation: string;
//   comments: string;
// }

// const pickupLocations = [
//   'Main Library',
//   'Science Block',
//   'Engineering Block',
//   'Law Library',
// ];

// const BookIssueRequestForm: React.FC = () => {
//   const isMobile = useMediaQuery({ maxWidth: 767 });

//   const [formData, setFormData] = useState<BookRequest>({
//     title: '',
//     author: '',
//     edition: '',
//     isbn: '',
//     requestDate: '',
//     reason: '',
//     copies: 1,
//     pickupLocation: pickupLocations[0],
//     comments: '',
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === 'copies' ? Number(value) : value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert('Book issue request submitted:\n' + JSON.stringify(formData, null, 2));
//   };

//   return (
//     <div className="flex justify-center p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md space-y-4"
//       >
//         <h2 className="text-2xl font-semibold text-center text-gray-800">
//           Book Issue Request
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <label className="flex flex-col">
//             <span className="font-medium text-gray-700">Book Title*</span>
//             <input
//               required
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Enter book title"
//               className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </label>

//           <label className="flex flex-col">
//             <span className="font-medium text-gray-700">Author Name</span>
//             <input
//               type="text"
//               name="author"
//               value={formData.author}
//               onChange={handleChange}
//               placeholder="Enter author name"
//               className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </label>

//           <label className="flex flex-col">
//             <span className="font-medium text-gray-700">Edition / Publication Year</span>
//             <input
//               type="text"
//               name="edition"
//               value={formData.edition}
//               onChange={handleChange}
//               placeholder="e.g. 3rd, 2020"
//               className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </label>

//           <label className="flex flex-col">
//             <span className="font-medium text-gray-700">ISBN Number</span>
//             <input
//               type="text"
//               name="isbn"
//               value={formData.isbn}
//               onChange={handleChange}
//               placeholder="Enter ISBN"
//               className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </label>

//           <label className="flex flex-col">
//             <span className="font-medium text-gray-700">Request Date</span>
//             <input
//               type="date"
//               name="requestDate"
//               value={formData.requestDate}
//               onChange={handleChange}
//               className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </label>

//           <label className="flex flex-col">
//             <span className="font-medium text-gray-700">Number of Copies</span>
//             <input
//               type="number"
//               name="copies"
//               min={1}
//               value={formData.copies}
//               onChange={handleChange}
//               className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </label>

//           <label className="flex flex-col">
//             <span className="font-medium text-gray-700">Preferred Pickup Location</span>
//             <select
//               name="pickupLocation"
//               value={formData.pickupLocation}
//               onChange={handleChange}
//               className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             >
//               {pickupLocations.map((location) => (
//                 <option key={location} value={location}>
//                   {location}
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>

//         <label className="flex flex-col">
//           <span className="font-medium text-gray-700">Reason for Request</span>
//           <textarea
//             name="reason"
//             value={formData.reason}
//             onChange={handleChange}
//             placeholder="Why do you need this book?"
//             rows={3}
//             className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//         </label>

//         <label className="flex flex-col">
//           <span className="font-medium text-gray-700">Additional Comments</span>
//           <textarea
//             name="comments"
//             value={formData.comments}
//             onChange={handleChange}
//             placeholder="Any other details"
//             rows={3}
//             className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//         </label>

//         <button
//           type="submit"
//           className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-200"
//         >
//           Submit Request
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookIssueRequestForm;
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface BookRequest {
  title: string;
  author: string;
  edition: string;
  isbn: string;
  requestDate: string;
  reason: string;
  copies: number;
  pickupLocation: string;
  comments: string;
}

const pickupLocations = [
  'Main Library',
  'Science Block',
  'Engineering Block',
  'Law Library',
];

const BookIssueRequestForm: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [formData, setFormData] = useState<BookRequest>({
    title: '',
    author: '',
    edition: '',
    isbn: '',
    requestDate: '',
    reason: '',
    copies: 1,
    pickupLocation: pickupLocations[0],
    comments: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'copies' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Book issue request submitted:\n' + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          📖 Book Issue Request
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 mb-1">Book Title <span className="text-red-500">*</span></span>
            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 mb-1">Author Name</span>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 mb-1">Edition / Publication Year</span>
            <input
              type="text"
              name="edition"
              value={formData.edition}
              onChange={handleChange}
              placeholder="e.g., 3rd, 2020"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 mb-1">ISBN Number</span>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Enter ISBN"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 mb-1">Request Date</span>
            <input
              type="date"
              name="requestDate"
              value={formData.requestDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 mb-1">Number of Copies</span>
            <input
              type="number"
              name="copies"
              min={1}
              value={formData.copies}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
            />
          </label>
        </div>

        <label className="flex flex-col">
          <span className="font-semibold text-gray-700 mb-1">Preferred Pickup Location</span>
          <select
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
          >
            {pickupLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          <span className="font-semibold text-gray-700 mb-1">Reason for Request</span>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Why do you need this book? (e.g., for research, class assignment)"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
          />
        </label>

        <label className="flex flex-col">
          <span className="font-semibold text-gray-700 mb-1">Additional Comments</span>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Any other details that might be helpful"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
          />
        </label>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default BookIssueRequestForm;