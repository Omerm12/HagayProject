// backend/components/UploadEdit.jsx

import React from 'react';
import { BasePropertyProps } from 'adminjs';

const UploadEdit = (props) => {
  const { onChange, property } = props;

  return (
    <div>
      <label htmlFor={property.name}>העלה תמונה</label>
      <input
        id={property.name}
        type="file"
        accept="image/*"
        onChange={(event) =>
          onChange(property.name, event.target.files?.[0])
        }
      />
    </div>
  );
};

export default UploadEdit;
