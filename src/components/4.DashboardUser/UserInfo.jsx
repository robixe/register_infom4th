import { QRCodeCanvas } from 'qrcode.react';

export default function UserInfo({ formData }) {
  const qrData = JSON.stringify(formData.auth);
  console.log(formData)
  return (
    <div className="bg-white/90 md:flex justify-between  md:w-1/2 w-full backdrop-blur-lg shadow-2xl rounded-xl p-8">
      <div>
        <h2 className="text-2xl text-gray-600 font-bold mb-6">Candidate Details:</h2>
        <p className="mb-2"><strong>First Name:</strong> {formData.first}</p>
        <p className="mb-2"><strong>Last Name:</strong> {formData.last}</p>
        <p className="mb-2"><strong>Email:</strong> {formData.email}</p>
        <p className="mb-2"><strong>payment:</strong> {formData.payment ? formData.payment : "None"}</p>
      </div>
      <p className="mb-2 px-4 py-2 flex md:items-center md:justify-center flex-col gap-1  text-indigo-800 font-bold ">
          <strong>Verification:</strong> {formData.auth}
          <QRCodeCanvas value={qrData} size={100} />
        </p>
    </div>
  );
}
