import { Typography, Box, Table, TableContainer, TableHead, Button, TableBody, TableRow, TableCell, Paper } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { purple } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'
import { blue } from "@material-ui/core/colors/"
import {useParams} from "react-router-dom"
import axios from "axios"
const useStyles = makeStyles(theme => ({
    viewHead: {
        backgroundColor: purple[700],
        color: "white",
        textAlign: "center",

    },
    tableHead: {
        fontWeight: "bold"
    },
    backButton: {
        display: "block",
        margin: "0 auto",
        padding: "10px",
        backgroundColor: purple[800],
        position: "relative",
        top: "10px",
        color: "white",
        fontFamily: "'Satisfy', 'cursive'",

        '&:hover': {
            backgroundColor: purple[600],

        }
    },
    tableHead: {
        backgroundColor: blue[900],
        fontFamily: "'Satisfy', 'cursive'",

    },
    textColor: {
        color: "white",
        fontWeight: "bold",
        fontStyle: "italic"
    },
    tableBody: {
        fontFamily: "'Satisfy', 'cursive'",

    }



}));



const View = () => {
   const {id}=useParams();
   const [employees, setEmployess] = useState([]);
   useEffect(() => {
       fetchEmployeeList();

   },[id])
   const fetchEmployeeList = async () => {
 
           const emplData = await axios.get(`http://localhost:4000/employees/${id}`)
           .then((response)=>response.data)
           .catch((err)=>console.log(err));
           setEmployess(emplData);

     }

    const classes = useStyles();

    return (
        <div>
            <Box className={classes.viewHead} p={1}>
                <h1>Employee List</h1>
            </Box>
            <Paper>
                <TableContainer>
                    <Table>

                        <TableHead className={classes.tableHead}>

                            <TableRow>
                                <TableCell scope="row" component="th" align="center"><p className={classes.textColor}>ID</p></TableCell>
                                <TableCell align="center"><p className={classes.textColor}>Name</p></TableCell>
                                <TableCell align="center"><p className={classes.textColor}>Designation</p></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center"><p className={classes.tableBody}>{employees.id}</p></TableCell>
                                <TableCell align="center"><p className={classes.tableBody}>{employees.employeeName}</p></TableCell>
                                <TableCell align="center"><p className={classes.tableBody}>{employees.designation}</p></TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Link to="/">
                <Button className={classes.backButton}>
                    <i className='fa fa-arrow-left' style={{ paddingRight: "5px" }}></i>
                    Back to Home
                </Button>
            </Link>
        </div>
    )
}

export default View