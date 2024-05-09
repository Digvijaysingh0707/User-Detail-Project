import React, { createContext, useEffect, useState } from "react";
import Splitter from "./Splitter";
import { useResizable } from "react-resizable-layout";
import { cn } from "../utils/cn";
import UserListing from "./UserListing";
import UserDetailsForm from "./UserDetailsForm";
import { getUserList } from "../config/services/userDetails";
import { getCountDetails } from "../config/services/countDetails";

export const UserContext = createContext()

const ResizableComponent = () => {
  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    splitterProps: terminalDragBarProps
  } = useResizable({
    axis: "y",
    initial: 500,
    min: 50,
    reverse: true
  });
  const {
    isDragging: isFileDragging,
    position: fileW,
    splitterProps: fileDragBarProps
  } = useResizable({
    axis: "x",
    initial: 800,
    min: 50
  });
  const {
    isDragging: isPluginDragging,
    position: pluginW,
    splitterProps: pluginDragBarProps
  } = useResizable({
    axis: "x",
    initial: 200,
    min: 50,
    reverse: true
  });

  const [userDetails, setUserDetails] = useState({})
  const [userList, setUserList] = useState([])
  const [check, setCheck] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [pageNo, setPagination] = useState(0)
  const [lastPage, setLastPage] = useState(false)
  const [countDetails, setCountDetails] = useState({})
  const [showCountDetails, setShowCountDetails] = useState(false)
  const [itemPerPage] = useState(5)

  const fetchAllUser = async () => {
    try {
      setLastPage(false)
      let params = { pageNo: pageNo, count: itemPerPage }
      let res = await getUserList(params)
      let list = res?.data?.result
      if (list?.length < itemPerPage) setLastPage(true)
      setUserList(list)
    }
    catch (err) {
      console.error(err, '..error');
    }
  };

  const fetchCountDetails = async () => {
    try {
      let res = await getCountDetails()
      let data = res?.data?.[0]
      setCountDetails(data)
    }
    catch (err) {
      console.error(err, '..error');
    }
  };


  useEffect(() => {
    if (showCountDetails) {
      fetchCountDetails()
    }
    fetchAllUser()
  }, [check, pageNo, showCountDetails])


  return (
    <UserContext.Provider value={{ userDetails, setUserDetails, userList, fetchAllUser, check, setCheck, isUpdate, setIsUpdate, pageNo, setPagination, lastPage }}>
      <div
        className={
          "flex flex-column h-screen bg-dark font-mono color-white overflow-hidden"
        }
      >
        <div className={"flex grow"}>
          <div
            className={cn("shrink-0 contents", isFileDragging && "dragging")}
            style={{ width: fileW }}
          >
            {!isUpdate &&
              <UserDetailsForm type={"Add"} />
            }

          </div>
          <Splitter isDragging={isFileDragging} {...fileDragBarProps} />
          <div
            className={cn("shrink-0 contents", isFileDragging && "dragging")}
            style={{ width: fileW }}
          >
            {isUpdate &&
              <UserDetailsForm type={"Update"} />
            }

          </div>
        </div>
        <Splitter
          dir={"horizontal"}
          isDragging={isTerminalDragging}
          {...terminalDragBarProps}
        />
        <div
          className={cn(
            "shrink-0 bg-darker contents",
            isTerminalDragging && "dragging"
          )}
          style={{ height: terminalH }}
        >
          <div style={{ display: 'flex', justifyContent: "flex-end" }}>
            {!showCountDetails ?
              <div style={{ cursor: 'pointer', backgroundColor: "gray", padding: 10 }} onClick={() => setShowCountDetails(true)}>API Count Details</div>
              :
              (
                <div onClick={() => setShowCountDetails(false)} style={{ textAlign: 'right', cursor: "pointer", backgroundColor: "blue", padding: 30, width: 200 }}>
                  <p>Add Api Count: {countDetails?.addCount}</p>
                  <p>Update Api Count: {countDetails?.updateCount}</p>
                </div>
              )
            }
          </div>
          {userList?.length > 0 ?

            <UserListing />
            :
            "Loading...."
          }
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default ResizableComponent;
