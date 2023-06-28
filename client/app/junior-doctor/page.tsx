'use client'


export default function JuniorDoctor() {
  const token = localStorage.getItem('accessToken');
  const userType = localStorage.getItem('userType') as string;
  console.log(token)
  return (
    <main className='flex min-h-screen flex-col box-border'>
      <h1>Junior page!</h1>
    </main>
  );
}
