import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import AccordionListData from "./AccordionListData";
import CustomAlertControl from "../AlertMessage";

import { getAllAccessRights, getModules } from "./AccessRightsAction";

const AccessRightsList = () => {
  const dispatch = useDispatch();

  /* State */
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const accessRightsState = useSelector((state) => state.accessRights);

  /* Data List */
  useEffect(async () => {
    showLoader();
    await dispatch(getAllAccessRights());
    await dispatch(getModules());
    setLoading(false);
    hideLoader();
  }, []);

  /*Data loop */
  const accessRightsDynamic = accessRightsState.accessrightData.map(function (
    item,
    key
  ) {
    return (
      <>
        {item.name != "admin" ? (
          <AccordionListData data={item} key={key} />
        ) : (
          ""
        )}
      </>
    );
  });
  return (
    <>
      {isLoading ? (
        <>{loader}</>
      ) : (
        <div>
          <CustomAlertControl />
          <>{accessRightsDynamic}</>
        </div>
      )}
    </>
  );
};
export default AccessRightsList;
