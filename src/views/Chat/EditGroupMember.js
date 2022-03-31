import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, InputAdornment } from "@material-ui/core";
import { editGroup } from "./ChatAction";
import { useDispatch } from "react-redux";

const EditGroupMember = (prop) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(prop.editData.name);
  const [isimage, setImage] = useState(prop.editData.image);
  const [isupdateimage, setUpdateImage] = useState(null);

  const fileChangedHandler = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setUpdateImage(event.target.files[0]);
  };

  const onSubmit = (values) => {
    values.preventDefault();

    if (values !== null) {
      const formData = new FormData();
      formData.append("conversation_id", prop.editData.conversation_id);
      formData.append("name", name);
      if (isupdateimage !== null) {
        formData.append("logo", isupdateimage);
      }
      formData.append("module", "chat");
      dispatch(editGroup(formData, prop.editData.conversation_id));
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
            <TextField
              variant="outlined"
              id="name"
              name="name"
              label="Group name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {name == "" ? (
              <span className="text-danger">Please enter group name</span>
            ) : (
              ""
            )}
          </div>

          <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
            <TextField
              variant="outlined"
              id="logo"
              name="logo"
              label="logo"
              type="file"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              onChange={fileChangedHandler}
            />
          </div>

          <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <img
              style={{ margin: "0px 5px 8px -15px", borderRadius: "30px" }}
              src={isimage}
              height="50"
              width="50"
            />
          </div>

          <div className="row">
            <div className="col col-2 mt-3">
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditGroupMember;
