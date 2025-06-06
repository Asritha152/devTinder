import React from "react";
function AlertComponent({ alert }) {
  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      padding: '10px 20px',
      backgroundColor: alert.type === 'success' ? '#d4edda' : '#f8d7da',
      color: alert.type === 'success' ? '#155724' : '#721c24',
      border: `1px solid ${alert.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
      borderRadius: '5px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
    }}>
      {alert.message}
    </div>
  );
}
export default AlertComponent;
