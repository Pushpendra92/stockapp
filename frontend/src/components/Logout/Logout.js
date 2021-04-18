import { Button } from '@material-ui/core';
import React from 'react'
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router";


export const Logout = () => {
    const history = useHistory()
    const handleLogout = async () => {
        await localStorage.clear();
        history.push("/");
        window.location.reload()
      };

      
    return (
        <div>
            <Button onClick={handleLogout}>
            <ExitToAppIcon />
          </Button>
        </div>
    )
}
