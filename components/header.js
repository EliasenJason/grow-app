import { useUser } from '@auth0/nextjs-auth0'
import styled from 'styled-components'
import Plant from '../public/Plant'
import Link from 'next/link'

const Head = styled.header`
    display: grid; 
    grid-template-columns: 1fr 2fr 1fr; 
    grid-template-rows: 1fr;
    grid-template-areas: 
        "logo navigation user"
        ". . .";
    .logo {
        width: 100%;
        height: 100%;
        font-size: 2rem;
        grid-area: logo;
    }
    nav {
        grid-area: navigation;
        display: flex;
        justify-content: space-around;
        font-size: 2rem;
        text-transform: uppercase;
        align-items: center;
        a {
            font-size: 1.6rem;
            padding-bottom: .3em;
            border-bottom: solid green 5px;
            white-space: nowrap;
        }
    }
    .user {
        width: 100%;
        height: 100%;
        grid-area: user;
    }
    .user p {
        font-weight: bolder;
        font-size: 1.5rem;
        font-family: 'comforter', cursive;
        text-align: right;
        margin-right: .5em;
    }
    .user a {
        display: block;
        position: absolute;
        text-align: right;
        right: 1em;
        font-size: .7rem;
    }
    @media (max-width: 900px) {
        grid-template-areas: 
            "logo user"
            "navigation navigation";
        grid-template-columns: 1fr 1fr;
        grid-template-rows: .5fr .3fr; 
        .logo {
            width: 100%;
            margin: 0 auto;
        }
        nav {
            padding: 0;
            flex-wrap: wrap;
            gap: .3em;
            
        }
    }
`

export default function Header() {
    const { user, error, isLoading } = useUser()
    return (
        <Head>
            <div className='logo'>
                
                <Link href="/"><a><Plant className="plant" /></a></Link>
            </div>
            <nav>
                <Link href="/new" passHref><a onClick={()=> console.log('clicked')}>New</a></Link>
                <Link href="/active" passHref><a>Active</a></Link>
                <Link href="/past" passHref><a>Past</a></Link>
            </nav>
            <div className="user">
                {user ? <a href="/api/auth/logout" passHref>LogOut</a> : <a href="/api/auth/login" passHref>Login</a>}
                {user ? <p>{user.name.split(' ').map(word => word[0]).join('')}</p> : <p>Welcome, Guest</p>}
                
            </div>            
        </Head>
    )
}