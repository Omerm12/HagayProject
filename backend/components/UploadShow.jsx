// backend/components/UploadShow.jsx
import React from 'react'
import { BasePropertyProps } from 'adminjs'

const UploadShow = (props) => {
  const { record, property } = props
  const imageUrl = record.params[property.name]

  return imageUrl ? (
    <div>
      <img src={imageUrl} alt="תמונה" style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }} />
      <p style={{ marginTop: '8px' }}>{imageUrl}</p>
    </div>
  ) : (
    <p>אין תמונה</p>
  )
}

export default UploadShow
