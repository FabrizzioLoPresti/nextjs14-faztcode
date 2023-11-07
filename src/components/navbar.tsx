import Link from 'next/link'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className='w-full mx-auto max-w-7xl flex flex-row items-center justify-between py-6'>
      <Link href={'/'}>Home</Link>

      <div>
        <Link href={'/create'}>Create</Link>
      </div>
    </nav>
  )
}

export default Navbar