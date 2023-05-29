import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom'
import {  useDispatch,useSelector  } from "react-redux";
import {logStateUpdate} from '../../store/Slices/logCheckSlice'

export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let credentials = [
    {
      username: "sowmya",
      password: "12345",
    },
    {
      username: "priya",
      password: "12345",
    },
  ];
  const [ username, setUsername ] = useState({ name: "", errorText: false });
  const [ password, setPassword ] = useState({ name: "", errorText: false });
  const [overAllErrorText,setOverAllErrorText] = useState({text:'Please enter valid credentials',errorText:false});

  const Submit = (event) => {
    event.preventDefault();
    console.log(event);
    credentials.forEach((each)=>{
        console.log(each.username,username.name , each.password , password.name)
        if(each.username===username.name && each.password === password.name){
            localStorage.setItem("loginState",true);
            dispatch(logStateUpdate(true));
            setOverAllErrorText({...overAllErrorText,errorText:false});
            navigate('/Home');
        }else{
            setOverAllErrorText({...overAllErrorText,errorText:true});
        }
    })
  };

  const onChangeUsername = (event) => {
    let name = event.target.value.trim();
    username.errorText = name.length===0 ? true:false;
    setUsername({...username,name:event.target.value});
  };

  const onChangePassword = (event) => {
    let name = event.target.value.trim();
    password.errorText = name.length===0 ? true:false;
    setPassword({...password,name:event.target.value});
  };

  return (
    <div className="row-center">
      <div className="center">
        <div className="card">
          <div className="card-body">
            <Card sx={{ minWidth: 140 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 30 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Login
                </Typography>

                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                    // noValidate
                    autoComplete="off"
                    onSubmit={Submit}
                  >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        type="text"
                        fullWidth
                        id="Username"
                        label="Username"
                        name="Username"
                        autoFocus
                        value={username.name}
                        error={username.errorText}
                        helperText={username.text ? "User name is required" : ""}
                        onChange={onChangeUsername}
                    />

                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      type="password"
                      fullWidth
                      id="Password"
                      label="Password"
                      name="Password"
                      autoFocus
                      value={password.name}
                      error={password.errorText}
                      helperText={password.errorText ? "Password is required" : ""}
                      onChange={onChangePassword}
                    />
                  </Box>
                  {overAllErrorText.errorText && <p className="overAllError">{overAllErrorText.text}</p>}
              </CardContent>
              <CardActions>
                <button
                  type="submit"
                  className="btn btn-primary sub"
                  onClick={Submit}
                >
                  Submit
                </button>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


