import React, { useState } from 'react' 
import {getAppointments, updateAppointment, deleteAppointment} from '../utils/storage'

// Helper function to detect mobile devices
// Function to check if the user is on a mobile device
const isMobileDevice = () => {
    // Get the user's browser information
    const userAgent = navigator.userAgent;
    
    // List of mobile device keywords to look for
    const mobileKeywords = [
        'Android',
        'webOS', 
        'iPhone',
        'iPad',
        'iPod',
        'BlackBerry',
        'IEMobile',
        'Opera Mini'
    ];
    
    // Check if any mobile keyword is found in the user agent string
    for (let keyword of mobileKeywords) {
        if (userAgent.includes(keyword)) {
            return true;
        }
    }
    
    // If no mobile keywords found, it's not a mobile device
    return false;
};

const Appointmentcard = ({appointment, onAppointmentUpdated}) => {    
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});
    const [filesSelected, setFilesSelected] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleEdit = (id) => {
        setEditId(id);
        // console.log("appointment--> ",appointment.files.map(file => file.url))
        setEditData({ ...appointment });
        setFilesSelected(false);
        setSelectedFiles([]);
    }
    const handleDelete = (id) => {
        deleteAppointment(id);
        onAppointmentUpdated();
        setEditId(null);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    }
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        setFilesSelected(files.length > 0);
    }
    const handleEditSubmit =  (e) => {
        e.preventDefault();
        let updatedFiles = editData.files || [];
        let newFiles = [];
        
        if (selectedFiles.length > 0) {
            newFiles = (selectedFiles.map( (file) => {
               
                const filePreview = URL.createObjectURL(file); // blob url
                return { name: file.name, url: filePreview };
            }));
        }
        if (newFiles.length > 0) {
            updatedFiles = [...updatedFiles, ...newFiles];
        }
        updateAppointment(editId, { ...editData, files: updatedFiles });
        setEditId(null);
        setFilesSelected(false);
        setSelectedFiles([]);
       onAppointmentUpdated();
    }
    const handleCancel = () => {
        setEditId(null);
        setFilesSelected(false);
        setSelectedFiles([]);
    }
    const formatDateTime = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }
    return (
        <div className='appointment_card_item'>
            <h3>{appointment.title}</h3>
            <div className='appointment_card_item_button'>
                <button onClick={() => handleEdit(appointment.id)}>Edit</button>
                <button onClick={() => handleDelete(appointment.id)}>Delete</button>
            </div>
            {editId === appointment.id ? (
                <form className='appointment_card_item_content' onSubmit={handleEditSubmit}>
                    {/* <p><strong>Patient Name:</strong> <input name='patientName' value={editData.patientName || ''} onChange={handleChange} /></p> */}
                    {/* <p><strong>Patient ID:</strong> <input name='patientId' value={editData.patientId || ''} onChange={handleChange} /></p> */}
                    <p><strong>Title:</strong> <input name='title' value={editData.title || ''} onChange={handleChange} /></p>
                    <p><strong>Date & Time:</strong> <input type='datetime-local' name='appointmentDateTime' value={editData.appointmentDateTime || ''} onChange={handleChange} /></p>
                    <p><strong>Status:</strong> 
                        <select name='status' value={editData.status || ''} onChange={handleChange}>
                            <option value='Scheduled'>Scheduled</option>
                            <option value='Completed'>Completed</option>
                            <option value='Cancelled'>Cancelled</option>
                            <option value='Pending'>Pending</option>
                        </select>
                    </p>
                    <p><strong>Cost:</strong> <input type='number' name='cost' value={editData.cost || ''} onChange={handleChange} /></p>
                    <p><strong>Description:</strong> <input name='description' value={editData.description || ''} onChange={handleChange} /></p>
                    <p><strong>Treatment:</strong> <input name='treatment' value={editData.treatment || ''} onChange={handleChange} /></p>
                    <p><strong>Comments:</strong> <input name='comments' value={editData.comments || ''} onChange={handleChange} /></p>
                    <p><strong>Next Date:</strong> <input type='datetime-local' name='nextDate' value={editData.nextDate || ''} onChange={handleChange} /></p>
                    
                  
                    <div className="file-upload-section">
                        <p><strong>Upload Files:</strong></p>
                        <input type='file' multiple accept='.pdf,.png,.jpg,.jpeg' onChange={handleFileChange} />
                        {filesSelected && (
                            <p style={{ color: '#1d4ed8', marginTop: '5px', fontSize: '14px' }}>Files selected. Click "Save" to upload.</p>
                        )}
                        
                        {/* Show existing files */}
                        {Array.isArray(editData.files) && editData.files.length > 0 && (
                            <div className="existing-files-section">
                                <p><strong>Existing Files:</strong></p>
                                <ul>
                                    {editData.files.map((file, idx) => {
                                        const fileName = file.name.toLowerCase();

                                        return (
                                            <li key={idx}>
                                            <span>{file.name}</span>

                                            {/* Preview Section */}
                                            <div className="preview-section">
                                                {isMobileDevice() ? (
                                                    <div className="mobile-download-section">
                                                        <a 
                                                            href={file.url} 
                                                            download={file.name}
                                                            className="mobile-download-button"
                                                        >
                                                            Download {file.name}
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {fileName.endsWith('.pdf') ? (
                                                            <iframe
                                                                src={file.url}
                                                                title={`PDF Preview ${idx}`}
                                                                className="preview-iframe"
                                                            />
                                                        ) : fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') ? (
                                                            <img
                                                                src={file.url}
                                                                alt={`Preview ${file.name}`}
                                                                className="preview-image"
                                                            />
                                                        ) : (
                                                            <p style={{ color: 'red' }}>Preview not available for this file type</p>
                                                        )}
                                                    </>
                                                )}
                                            </div>

                                        
                                            </li>
                                        );
                                        })}

                                </ul>
                            </div>
                        )}
                    </div>
                    
                    <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
                        <button type='submit'>Save</button>
                        <button type='button' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            ) : (
                <div className='appointment_card_item_content'>
                    <p><strong>Patient Name:</strong> {appointment.patientName}</p>
                    <p><strong>Patient ID:</strong> {appointment.patientId}</p>
                    <p><strong>Title:</strong> {appointment.title}</p>
                    <p><strong>Date & Time:</strong> {formatDateTime(appointment.appointmentDateTime)}</p>
                    <p><strong>Status:</strong> {appointment.status}</p>
                    <p><strong>Cost:</strong> ${appointment.cost}</p>
                    <p><strong>Description:</strong> {appointment.description}</p>
                    <p><strong>Treatment:</strong> {appointment.treatment}</p>
                    <p><strong>Comments:</strong> {appointment.comments}</p>
                    <p><strong>Next Date:</strong> {appointment.nextDate ? formatDateTime(appointment.nextDate) : ''}</p>
                    
                    
                    {Array.isArray(appointment.files) && appointment.files.length > 0 && (
                        <div className="file-upload-section">
                           <span style={{color:'#000'}}> <strong>Files:</strong></span>
                           {console.log("appointment.files--> ",appointment.files)}
                            {appointment.files.map((file, index) => {
                                const fileName = file.name?.toLowerCase() || '';
                                
                                if (isMobileDevice()) {
                                    return (
                                        <div key={index} style={{ margin: '10px 0' }}>
                                            <a 
                                                href={file.url} 
                                                download={file.name}
                                                className="mobile-download-button"
                                            >
                                                Download {file.name}
                                            </a>
                                        </div>
                                    );
                                } else {
                                    if (fileName.endsWith('.pdf')) {
                                        return (
                                            <iframe
                                                key={index}
                                                src={file.url}
                                                className="preview-iframe"
                                                style={{ margin: '10px 0' }}
                                                title={`PDF Preview ${index}`}
                                            />
                                        );
                                    } else if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.gif') || fileName.endsWith('.bmp') || fileName.endsWith('.webp')) {
                                        return (
                                            <img
                                                key={index}
                                                src={file.url}
                                                alt={`Preview ${fileName}`}
                                                className="preview-image"
                                                style={{ margin: '10px' }}
                                            />
                                        );
                                    } else {
                                        return (
                                            <p key={index} style={{ color: 'red' }}>
                                                Cannot preview this file type: {fileName}
                                            </p>
                                        );
                                    }
                                }
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Appointmentcard 