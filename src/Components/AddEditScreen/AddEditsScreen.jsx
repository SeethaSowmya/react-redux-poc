import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import {
  storeUsers,
  updateUsers,
  deleteUsers,
} from "../../store/Slices/userSlice";

const AddEditScreen = () => {
  let data = useSelector((statedata) => {
    return statedata.users.usersData;
  });
  console.log(data, "provided data");
  const location = useLocation();
  //   const queryParams = new URLSearchParams(location);
  //   let param1 = queryParams.get("param1");
  //   let param2 = queryParams.get("param2");
  const { pathname } = location;

  let param1 = pathname.split("/")[2];

  const ids = data.map((each) => each.userId);
  const uniqueIds = new Set(ids);
  const uniqueValues = Array.from(uniqueIds);
  const [dataObj, setDataObj] = useState([
    { id: "title", value: "", errText: false },
    { id: "body", value: "", errText: false },
    { id: "userId", value: 0, errText: false },
  ]);

  const test =  async () => {
    try {
      let initialObj = [];
      if (param1 == "Add") {
      } else {
        let param2 = Number(pathname.split("/")[3]);

        let datausedata = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${param2}`
        );

        console.log(datausedata,"userData")

        initialObj = [
          { id: "title", value: datausedata.data.title, errText: false },
          { id: "body", value: datausedata.data.body, errText: false },
          { id: "userId", value: datausedata.data.userId, errText: false },
        ];
        setDataObj(initialObj);
      }
      console.log(dataObj)
    } catch (error) {
      console.log(error, "add edit funczs");
    }
  };

  useEffect(() => {
    test();
  }, []);

  const navigate = useNavigate();
  const onChangeItem = (event, id) => {
    let val =
      typeof event.target.value == "number"
        ? event.target.value
        : event.target.value.trim();
    let ob = [...dataObj];
    let key = id == "body" ? 1 : id == "title" ? 0 : 2;

    ob[key].value = event.target.value;
    ob[key].errorText = val.length === 0 ? true : false;
    setDataObj(ob);
  };

  const Submitfunc = async (e) => {
    e.preventDefault();
    console.log("in submit");
    let payload = {
      title: dataObj[0].value,
      body: dataObj[1].value,
      userId: dataObj[2].value,
    };
    console.log("pp", payload);
    if(param1=="Add"){

      let resp = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        payload
      );
      console.log(resp,"add in adedit")
    }else{
      let param2 = Number(pathname.split("/")[3]);

      let respUpdated = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${param2}`,
        payload
      );
      console.log(respUpdated,"resp")
    }
    navigate("/Home");
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        autoComplete="off"
        onSubmit={Submitfunc}
      >
        <div>
          <TextField
            required
            variant="outlined"
            margin="normal"
            id={dataObj[0].id}
            value={dataObj[0].value}
            error={dataObj[0].errText}
            label={dataObj[0].id}
            type="text"
            name={dataObj[0].id}
            autoFocus
            helperText={dataObj[0].errorText ? "title is required" : ""}
            onChange={(event) => {
              onChangeItem(event, dataObj[0].id);
            }}
            defaultValue="Hello World"
          />
          <br />
          <TextField
            required
            variant="outlined"
            margin="normal"
            id={dataObj[1].id}
            value={dataObj[1].value}
            error={dataObj[1].errText}
            label={dataObj[1].id}
            type="text"
            // maxRows={4}
            width={100}
            name={dataObj[1].id}
            autoFocus
            helperText={dataObj[1].errorText ? "body is required" : ""}
            onChange={(event) => {
              onChangeItem(event, dataObj[1].id);
            }}
            // defaultValue="Hello World"
          />
          <br />

          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            // defaultValue=0
            // helperText="Please select your currency"
            value={dataObj[2].value}
            onChange={(event) => {
              onChangeItem(event, dataObj[2].id);
            }}
          >
            {uniqueValues.map((id) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))}
          </TextField>
          {/* <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
        /> */}
        </div>
        <button type="submit" onClick={Submitfunc}>
          submit
        </button>
      </Box>
    </div>
  );
};
export default AddEditScreen;
