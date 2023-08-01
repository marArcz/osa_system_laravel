import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import SidebarComponent, { NavType } from './SidebarComponent'
import { Link } from '@inertiajs/react'
import axios from 'axios'

const SuperAdminSidebar = ({ isActive, activeLink }) => {
    const url = window.location.href;
    const [classifications, setClassifications] = useState([])
    const [navList, setNavList] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const menu = [
        {
            type: NavType.LINK,
            text: 'Dashboard',
            icon: <i className="fi fi-rr-apps"></i>,
            href: route('super-admin.dashboard'),
            urlPath: 'dashboard',
        },
        {
            type: NavType.DROPDOWN,
            text: 'Document Tracking',
            icon: <i className='fi fi-rs-search-alt'></i>,
            key: 'document-tracking',
            opened: false,
            navList: [
                {
                    type: NavType.DROPDOWN,
                    text: 'Reports',
                    icon: <i className='fi fi-rr-document'></i>,
                    key: 'reports',
                    opened: false,
                    navList: []
                }
            ]
        },
        {
            type: NavType.LINK,
            text: 'Announcements',
            icon: <i className="fi fi-rr-bullhorn"></i>,
            href: route('super-admin.announcements'),
            urlPath: 'announcements',
        },
        {
            type: NavType.LINK,
            text: 'Reminders',
            icon: <i className="fi fi-rr-note"></i>,
            href: route('super-admin.reminders'),
            urlPath: 'reminders',
        },
        {
            type: NavType.LINK,
            text: 'Feedback',
            icon: <i className="fi fi-rr-comment-alt"></i>,
            href: '/super-admin/feedback',
            urlPath: 'feedback'
        },

    ];

    useEffect(() => {
        const fetchClassifications = () => {
            setNavList(menu)
            axios.get(route('api.classifications.all'))
                .then((res) => {
                    console.log(res)
                    setClassifications(res.data)
                    initMenu(res.data);
                    setIsLoaded(true)
                })
                .catch((error) => console.log('error getting classifications ', error))
        }
        if(!isLoaded) fetchClassifications()
    }, [])

    // load document tracking nav from classifications
    const initMenu = (data) => {
        let classifications = data.classifications;
        let campusMenu = [];
        for (let campus of data.campuses) {
            let classificationMenu = []
            // classifications
            for (let classification of classifications) {
                // designations
                let designationMenu = [];
                for (let designation of classification.designations) {
                    let designationNav = {
                        type: NavType.LINK,
                        text: designation.name,
                        key: designation.name,
                        href: ''
                    }
                    // append designation nav
                    designationMenu.push(designationNav)
                }

                let classificationNav = {
                    type: NavType.DROPDOWN,
                    text: classification.name,
                    key: classification.name,
                    navList: designationMenu,
                    icon: <i className='fi fi-rr-brackets-square'></i>
                }
                // append classification nav
                classificationMenu.push(classificationNav)
            }

            // campus nav
            let campusNav = {
                type: NavType.DROPDOWN,
                text: campus.name,
                key: campus.name,
                navList: classificationMenu,
                icon: <i className='fi fi-rr-school'></i>
            }
            campusMenu.push(campusNav)
        }

        // nav menu
        var navMenu = {
            type: NavType.DROPDOWN,
            text: 'Document Tracking',
            icon: <i className='fi fi-rs-search-alt'></i>,
            key: 'document-tracking',
            opened: false,
            navList: [
                {
                    type: NavType.DROPDOWN,
                    text: 'Reports',
                    icon: <i className='fi fi-rr-document'></i>,
                    key: 'reports',
                    opened: false,
                    navList: campusMenu
                }
            ]
        }

        let temp = [...menu];
        temp[1] = navMenu;
        setNavList(temp)
    }


    return (
        <SidebarComponent isActive={isActive} navList={navList} activeLink={activeLink} />
    )
}

export default SuperAdminSidebar