import { Box, Typography, Grid, TextField, Button, Paper, Table, TableRow, TableBody, TableHead, TableCell } from '@material-ui/core'
import { purple, blue } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/styles'
import StudentList from "./StudentList"
import React, { useState, useEffect } from 'react'
import axios from "axios"
const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: purple[700],
        color: "white",
        padding: "10px",
        fontSize: "2rem",
        textAlign: "center"

    },
    TextField: {
        width: "100%",
        marginTop: "13px"
    },
    addButton: {
        width: "80%",
        backgroundColor: purple[700],
        display: "block",
        margin: "10px auto",
        color: "white",
        fontFamily: "'Satisfy', 'cursive' !important ",

        '&:hover': {
            backgroundColor: purple[600],

        }
    },
    actionIcons: {
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        marginRight: "4px"
    },
    tableHead: {
        backgroundColor: blue[900],
        color: "white"
    },
    formPaper: {
        padding: "8px"
    }

}))

const Home = () => {
    const [employees, setEmployees] = useState(
        {

            "employeeName": "",
            "designation": "",
            "email": ""
        },
    )
    const [status, setStatus] = useState();
    const classes = useStyles();


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
            const data = await axios.post("http://localhost:4000/employees/", employees)
            setStatus(true);
            return data

        }
        catch (err) {
            console.log(err)
        }
        

    }
    if (status) {
        return <Home />
    }


    return (
        <div className='container'>
            <div className={classes.header}>
                <h3>Employee Mangement
                </h3>


            </div>
            <div className="main" >
                <Grid container spacing={3}>

                    <Grid item xs={12} md={6}>
                        <Paper className={classes.formPaper}>
                            <div className={classes.header}>
                                <h3>Add Employee
                                </h3>


                            </div>
                            <form noValidate  >
                                <TextField id="employeeName"
                                    label="Name"
                                    className={classes.TextField}
                                    name="employeeName"
                                    autoComplete='employeeName'
                                    required
                                    variant="outlined"
                                    onChange={e => onChangeForm(e)}
                                />
                                <TextField
                                    label="Email Address"
                                    autoComplete='email'
                                    required
                                    id="email"
                                    name="email"
                                    className={classes.TextField}
                                    variant="outlined"
                                    onChange={e => onChangeForm(e)}

                                />
                                <TextField
                                    label="Employee Designation"
                                    autoComplete='designation'
                                    required
                                    id="designation"
                                    className={classes.TextField}
                                    variant="outlined"
                                    name="designation"
                                    onChange={e => onChangeForm(e)}

                                />


                                <Button variant="contained"
                                    type="submit"
                                    onClick={e => SubmitData(e)}
                                    className={classes.addButton}>
                                    Add
                                </Button>
                            </form>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <StudentList />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Home