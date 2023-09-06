import React, { useRef }from 'react';
import {InputLabel, MenuItem, FormControl, Select, Tooltip, TextField, Button, Alert, Snackbar } from '@mui/material';

const BRANCH_TYPE = [
    ['Bugfix', 'bugfix'],
    ['Feature', 'feature'],
    ['Hotfix', 'hotfix'],
    ['Sprint', 'sprint'],
    ['Release', 'release'],
    ['Other', 'other']
];

const Main = () => {
    const branchNameRef = useRef(null);
    const [branchType, setBranchType] = React.useState('');
    const [divider, setDivider] = React.useState('-');
    const [ticketId, setTicketId] = React.useState('');
    const [branchName, setBranchName] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleBranchChange = (event) => {
        setBranchType(event.target.value);
    };

    const handleDivider = (event) => {
        setDivider(event.target.value);
        if (branchName.length > 0) {
            setBranchName(branchName.replace(/[-_]/g, event.target.value));
        }
    }
    const handleTicket = (event) => {
        setTicketId(event.target.value);
    }
    const handleBranchName = (event) => {
        if (ticketId.length === 0) {
            setBranchName(event.target.value.replace(/ /g, divider));
        } else {
            let bName = ' ' + event.target.value;
            setBranchName(bName.replace(/ /g, divider));
        }
    }

    const handleClick = () => {
        navigator.clipboard.writeText(branchNameRef.current.innerHTML);
        setOpen(true);
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    let sep = branchType.length > 0 ? '/' : '';

    return(
        <>
            <div className="main-wrapper">
                <div className="main-container">
                    <div className="button-group">
                        <FormControl sx={{ m: 1, minWidth: '15rem' }} size="small">
                            <InputLabel id="demo-select-small-label">Branch Type</InputLabel>
                            <Select labelId="demo-select-small-label" id="demo-select-small" value={branchType} label="Branch Type" onChange={handleBranchChange} >
                                {BRANCH_TYPE.map((item, i) => (
                                    <MenuItem key={i} value={item[1]}>{item[0]}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: '15rem' }} size="small">
                            <Tooltip title="Replaces white spaces with chose character.">
                                <InputLabel id="demo-select-small-label">Divider</InputLabel>
                            </Tooltip>
                            <Select labelId="demo-select-small-label" id="demo-select-small" value={divider} label="Divider" onChange={handleDivider}>
                                <MenuItem selected={true} value='-'>Dash (-)</MenuItem>
                                <MenuItem value='_'>Underscore (_)</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField id="outlined-basic" label="Ticket ID" variant="outlined" size='small' inputProps={{ style: { textTransform: 'uppercase' } }} sx={{ margin: '0.5rem' }} onChange={handleTicket}/>
                    </div>
                    <div className="branch-name-out">
                        <span>Enter Branch Name</span>
                        <input type="text" onChange={handleBranchName} />
                        <span>Formatted Branch Name</span>
                        <div ref={branchNameRef} className='branch-name'>{branchType + sep + ticketId.toUpperCase() + branchName}</div>
                    </div>

                    <div className="copy-to-clipboard">
                        <Button variant="contained" onClick={handleClick} >Copy to clipboard</Button>
                    </div>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={2500} onClose={handleClose} >
                <Alert severity="success" variant="filled" >Copied to Clipboard</Alert>
            </Snackbar>
        </>
    );
}

export default Main;
