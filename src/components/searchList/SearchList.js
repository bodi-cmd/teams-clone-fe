import React from "react";
import styles from "./SearchList.module.scss";
import GenericRow from "../genericRow/GenericRow";
import { useNavigate } from "react-router-dom";

const SearchList = ({ data = [], onClear = () => {} }) => {
  const navigate = useNavigate();
  const userRow = (userData) => (
    <div className={styles.row} key={`group-${userData.id}`}>
      <GenericRow
        showImage={true}
        image={userData.profilePicture}
        title={userData.name}
        subtitle={userData.email}
        onClick={() => {
          navigate("/chat");
          onClear();
        }}
      />
    </div>
  );

  const groupRow = (groupData) => (
    <div className={styles.row} key={`group-${groupData.id}`}>
      <GenericRow
        showImage={false}
        showInitialsAsImage={true}
        title={groupData.name}
        subtitle={""}
        onClick={() => {
          navigate(`/group/${groupData.id}`);
          onClear();
        }}
      />
    </div>
  );
  return (
    <div className={styles.container}>
      {data.map((row) => {
        if (row.type === "CONTACT") {
          return userRow(row);
        } else if (row.type === "GROUP") {
          return groupRow(row);
        }
        return null;
      })}
    </div>
  );
};

export default SearchList;
