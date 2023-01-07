import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./TopNavbar.module.scss";

import { CONFIG } from "../../config/app.config";
import RequestHelper from "../../components/requestHelper/RequestHelper";
import ErrorHandler from "../../components/errorHandler/ErrorHandler";
import DeauthHandler from "../../components/deauthHandler/DeauthHandler";
import TokenProvider from "../../components/tokenProvider/TokenProvider";
import SearchList from "../searchList/SearchList";

const TopNavbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [groups, setGroups] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const HTTP = RequestHelper(CONFIG.SERVER_ADRESS);
  const token = TokenProvider();
  const deauthHandler = DeauthHandler();

  useEffect(() => {
    if (searchValue === "") {
      fetchContacts();
      fetchGroups();
    } else {
      setFilteredData([
        ...searchInArray(contacts, searchValue),
        ...searchInArray(groups, searchValue),
      ]);
    }
  }, [searchValue]);

  useEffect(() => {
  }, [filteredData]);

  const fetchContacts = () => {
    HTTP.GET("/chat/contacts", { token }, (data, error) => {
      if (error) {
        ErrorHandler(error, () => {}, deauthHandler);
        return;
      } else {
        setContacts(
          data.data.map((contact) => {
            return { ...contact, type: "CONTACT" };
          })
        );
      }
    });
  };

  const fetchGroups = () => {
    HTTP.GET("/user/groups", { token }, (data, error) => {
      if (error) {
        ErrorHandler(error, () => {}, deauthHandler);
        return;
      } else {
        setGroups(data.data.map((group) => {
            return { ...group, type: "GROUP" };
          })
        );
      }
    });
  };

  const searchInArray = (array, keyword) => {
    return array.filter((element) => {
      const elementWithoutProfilePicture = { ...element, profilePicture: null };
      return JSON.stringify(elementWithoutProfilePicture)
        .toLowerCase()
        .includes(keyword.toLowerCase());
    });
  };

  const handleSearchFieldChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={styles.navbar}>
      <input
        value={searchValue}
        onChange={handleSearchFieldChange}
        type="text"
        placeholder="Search..."
      />
      {searchValue && <SearchList data={filteredData} onClear={() => setSearchValue("")} />}
    </div>
  );
};

export default TopNavbar;
