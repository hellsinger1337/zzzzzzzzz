import React, { useEffect, useState } from 'react';
import {api} from '../services/api';
import './TeacherRequests.css';

const TeacherRequests = () => {
    const [requests, setRequests] = useState([]);
  
    useEffect(() => {
      getRequests();
    }, []);
  const getRequests = () => {
    api.get('/api/teacher_requests')
      .then(response => {
        const unapprovedRequests = response.data.filter(request => !request.is_approved);
        setRequests(unapprovedRequests);
      })
      .catch(error => {
        console.error('There was an error fetching the teacher requests!', error);
      });
  };
  
  const approveRequest = (requestId) => {
    api.post(`/api/approve_teacher_request/${requestId}`)
      .then(response => {
        setRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
      })
      .catch(error => {
        console.error('There was an error approving the request!', error);
      });
  };
  
    return (
      <div className="teacher-requests">
        <h1>Teacher Requests</h1>
        {requests.length === 0 ? (
          <p>No unapproved requests.</p>
        ) : (
          <ul>
            {requests.map(request => (
              <li key={request.id} className="request-item">
                <div className="request-info">
                  <h2>{request.name}</h2>
                  <img src={request.photo} alt={request.name} />
                  <p><strong>Alma Mater:</strong> {request.alma_mater}</p>
                  <p><strong>Degree:</strong> {request.degree}</p>
                  <p><strong>Positions:</strong> {request.positions}</p>
                  <p><strong>Biography:</strong> {request.biography}</p>
                  <p><strong>Requested by User ID:</strong> {request.user_id}</p>
                </div>
                <button className="approve-button" onClick={() => approveRequest(request.id)}>Approve</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  export default TeacherRequests;