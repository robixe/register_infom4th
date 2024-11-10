import { QRCodeCanvas } from 'qrcode.react';

export default function UserInfo({ formData }) {
  const qrData = JSON.stringify(formData.auth);
  console.log(formData)
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-3xl text-gray-800 font-bold mb-4">Candidate Details</h2>
      <div className='flex justify-between flex-col'>
        <div >
          <p className="mb-2"><strong>First Name:</strong> {formData.first}</p>
          <p className="mb-2"><strong>Last Name:</strong> {formData.last}</p>
          <p className="mb-2"><strong>Birth Date:</strong> {formData.birth}</p>
          <p className="mb-2"><strong>Gender:</strong> {formData.gender}</p>
          <p className="mb-2"><strong>Phone:</strong> {formData.phone}</p>
          <p className="mb-2"><strong>Email:</strong> {formData.email}</p>
          <p className="mb-2"><strong>Field of Study:</strong> {formData.study}</p>
          <p className="text-gray-700 text-lg"><strong>Payment:</strong> <span className={`text font-bold ${formData.payment ? 'text-green-600' : 'text-red-500'}`}>{formData.payment ? "Paid" : "Not Paid"}</span></p>
        </div>
        <div className="mt-6 flex flex-col">
          <p className="text-gray-800 flex gap-2 font-semibold mb-4">
            <strong>Verification: </strong> <span className="text-green-700 font-extrabold ">{formData.auth}</span>
          </p>
          <QRCodeCanvas value={qrData} size={140} className="shadow-md transition-transform transform hover:scale-110" />
        </div>
      </div>
    </div>
  );
}
