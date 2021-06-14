import React, { useEffect } from 'react';

function Notification({ openNotif, closeNotif }) {
  useEffect(() => {
    setTimeout(() => {
      closeNotif();
    }, 3000);
  });
  return (
    <>
      <div className='notification'>
        <h3>{openNotif}</h3>
      </div>
    </>
  );
}

export default Notification;
