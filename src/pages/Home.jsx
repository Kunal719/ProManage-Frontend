import SideBar from '../components/SideBar'
import Dashboard from '../components/Dashboard'
import '../pageStyles/Home.css'

const Home = () => {
    return (
        <>
            <section className='general'>
                <div className="home">
                    <SideBar />
                </div>
                <div className='general-dashboard'>
                    <Dashboard />
                </div>
            </section>
        </>
    )
}

export default Home