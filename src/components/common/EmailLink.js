import React from 'react';
import { Link } from '@mui/material';

export default function EmailLink({ emailAddress }) {
  return (
    <Link
      href={`mailto:${emailAddress}`}
      underline="none"
    >
      {emailAddress}
    </Link>
  );
}
