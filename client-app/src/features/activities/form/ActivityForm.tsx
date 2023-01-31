import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid'

interface Props {
    // closeForm: () => void;
    // activity: Activity | undefined;
    // createOrEdit: (activity: Activity) => void;
    // submitting: boolean;
}

export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {selectedActivity, loading, createActivity, updateActivity, loadingActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: '',
    });

    useEffect(()=> {
        if (id) loadingActivity(id).then(activity => setActivity(activity!))
    }, [id, loadingActivity])

    // const initialState = selectedActivity ?? {
    //     id: '',
    //     title: '',
    //     date: '',
    //     description: '',
    //     category: '',
    //     city: '',
    //     venue: '',
    // };

    //const[activity, setActivity] = useState(initialState);

    function handleSubmit() {
        console.log(activity);
        //createOrEdit(activity);
        //activity.id ? updateActivity(activity) : createActivity(activity);
        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => {
                navigate(`/activities/${activity.id}`);
            });
            
        }else{
            updateActivity(activity).then(() => {
                navigate(`/activities/${activity.id}`);
            });

        }

    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    if (loadingInitial) return <LoadingComponents content='Loading activity...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit'  content='Submit' />
                <Button as={Link} to='/activities' floated='right' type='button'  content='Cancel' />
            </Form>
        </Segment>
    )
})