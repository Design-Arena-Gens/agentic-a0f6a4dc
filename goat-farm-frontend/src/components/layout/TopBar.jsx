import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { Avatar, MenuItem, Menu, IconButton } from '@mui/material';
import { useState } from 'react';

const TopBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">Goat Farm Management System</h1>
        <p className="text-sm text-slate-500">Sitamarhi, Bihar · Barbari & Boer Herd</p>
      </div>
      <div>
        <IconButton onClick={handleOpen}>
          <Avatar sx={{ bgcolor: '#2563eb' }}>{user?.username?.[0]?.toUpperCase() ?? 'G'}</Avatar>
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem disabled>{user?.username}</MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(logout());
              handleClose();
            }}
          >
            Sign out
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default TopBar;
