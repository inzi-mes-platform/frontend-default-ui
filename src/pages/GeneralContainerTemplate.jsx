import React from 'react';

import {
    Box,
    Divider
} from '@mui/material';

const GeneralContainerTemplate = (props) => {

    const { searchView, listTableView, addDialog } = props;

    return (
        <div style={{ width: "100%" }}>
            <Box>
                { searchView }
            </Box>
            <Divider sx={{ mt: 2.5 }} />
            <Box sx={{ flowGrow: 1, mt: 2, mr: 3 }}>
                { listTableView }
            </Box>
            { addDialog }
        </div>
    )
}

export default GeneralContainerTemplate;