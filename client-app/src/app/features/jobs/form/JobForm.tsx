import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/store";

export default observer(function JobForm() {

    const { jobStore } = useStore();
    const { selectedJob, closeForm, createJob, updateJob,
        loading, statuses, categories, resources } = jobStore;

    const initialState = selectedJob ?? {
        id: '',
        title: '',
        description: '',
        minExperience: '',
        salary: '',
        status: '',
        statusId: '',
        category: '',
        categoryId: '',
        customer: '',
        customerId: '',
        resource: '',
        resourceId: '',
        createdAt: '',
        image: ''
    }

    const [job, setJob] = useState(initialState);

    function handleSubmit() {
        job.id ? updateJob(job) : createJob(job);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setJob({ ...job, [name]: value })
    }

    function handleDropdownChange(event: React.SyntheticEvent<HTMLElement>, data: any) {
        const value = data.value;
        const name = data.name;
        const id = [name] + 'Id';
        var idValue: string;
        if (id == 'statusId') {
            idValue = statuses.find(({ title }) => title === value)?.id.toString()!;
        }
        if (id == 'categoryId') {
            idValue = categories.find(({ title }) => title === value)?.id.toString()!;
        }
        if (id == 'resourceId') {
            idValue = resources.find(({ name }) => name === value)?.id.toString()!;
        }
        setJob({ ...job, [name]: value, [id]: idValue! })
    }

    const statusOptions = statuses.map(function (row) {
        return { text: row.title, value: row.title }
    })
    const categoryOptions = categories.map(function (row) {
        return { text: row.title, value: row.title }
    })
    const resourceOptions = resources.map(function (row) {
        return { text: row.name, value: row.name }
    })
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" value={job.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder="Description" value={job.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder="MinExperience" value={job.minExperience} name='minExperience' onChange={handleInputChange} />
                <Form.Input placeholder="Salary" value={job.salary} name='salary' onChange={handleInputChange} />
                <Form.Dropdown placeholder="Status" value={job.status} options={statusOptions} name='status' onChange={handleDropdownChange} />
                <Form.Dropdown placeholder="Category" value={job.category} options={categoryOptions} name='category' onChange={handleDropdownChange} />
                <Form.Dropdown placeholder="Select resource" value={job.resource} options={resourceOptions} name='resource' onChange={handleDropdownChange} />
                <Button loading={loading} floated="right" positive type="submit" content="Submit" />
                <Button onClick={closeForm} floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    )
})