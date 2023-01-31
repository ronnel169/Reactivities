import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
   // activities: Activity[];
    //selectedActivity: Activity | undefined;
    //selectActivity: (id: string) => void;
    //cancelActivity: () => void;
    //editMode: boolean;
    // openForm: (id: string) => void;
    // closeForm: () => void;
    //createOrEdit: (activity: Activity) => void;
    //deleteActivity: (id: string) => void;
    //submitting: boolean;
}

export default observer(function ActivityDashboard () {
    const {activityStore} = useStore();
    const {loadingActivities, activityRegistry} = activityStore
    //const {selectedActivity, editMode} = activityStore;

  useEffect(() => {
   if (activityRegistry.size <= 1) loadingActivities();
  }, [loadingActivities, activityRegistry.size])

  if (activityStore.loadingInitial) return <LoadingComponents content='Loading app'/>

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity filters</h2>
                {/* {selectedActivity && !editMode &&
                    <ActivityDetails 
                        //activity={selectedActivity} 
                        // cancelSelectedActivity={cancelActivity}
                        // openForm={openForm}
                        
                    />
                }
                    {editMode && 
                        <ActivityForm/>
                    } */}
            </Grid.Column>
        </Grid>
    )
})