import react, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { addMember } from "./MessageAction";

const AddGroupMember = (props) => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);

  var array = message.addmessagegroupmemberData;

  var anotherOne = props.GroupData.Data.members;

  var filteredArray = array.filter(function (array_el) {
    return (
      anotherOne.filter(function (anotherOne_el) {
        return anotherOne_el.email == array_el.email;
      }).length == 0
    );
  });

  const addMemberAction = (data) => {
    const emails = [];
    data.map(function (item) {
      emails.push(item.email);
    });
    dispatch(
      addMember({
        conversation_id: props.GroupData.Data.conversation_id,
        members: emails,
        module: "message",
      })
    );
  };

  const columns = [
    {
      title: "Name",
      field: "name",
      checked: true,
    },
    {
      title: "Email",
      field: "email",
    },
  ];

  return (
    <div>
      <MaterialTable
        title={props.GroupData.Data.name}
        data={filteredArray}
        columns={columns}
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
            tooltip: "Add Members",
            icon: "forum",
            onClick: (evt, data) => addMemberAction(data, evt),
          },
        ]}
      />
    </div>
  );
};
export default AddGroupMember;
