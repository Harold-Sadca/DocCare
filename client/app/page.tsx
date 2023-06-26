import Footer from './(components)/footer';
import Navbar from './(components)/navbar';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col'>
      <Navbar />
      <h1>Home page working!</h1>
      <Footer />
    </main>
  );
}
