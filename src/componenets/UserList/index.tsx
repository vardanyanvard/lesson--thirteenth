import { useEffect, useState } from "react";
import styles from "./userList.module.scss";
import { IUser } from "../../helpers/Types";
import { deleteUserAsync, getUsersAsync } from "../../helpers/Api";
import { useNavigate } from "react-router-dom";

export const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();

  const editHandleClick = (id: number) => {
    navigate("/users/" + id);
  };
  const deleteHandleClick = (id: number) => {
    deleteUserAsync(id).then(() => {
      setUsers(users.filter((item) => item.id !== id));
    });
  };

  useEffect(() => {
    getUsersAsync().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div className={styles.userListWrapper}>
      {!!users.length && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.age}</td>
                <td>{user.salary}</td>
                <td>
                  <div className={styles.buttonsWrapper}>
                    <button onClick={() => editHandleClick(user.id)}>
                      Edit
                    </button>
                    <button onClick={() => deleteHandleClick(user.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
