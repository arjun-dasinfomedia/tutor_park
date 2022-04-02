import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCard,
  CFormInput,
  CCardImage,
  CBadge,
  CDropdownDivider,
} from "@coreui/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CustomAlertControl from "../AlertMessage";
import Conversation from "./conversation.js";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Swal from "sweetalert2";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import {
  messageList,
  messageHistroyList,
  messageRead,
  sendDirectChatRequest,
  createGroup,
  chatfriendData,
} from "./ChatAction";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

const Chat = () => {
  const dispatch = useDispatch();
  const [chatData, setChatData] = useState("");
  const [directchatvisible, setDirectChatVisible] = useState(false);
  const [directchatcreatevisible, setDirectChatCreateVisible] = useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [isLoading, setLoading] = useState(true);
  const [searchchatname, setSearchChatName] = useState("");
  const [groupname, setGroupName] = useState("");
  const [groupimage, setGroupImage] = useState("");
  const [chatID, setChatID] = useState("");
  const [show, setShow] = useState();

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const searchData =(e) => {
    setSearchChatName(e.target.value)
  }
  const chat = useSelector((state) => state.chat);
  const showchatID = (item) => {
    setChatID(item.conversation_id)
    if (screenSize.dynamicWidth < 700) {
      setShow("yes");
    } else {
      setShow("no");
    }
    setChatData(item);
    dispatch(
      messageHistroyList({
        conversation_id: item.conversation_id,
        module: "chat",
      })
    );
    dispatch(
      messageRead({ conversation_id: item.conversation_id, module: "chat" })
    );
  };

  const sendDirectChatAction = (email) => {
    if (chat.personalMessageListData !== null) {
      const arrayOfObject = chat.personalMessageListData;
      const checkUsername = (obj) => obj.email === email;
      {
        arrayOfObject.some(checkUsername) === false
          ? (dispatch(
              sendDirectChatRequest({
                to: email,
                body: "Hi, friend.",
                module: "chat",
              })
            ),
            setDirectChatVisible(false))
          : dispatch(
              alertActions.error(
                "You have already conversation with this user."
              )
            );
        toast.error("You have already conversation with this user.");
        setDirectChatVisible(false);
      }
    } else {
      dispatch(
        sendDirectChatRequest({
          to: email,
          body: "Hi, friend.",
          module: "chat",
        })
      ),
        setDirectChatVisible(false);
    }
  };

  // handle create new group chat action

  function createNewGroup(data, evt) {
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("name", groupname);
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            formData.append(`members[${i}]`, data[i].email);
          }
        }
        if (groupimage !== "") {
          formData.append("logo", groupimage);
        }
        formData.append("module", "chat");
        
        dispatch(createGroup(formData));
        setDirectChatCreateVisible(false);
        setDirectChatVisible(false);
      }
    });
  }

  const directchatcolumns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Email",
      field: "email",
    },
  ];

  const groupchatcolumns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Email",
      field: "email",
    },
  ];

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  useEffect(async () => {
    showLoader();
    await dispatch(messageList({ module: "chat" }));
    await dispatch(chatfriendData({ module: "chat" }));
    setLoading(false);
    hideLoader();
  }, []);

  const directChatDynamic =
    chat.personalMessageListData &&
    chat.personalMessageListData
      .filter((item) => {
        if (searchchatname === "") {
          return item;
        } else if (item.name !== null) {
          if (item.name.toLowerCase().includes(searchchatname.toLowerCase())) {
            return item;
          }
        }
      })
      .map(function (item, key) {
        return (
          <>
            <div className="message-user-profile directchat" key={key}>
              {chatID === item.conversation_id ?
                (
                  <div
                    className="row p-2"
                    onClick={() => showchatID(item)}
                    style={{ cursor: "pointer", background: '#5A55CB' }}
                  >
                    <div className="col col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                      <CCardImage
                        src={item.image}
                        className="rounded-circle messageuser-image"
                      />
                    </div>
                    <div className="col col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                      <div className="font-weight-bold message-chat-name-font-size text-white">
                        {item.name}
                      </div>
                      <text className="message-font-size text-white">{item.last_message}</text>
                    </div>
                    <div className="col col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
                      <div className="message-font-size text-white">
                        {item.last_message_at}
                      </div>
                      {item.unread_messages !== 0 ? (
                        <>
                          <CBadge className="bage-color rounded-circle">
                            {item.unread_messages}
                          </CBadge>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    {/* <CDropdownDivider /> */}
                    <div className="border-10" />
                  </div>
                ) : (
                  <div
                    className="row p-2"
                    onClick={() => showchatID(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="col col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                      <CCardImage
                        src={item.image}
                        className="rounded-circle messageuser-image"
                      />
                    </div>
                    <div className="col col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                      <div className="font-weight-bold message-chat-name-font-size">
                        {item.name}
                      </div>
                      <text className="message-font-size">{item.last_message}</text>
                    </div>
                    <div className="col col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
                      <div className="message-font-size">
                        {item.last_message_at}
                      </div>
                      {item.unread_messages !== 0 ? (
                        <>
                          <CBadge className="bage-color rounded-circle">
                            {item.unread_messages}
                          </CBadge>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    {/* <CDropdownDivider /> */}
                  </div>
                )}

            </div>
          </>
        );
      });

  const groupChatDynamic =
    chat.groupMessageListData &&
    chat.groupMessageListData
      .filter((item) => {
        if (searchchatname === "") {
          return item;
        } else if (item.name !== null) {
          if (item.name.toLowerCase().includes(searchchatname.toLowerCase())) {
            return item;
          }
        }
      })
      .map(function (item, key) {
        return (
          <>
            <div className="message-user-profile group-chat" key={key}>
              {chatID === item.conversation_id ? (
                <div
                  className="d-flex p-2"
                  onClick={() => showchatID(item)}
                  style={{ cursor: "pointer", background: '#5A55CB' }}
                >
                  <div className="d-inline col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    <CCardImage
                      src={item.image}
                      className="rounded-circle messageuser-image"
                    />
                  </div>
                  <div className="d-inline col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7 ml-1">
                    <div className="font-weight-bold message-chat-name-font-size text-white">
                      {item.name}
                    </div>
                    <span className="message-font-size text-white">{item.last_message}</span>
                  </div>
                  <div className="d-inline col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 justify-content-center">
                    <div className="message-font-size text-white">
                      {item.last_message_at}
                    </div>
                    {item.unread_messages !== 0 ? (
                      <>
                        <CBadge className="bage-color rounded-circle">
                          {item.unread_messages}
                        </CBadge>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className="d-flex p-2"
                  onClick={() => showchatID(item)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-inline col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    <CCardImage
                      src={item.image}
                      className="rounded-circle messageuser-image"
                    />
                  </div>
                  <div className="d-inline col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7 ml-1">
                    <div className="font-weight-bold message-chat-name-font-size">
                      {item.name}
                    </div>
                    <span className="message-font-size">{item.last_message}</span>
                  </div>
                  <div className="d-inline col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 justify-content-center">
                    <div className="message-font-size">
                      {item.last_message_at}
                    </div>
                    {item.unread_messages !== 0 ? (
                      <>
                        <CBadge className="bage-color rounded-circle">
                          {item.unread_messages}
                        </CBadge>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        );
      });

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fileChangedHandler = (event) => {
    setGroupImage(event.target.files[0]);
  };

  return (
    <>
      {isLoading ? (
        <>{loader}</>
      ) : (
        <div style={{ marginTop: "15px" }}>
          <CustomAlertControl />
          <div className="d-flex mt-3 mb-3">
            {/* Small Card */}
            <div
              className={
                show === "yes"
                  ? "message-display-css col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12"
                  : "col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12"
              }
            >
              <CCard className="friendcard">
                <div className="d-flex justify-content-around p-3">
                  <div className="d-flex position-relative col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                    <CFormInput
                      className="d-inline rounded-pill search-chat-input"
                      placeholder="Search"
                      onChange={(event) =>
                        searchData(event)
                      }
                    />
                    <div className="search-button-chat rounded-pill position-absolute">
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                  </div>
                  <div
                    className="ml-1 d-flex align-items-center justify-content-center position-relative col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"
                    style={{
                      color: "#5A55CB",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    
                    <AddCircleOutlinedIcon
                      fontSize="large"
                      onClick={() => setDirectChatVisible(!directchatvisible)}
                    />
                  </div>
                </div>

                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        backgroundColor: "#D7DFEF",
                      }}
                    >
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        TabIndicatorProps={{
                          style: {
                            background: "#5A55CB",
                            height: "3px",
                            color: "#5A55CB",
                          },
                        }}
                      >
                        <Tab
                          label="Direct Chat"
                          value="1"
                          className={
                            value === 1
                              ? "message-chat-active"
                              : "message-chat-in-active"
                          }
                          style={{ width: "50%", fontWeight: "600" }}
                        />
                        <Tab
                          label="Group Chat"
                          value="2"
                          className={
                            value === 2
                              ? "message-chat-active"
                              : "message-chat-in-active"
                          }
                          style={{ width: "50%", fontWeight: "600" }}
                        />
                      </TabList>
                    </Box>
                    <TabPanel
                      value="1"
                      className="chatlist-scrollbar-css"
                      style={{
                        padding: 0,
                        height: screenSize.dynamicHeight - 280,
                        overflowX: "hidden",
                        overflowY: "scroll",
                      }}
                    >
                      {directChatDynamic !== null ? (
                        directChatDynamic
                      ) : (
                        <>
                          <p className="mt-5 text-center">
                            Not have any personal conversation yet.
                          </p>
                        </>
                      )}
                    </TabPanel>
                    <TabPanel
                      value="2"
                      className="chatlist-scrollbar-css"
                      style={{
                        padding: 0,
                        height: screenSize.dynamicHeight - 280,
                        overflowX: "hidden",
                        overflowY: "scroll",
                      }}
                    >
                      {groupChatDynamic !== null ? (
                        groupChatDynamic
                      ) : (
                        <>
                          <p className="mt-5 text-center">
                            Not have any group conversation yet.
                          </p>
                        </>
                      )}
                    </TabPanel>
                  </TabContext>
                </Box>
              </CCard>
            </div>
            <div
              className={
                show === "yes"
                  ? "message-responsive-display-css col col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12"
                  : "conversation-mobile-view-css col col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12"
              }
            >
              <Conversation
                Data={chatData}
                HistroyData={chat.histroyListData}
                Responsive={show}
              />
            </div>
          </div>
        </div>
      )}

      {/* Direct send friend list for Message */}

      {value === 1 ? (
        <CModal
          size="lg"
          visible={directchatvisible}
          onDismiss={() => setDirectChatVisible(false)}
        >
          <CModalHeader
            onDismiss={() => setDirectChatVisible(false)}
            className="tutorviewmodalheader"
          >
            <CModalTitle>Direct Chat</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <MaterialTable
              title=""
              columns={directchatcolumns}
              data={chat.directchatfriendData}
              actions={[
                {
                  icon: "chat",
                  tooltip: "Start conversation",
                  onClick: (event, rowData) =>
                    sendDirectChatAction(rowData.email),
                },
              ]}
              options={{
                actionsColumnIndex: -1,
                filtering: true,
                selection: false,
                showTextRowsSelected: false,
              }}
            />
          </CModalBody>
        </CModal>
      ) : (
        <CModal
          size="md"
          visible={directchatvisible}
          onDismiss={() => setDirectChatVisible(false)}
        >
          <CModalHeader
            onDismiss={() => setDirectChatVisible(false)}
            className="tutorviewmodalheader"
          >
            <CModalTitle>Group Chat</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="row">
              <div className="col col-6">
                <TextField
                  className="mb-3"
                  variant="outlined"
                  id="name"
                  name="name"
                  label="Group Name"
                  placeholder="Enter Group name"
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div className="col col-6">
                <TextField
                  id="logo"
                  name="logo"
                  variant="outlined"
                  type="file"
                  inputProps={{
                    accept: "image/*",
                  }}
                  onChange={fileChangedHandler}
                />
              </div>
            </div>

            {groupname !== "" ? (
              <div>
                <Button
                  onClick={() => setDirectChatCreateVisible(true)}
                  variant="contained"
                  className="mt-4 mb-2"
                  style={{ backgroundColor: "#3f51b5", color: "#fff" }}
                >
                  next
                </Button>
              </div>
            ) : (
              <>
                <span className="text-danger">
                  Note :- Please enter group name
                </span>
                <div>
                  <Button
                    // disabled
                    variant="contained"
                    className="mt-4 mb-2"
                    style={{
                      backgroundColor: "#3f51b5",
                      color: "#fff",
                      cursor: "not-allowed",
                    }}
                  >
                    next
                  </Button>
                </div>
              </>
            )}
          </CModalBody>
        </CModal>
      )}

      <CModal
        size="lg"
        visible={directchatcreatevisible}
        onDismiss={() => setDirectChatCreateVisible(false)}
      >
        <CModalHeader
          onDismiss={() => setDirectChatCreateVisible(false)}
          className="tutorviewmodalheader"
        >
          <CModalTitle>Group Chat</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <MaterialTable
            title={groupname}
            data={chat.groupchatfriendData}
            columns={groupchatcolumns}
            options={{
              search: true,
              selection: true,
              filtering: true,
              searchFieldAlignment: "right",
              headerStyle: {
                backgroundColor: "#DEDDF4",
                color: "#444346",
                fontWeight: "600",
                fontSize: "15px",
              },
            }}
            actions={[
              {
                tooltip: "Create New Group",
                icon: "forum",
                onClick: (evt, data) => createNewGroup(data, evt),
              },
            ]}
          />
        </CModalBody>
      </CModal>
    </>
  );
};
export default Chat;
