import React, { useState } from 'react'
import AppLayout from './AppLayout'
import NavbarComponent from '@/Components/Navbar'
import SidebarComponent from '@/Components/SidebarComponent'
import SuperAdminSidebar from '@/Components/SuperAdminSidebar'
import AdminSidebar from '@/Components/AdminSidebar'
import UnitHeadSidebar from '@/Components/UnitHeadSidebar'
import BottomNav from '@/Components/BottomNav'
import { ToastContainer, toast } from 'react-toastify'
import { useNavState } from '@/States/States'
import { Head, usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import FeedBackModal from '@/Components/FeedBackModal'

export const LayoutType = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    UNIT_HEAD: 'unit_head',
}

const Sidebar = ({ layout, isActive, activeLink,setShowFeedbackModal }) => {
    switch (layout) {
        case LayoutType.ADMIN:
            return <AdminSidebar activeLink={activeLink} isActive={isActive} setShowFeedbackModal={setShowFeedbackModal}/>;
        case LayoutType.SUPER_ADMIN:
            return <SuperAdminSidebar activeLink={activeLink} isActive={isActive} setShowFeedbackModal={setShowFeedbackModal}/>;
        case LayoutType.UNIT_HEAD:
            return <UnitHeadSidebar activeLink={activeLink} isActive={isActive} setShowFeedbackModal={setShowFeedbackModal}/>;
        default:
            return null;
    }
}

const PanelLayout = ({ userAuth=null, children, layout = null, headerTitle = null, defaultActiveLink,pageTitle="" }) => {

    const [activeLink, setActiveLink] = useState(defaultActiveLink)
    const [showFeedbackModal, setShowFeedbackModal] = useState(false)
    const { isNavActive, setNavActive } = useNavState();
    const { flash,auth } = usePage().props;

    useEffect(()=>{
        if(flash){
            if(flash.message) toast(flash.message);
            else if(flash.success) toast.success(flash.success);
            else if(flash.error) toast.error(flash.error);
        }
    },[flash])

    return (
        <AppLayout auth={auth}>
            <Head title={pageTitle || headerTitle || activeLink[0].toUpperCase() + activeLink.substr(1).toLowerCase()} />
            <ToastContainer hideProgressBar autoClose={1500} theme="light" position="bottom-right" />
            <NavbarComponent headerTitle={headerTitle || activeLink} setIsActive={setNavActive} isActive={isNavActive} />
            <Sidebar setShowFeedbackModal={setShowFeedbackModal} activeLink={activeLink} isActive={isNavActive} layout={auth?.role} />
            <main className={`${isNavActive ? '' : 'expanded'} content-body bg-gray-100 `}>
                {children}
            </main>
            <FeedBackModal show={showFeedbackModal} handleClose={() => setShowFeedbackModal(false)}/>
        </AppLayout>
    )
}

export default PanelLayout