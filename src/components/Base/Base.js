import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { verifiedAccount } from '../../utils'
import Dashboard from './dashboard/Dashboard'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Base() {
    const account = useSelector(state => state.source.account)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!verifiedAccount()) return navigate('/login')
    },[account, navigate])

    const drawerList = ['dashboard', 'form', 'cari', 'rekap']

    return <div className="drawer lg:drawer-open height-fill-avaible">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col">
                <div className="navbar flex gap-2 bg-base-100">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1">
                        <p className="text-xl">nama Aplikasi</p>
                    </div>
                    <div className="navbar-end">
                        <p className="btn">Logout</p>
                    </div>
                </div>
                <div className='flex-1 p-2'>
                    <Routes>
                        <Route path='/' Component={Dashboard}/>
                        <Route path='/dashboard' Component={Dashboard}/>
                        <Route path='/form' Component={Dashboard}/>
                        <Route path='/search' Component={Dashboard}/>
                        <Route path='/recap' Component={Dashboard}/>
                    </Routes>
                </div>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {drawerList.map(list => (
                        <li key={list}><p onClick={() => {
                            navigate('/' + list)
                            document.getElementById('my-drawer-2').checked = false
                        }} className={`capitalize ${location.pathname === '/' + list && 'active'}`}>{list}</p></li>
                    ))}
                </ul>
            </div>
        </div>
}