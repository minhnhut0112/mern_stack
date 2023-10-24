import * as React from "react";
import Grid from "@mui/material/Grid";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useState } from "react";
import "./style.scss";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Avatar, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as UserService from "../../service/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import { updateUser } from "../../redux/slices/userSlice";
import { getBase64 } from "../../utils";
import { isError } from "react-query";

export default function ProfilePage() {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const user = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // const [Password, setPassword] = useState("");
  // const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  const mutation = useMutationHook((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });

  const disPatch = useDispatch();
  const { isLoading, isSuccess } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      handleGetDetailsUser(user?.id, user?.access_token);
    }
  }, [mutation]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    disPatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };

  const handleOnChangeAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file);
    }
    setAvatar(file.preview);
  };

  const handleUpdate = async () => {
    mutation.mutate({
      id: user?.id,
      name,
      email,
      phone,
      avatar,
      access_token: user?.access_token,
    });
    if (mutation) {
      handleGetDetailsUser(user?.id, user?.access_token);
    }
  };

  return (
    <div>
      <h3
        style={{
          marginLeft: "80px",
          marginTop: "40px",
          marginBottom: "30px",
        }}
      >
        My Profile
      </h3>
      <Grid
        container
        spacing={2}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Grid item xs={5}>
          <Avatar
            src={avatar && avatar}
            alt="Remy Sharp"
            sx={{ width: 100, height: 100 }}
          />
          <Button
            style={{
              margin: "10px 0px",
              backgroundColor: "white",
              color: "black",
            }}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              onChange={handleOnChangeAvatar}
              type="file"
              max={1}
            />
          </Button>
          <h5 style={{ margin: "10px 0px" }}>Name</h5>
          <InputComponent
            value={name}
            handleOnChange={handleOnChangeName}
            type="text"
            variant="standard"
          />
          <h5 style={{ margin: "10px 0px" }}>Email</h5>
          <InputComponent
            value={email}
            handleOnChange={handleOnChangeEmail}
            type="email"
            variant="standard"
          />
          <h5 style={{ margin: "10px 0px" }}>Phone</h5>
          <InputComponent
            value={phone}
            handleOnChange={handleOnChangePhone}
            variant="standard"
            type="text"
          />
          <Button
            type="submit"
            onClick={handleUpdate}
            variant="outlined"
            sx={{
              width: { xs: "30%", md: "20%" },
              height: "40px",
              marginBottom: "20px",
            }}
          >
            {isLoading ? (
              <CircularProgress sx={{ marginLeft: "20px" }} size="25px" />
            ) : (
              <p>Update</p>
            )}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
