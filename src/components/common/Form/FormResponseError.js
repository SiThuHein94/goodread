import React from 'react';

export default function FormResponseError({ errors }) {
  return (
    <div className="alert alert-danger" role="alert">
      <ul className="mb-0 text-danger">
        {errors.map((i, key) => (
          <li key={key}>{i.error_description || i.message}</li>
        ))}
      </ul>
    </div>
  );
}