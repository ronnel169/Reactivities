import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

// interface Props {
//     activity: Activity;
//     cancelSelectedActivity: () => void;
//     openForm: (id: string) => void;
// }


export default observer(function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadingActivity, loadingInitial} = activityStore;
    const {id} = useParams();

    useEffect(() => {
        if (id) loadingActivity(id);
    }, [id, loadingActivity])

    if (loadingInitial || !activity) return <LoadingComponents />
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${ activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button as={Link} to={`/manage/${activity.id}`} basic color='blue'  content='Edit'/>
                    <Button as={Link} to={'/activities'} basic color='grey'  content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
})