import React,{useState, useEffect} from 'react'
import { Box, Typography, Grid, TextField, Button, Paper, Table, TableContainer, TableRow, TableBody, TableHead, TableCell } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { purple, blue } from '@material-ui/core/colors'
import { Link } from "react-router-dom"
import axios from "axios";
const useStyles = makeStyles((theme) => ({
      header: {
        backgroundColor: purple[700],
        color: "white",
        padding: "10px",
        fontSize: "2rem",
        textAlign: "center"

    },
    actionIcons: {
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        marginRight: "4px"
    },
    tableHead: {
        backgroundColor: blue[900],
        fontFamily: "'Satisfy', 'cursive'",
        
    },
    textColor:{
        color:"white",
        fontWeight:"bold",
        fontStyle:"normal",
        fontFamily: "'Satisfy', 'cursive'",
        fontSize:"15px",
    


    },
    tableBody:{
        fontFamily: "'Satisfy', 'cursive'",

    }
   


}))
const StudentList = () => {
    const [employees, setEmployess] = useState([]);
    useEffect(() => {
        fetchEmployeeList();

    },[])
    const classes = useStyles();

    const fetchEmployeeList = async () => {
  
            const emplData = await axios.get("http://localhost:4000/employees/")
            .then((response)=>response.data)
            .catch((err)=>console.log(err));
            setEmployess(emplData);

        
    }
    const handleDelete = async id => {
        await axios.delete(`http://localhost:4000/employees/${id}`);
        var newEmp = employees.filter((emp) => {
         // console.log(item);
         return emp.id !== id;
        })
        setEmployess(newEmp);
       }
    return (
        <div>
            <header className={classes.header}>
                <h3>Employee List
                </h3>


            </header>
            <Paper style={{padding:"10px"}}>
                <TableContainer>
                    <Table>
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell align="center"><p className={classes.textColor}>No</p></TableCell>
                                <TableCell align="center"><p className={classes.textColor}>Name</p></TableCell>
                                <TableCell align="center"><p className={classes.textColor}>Designation</p></TableCell>
                                <TableCell align="center"><p className={classes.textColor}>Actions</p></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {employees.map((emp,i)=>(
                                <TableRow key={i}>
                                <TableCell><p className={classes.tableBody}>{emp.id}</p></TableCell>
                                <TableCell scope="row" component="th" align="center"><p className={classes.tableBody}>{emp.employeeName}</p></TableCell>
                                <TableCell align="center"><p className={classes.tableBody}>{emp.designation}</p></TableCell>
                                <TableCell className='icons' align='center'>
                                    <Link to={`/view/${emp.id}`}>
                                        <button className={classes.actionIcons} id="eye">
                                            <i className='fa-solid fa-eye'></i>
                                        </button>
                                    </Link>
                                    <Link to={`/edit/${emp.id}`}>
                                        <button className={classes.actionIcons} id="pencil">
                                            <i className='fa-solid fa-pencil'></i>
                                        </button>
                                    </Link>

                                    <button className={classes.actionIcons} id="trash" onClick={()=>handleDelete(emp.id)}>
                                        <i className='fa-solid fa-trash'></i>
                                    </button>
                                </TableCell>

                            </TableRow> 
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

        </div>
    )
}

export default StudentList