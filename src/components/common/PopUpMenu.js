import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function PopUpMenu({ options }) {
  const onClickHandler = async (popupState, optionHandler) => {
    popupState.close();
    await optionHandler();
  };
  return (
    <PopupState variant="popover" popupId="popup-menu">
      {(popupState) => (
        <>
          <Button {...bindTrigger(popupState)}>
            <MoreVertIcon fontSize="small" />
          </Button>
          <Menu {...bindMenu(popupState)} sx={{ ml: '2rem' }}>
            {options.map((option) => (
              <MenuItem onClick={() => onClickHandler(popupState, option.handler)}>
                {option.text}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  );
}
