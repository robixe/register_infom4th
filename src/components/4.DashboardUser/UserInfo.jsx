import { QRCodeCanvas } from 'qrcode.react';

export default function UserInfo({ formData }) {
  const qrData = JSON.stringify(formData.auth);
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-3xl text-gray-800 font-bold mb-4">Candidate Details</h2>
      <div className='flex sm:flex-row justify-between items-center flex-col'>
        <div className="space-y-2">
          <p className="text-gray-700 text-lg"><strong>First Name:</strong> <span className="text-gray-900">{formData.first}</span></p>
          <p className="text-gray-700 text-lg"><strong>Last Name:</strong> <span className="text-gray-900">{formData.last}</span></p>
          <p className="text-gray-700 text-lg"><strong>Email:</strong> <span className="text-gray-900">{formData.email}</span></p>
          <p className="text-gray-700 text-lg"><strong>Pack:</strong> <span className="text-gray-900">{formData.pack}</span></p>
          <p className="text-gray-700 text-lg"><strong>Payment:</strong> <span className="text-gray-900">{formData.payment ? "Paid" : "Not Paid"}</span></p>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <p className="text-gray-800 font-semibold mb-2">
            <strong>Verification:</strong> <span className="text-gray-900">{formData.auth}</span>
          </p>
          <QRCodeCanvas value={qrData} size={130} className="shadow-md transition-transform transform hover:scale-110" />
        </div>
      </div>
    </div>
  );
}
