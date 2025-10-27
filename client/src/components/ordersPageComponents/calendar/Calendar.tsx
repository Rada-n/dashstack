import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useActions } from '../../../hooks/useActions';
import { DateState } from '../../../Slices/ordersSlice';

interface CalendarProps {
  isCalendarOpen?: boolean;
  setDateEvent?: (range: { from: Date | null; to: Date | null }) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ isCalendarOpen, setDateEvent }) => {
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });

  const { setDate } = useActions();

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    const range = { from: start, to: end };
    setDateRange(range);

    if (isCalendarOpen && setDateEvent) {
      setDateEvent({
        from: start,
        to: end,
      });
    } else {
      setDate({
        from: start,
        to: end,
      });
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <DatePicker
        selectsRange
        startDate={dateRange.from}
        endDate={dateRange.to}
        onChange={handleDateRangeChange}
        maxDate={new Date("2025-12-31")}
        inline
      />
    </div>
  );
};

export default Calendar;

