import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeStatus, removeUser } from "../../Store/UserReducer";
import { useState } from "react";

export const Home = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [userStatus, setUserStatus] = useState(false);

  const handlerDelete = (id) => {
    dispatch(
      removeUser({
        id,
      })
    );
  };

  const handlerStatus = (id) => {
    dispatch(
      changeStatus({
        id,
        userStatus: setUserStatus(!userStatus),
      })
    );
  };

  return (
    <div className="container">
      <Link to="/create" className="btn btn-success my-3">
        Create
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.text}</td>
                <td>{user.status ? "Done" : "Not done"}</td>
                {/* Use user.status for each user */}
                <td>
                  <Link
                    to={`/edit/${user.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handlerDelete(user.id)}
                    className="btn btn-sm btn-danger ms-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handlerStatus(user.id)}
                    className="btn btn-sm btn-success ms-2"
                  >
                    Status
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
