import * as React from 'react';
import { useNavigate } from "react-router-dom";


import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import Stack from '@mui/material/Stack';
import { logout, getAuth } from '../auth'



import { NavLink } from 'react-router-dom';


const drawerWidth = 250;

function ResponsiveDrawer(props) {
  const { window } = props;
  const location = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [auth, setAuth] = React.useState();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  async function handleLogout(e){
    await logout();
    location("/login", { replace: true })
  }



  
  React.useEffect(() => {
    async function fetchData(){
      const auth = await getAuth();
      setAuth(auth);
    }

    fetchData()
  }, []);


  function formatName(username){
    if(!username) return
    username = (username.substring(0, 1)).toUpperCase() + (username.substring(1)).toLowerCase()
    return username
  }


  const drawer = (
    <div className='d-flex flex-column h-100'>
      <Toolbar className="mt-5">
        <div className="row align-items-center">
          <div className="col-auto">
            <div className="icon-wrapper rounded-circle bg-secondary bg-opacity-10 p-2">
              <AccountCircleOutlinedIcon />
            </div>
          </div>
          <div className="col">
            <h5 className='fw-bolder m-0'>{formatName(auth?.username)}</h5>
          </div>
        </div>
      </Toolbar>
      <List className='mt-5'>
          {/* <NavLink to='/'  className="nav-item" activeClassName="selected">
            <ListItem disablePadding >
                <ListItemButton >
                  <ListItemIcon>
                    <DashboardOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
            </ListItem>
          </NavLink> */}
          <NavLink to='/'  className="nav-item" activeClassName="selected">
            <ListItem disablePadding >
                <ListItemButton >
                  <ListItemIcon>
                    <PersonSearchOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Patient" />
                </ListItemButton>
            </ListItem>
          </NavLink>
          {/* <NavLink to='/room'  className="nav-item" activeClassName="selected">
            <ListItem disablePadding >
                <ListItemButton >
                  <ListItemIcon>
                    <BedOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Room" />
                </ListItemButton>
            </ListItem>
          </NavLink> */}
          <NavLink to='/account'  className="nav-item" activeClassName="selected">
            <ListItem disablePadding >
                <ListItemButton >
                  <ListItemIcon>
                    <ManageAccountsOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </ListItemButton>
            </ListItem>
          </NavLink>
          {/* <NavLink to='/setting'  className="nav-item" activeClassName="selected">
            <ListItem disablePadding >
                <ListItemButton >
                  <ListItemIcon>
                    <SettingsOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Setting" />
                </ListItemButton>
            </ListItem>
          </NavLink> */}
      </List>
      <div className='flex-grow-1 p-4 d-flex align-items-end justify-content-center'>
        <div className="d-grid w-100 mb-3">
          <button type="button" class="btn btn-primary bg-primary auth-submit" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          className="app-nav"

          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        className='app-main'
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
      <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ mr: 2, display: { sm: 'none' } }}
    >
      <MenuIcon />
    </IconButton>
    <Toolbar className="px-lg-5 mt-5">
      <header className='d-flex flex-row w-100 justify-content-between align-items-center'>
        <h1 className="m-0 page-header">
          {props.title}
        </h1>
        <Stack direction="row" spacing={2} alignItems="center">
          {props.options}
        </Stack>
      </header>
    </Toolbar>
      <section className="my-3 mb-5 px-lg-5">
        {props.children}
      </section>
      </Box>
    </Box>
  );
}


ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
