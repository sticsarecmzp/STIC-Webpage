import React, { useState } from 'react';
import { Calendar, MapPin, Download, Check, ArrowRight } from 'lucide-react';
import { EVENTS } from '../data/communityData';

export default function Events() {
  const [downloadedEventId, setDownloadedEventId] = useState(null);

  const downloadICS = (event) => {
    const rawClean = event.rawDate.replace(/-/g, '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//STIC SAREC Mirzapur//Events Calendar//EN',
      'BEGIN:VEVENT',
      `SUMMARY:STIC: ${event.title}`,
      `DESCRIPTION:${event.description} Deliverable: ${event.deliverable}`,
      `LOCATION:${event.location}`,
      `DTSTART:${rawClean}T100000Z`,
      `DTEND:${rawClean}T160000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadedEventId(event.id);
    setTimeout(() => {
      setDownloadedEventId(null);
    }, 2500);
  };

  return (
    <section id="events" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Campus Calendar</span>
          <h2 className="section-title">Events and Bootcamps</h2>
          <p className="section-description">
            Participate in structured sprints, national hackathon preparations, and peer code reviews
            held throughout the academic year at SAREC Mirzapur.
          </p>
        </div>

        <div className="events-grid">
          {EVENTS.map((event) => (
            <article key={event.id} className="event-card">
              <div>
                <div className="event-header">
                  <span className="event-status">{event.status}</span>
                  <div className="event-date-row">
                    <Calendar size={13} strokeWidth={1.5} />
                    <span>{event.date}</span>
                  </div>
                </div>

                <h3 className="event-title">{event.title}</h3>

                <div className="event-date-row" style={{ marginBottom: '0.85rem' }}>
                  <MapPin size={13} strokeWidth={1.5} />
                  <span>{event.location}</span>
                </div>

                <p className="event-desc">{event.description}</p>

                <div className="event-deliverable">
                  <strong style={{ color: 'var(--primary)', fontWeight: 600 }}>Expected Outcome: </strong>
                  <span>{event.deliverable}</span>
                </div>
              </div>

              <div className="event-actions">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => downloadICS(event)}
                  aria-label={`Download calendar invite for ${event.title}`}
                >
                  {downloadedEventId === event.id ? (
                    <>
                      <Check size={14} strokeWidth={1.5} style={{ color: 'var(--success)' }} />
                      <span>Calendar Saved</span>
                    </>
                  ) : (
                    <>
                      <Download size={14} strokeWidth={1.5} />
                      <span>Add to Calendar</span>
                    </>
                  )}
                </button>

                <a href="#join" className="btn btn-primary btn-sm">
                  <span>Register</span>
                  <ArrowRight size={13} strokeWidth={1.5} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
