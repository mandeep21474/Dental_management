import React, { useState } from 'react'
import {getPatients, updatePatient, deletePatient, updateUser, updateAppointment_on_patient_update} from '../utils/storage'  
const Patientcard = ({patient, onPatientUpdated}) => {    
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});

    const handleEdit = (id) => {
        setEditId(id);
        setEditData({ ...patient });
    }
    const handleDelete = (id) => {
        deletePatient(id);
        setEditId(null);
        onPatientUpdated();
      
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    }
    const handleEditSubmit = (e) => {
        e.preventDefault();
        updatePatient(editId, editData);
        
        updateUser(editId, {
            email: editData.email,
            patientId: editData.id,
            name: editData.name
        });
        updateAppointment_on_patient_update(editId, {
            patientId: editData.id,
            patientName: editData.name
        });

        setEditId(null);
        onPatientUpdated();
    }
    const handleCancel = () => {
        setEditId(null);
    }
    return (
        <div className='patient_card_item'>
            <img src={patient.avatar} alt={patient.name} />
            <h3>{patient.name}</h3>
            <div className='patient_card_item_button'>
                <button onClick={() => handleEdit(patient.id)}>Edit</button>
                <button onClick={() => handleDelete(patient.id)}>Delete</button>
            </div>
            {editId === patient.id ? (
                <form className='patient_card_item_content' onSubmit={handleEditSubmit}>
                    <p><strong>Name:</strong> <input name='name' value={editData.name || ''} onChange={handleChange} /></p>
                    <p><strong>Email:</strong> <input name='email' value={editData.email || ''} onChange={handleChange} /></p>
                    <p><strong>Contact:</strong> <input name='contact' value={editData.contact || ''} onChange={handleChange} /></p>
                    <p><strong>Patient ID:</strong> <input name='id' value={editData.id || ''} onChange={handleChange} /></p>
                    <p><strong>Address:</strong> <input name='address' value={editData.address || ''} onChange={handleChange} /></p>
                    <div style={{margin: '8px 0', width: '100%', borderTop: '1px solid #e0e7ff'}}></div>
                    <p><strong>Blood Type:</strong> <input name='bloodType' value={editData.bloodType || ''} onChange={handleChange} /></p>
                    <p><strong>DOB:</strong> <input name='dob' value={editData.dob || ''} onChange={handleChange} /></p>
                    <p><strong>Medical History:</strong> <input name='medicalHistory' value={editData.medicalHistory || ''} onChange={handleChange} /></p>
                    <p><strong>Allergies:</strong> <input name='allergies' value={editData.allergies || ''} onChange={handleChange} /></p>
                    <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
                        <button type='submit'>Save</button>
                        <button type='button' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            ) : (
                <div className='patient_card_item_content'>
                    <p><strong>Email:</strong> {patient.email}</p>
                    <p><strong>Contact:</strong> {patient.contact}</p>
                    <p><strong>Address:</strong> {patient.address}</p>
                    <p><strong>Patient ID:</strong> {patient.id}</p>
                    <div style={{margin: '8px 0', width: '100%', borderTop: '1px solid #e0e7ff'}}></div>
                    <p><strong>Blood Type:</strong> {patient.bloodType}</p>
                    <p><strong>DOB:</strong> {patient.dob}</p>
                    <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
                    <p><strong>Allergies:</strong> {patient.allergies}</p>
                </div>
            )}
        </div>
    )
}

export default Patientcard