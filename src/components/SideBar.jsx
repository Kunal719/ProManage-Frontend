import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralDialogBox from './GeneralDialogBox';
import '../pageStyles/SideBar.css'
const SideBar = () => {
    const [selectedItem, setSelectedItem] = useState(null); // State to track selected item
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility

    const handleOpenDialog = () => {
        setIsDialogOpen(true); // Open dialog on button click
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false); // Close dialog on close button click or outside click (optional)
    };

    const handleClick = (itemName) => {
        setSelectedItem(itemName); // Update state on item click
    };

    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className='sidebar-header'>
                <img src="/images/codesandbox.png" alt="Logo" />
                <h1>Pro Manage</h1>
            </div>

            <div className='sidebar-items'>
                <div className={`sidebar-item ${selectedItem === 'Board' ? 'selected' : ''}`}
                    onClick={() => { handleClick('Board'); navigate('/') }}>
                    <div className='sidebar-item-image'>
                        <img src="/images/board.png" alt="Board" />
                    </div>
                    <div className="sidebar-item-name ">
                        <span>Board</span>
                    </div>
                </div>
                <div className={`sidebar-item ${selectedItem === 'Analytics' ? 'selected' : ''}`}
                    onClick={() => { handleClick('Analytics'); navigate('/analytics') }}>
                    <div className="sidebar-item-image">
                        <img src="/images/database.png" alt="Database" />
                    </div>
                    <div className="sidebar-item-name">
                        <span>Analytics</span>
                    </div>
                </div>
                <div className={`sidebar-item ${selectedItem === 'Settings' ? 'selected' : ''}`}
                    onClick={() => { handleClick('Settings'); navigate('/settings') }}>
                    <div className="sidebar-item-image">
                        <img src="/images/settings.png" alt="Settings" />
                    </div>
                    <div className="sidebar-item-name">
                        <span>Settings</span>
                    </div>
                </div>
            </div>

            <div className='logout-container'>
                <img src="/images/Logout.png" alt="" onClick={handleOpenDialog} />
                <span onClick={handleOpenDialog}>Logout</span>

                {isDialogOpen && (
                    <div className="dialog-container">
                        <div className="dialog-content">
                            <GeneralDialogBox type="logout" handleDialogClose={handleDialogClose} />
                        </div>
                        <div className="dialog-overlay" onClick={handleDialogClose} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default SideBar