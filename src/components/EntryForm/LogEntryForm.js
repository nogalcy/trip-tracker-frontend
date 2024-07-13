import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { createLogEntry, updateTrip } from '../../api/api.js'
import './entryForm.css';

const LogEntryForm = ({ location, onClose, entry }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        if (entry) {
            setValue('title', entry.title);
            setValue('description', entry.description);
            setValue('comments', entry.comments);
            setValue('image', entry.image);
            setValue('visitDate', formatDateForInput(entry.visitDate));
            setValue('rating', entry.rating);
        }
    }, [entry, setValue]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            if (entry) {
                await updateTrip(entry._id, data);
            } else {
                await createLogEntry(data);
            }
            onClose();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="entryForm">
            <label className="maintitle" htmlFor="MainTitle">{entry ? 'Update Trip Info' : 'Enter Trip Info'}</label>

            <label htmlFor='title'>Location</label>
            <input name='title' {...register('title', { required: true })} />
            {errors.title && <p className="alert">Location Title is Required</p>}

            <label htmlFor='description'>Description</label>
            <textarea name='description' rows={3} {...register('description', { required: false })}></textarea>

            <label htmlFor='comments'>Comments</label>
            <textarea name='comments' rows={3} {...register('comments', { required: false })}></textarea>

            <label htmlFor='image'>Image</label>
            <input name='image' {...register('image', { required: false })} />

            <label htmlFor='visitDate'>Visit Date</label>
            <input name='visitDate' type="date" {...register('visitDate', { required: true })} />
            {errors.visitDate && <p className="alert">Visit Date is Required</p>}

            <label htmlFor='rating'>Rating ( 1 - 10 )</label>
            <input name='rating' {...register('rating', { required: false })} />

            <button disabled={loading}>{loading ? 'Loading...' : (entry ? 'Update Entry' : 'Create Entry')}</button>
        </form>
    );
};

export default LogEntryForm;
