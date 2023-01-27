import React, { useEffect, useState } from 'react';
// import logo from '../../logo.svg';
// import '../../App.css';
// import { ducks } from '../../demo';
// import DuckItem from '../../DuckItem';
//import axios from 'axios';
import { Container } from 'semantic-ui-react';
//import List from 'semantic-ui-react/dist/commonjs/elements/List';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponents from './LoadingComponents';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        let activities: Activity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        })

        console.log(activities);
        setActivities(activities);
        setLoading(false);
      })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false)
      });
    } else {
      activity.id = uuid();
      //setActivities([...activities, {...activity, id: uuid()}]);
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false)
      })
    }

    
    // activity.id 
    // ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    // : setActivities([...activities, {...activity, id: uuid()}]);

    // setEditMode(false);
    // setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.dalete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    });
    
  }

  if (loading) return <LoadingComponents content='Loading app'/>

  return (
    <div>
      <NavBar openForm={handleFormOpen}/>
      {/* <Header as='h2' icon='users' content='Reactivities'/> */}
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* {ducks.map(duck => (
          <DuckItem duck={duck} key={duck.name}></DuckItem>
        ))} */}
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting = {submitting}
        />
      </Container>
      {/* <Button content="test"/> */}
    </div>
  );
}

export default App;
