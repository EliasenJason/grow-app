import styled from 'styled-components'
import Plant from '../public/Plant'

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
        p {
            font-size: 1.6rem;
            padding-bottom: .3em;
            border-bottom: solid green 5px;
            white-space: nowrap;
        }
    }
    .user {
        width: 100%;
        height: 100%;
        font-size: 2rem;
        grid-area: user;
        font-family: 'comforter', cursive;
        font-weight: bolder;
        text-align: right;
    }
    .user p {
        margin-right: .5em;
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
    
    return (
        <Head>
            <div className='logo'>
                <Plant className="plant" />
            </div>
            <nav>
                <p onClick={()=> console.log('clicked')}>New</p>
                <p>Active</p>
                <p>Past</p>
            </nav>
            <div className="user">
                <p>JE</p>
            </div>            
        </Head>
    )
}