import React, { ReactNode } from 'react';
import './Empty.scss';

type EmptyPropTypes = {
  message?: string;
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode | null;
  containerClassName?: string;
};

export function Empty({
  message = 'No data',
  imageSrc,
  imageAlt,
  children = null,
  containerClassName = '',
}: EmptyPropTypes) {
  return (
    <div className={`empty-container ${containerClassName}`}>
      {imageSrc && <img src={imageSrc} alt={imageAlt} />}
      <div className="text-container">{message}</div>
      {children}
    </div>
  );
}
