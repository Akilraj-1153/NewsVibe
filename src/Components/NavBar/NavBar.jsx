import React from 'react'
import Logo from '../../assets/Logo.png'
import MoonIcon from '../../assets/Moon.svg'
import SunIcon from '../../assets/Sun.svg'
import { useRecoilState } from 'recoil'
import { isDarkMode, ShowMobileNav } from '../../Components/Configuration/Atom'
import SideNavBar from '../SideBar/SideNavBar'
import { CgMenuRightAlt } from "react-icons/cg";
import { CiMenuKebab } from "react-icons/ci";

const NavBar = () => {
    const [isDarkTheme, setIsDarkTheme] = useRecoilState(isDarkMode)
    const [MobileNav, setMobileNav] = useRecoilState(ShowMobileNav)

    const handletoogeleThme = () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        localStorage.setItem("NewsVibeTheme", JSON.stringify(newTheme));
    }

    return (
        <div>
            <div className='flex justify-between items-center p-1 border-b '>
                <div className='Logo flex items-center gap-2'>
                    <img src={Logo} alt="logo" className='h-12 w-auto' />
                    <div>
                        <h1 className='font-mate font-bold text-lg'>
                            NewsVibe
                        </h1>
                        <h1 className='font-mate text-md'>
                            Your Daily Dose of News
                        </h1>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='Theme cursor-pointer outline-none' onClick={handletoogeleThme}>
                        <img src={isDarkTheme ? SunIcon : MoonIcon} alt="" className='h-10 w-auto' />
                    </div>
                    <div className='Menu cursor-pointer md:hidden outline-none' onClick={() => setMobileNav(!MobileNav)}>
                        {MobileNav ? <CgMenuRightAlt size={30} /> : <CiMenuKebab size={30} />}
                    </div>
                </div>
            </div>
            {MobileNav &&
                <div className=' absolute w-full md:hidden p-1 backdrop-blur-3xl'>
                    <SideNavBar />
                </div>
            }
        </div>
    )
}

export default NavBar
