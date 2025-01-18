import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, CssBaseline, Divider, ListItemIcon, IconButton, Avatar, Menu, MenuItem, Switch, FormControlLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Theme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../../context/ThemeContext'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: 240,
        flexShrink: 0,
        top: theme.mixins.toolbar.minHeight,
    },
    drawerPaper: {
        width: (props: { drawerOpen: boolean }) => (props.drawerOpen ? 240 : 60),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const classes = useStyles({ drawerOpen });
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (path: string) => {
        navigate(path);
        handleMenuClose();
    };

    const handleListItemClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Mano
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={darkMode}
                                onChange={toggleTheme}
                                icon={<Brightness7Icon />}
                                checkedIcon={<Brightness4Icon />}
                            />
                        }
                        label=""
                    />
                    <Avatar alt="User Avatar" onClick={handleAvatarClick}>O</Avatar>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => handleMenuItemClick('/profile')}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('/logout')}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                open={drawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
                PaperProps={{ style: { top: 64 } }} // Adjust top value if needed
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {[
                        { text: 'Home', icon: <HomeIcon />, path: '/' },
                        { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
                        { text: 'Info', icon: <InfoIcon />, path: '/info' },
                    ].map((item) => (
                        <ListItem component="li" key={item.text} onClick={() => handleListItemClick(item.path)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            {drawerOpen && <ListItemText primary={item.text} />}
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
};

export default MainLayout;