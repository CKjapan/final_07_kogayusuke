import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';


export const SaveButton = () => {
  return (
    <Tooltip title="保存" arrow >
      <IconButton aria-label="Save" type="submit">
        <SaveIcon style={{ fontSize: 32 }} />
      </IconButton>
    </Tooltip>
  )
}
