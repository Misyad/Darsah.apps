import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SubHeader } from '../../components/layout/AppHeader';
import { toHijri, getPasaran, islamicEvents } from '../../utils/hijriCalendar';

const DAYS_ID = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const ISLAMIC_HOLIDAYS: { [key: string]: string } = {
  '2026-01-01': 'Tahun Baru Masehi',
  '2026-03-20': 'Isra Mi\'raj',
  '2026-04-01': 'Idul Fitri 1447 H',
  '2026-04-02': 'Idul Fitri 1447 H (Cuti)',
  '2026-06-07': 'Idul Adha 1447 H',
  '2026-06-27': 'Tahun Baru Hijriah 1448 H',
};

export default function Kalender() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const isSelected = (day: number) =>
    day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();

  const getEvent = (day: number) => {
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return ISLAMIC_HOLIDAYS[key];
  };

  const hijriSelected = toHijri(selectedDate);
  const pasaran = getPasaran(selectedDate);
  const eventKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth()+1).padStart(2,'0')}-${String(selectedDate.getDate()).padStart(2,'0')}`;
  const selectedEvent = ISLAMIC_HOLIDAYS[eventKey];

  // Islamic events in selected hijri
  const hijriKey = `${hijriSelected.day}-${hijriSelected.month}`;
  const hijriEvent = islamicEvents[hijriKey];

  return (
    <div className="fade-in">
      <SubHeader title="Kalender Hijriah" />

      {/* Header */}
      <div className="calendar-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={prevMonth} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 999, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
            <ChevronLeft size={16} />
          </button>
          <div>
            <div className="calendar-month">{MONTHS_ID[month]} {year}</div>
            <div className="calendar-hijri">{toHijri(new Date(year, month, 15)).monthName} {toHijri(new Date(year, month, 15)).year} H</div>
          </div>
          <button onClick={nextMonth} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 999, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div style={{ background: 'var(--bg-card)', paddingTop: 8 }}>
        <div className="calendar-grid">
          {DAYS_ID.map(d => (
            <div key={d} className="calendar-day-header" style={{ color: d === 'Jum' ? 'var(--primary)' : undefined }}>{d}</div>
          ))}
          {/* Empty spaces */}
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const date = new Date(year, month, day);
            const hijri = toHijri(date);
            const hasEvent = !!getEvent(day);
            const isFriday = date.getDay() === 5;
            return (
              <div
                key={day}
                className={`calendar-day ${isToday(day) ? 'today' : ''}`}
                onClick={() => setSelectedDate(date)}
                style={{
                  background: isSelected(day) && !isToday(day) ? 'var(--primary-xlight)' : undefined,
                  border: isSelected(day) ? '2px solid var(--primary-light)' : undefined,
                  color: isFriday && !isToday(day) ? 'var(--primary)' : undefined,
                  position: 'relative',
                }}
              >
                <span style={{ fontWeight: isToday(day) ? 700 : 500 }}>{day}</span>
                <span className="hijri-date">{hijri.day}</span>
                {hasEvent && (
                  <div style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: isToday(day) ? 'white' : 'var(--gold)' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected date info */}
      <div style={{ padding: 16 }}>
        <div style={{ background: 'var(--bg-card)', borderRadius: 16, padding: 16, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)' }}>
            {selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            <span className="badge badge-green">
              {hijriSelected.day} {hijriSelected.monthName} {hijriSelected.year} H
            </span>
            <span className="badge" style={{ background: '#fff7ed', color: '#ea580c' }}>
              {pasaran}
            </span>
          </div>
          {(selectedEvent || hijriEvent) && (
            <div style={{ marginTop: 12, padding: '8px 12px', background: 'var(--primary-xlight)', borderRadius: 10, borderLeft: '3px solid var(--primary)' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Hari Besar:</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', marginTop: 2 }}>
                {selectedEvent || hijriEvent}
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div style={{ marginTop: 16, display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--primary)' }} />
            Hari ini
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)' }} />
            Hari Besar Islam
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', border: '1px solid var(--primary)', background: 'var(--primary-xlight)' }} />
            Dipilih
          </div>
        </div>
      </div>
    </div>
  );
}
