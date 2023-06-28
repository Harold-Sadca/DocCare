'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Patients() {
  const router = useRouter();

  return (
    <main>
      <h2>My patients</h2>
      <div>{}</div>
    </main>
  );
}
