import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch,useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { storeUsers,deleteUsers } from '../../store/Slices/userSlice';
import { useNavigate } from 'react-router-dom';

 const Home = () => {

    const columns = [
      { id: 'title', label: 'title', minWidth: 230 },
      {id: 'body',  label: 'body',minWidth: 300,align: 'left'},
      { id: 'userId', label: 'userId', minWidth: 100 },
      { id:'View',label:'View',minwidth:100},
      { id:'Edit',label:'Edit',minwidth:100},
      { id:'Delete',label:'Delete',minwidth:100}

   ];

    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10); 
    const [open, setOpen] = React.useState(false);
    const [delteId,setDelteId] = React.useState([]);


    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const [data,updateData] = useState([]);
    const dispatch = useDispatch();
    let providedata = useSelector((statedata)=>{
      return statedata.users.usersData
    })
    console.log(providedata,"provided data");
 
    useEffect(() => {
      const apiFuncz = async ()=>{ 
        try{
          let data = await axios.get('https://jsonplaceholder.typicode.com/posts')
          data.data.forEach(element => {
            element.Edit = 'EditIcon' ;
            element.View = 'VisibilityIcon';
            element.Delete = 'DeleteIcon' ;
          });
          dispatch(storeUsers(data.data));
          updateData(data.data);
        }catch(error){
          console.log(error,"error");
        }
      }
     apiFuncz();
    }, [])

    const onDeleteFunc=(row)=>{
        setOpen(true);
        setDelteId([row.id])
    }
    const deleteAction = async ()=>{
        let resp = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${delteId}`);
        dispatch(deleteUsers(delteId[0]))
        setDelteId([])
        console.log("resp",resp)
        handleClose();
    }
  
    const handleClose = () => {
      setOpen(false);
    };
    const editFunc = (id)=>{
      navigate(`/Home/Edit/${id}`)

    }
    const viewFunc = ( id)=>{
      console.log(id,"id view");
      navigate(`/Home/view/${id}`);
    }
  
  return (
    <div>
      <h1>Posts List</h1>
      <Link to={`/Home/Add`}>
      <Button className=''>Add Post</Button>
       </Link>
      <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure , do you want to delete ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={deleteAction} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
     <Paper sx={{ width: '100%',height:'80%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 680 }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Detials
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Actions
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {providedata
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const deletefunc=()=>{
                    onDeleteFunc(row)
                }
                const editFuncTemp=()=>{
                  editFunc(row.id)
              }
                const viewFuncTemp=()=>{
                  viewFunc(row.id)
               }

                return (
                  <TableRow hover role="checkbox" tabIndex={-1}  key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                        // let func = deletefunc
                        // func = column.id== "Edit"? editFunc: viewFunc;
                        let valOrCompo = column.id=="Delete"?<DeleteIcon />:column.id== "Edit"?<EditIcon />:column.id=="View"?<VisibilityIcon />:value
                        if( column.id== "Delete" ||  column.id== "Edit" || column.id== "View"){
                            if(column.id== "Delete"){
                            return (
                              <TableCell key={column.id} align={column.align} onClick={deletefunc}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : valOrCompo}         
                              </TableCell>
                            );}
                            else if(column.id== "Edit"){
                              return (
                                <TableCell key={column.id} align={column.align} onClick={editFuncTemp}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : valOrCompo}         
                                </TableCell>
                              );
                            }
                            else if(column.id== "View"){
                              return (
                                <TableCell key={column.id} align={column.align} onClick={viewFuncTemp}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : valOrCompo}         
                                </TableCell>
                              );
                            }




                        }else{
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : valOrCompo}         
                            </TableCell>
                          );
                        }
                      
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  )
}


export default Home