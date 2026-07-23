import { useState } from 'react';
import './index.css';
import Dialog from '../Dialog';

export default function EventCard({ event, compact }) {
  const [dialogType, setDialogType] = useState("view-event");
  const [isModalOpen, setIsModalOpen] = useState(false)

  const changeModal = () => {
    setIsModalOpen(!isModalOpen)
    setDialogType("view-event")

  }
  return (
    <>
      <div onClick={() => changeModal()} className={`event-card ${compact ? "compact" : ""}`} style={{ backgroundColor: event.color }}>
        {!compact && (
          <span>{event.title}</span>)}
      </div>
      {isModalOpen &&
        <Dialog event={event} isOpen={isModalOpen} onClose={changeModal} title={event.title} type={dialogType} setType={setDialogType}></Dialog>
      }
    </>
  );
}