import { Link } from 'react-router-dom'

const Home = () =>{
    return(
        <div className='Home'>
            <h1>I am the Almighty Vend-o</h1>
            <h2>Make your selection from the choices below, human</h2>
            <ul>
                <li><Link to="/tea">Tea</Link></li>
                <li><Link to="/coffee">Coffee</Link></li>
                <li><Link to="/soda">Soda</Link></li>
            </ul>
        </div>
    )
}

export default Home
