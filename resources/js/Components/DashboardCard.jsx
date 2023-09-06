import React from 'react'
import { Card } from 'react-bootstrap'

const DashboardCard = ({ label = "Card", subLabel = "", icon, variant = "primary", value = "100",className }) => {
    return (
        <Card className={`dashboard-card  border-${variant} ${className}`}>
            <Card.Body className='p-4 flex justify-between'>
                <div className=''>
                    <div className={`icon p-2 flex items-center justify-center w-[45px] h-[45px] rounded-2 fs-4 bg-light-${variant} text-center mb-3`}>
                        {/* <i className="fi fi-rr-boxes leading-none"></i>  */}
                        {icon}
                    </div>
                    <p className=" mb-2 fw-bold text-black-50 fs-6">{label}</p>
                    {subLabel && (
                        <p className="mt-0 mb-0 fw-bold text-dark fs-6">{subLabel}</p>
                    )}
                </div>
                <div className=''>

                    <p className={`my-0 fw-bold text-dark fs-4`}>
                        {value}
                    </p>
                </div>
            </Card.Body>
        </Card>
    )
}

export default DashboardCard
