// backend/components/UploadList.jsx
import React from 'react';
import { BasePropertyProps } from 'adminjs';

const UploadList = (props) => {
  const { record, property } = props;
  const imageUrl = record.params[property.name];

  return imageUrl ? (
    <img src={imageUrl} alt="תמונה" style={{ maxHeight: '40px', maxWidth: '60px', objectFit: 'contain' }} />
  ) : (
    <span>אין תמונה</span>
  );
};

export default UploadList;
