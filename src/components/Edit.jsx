import { Grid, Box, Typography, Paper, TextField, Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { purple, blue } from '@material-ui/core/colors'
import "../App.css"
import { Link } from 'react-router-dom'
import {useParams, useLocation} from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios"
import Home from "./Home"
const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: purple[700],
        color: "white",
        padding: "10px",
        fontSize: "2rem",
        textAlign: "center"

    },
    subheader: {
        backgroundColor: purple[700],
        color: "white",
        marginTop: "20px",
        padding: "10px",
        fontSize: "2rem",
        textAlign: "center"
    },

    paper: {
        padding: "20px",
    },
  
    updateBtn: {
        width: "80%",
        backgroundColor: purple[700],
        display: "block",
        margin: "10px auto",
        color: "white",
        fontFamily: "'Satisfy', 'cursive'",

        '&:hover': {
            backgroundColor: purple[600],

        }
    },
    backButton:{
        display:"block",
        margin:"0 auto",
        padding:"10px",
        backgroundColor:purple[800],
        position:"relative",
        top:"10px",
        color:"white",
        fontFamily: "'Satisfy', 'cursive'",

        '&:hover': {
            backgroundColor: purple[600],

        }
    }

}))
const Edit = () => {
    const classes = useStyles();
    const {id} = useParams();
    const location=useLocation()
    const [employees, setEmployees] = useState(
        {

            "employeeName": "",
            "designation": "",
            "email": ""
        },
    )
    useEffect(() => {
        const fetchEmployeeList = async () => {
  
            const emplData = await axios.get(`http://localhost:4000/employees/${id}`)
            .then((response)=>response.data)
            .catch((err)=>console.log(err));

            setEmployees(emplData);

        
    }
        fetchEmployeeList();

    },[id])
    
    function onChangeForm(e) {
        setEmployees(
            {
                ...employees,
                [e.target.name]: e.target.value
            }
        )

    }

    async function SubmitData(e) {
        e.preventDefault();
        try {
             await axios.put(`http://localhost:4000/employees/${id}`, employees)

             
        }
        catch (err) {
            console.log(err)
        }
        

    }
  
    return (
        <div>
            <header className={classes.header}>
                <h3>Employee Mangement
                </h3>


            </header>
            <Grid container justifyContent="center" >
                <Box>
                    <h1 className={classes.subheader}>
                        Edit Employee
                    </h1>
                    <Paper className={classes.paper}>
                        <div style={{ display: "inline-block", padding: "10px" }}>
                            <form noValidate>
                                <TextField required
                                    autoComplete='id'
                                    variant="outlined"
                                    label="ID"
                                    fullWidth
                                    value={id}
                                    name="id"
                                    
                                    onChange={e=>onChangeForm(e)}
                                />
                                <TextField required
                                    autoComplete="employeeName"
                                    variant="outlined"
                                    label="Employee Name"
                                    fullWidth
                                    style={{ marginTop: "10px" }}
                                    value={employees.employeeName}
                                    onChange={e=>onChangeForm(e)}

                                    name="employeeName"
                                />

                                <TextField
                                    required
                                    autoComplete="designation"
                                    id="designation"
                                    label="Employee Designation"
                                    variant='outlined'
                                    fullWidth
                                    name="designation"
                                    style={{ marginTop: "10px" }}
                                    onChange={e=>onChangeForm(e)}
                                />
                                <Button className={classes.updateBtn} onClick={e=>SubmitData(e)}>
                                    Update
                                </Button>




                            </form>
                            <Link to="/">
                            <Button className={classes.backButton}>
                                <i className='fa fa-arrow-left' style={{ paddingRight: "5px" }}></i>
                                Back to Home
                            </Button>
                            </Link>
                        </div>
                    </Paper>

                </Box>

            </Grid>
        </div>
    )
}

export default Edit