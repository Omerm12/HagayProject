import React from 'react';
import { BasePropertyProps } from 'adminjs';

const UploadImage = (props) => {
  const { record, onChange, property } = props;

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/admin/upload-image', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      onChange(property.name, data.url);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {record.params[property.name] && (
        <img src={record.params[property.name]} alt="תצוגה" width={120} />
      )}
    </div>
  );
};

export default UploadImage;
