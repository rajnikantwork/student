import React from 'react'
import './header.scss'
import { Link, NavLink } from 'react-router-dom'
import Utils from '../../utils'
import { Avatar, Box, Button, List, ListItem, Menu, MenuItem, Tooltip } from '@mui/material'

const items = [
    {
        href: '/login',
        title: 'Login'
    },
    {
        href: '/student',
        title: 'Student'
    },
    {
        href: '/signup',
        title: 'Sign Up'
    },

];
const navAttribute = {
    disableGutters: true,
};


function Header() {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <header className='Dflex al-cnt sp-bt'>
            <Box className='lt Dflex al-cnt'>
                <Link to="/" className='branding'>
                    <img src={Utils.LocalImages.LOGO} alt="" />
                </Link>
                <List className="navList Dflex al-cnt fl-wp">
                    {items.map((text, index) => (
                        <Tooltip title={text.title} key={index} placement="top">
                            <ListItem {...navAttribute}>
                                <NavLink to={text.href}>
                                    {text.title}
                                </NavLink>
                            </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </Box>
            <Box className='rt'>
                <Button id="userMenu"
                    aria-controls={open ? 'userNav' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <Avatar alt="Rajni Gupta" src={Utils.LocalImages.USERIMG} />
                    <span className='m-l-20'>Rajni Gupta</span>
                </Button>

                <Menu
                    id="userNav"
                    aria-labelledby="userMenu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </Box>
        </header>
    )
}

export default Header