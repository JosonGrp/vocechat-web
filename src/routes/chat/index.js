// import React from 'react';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { MdAdd } from "react-icons/md";
import { AiOutlineCaretDown } from "react-icons/ai";

import StyledWrapper from "./styled";
import Search from "../../common/component/Search";
// import Contact from "../../common/component/Contact";
import CurrentUser from "../../common/component/CurrentUser";
import ChannelChat from "./ChannelChat";
import DMChat from "./DMChat";
import ChannelList from "./ChannelList";
import ContactsModal from "../../common/component/ContactsModal";
import ChannelModal from "../../common/component/ChannelModal";
import DMList from "./DMList";

export default function ChatPage() {
  const [channelDropFiles, setChannelDropFiles] = useState([]);
  const [userDropFiles, setUserDropFiles] = useState([]);
  const { sessionUids } = useSelector((store) => {
    return {
      sessionUids: store.userMessage.ids,
    };
  });
  const [channelModalVisible, setChannelModalVisible] = useState(false);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);
  const { channel_id, user_id } = useParams();
  const toggleContactsModalVisible = () => {
    setContactsModalVisible((prev) => !prev);
  };
  const toggleChannelModalVisible = () => {
    setChannelModalVisible((prev) => !prev);
  };
  const handleToggleExpand = (evt) => {
    const { currentTarget } = evt;
    const listEle = currentTarget.parentElement.parentElement;
    listEle.classList.toggle("collapse");
  };
  const tmpUid =
    sessionUids.findIndex((i) => i == user_id) > -1 ? null : user_id;
  console.log("temp uid", tmpUid);
  return (
    <>
      {channelModalVisible && (
        <ChannelModal closeModal={toggleChannelModalVisible} personal={true} />
      )}
      {contactsModalVisible && (
        <ContactsModal closeModal={toggleContactsModalVisible} />
      )}
      <StyledWrapper>
        <div className="left">
          <Search />
          <div className="list channels">
            <h3 className="title">
              <span className="txt" onClick={handleToggleExpand}>
                <AiOutlineCaretDown
                  className="icon"
                  size={18}
                  color="#78787C"
                />
                CHANNELS
              </span>
              <MdAdd
                onClick={toggleChannelModalVisible}
                size={18}
                color="#78787C"
              />
            </h3>
            <nav className="nav">
              <ChannelList setDropFiles={setChannelDropFiles} />
            </nav>
          </div>
          <div className="list dms">
            <h3 className="title">
              <span className="txt" onClick={handleToggleExpand}>
                <AiOutlineCaretDown
                  className="icon"
                  size={18}
                  color="#78787C"
                />
                DIRECT MESSAGE
              </span>
              <MdAdd
                size={18}
                color="#78787C"
                onClick={toggleContactsModalVisible}
              />
            </h3>
            <nav className="nav">
              <DMList
                uids={tmpUid ? [...sessionUids, tmpUid] : sessionUids}
                setDropFiles={setUserDropFiles}
              />
            </nav>
          </div>
          <CurrentUser />
        </div>
        <div className="right">
          {channel_id && (
            <ChannelChat cid={channel_id} dropFiles={channelDropFiles} />
          )}
          {user_id && <DMChat uid={user_id} dropFiles={userDropFiles} />}
        </div>
      </StyledWrapper>
    </>
  );
}
