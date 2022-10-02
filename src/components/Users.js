import React, { useEffect, useState } from "react";
import { RequireAuth, useAuth } from "../contexts/Auth";
import CommonTable from "./common/Table";

export default function Users() {
  let auth = useAuth();
  let [usersList, setUsersList] = useState([]);

  let loadUsers = async () => {
    let result = await auth.listUsers({ max_results: 100 });
    window.result = result;
    setUsersList(result);
  };

  useEffect(() => {
    if (usersList.length === 0) {
      loadUsers();
    }
  });

  let getRows = () => {
    let rows = [];
    for (let user of usersList) {
      let row = {};
      row["id"] = user["uid"];
      row["fields"] = [
        user["uid"],
        user["email"],
        user["is_active"] === true ? "Active" : "Blocked",
        user["is_admin"] === true ? "Admin" : "User"
      ];
      rows.push(row);
    }
    return rows;
  };

  return (
    <RequireAuth>
      <CommonTable
        title="Users"
        headers={["User ID", "Email Address", "Status", "Type"]}
        rows={getRows()}
      />
    </RequireAuth>
  );
}
