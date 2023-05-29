import React, { useEffect ,useState  } from 'react';
import {useLocation} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { insertViewData } from '../../store/Slices/userSlice';
import axios from 'axios';

 const View = () => {

    let ViewUserData = useSelector((state)=>{
        return state.users.viewUserDetails
    })
    const dispatch = useDispatch();
    const location = useLocation();
    const [data,setData] = useState([]) ;
    const {pathname} = location ;

    useEffect( () => {

    const func = async ()=>{
        let id = Number(pathname.split("/")[3])
        let userDatas = await  axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        dispatch(insertViewData(userDatas.data))
        setData(ViewUserData)
    }
    func()
        
    }, [])

    const Compo = () =>{
        if(data.length===0){
            return <p>please wait</p>
        }else{
            return   <div>
                        <h1> {data.title} </h1>
                        <p> {data.body} </p>
                        <p>{data.userId}</p>
                    </div>
        }
    }
   
   
    return (
        <div>
            {<Compo />}
        </div>
    )
}


export default View