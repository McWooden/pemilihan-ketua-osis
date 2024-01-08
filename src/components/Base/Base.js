import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Rekap from './rekap/Rekap'
import Cari from './cari/Cari'
import Admin from './admin/Admin'
import Form from './form/Form'
import supabase from '../../config/supabaseClient'
import { setAccount } from '../../redux/source'

export default function Base() {
    const account = useSelector(state => state.source.account)

    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()

    const setAdminAccount = useCallback(async (user) => {
        const {data, error} = await supabase.from('admins').select('id, username').eq('id', user?.id).single()
        if (data) {
            dispatch(setAccount(data))
        }
        if (error) {
            return navigate('/login?msg=error&code'+error.code)
        }
        return data
    }, [dispatch, navigate])
    

    useEffect(() => {
        const handleAuthStateChange = async (event, session) => {
            if (event === 'SIGNED_OUT' || !session?.user) {
                navigate('/login')
                setAccount(null)
            } else if (event === 'SIGNED_IN') {
                setAdminAccount(session?.user)
            }
        }
        supabase.auth.onAuthStateChange(handleAuthStateChange)
    }, [account, navigate, setAdminAccount])

    const drawerList = ['dashboard', 'cari', 'form', 'rekap', 'admin']

    return <div className="drawer lg:drawer-open height-fill-avaible">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col height-fill-avaible overflow-auto">
                <div className="navbar flex gap-2 z[1] sticky top-0 glass">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1">
                        <p className="text-md">Caleg Perindo</p>
                    </div>
                    <div className="navbar-end">
                        <p className="btn" onClick={() => {
                            supabase.auth.signOut()
                            setAccount(null)
                        }}>Logout</p>
                    </div>
                </div>
                <div className='flex-1 p-4 overflow-auto'>
                    <Routes>
                        <Route path='/' Component={Dashboard}/>
                        <Route path='/dashboard' Component={Dashboard}/>
                        <Route path='/form' Component={Form}/>
                        <Route path='/cari' Component={Cari}/>
                        <Route path='/rekap' Component={Rekap}/>
                        <Route path='/admin' Component={Admin}/>
                    </Routes>
                </div>
            </div> 
            <div className="drawer-side z-[1]">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                <div className='menu p-4 w-80 min-h-full bg-base-200  text-base-content'>
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay btn btn-square ml-auto btn-outline lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </label> 
                    <ul className='mt-2'>
                        {drawerList.map(list => (
                            <li key={list}><p onClick={() => {
                                navigate('/' + list)
                                document.getElementById('my-drawer-2').checked = false
                            }} className={`capitalize ${((location.pathname === '/' + list) || (location.pathname === '/' && list === 'dashboard')) && 'active'}`}>{list}</p></li>
                        ))}
                    </ul>
                    <div className='flex flex-col mt-auto bg-neutral text-neutral-content p-2 rounded'>
                        <p>{account?.username || 'username'}</p>
                        <p>{account?.id || 'id'}</p>
                    </div>
                </div>
            </div>
        </div>
}