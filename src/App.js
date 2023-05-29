import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import About from './Components/About/About';
import Login from "./Components/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import AddEditScreen from "./Components/AddEditScreen/AddEditsScreen";
import View from './Components/View/View';

const drawerWidth = 240;
const App =()=> {
    let logState = localStorage.getItem("loginState");
    console.log(logState, "status of login");
    let getLogstate = useSelector((state)=>{
      return state.log
    })


    const AfterLogin = () =>{
    return  <div>
          <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
              >
                <Header />
          </AppBar>
          <Box sx={{ display: "flex",height:'60%' }}>
            <CssBaseline />
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
            >
              <Toolbar />
              <Box sx={{ overflow: "auto" }}>
                <List>
                  {[{name:"Home",icon:<HomeIcon />},{ name:"About",icon:<InfoIcon />}].map(
                    (each) => (
                      <ListItem key={each.name} disablePadding>
                          <Link to={`/${each.name}`} style={{width: '100%'}}>
                          <ListItemButton>
                            <ListItemIcon>
                              {each.icon}
                            </ListItemIcon>
                            <ListItemText primary={each.name} />
                          </ListItemButton>
                          </Link>
                        </ListItem>
                    )
                  )}
                </List>
                <Divider />
               
              </Box>
            </Drawer>
        
            <Box
              component="main"
              sx={{ width: 300,marginTop:8,height:'50%' ,flexGrow: 1, p: 3 }}
            >
              <div className="matop" >
                <Routes>
              
                  <Route
                      path="/"
                      element={getLogstate  ? <Home /> :<Login />}
                  />

                  <Route
                      path="/Login"
                      element={
                        getLogstate ?  <Navigate to="/" />:<Login /> 
                      }
                  />
                
                  <Route
                    path="/Home"
                    element={<ProtectedRoute element =  {Home }/>}
                  />
                  <Route
                    path="/About"
                    element={<ProtectedRoute element =  {About}/>}

                  />
                  <Route
                    path="/Home/Add"
                    element={<ProtectedRoute element =  {AddEditScreen}/>
                  }
                  />
                  <Route
                    path="/Home/Edit/:id"
                    element={<ProtectedRoute element =  {AddEditScreen}/>}
                  />
                  <Route
                    path="/Home/view/:id"
                    element={<ProtectedRoute element =  {View}/>
                  }
                  />
                </Routes>
              
              </div>
              
              
              
              
            </Box>
          </Box>
     </div>
    }
    const BeforeLogin = () => {
         return <div className="matop" >
        <Routes>
      
            <Route
                path="/"
                element={getLogstate  ? <Home /> :<Login />}
            />

            <Route
                path="/Login"
                element={
                  getLogstate ?  <Navigate to="/" />:<Login /> 
                }
            />

          </Routes>
        </div>
    }
    console.log(">>>>>getLogstate",getLogstate)
    return (
      <div className="App">
        <Router>
          {
            getLogstate?<AfterLogin />:<BeforeLogin />
          }
        </Router>
      </div>
    );
  
}

export default App;
