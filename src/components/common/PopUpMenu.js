import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import DraggableDialog from './ConfirmDialog';

export default function PopUpMenu({ options }) {
  const onClickHandler = async (popupState, optionConfirm, optionHandler) => {
    if (optionConfirm) {
      return;
    }
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
              <MenuItem onClick={() => onClickHandler(popupState, option.confirm, option.handler)}>
                {option.confirm ? (
                  <DraggableDialog
                    text="Block"
                    title="Are you sure you want to block this user?"
                    detail="The user won't be able to sign in until it's unblocked."
                    confirmHandler={option.handler}
                  />
                ) : option.text}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  );
}
