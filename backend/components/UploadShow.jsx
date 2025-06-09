import React from "react";

const UploadShow = ({ property, record }) => {
  const filePath = record?.params?.[property.name];

  if (!filePath) return <p>לא הועלתה תמונה</p>;

  return (
    <img
      src={`/uploads/${filePath}`}
      alt="תמונה"
      style={{ maxWidth: '300px', borderRadius: '8px' }}
    />
  );
};

export default UploadShow;
