import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ducks } from './demo';
import DuckItem from './DuckItem';
import axios from 'axios';
import { Button, Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';


function App() {
const [activities, setActivities] = useState([]);
useEffect(() => {
  axios.get('http://localhost:5000/api/activities')
  .then(response => {
    console.log(response);
    setActivities(response.data);
  })
}, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities'/>
        <img src={logo} className="App-logo" alt="logo" />
        {ducks.map(duck => (
          <DuckItem duck={duck} key={duck.name}></DuckItem>
        ))}
        <List>
          {activities.map((activity:any) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
        <Button content="test"/>
    </div>
  );
}

export default App;
