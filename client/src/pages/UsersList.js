import React, {useContext, useState, useCallback, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {useHTTP} from '../hooks/http.hook';
import {AuthContext} from '../context/auth.context';
import {useNavigate} from 'react-router-dom';

function UsersList() {

  const [users, setUsers] = useState([]);
  const {request} = useHTTP();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async() => {
    try {
      const fetched = await request('/api/table/loadtable', 'GET');
      setUsers(fetched);
    } catch (e) {console.log(e.message)}
  }, [request]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  let selectedUsers = [];
  function deleteSelect(row, size) {
    for (let i = size - 1; i >= 0; i--) {
      if (selectedUsers[i] === row) selectedUsers.splice(i, 1);
    }
  }

  const unblockHandler = async () => {
    try {
        const data = await request('/api/status/unblockuser', 'POST', {selectedUsers, auth});
        if (data.message === 'no access') {
          auth.logout();
          navigate('/auth');
        }
        document.location.reload();
        data.message();
    } catch (e) { }
  }

  const blockHandler = async () => {
    try {
        const data = await request('/api/status/blockuser', 'POST', {selectedUsers, auth});
        if (data.message === 'no access') {
          auth.logout();
          navigate('/auth');
        }
        selfBlockOrDeleteChecker();
        document.location.reload();
        data.message();
    } catch (e) { }
  }

  const deleteHandler = async () => {
    try {
        const data = await request('/api/status/deleteuser', 'POST', {selectedUsers, auth});
        if (data.message === 'no access') {
          auth.logout();
          navigate('/auth');
        }
        selfBlockOrDeleteChecker();
        document.location.reload();
        data.message();
    } catch (e) { }
  }

  function selfBlockOrDeleteChecker()  {
    for (let i = 0; i < selectedUsers.length; i++) {
      if (selectedUsers[i]._id === auth.userID) {
        auth.logout();
        navigate('/auth');
      }
    }
  }

  const columns = [{
    dataField: 'id',
    text: 'ID',
    isDummyField: true,
    headerAlign: (column, colIndex) => 'center',
    align: 'center',
    formatter: (cell, row, rowIndex) => (
      <div>
        <span> { rowIndex + 1 } </span>
      </div>
    )}, {
    dataField: 'name',
    text: 'Name'
    }, {
    dataField: 'email',
    text: 'E-Mail'
    }, {
    dataField: 'registrationDate',
    text: "Date of registration",
    }, {
    dataField: 'lastLoginDate',
    text: "Last session"
    },{
    dataField: 'userStatus',
    text: 'Status',
    align: 'center',
    formatter: (value) => (
      <div>
        <span> { value ? 'ACTIVE' : 'BLOCKED' } </span>
      </div>
    )}
  ];

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    style: { backgroundColor: '#d6d6d6'},
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) selectedUsers.push(row);
      if (!isSelect) deleteSelect(row, selectedUsers.length);
    },
    onSelectAll: (isSelect, rows, e) => {
      if (isSelect) selectedUsers = rows.slice();
      if (!isSelect) selectedUsers.splice(0, selectedUsers.length);
    }
  };

  return (
    <div>
      <div className='buttons'>
        <ButtonGroup aria-label="Basic example">
            <Button variant="outline-success" onClick={unblockHandler}>Unblock</Button>
            <Button variant="outline-warning" onClick={blockHandler}>Block</Button>
            <Button variant="outline-danger" onClick={deleteHandler}>Delete</Button>
        </ButtonGroup>
      </div>
      <div className='table'>
        <BootstrapTable bg="dark"
            keyField='email'
            data={users}
            columns={columns}
            selectRow={selectRow}
        />
      </div>
    </div>
  )
}

export default UsersList;