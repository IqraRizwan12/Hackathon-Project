import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  return (
    <main  >
      {/* <Link href="/login">Login</Link>
      <Link href="/register">Register</Link> */}
      <div>
      <div>
        <h2 style={{ fontSize: 'xx-large', fontWeight: 'bolder', margin: '20px', textAlign: 'center' }}>
          Scrolllink
        </h2>
      </div>

      <div style={{width:'30%',margin:'auto'}} >

        <div style={{ fontSize:'large',backgroundColor: 'green', borderRadius: '10px', border: '1px solid black' }} >
          <Link href="/login">Login</Link>
        </div>


        <h2 style={{ width: '30%', height: '35px', fontSize: 'large', borderRadius: '5px', color: 'white', backgroundColor: 'blue', marginBottom: '10px', border: '1px solid beige' }} >
          Sign In With Google
        </h2>

        <h2 style={{ width: '50%', height: '35px', fontSize: 'large', borderRadius: '5px', color: 'white', backgroundColor: 'blue', marginBottom: '10px', border: '1px solid beige' }}>
          Sign In With Facebook
        </h2>


        <h2 style={{ width: '50%', height: '35px', fontSize: 'large', borderRadius: '5px', color: 'white', backgroundColor: 'blue', marginBottom: '10px', border: '1px solid beige' }}>
          Sign In With Apple

        </h2>


        <h2 style={{ width: '50%', height: '35px', fontSize: 'large', borderRadius: '5px', color: 'white', backgroundColor: 'blue', marginBottom: '10px', border: '1px solid beige' }}>
          Sign In With Email

        </h2>

      </div>
      </div>
    </main>
  )
}
