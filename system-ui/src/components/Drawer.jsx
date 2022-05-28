import * as React from 'react';
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

import Stack from '@mui/material/Stack';




import { Link } from 'react-router-dom';


const drawerWidth = 250;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div >
      <Toolbar className="mt-5">
        ToolBar
      </Toolbar>
      <List className='mt-5'>
          <Link to='/'  className="nav-item">
            <ListItem disablePadding >
                <ListItemButton >
                  <ListItemIcon>
                    <DashboardOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/empty'  className="nav-item">
            <ListItem disablePadding >
                <ListItemButton >
                  <ListItemIcon>
                    <DashboardOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Empty" />
                </ListItemButton>
            </ListItem>
          </Link>
      </List>
     
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
      <section className="my-3 px-lg-5">
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
