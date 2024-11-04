import { QRCodeCanvas } from 'qrcode.react';

export default function UserInfo({ formData }) {
  const qrData = JSON.stringify(formData);

  return (
    <div className="bg-white/90  md:w-1/2 w-full backdrop-blur-lg shadow-2xl rounded-xl p-8">
          <h2 className="text-2xl text-gray-600 font-bold mb-6">Candidate Details:</h2>
          <p className="mb-2"><strong>First Name:</strong> {formData.first}</p>
          <p className="mb-2"><strong>Last Name:</strong> {formData.last}</p>
          <p className="mb-2"><strong>Birth Date:</strong> {formData.birth}</p>
          <p className="mb-2"><strong>Gender:</strong> {formData.gender}</p>
          <p className="mb-2"><strong>Phone:</strong> {formData.phone}</p>
          <p className="mb-2"><strong>Email:</strong> {formData.email}</p>
          <p className="mb-2"><strong>Field of Study:</strong> {formData.study}</p>
          <p className="mb-2 px-4 py-2 bg-gradient-to-br from-gray-200 via-white to-gray-200 rounded-md backdrop-blur-md shadow-lg lg:w-[37%] w-[70%] text-indigo-800 font-bold ">
            <strong>Verification:</strong> {formData.auth}</p>

          <div className="mt-6">
            <h3 className="text-xl text-gray-600 font-bold mb-4">
              Scan this QR Code for your Information:
            </h3>
            <QRCodeCanvas value={qrData} size={156} className="mx-auto ml-4" />
          </div>
        </div>
  );
}
